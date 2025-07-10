import { QWebChannel } from './qwebchannel.js';

const DEFAULT_TITLER_WS_PORT = 9023;
const DEFAULT_TITLER_HTTP_PORT = 8022;

/**
 * NOTE: This script expects SimplePeer to be in the global scope.
 */

/** This will wrap a SimplePeer in an object like a WebSocket so ServiceHandler can use it */
export class SimplePeerTransport {
  /**
   * Supplied simplePeer should be a SimplePeer object
   * @param {any} simplePeer
   */
  constructor(simplePeer) {
    this.readyState = 0; // WebSocket.CONNECTING;
    this.p = simplePeer;
    this.p.on('connect', () => {
      this.readyState = 1; // WebSocket.OPEN;
      this.onopen();
    });
    this.p.on('data', (data) => this.onmessage({ data: data.toString() }));
    this.p.on('error', (msg) => this.onerror(msg));
    this.p.on('close', (_) => this.onclose());
  }

  onclose() {}
  onopen() {}

  /**
   * WebSocket messages always have a data property, so we'll mimic that
   * @param {{data: string}} msg
   */
  onmessage(msg) {}

  /**
   * @param {string} errorMessage
   */
  onerror(errorMessage) {}

  /**
   * WebSocket send method usually takes a string, but an array of bytes works too.
   * @param {string|Buffer} data
   */
  send(data) {
    this.p.send(data);
  }

  close() {
    this.p?.close && this.p?.close();
  }
}

/**
 * Helper for connecting to Titler Live server and providing API endpoints.
 */
