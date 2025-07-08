// React Hooks for Captivate

// When called as a module like this, the ServiceHandler module loads qwebchannel internally
import { ServiceHandler } from 'https://newbluefx.com/api/v3/common/mjs/servicehandler.js';

let scheduler = null;

// Initialize the ServiceHandler scheduler and return it.
// If it's already initialized, return the existing scheduler.
async function getServiceHandler() {
  if (scheduler) {
    return Promise.resolve(scheduler);
  }

  if (ServiceHandler) {
    const s = ServiceHandler;
    return new Promise((resolve) => {
      s.onready = () => {
        scheduler = s.scheduler;
        resolve(scheduler);
      };
      s.onclose = () => {
        console.warn('ServiceHandler connection closed. Cannot send data to Captivate.');
        scheduler = null;
      };
      s.init();
    });
  }
  return null;
}

async function sendVariablesToCaptivate(variables) {
  if (!scheduler) {
    await getServiceHandler();
  }
  if (!scheduler) {
    console.warn('ServiceHandler scheduler is not available. Is it running? If so, try again.');
    return;
  }
  return scheduler.scheduleAction('update', ServiceHandler.inputName, '', variables);
}

export { getServiceHandler, sendVariablesToCaptivate };