export const ServiceHandler = {
  DEBUGMODE: true, // set to true to enable printing debugging information to console; set to false in release

  /**
   * Scheduler API object. Available after onready() callback fires.  */
  scheduler: undefined,

  /**
   * Web socket server url used to communicate with the server (i.e. "ws://localhost:4321") */
  serverUrl: undefined,

  /**
   * Name of this input, pulled from the url */
  inputName: undefined,

  /**
   * Name of the host app, pulled from the url */
  hostName: undefined,

  /**
   * put the object here so clients can know it exists */
  get analytics() {
    return Analytics;
  },

  get sp() {
    return ServiceHandler.scheduler;
  },

  /**
   * domain of the websocket tunnel host */
  tunnelHost: 'controllers.newbluefx.com',

  /**
   * Which connection method is in use? */
  usingDirect: false,
  usingTunnel: false,
  rtcReady: false,

  /**
   * url for accessing certain Titler/Captivate resources directly over http */
  get httpUrl() {
    return `http://${ServiceHandler.hostName}:${ServiceHandler.httpPort}`;
  },

  /**
   * User callback to execute when connection to server is established. */
  onready: function () {},

  /**
   * User callback to execute when connection to server is terminated. */
  onclose: function () {},

  /**
   * User callback to execute when an error is encountered trying to communicate with the server. */
  onerror: function (error) {},

  /**
   * Reports the ready state. */
  readyState: 'disconnected',

  debug(s) {
    if (ServiceHandler.DEBUGMODE) console.log(s);
  },

  // public functions that wrap internal functions for ease of use

  /**
   *
   * @param {string} action the action to run
   * @param {string} input the name of the input (must exactly match an input connected to a title)
   * @param {string} title may be the title id or the title name (as it shows up in the project panel)
   * @param {any} variables a javascript object that maps variable names to values
   * @param {(reply:string) => void|null} callback if not provided, will return a promise that resolves with the result of the action
   * @returns {Promise<string>|void} if a callback is provided, will return void, otherwise will return a promise that resolves with the result of the action
   */
  action(action, input = '', title = '', variables = {}, callback = null) {
    return ServiceHandler.scheduler.scheduleAction(action, input, title, variables, callback);
  },

  /**
   *
   * @param {string} command the command to send
   * @param {any} parameters the parameters to send to the command
   * @param {any} variables the variables to include with the command
   * @param {(reply:string) => void|null} callback if not provided, will return a promise that resolves with the result of the action
   * @returns {Promise<any>|void} if a callback is provided, will return void, otherwise will return a promise that resolves with the result of the command
   */
  command(command, parameters = {}, variables = {}, callback = null) {
    return ServiceHandler.scheduler.scheduleCommand(command, parameters, variables, callback);
  },

  // will attempt to connect to a websocket and resolve with the socket
  // or null if the timeout has passed
  async attemptSocket(url, timeout = 1000) {
    ServiceHandler.debug('attemptSocket: ' + url);
    let done = false;
    return new Promise((resolve, reject) => {
      let socket;
      try {
        socket = new WebSocket(url);
      } catch (e) {
        resolve(null);
        done = true;
      }
      socket.onerror = () => {
        resolve(null);
        done = true;
      };
      socket.onopen = () => {
        resolve(socket);
        done = true;
      };
      setTimeout(() => {
        if (!done) {
          socket?.close();
          resolve(null);
          done = true;
        }
      }, timeout);
    });
  },

  // Will attempt to set up a simplepeer RTC connection
  // If this ever connects, it will take priority over the websocket proxy if that's in use
  async startRTC(rtcPreferred = false) {
    ServiceHandler.rtcReady = false;
    // @ts-ignore
    const SimplePeer = typeof window != 'undefined' ? window.SimplePeer : null;
    if (!SimplePeer) {
      console.warn('SimplePeer not found, cannot establish RTC connection');
      return;
    }
    ServiceHandler.debug('attempting RTC');
    const p = new SimplePeer({ initiator: false, trickle: true });
    p.on('signal', (data) => {
      ServiceHandler.postTunnelRTCAccept(data);
    });

    const pt = new SimplePeerTransport(p);
    pt.onopen = async () => {
      ServiceHandler.rtcReady = true;
      ServiceHandler.debug('WebRTC connection established...');

      // upgrade a tunnel connection to a WebRTC connection
      await ServiceHandler.searching;
      if (ServiceHandler.usingDirect && !rtcPreferred) {
        // we already have an established local connection, keep using it, discard the peer object
        ServiceHandler.debug('WebRTC connection ignored... direct connection already made');
        pt.close(); // closing the transport also closes the peer object
      } else {
        ServiceHandler.usingTunnel = ServiceHandler.usingDirect = false;
        ServiceHandler.debug('WebRTC connection will be used...');
        Analytics.saveAction('ServiceHandler', { connection_method: 'WebRTC' });
        // this will also cause the ServiceHandler.onready callback to be called even if it has been called once
        ServiceHandler.wrapSocket(pt);
      }
    };
    let offer = await ServiceHandler.getTunnelRTCOffer();
    if (offer) {
      for (let o of offer.split('\r\n')) {
        p.signal(o);
      }
    }
  },

  /**
   * Will attempt to find a workable socket connection to Captivate in the following order of priority:
   * - the IP address specified in the query string/cookie
   * - the localhost address (127.0.0.1)
   * - a WebRTC peer
   * - our websocket tunnel
   *
   * @returns {Promise<WebSocket|SimplePeerTransport>} The returned socket should support all the transport functions of a WebSocket, see SimplePeerTransport
   */
  async findSocket(rtcOnly = false) {
    if (rtcOnly) {
      ServiceHandler.startRTC(true);
      return (ServiceHandler.searching = Promise.resolve(null));
    }
    ServiceHandler.searching = new Promise(async (resolve, _) => {
      let url;

      // we want to try three socket types simultaneously and take the best one
      let promises = [];

      // try the hostname we computed earlier and also 'localhost'
      for (let host of [ServiceHandler.hostName, '127.0.0.1']) {
        // if the hostName (or ip) is provided, attempt it
        ServiceHandler.hostName = host;
        url = `ws://${ServiceHandler.hostName}:${ServiceHandler.wsPort}`;
        promises.push(ServiceHandler.attemptSocket(url));
      }

      // also try the wsTunnel (if provided)
      if (ServiceHandler.wsTunnel) {
        url = `wss://${ServiceHandler.tunnelHost}/tunnel/${ServiceHandler.wsTunnel}/client`;
        promises.push(ServiceHandler.attemptSocket(url));
      } else {
        promises.push(Promise.resolve(null));
      }

      let sockets = await Promise.all(promises);
      let found = null;
      for (let [index, socket] of sockets.entries()) {
        if (socket != null) {
          // if we have already found one, close this one
          if (found) {
            socket.close();
            continue;
          }

          found = socket; // will use the first found socket
          if (index < 2) {
            ServiceHandler.debug('Found Direct WebSocket Connection... using it');
            Analytics.saveAction('ServiceHandler', { connection_method: 'websocket' });
            ServiceHandler.usingDirect = true;
          } else {
            // It's possible that the rtc connection is already prepared.
            // If so, let that one take precedence
            if (ServiceHandler.rtcReady) {
              socket.close();
              found = null;
              continue;
            }
            ServiceHandler.usingTunnel = true;
            ServiceHandler.debug('Using WebSocket Tunnel Proxy... ');
            Analytics.saveAction('ServiceHandler', { connection_method: 'websocket tunnel proxy' });
          }
          ServiceHandler.serverUrl = socket.url;
        }
      }

      if (found) {
        // resolve with the first socket
        resolve(found);
        return;
      }

      resolve(null);
    });
    ServiceHandler.startRTC();
    return ServiceHandler.searching;
  },

  async getTunnelRTCOffer() {
    const url = `https://${ServiceHandler.tunnelHost}/tunnel/${ServiceHandler.wsTunnel}`;
    let r = await fetch(url);
    let j = await r.json();
    return j.offer;
  },

  async postTunnelRTCAccept(accept) {
    const url = `https://${ServiceHandler.tunnelHost}/tunnel/${ServiceHandler.wsTunnel}/answer`;
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(accept),
    }).then((r) => r.json());
  },

  /**
   * Initializes the connection to the Titler Live API server. */
  async init(url = null, socket = null, rtc = false) {
    // if it was previously set by an earlier instance, the scheduler might be a getter
    // without a setter, and in that case, future assignments will fail, so delete it
    delete ServiceHandler.scheduler;
    ServiceHandler.scheduler = null;

    // Start by reading parameters from the url that launched this.
    const queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    ServiceHandler.wsPort = urlParams.get('port') ?? DEFAULT_TITLER_WS_PORT;
    ServiceHandler.queryVars = Object.fromEntries(urlParams);
    ServiceHandler.inputName = urlParams.get('inputName') ?? '';
    ServiceHandler.hostName = urlParams.get('hostName') ?? urlParams.get('ip') ?? window.location.hostname;
    ServiceHandler.wsTunnel = urlParams.get('wsTunnel');
    ServiceHandler.httpPort = urlParams.get('httpPort') ?? DEFAULT_TITLER_HTTP_PORT;

    // backwards compatible fallback for older products
    if (!urlParams.get('port')) {
      let cookie = document.cookie.match(/channel=([0-9]+)/);
      if (cookie) {
        ServiceHandler.wsPort = cookie[1];
      }
    }

    // the connection should happen like this...
    // if a socket is provided, use it
    // if a url is provided, use it
    // otherwise, attempt to construct a socket that will work for us
    if (socket !== null) {
      ServiceHandler.debug('Using provided socket.');
    } else if (url !== null) {
      // We've been passed the websocket url directly.
      ServiceHandler.debug('Using provided ws url.');
      ServiceHandler.debug(url);
      socket = new WebSocket(url);
    } else {
      socket = await ServiceHandler.findSocket(rtc);
    }

    if (socket === null) {
      // It's possible that the sockets failed because we have chosen to use WebRTC.
      // In that case, there's no error.
      if (ServiceHandler.rtcReady || rtc) {
        ServiceHandler.debug('WebRTC connection is being used.');
      } else {
        if (ServiceHandler.DEBUGMODE) console.error('WebSocket error');
        if (typeof ServiceHandler.onerror === 'function')
          ServiceHandler.onerror('could not determine a websocket to use');
      }
      return;
    }

    ServiceHandler.serverUrl = socket.url;
    return new Promise((resolver, _) => {
      ServiceHandler.wrapSocket(socket, resolver);
    });
  },

  wrapSocket(socket, resolver = null) {
    // if a previous socket exists, we need to close it
    if (ServiceHandler._socket) {
      ServiceHandler._socket.onmessage = null;
      ServiceHandler._socket.onclose = null;
      ServiceHandler._socket.close();
    }
    ServiceHandler._socket = socket;
    ServiceHandler.readyState = socket.readyState;
    socket.onclose = function () {
      ServiceHandler.readyState = socket.readyState;
      if (ServiceHandler.DEBUGMODE) console.warn('ServiceHandler socket closed');
      if (typeof ServiceHandler.onclose === 'function') ServiceHandler.onclose();
    };

    socket.onerror = function (error) {
      ServiceHandler.readyState = socket.readyState;
      if (ServiceHandler.DEBUGMODE) console.error('ServiceHandler socket error', error);
      if (typeof ServiceHandler.onerror === 'function') ServiceHandler.onerror(error);
      resolver && resolver();
    };

    socket.onopen = function () {
      ServiceHandler.readyState = socket.readyState;
      ServiceHandler.finishWrap(socket, resolver);
    };

    // the socket might have connected already, if so, finish the wrapping right away
    if (socket.readyState == WebSocket.OPEN) {
      ServiceHandler.finishWrap(socket, resolver);
    }
  },

  finishWrap(socket, resolver = null) {
    ServiceHandler.debug('ServiceHandler socket connected, setting up QWebChannel');

    // Establish API connection.
    new QWebChannel(socket, function (channel) {
      ServiceHandler.debug('QWebChannel connected');
      Analytics.init(channel.objects.scheduler);
      ServiceHandler.wrapScheduler(channel.objects.scheduler);
      if (typeof ServiceHandler.onready === 'function') ServiceHandler.onready();
      if (resolver) resolver();

      // if a tunnel was specified, we should attempt to notify the server that
      // a controller is publically available
      ServiceHandler.phoneHome();
    });
    setTimeout(() => {
      if (!ServiceHandler.scheduler && resolver) resolver();
    }, 2000);
  },

  /** wrap the scheduler functions in promises so we can use them with async/await paradigms */
  wrapScheduler(scheduler) {
    // the new method is to wrap the scheduler in a proxy object that will return promises if the final argument is not a function
    // this also allows us to return empty values for functions that don't exist on the scheduler, thus avoiding
    // version exceptions.

    // save the original scheduler object
    ServiceHandler._scheduler = scheduler;
    const analyticsName = `ServiceHandler: ${ServiceHandler.inputName}`;

    // make a proxy object that will return promises for all scheduler functions
    ServiceHandler.scheduler = new Proxy(scheduler, {
      get: function (target, prop, _) {
        let realprop = target[prop];
        if (!realprop) {
          return () => {
            console.warn('Method not found on scheduler: ', prop);
            // Analytics.saveEvent(analyticsName, 'scheduler_method_not_found', { method: prop.toString() });
            return Promise.resolve({
              success: false,
              error:
                "Method not found. Either we have lost connection to Captivate, or the installed version doesn't support this API method.",
            });
          };
        }
        if (typeof realprop === 'function') {
          // save analytics
          // Analytics.saveEvent(analyticsName, 'scheduler_method', { method: prop.toString() });
          return (...args) => {
            const lastarg = args[args.length - 1];
            if (typeof lastarg === 'function') {
              realprop(...args);
            } else {
              return new Promise((resolve, _) => {
                args.push((reply) => {
                  try {
                    const parsed = JSON.parse(reply);
                    resolve(parsed);
                  } catch (e) {
                    console.log(reply);
                    // console.log(e);
                    resolve(reply);
                  }
                });
                try {
                  realprop(...args);
                } catch (e) {
                  // console.log(e);
                  console.warn('Error in scheduler call. Property found, but function failed: ', e);
                }
              });
            }
          };
        } else {
          return realprop;
        }
      },
    });
  },

  async phoneHome() {
    const scheduler = ServiceHandler.scheduler;
    if (!scheduler) {
      return;
    }

    if (!ServiceHandler.wsTunnel) return;

    // get the user's machine id and possible api token
    let { user } = await ServiceHandler.command('getReport');
    let { machineId, apiToken } = user;
    if (!machineId || !apiToken) return;

    // get the current version
    let { api_version } = await ServiceHandler.command('getProductInfo');

    // get the current project name
    let { filePath } = await ServiceHandler.command('getCurrentProject');
    let basename = filePath.split(/[/\\]/g).pop();

    // report public availability of this controller
    if (api_version >= '240910') {
      let inputName = basename + ' - ' + ServiceHandler.inputName;
      if (typeof window == 'undefined') return;
      if (typeof fetch == 'undefined') return;
      const localUrl = window.location.href;
      let publicUrl = new URL(localUrl);
      publicUrl.hostname = 'controllers.newbluefx.com';
      publicUrl.protocol = 'https';
      publicUrl.port = '';
      const char = publicUrl.pathname.startsWith('/') ? '' : '/';
      publicUrl.pathname = `/tunnel/${ServiceHandler.wsTunnel}/proxy` + char + publicUrl.pathname;

      // make sure it actually is available
      let r = {};
      try {
        r = await fetch(publicUrl);
      } catch (e) {
        console.log(e);
      }
      if (r.ok) {
        r = await fetch('https://newbluefx.com/api/register-remote-control.php', {
          method: 'POST',
          body: JSON.stringify({ machineId, inputName, apiToken, localUrl, publicUrl: publicUrl.toString() }),
        }).then((r) => r.json());
        console.log(r);
      }
    }
  },

  // _promised: function (fn, args) {
  //   return new Promise((resolve, _) => {
  //     fn(...args, (reply) => {
  //       resolve(reply);
  //     });
  //   });
  // },
};

// function promiseify(func) {
//   return (...args) => {
//     return new Promise((resolve, reject) => {
//       // for scheduler calls, the last argument is a callback.
//       args.push((e) => {
//         resolve(e);
//       });
//       try {
//         func(...args);
//       } catch (e) {
//         reject(e);
//       }
//     });
//   };
// }

export class Analytics {
  /** @type {any} */
  static #capture = null;

  // if the analytics are called before the scheduler is set, they will be queued and sent when the scheduler is set
  /** @type {Array<{controllerName:string, eventProperties:any, isSettingsEvent:boolean, allowsMany:boolean}>} */
  static #queue = [];

  /**
   * @param {any} scheduler is the scheduler object from the Captivate / Titler / ServiceHandler library
   */
  static init(scheduler) {
    if (!('_analytics_capture' in scheduler)) {
      console.warn('Analytics not enabled in this version of Captivate');
      return;
    }
    console.log('Analytics initialized');
    Analytics.#capture = scheduler._analytics_capture;
    Analytics.dequeue();
  }

  static dequeue() {
    if (!Analytics.#capture) {
      return;
    }
    if (Analytics.#queue.length == 0) return;
    console.warn('Analytics initialized. Sending previously queued events.');
    while (Analytics.#queue.length > 0) {
      const { controllerName, eventProperties, isSettingsEvent, allowsMany } = Analytics.#queue.shift();
      Analytics.save(controllerName, eventProperties, isSettingsEvent, allowsMany);
    }
  }

  /**
   *
   * @param {string} controllerName the name of the data controller in charge of sending this event
   * @param {any} eventProperties javascript object that simply maps keys to values
   * @param {boolean} isSettingsEvent use to indicate that this event is tracking a user setting
   * @param {boolean} allowsMany when true, each event is tracked as a separate event, when false, only one event is tracked and a frequency is incremented
   */
  static save(controllerName, eventProperties, isSettingsEvent, allowsMany = false) {
    return new Promise((resolve, _) => {
      const capture = Analytics.#capture;
      if (!capture) {
        console.warn('Analytics not initialized. Call Analytics.init(scheduler) first. Event will be queued.');
        Analytics.#queue.push({ controllerName, eventProperties, isSettingsEvent, allowsMany });
        resolve({ error: 'Analytics not initialized. Call Analytics.init(scheduler) first. Event will be queued.' });
        return;
      }
      const r = capture(controllerName, eventProperties, isSettingsEvent, allowsMany);
      resolve({ success: true, response: r });
    });
  }

  /**
   *
   * @param {string} controllerName the name of the data controller in charge of sending this event
   * @param {string} eventName the name of the event sent by the controller
   * @param {any} eventProperties javascript object that simply maps keys to values
   * @param {boolean} allowsMany when true, each event is tracked as a separate event, when false, only one event is tracked and a frequency is incremented
   */
  static saveEvent(controllerName, eventName, eventProperties = {}, allowsMany = false) {
    return Analytics.save(controllerName, { ...eventProperties, event: eventName }, false, allowsMany);
  }

  /**
   *
   * @param {string} controllerName the name of the data controller in charge of sending this event
   * @param {any} eventProperties javascript object that simply maps keys to values
   * @param {boolean} allowsMany when true, each event is tracked as a separate event, when false, only one event is tracked and a frequency is incremented
   */
  static saveAction(controllerName, eventProperties, allowsMany = false) {
    return Analytics.save(controllerName, eventProperties, false, allowsMany);
  }

  /**
   *
   * @param {string} controllerName the name of the data controller in charge of sending this event
   * @param {any} eventProperties javascript object that simply maps keys to values
   * @param {boolean} allowsMany when true, each event is tracked as a separate event, when false, only one event is tracked and a frequency is incremented
   */
  static saveSetting(controllerName, eventProperties, allowsMany = false) {
    return Analytics.save(controllerName, eventProperties, true, allowsMany);
  }
}

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.ServiceHandler = ServiceHandler;
  // @ts-ignore
  window.Analytics = Analytics;
  // @ts-ignore
  window.SimplePeerTransport = SimplePeerTransport;
}