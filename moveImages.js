// moveImages.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dfecvzwvg',
  api_key: '911888427374839',
  api_secret: 'psk5w4hwB-e6VWuEh_R2Qba4yek'
});

async function moveImages() {
  const moves = [

    {
      from: 'veefriends/cards/5555-fan-bubblegum',
      to: 'veefriends/social/5555-fan-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/5555-fan-core',
      to: 'veefriends/social/5555-fan-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/5555-fan-diamond',
      to: 'veefriends/social/5555-fan-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/5555-fan-emerald',
      to: 'veefriends/social/5555-fan-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/5555-fan-epic',
      to: 'veefriends/social/5555-fan-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/5555-fan-gold',
      to: 'veefriends/social/5555-fan-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/5555-fan-hologram',
      to: 'veefriends/social/5555-fan-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/5555-fan-lava',
      to: 'veefriends/social/5555-fan-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/accountable-ant-bubblegum',
      to: 'veefriends/social/accountable-ant-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/accountable-ant-core',
      to: 'veefriends/social/accountable-ant-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/accountable-ant-diamond',
      to: 'veefriends/social/accountable-ant-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/accountable-ant-emerald',
      to: 'veefriends/social/accountable-ant-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/accountable-ant-epic',
      to: 'veefriends/social/accountable-ant-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/accountable-ant-gold',
      to: 'veefriends/social/accountable-ant-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/accountable-ant-hologram',
      to: 'veefriends/social/accountable-ant-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/accountable-ant-lava',
      to: 'veefriends/social/accountable-ant-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/accountable-anteater-bubblegum',
      to: 'veefriends/social/accountable-anteater-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/accountable-anteater-core',
      to: 'veefriends/social/accountable-anteater-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/accountable-anteater-emerald',
      to: 'veefriends/social/accountable-anteater-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/accountable-anteater-gold',
      to: 'veefriends/social/accountable-anteater-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/accountable-anteater-hologram',
      to: 'veefriends/social/accountable-anteater-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/adaptable-alien-bubblegum',
      to: 'veefriends/social/adaptable-alien-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/adaptable-alien-core',
      to: 'veefriends/social/adaptable-alien-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/adaptable-alien-diamond',
      to: 'veefriends/social/adaptable-alien-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/adaptable-alien-emerald',
      to: 'veefriends/social/adaptable-alien-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/adaptable-alien-epic',
      to: 'veefriends/social/adaptable-alien-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/adaptable-alien-gold',
      to: 'veefriends/social/adaptable-alien-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/adaptable-alien-hologram',
      to: 'veefriends/social/adaptable-alien-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/adaptable-alien-lava',
      to: 'veefriends/social/adaptable-alien-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/adventurous-astronaut-bubblegum',
      to: 'veefriends/social/adventurous-astronaut-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/adventurous-astronaut-core',
      to: 'veefriends/social/adventurous-astronaut-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/adventurous-astronaut-diamond',
      to: 'veefriends/social/adventurous-astronaut-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/adventurous-astronaut-emerald',
      to: 'veefriends/social/adventurous-astronaut-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/adventurous-astronaut-epic',
      to: 'veefriends/social/adventurous-astronaut-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/adventurous-astronaut-hologram',
      to: 'veefriends/social/adventurous-astronaut-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alert-ape-bubblegum',
      to: 'veefriends/social/alert-ape-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alert-ape-core',
      to: 'veefriends/social/alert-ape-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alert-ape-diamond',
      to: 'veefriends/social/alert-ape-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alert-ape-emerald',
      to: 'veefriends/social/alert-ape-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alert-ape-epic',
      to: 'veefriends/social/alert-ape-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alert-ape-gold',
      to: 'veefriends/social/alert-ape-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alert-ape-hologram',
      to: 'veefriends/social/alert-ape-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alert-ape-lava',
      to: 'veefriends/social/alert-ape-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alpha-alligator-bubblegum',
      to: 'veefriends/social/alpha-alligator-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alpha-alligator-core',
      to: 'veefriends/social/alpha-alligator-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alpha-alligator-diamond',
      to: 'veefriends/social/alpha-alligator-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alpha-alligator-emerald',
      to: 'veefriends/social/alpha-alligator-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alpha-alligator-epic',
      to: 'veefriends/social/alpha-alligator-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alpha-alligator-gold',
      to: 'veefriends/social/alpha-alligator-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alpha-alligator-hologram',
      to: 'veefriends/social/alpha-alligator-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/alpha-alligator-lava',
      to: 'veefriends/social/alpha-alligator-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ambitious-angel-bubblegum',
      to: 'veefriends/social/ambitious-angel-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ambitious-angel-core',
      to: 'veefriends/social/ambitious-angel-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ambitious-angel-diamond',
      to: 'veefriends/social/ambitious-angel-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ambitious-angel-emerald',
      to: 'veefriends/social/ambitious-angel-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ambitious-angel-epic',
      to: 'veefriends/social/ambitious-angel-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ambitious-angel-gold',
      to: 'veefriends/social/ambitious-angel-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ambitious-angel-lava',
      to: 'veefriends/social/ambitious-angel-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amiable-anchovy-bubblegum',
      to: 'veefriends/social/amiable-anchovy-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amiable-anchovy-core',
      to: 'veefriends/social/amiable-anchovy-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amiable-anchovy-diamond',
      to: 'veefriends/social/amiable-anchovy-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amiable-anchovy-emerald',
      to: 'veefriends/social/amiable-anchovy-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amiable-anchovy-epic',
      to: 'veefriends/social/amiable-anchovy-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amiable-anchovy-gold',
      to: 'veefriends/social/amiable-anchovy-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amiable-anchovy-hologram',
      to: 'veefriends/social/amiable-anchovy-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amiable-anchovy-lava',
      to: 'veefriends/social/amiable-anchovy-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amped-aye-aye-core',
      to: 'veefriends/social/amped-aye-aye-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amped-aye-aye-diamond',
      to: 'veefriends/social/amped-aye-aye-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amped-aye-aye-emerald',
      to: 'veefriends/social/amped-aye-aye-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amped-aye-aye-epic',
      to: 'veefriends/social/amped-aye-aye-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amped-aye-aye-gold',
      to: 'veefriends/social/amped-aye-aye-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amped-aye-aye-hologram',
      to: 'veefriends/social/amped-aye-aye-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/amped-aye-aye-lava',
      to: 'veefriends/social/amped-aye-aye-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/arbitraging-admiral-bubblegum',
      to: 'veefriends/social/arbitraging-admiral-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/arbitraging-admiral-core',
      to: 'veefriends/social/arbitraging-admiral-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/arbitraging-admiral-diamond',
      to: 'veefriends/social/arbitraging-admiral-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/arbitraging-admiral-emerald',
      to: 'veefriends/social/arbitraging-admiral-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/arbitraging-admiral-epic',
      to: 'veefriends/social/arbitraging-admiral-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/arbitraging-admiral-gold',
      to: 'veefriends/social/arbitraging-admiral-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/arbitraging-admiral-hologram',
      to: 'veefriends/social/arbitraging-admiral-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/arbitraging-admiral-lava',
      to: 'veefriends/social/arbitraging-admiral-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/articulate-armadillo-bubblegum',
      to: 'veefriends/social/articulate-armadillo-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/articulate-armadillo-core',
      to: 'veefriends/social/articulate-armadillo-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/articulate-armadillo-diamond',
      to: 'veefriends/social/articulate-armadillo-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/articulate-armadillo-emerald',
      to: 'veefriends/social/articulate-armadillo-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/articulate-armadillo-epic',
      to: 'veefriends/social/articulate-armadillo-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/articulate-armadillo-gold',
      to: 'veefriends/social/articulate-armadillo-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/articulate-armadillo-hologram',
      to: 'veefriends/social/articulate-armadillo-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/articulate-armadillo-lava',
      to: 'veefriends/social/articulate-armadillo-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/aspiring-alpaca-bubblegum',
      to: 'veefriends/social/aspiring-alpaca-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/aspiring-alpaca-core',
      to: 'veefriends/social/aspiring-alpaca-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/aspiring-alpaca-diamond',
      to: 'veefriends/social/aspiring-alpaca-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/aspiring-alpaca-emerald',
      to: 'veefriends/social/aspiring-alpaca-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/aspiring-alpaca-epic',
      to: 'veefriends/social/aspiring-alpaca-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/aspiring-alpaca-gold',
      to: 'veefriends/social/aspiring-alpaca-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/aspiring-alpaca-hologram',
      to: 'veefriends/social/aspiring-alpaca-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/aspiring-alpaca-lava',
      to: 'veefriends/social/aspiring-alpaca-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/authentic-anaconda-bubblegum',
      to: 'veefriends/social/authentic-anaconda-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/authentic-anaconda-core',
      to: 'veefriends/social/authentic-anaconda-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/authentic-anaconda-diamond',
      to: 'veefriends/social/authentic-anaconda-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/authentic-anaconda-emerald',
      to: 'veefriends/social/authentic-anaconda-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/authentic-anaconda-epic',
      to: 'veefriends/social/authentic-anaconda-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/authentic-anaconda-gold',
      to: 'veefriends/social/authentic-anaconda-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/authentic-anaconda-hologram',
      to: 'veefriends/social/authentic-anaconda-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/authentic-anaconda-lava',
      to: 'veefriends/social/authentic-anaconda-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/awesome-african-civet-bubblegum',
      to: 'veefriends/social/awesome-african-civet-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/awesome-african-civet-core',
      to: 'veefriends/social/awesome-african-civet-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/awesome-african-civet-diamond',
      to: 'veefriends/social/awesome-african-civet-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/awesome-african-civet-emerald',
      to: 'veefriends/social/awesome-african-civet-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/awesome-african-civet-epic',
      to: 'veefriends/social/awesome-african-civet-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/awesome-african-civet-gold',
      to: 'veefriends/social/awesome-african-civet-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/awesome-african-civet-hologram',
      to: 'veefriends/social/awesome-african-civet-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/awesome-african-civet-lava',
      to: 'veefriends/social/awesome-african-civet-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bad-ass-bulldog-core',
      to: 'veefriends/social/bad-ass-bulldog-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bad-ass-bulldog-diamond',
      to: 'veefriends/social/bad-ass-bulldog-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bad-ass-bulldog-emerald',
      to: 'veefriends/social/bad-ass-bulldog-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bad-ass-bulldog-epic',
      to: 'veefriends/social/bad-ass-bulldog-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bad-ass-bulldog-hologram',
      to: 'veefriends/social/bad-ass-bulldog-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bad-ass-bulldog-lava',
      to: 'veefriends/social/bad-ass-bulldog-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bad-intentions-bubblegum',
      to: 'veefriends/social/bad-intentions-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bad-intentions-core',
      to: 'veefriends/social/bad-intentions-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bad-intentions-diamond',
      to: 'veefriends/social/bad-intentions-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bad-intentions-emerald',
      to: 'veefriends/social/bad-intentions-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bad-intentions-epic',
      to: 'veefriends/social/bad-intentions-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bad-intentions-gold',
      to: 'veefriends/social/bad-intentions-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bad-intentions-hologram',
      to: 'veefriends/social/bad-intentions-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bad-intentions-lava',
      to: 'veefriends/social/bad-intentions-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/balanced-beetle-bubblegum',
      to: 'veefriends/social/balanced-beetle-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/balanced-beetle-core',
      to: 'veefriends/social/balanced-beetle-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/balanced-beetle-diamond',
      to: 'veefriends/social/balanced-beetle-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/balanced-beetle-emerald',
      to: 'veefriends/social/balanced-beetle-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/balanced-beetle-epic',
      to: 'veefriends/social/balanced-beetle-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/balanced-beetle-gold',
      to: 'veefriends/social/balanced-beetle-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/balanced-beetle-hologram',
      to: 'veefriends/social/balanced-beetle-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/balanced-beetle-lava',
      to: 'veefriends/social/balanced-beetle-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bashful-blobfish-bubblegum',
      to: 'veefriends/social/bashful-blobfish-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bashful-blobfish-core',
      to: 'veefriends/social/bashful-blobfish-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bashful-blobfish-diamond',
      to: 'veefriends/social/bashful-blobfish-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bashful-blobfish-emerald',
      to: 'veefriends/social/bashful-blobfish-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bashful-blobfish-epic',
      to: 'veefriends/social/bashful-blobfish-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bashful-blobfish-gold',
      to: 'veefriends/social/bashful-blobfish-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bashful-blobfish-hologram',
      to: 'veefriends/social/bashful-blobfish-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bashful-blobfish-lava',
      to: 'veefriends/social/bashful-blobfish-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/be-the-bigger-person-core',
      to: 'veefriends/social/be-the-bigger-person-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/be-the-bigger-person-diamond',
      to: 'veefriends/social/be-the-bigger-person-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/be-the-bigger-person-emerald',
      to: 'veefriends/social/be-the-bigger-person-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/be-the-bigger-person-gold',
      to: 'veefriends/social/be-the-bigger-person-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/be-the-bigger-person-hologram',
      to: 'veefriends/social/be-the-bigger-person-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/be-the-bigger-person-lava',
      to: 'veefriends/social/be-the-bigger-person-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/befuddled-burglar-bubblegum',
      to: 'veefriends/social/befuddled-burglar-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/befuddled-burglar-core',
      to: 'veefriends/social/befuddled-burglar-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/befuddled-burglar-diamond',
      to: 'veefriends/social/befuddled-burglar-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/befuddled-burglar-emerald',
      to: 'veefriends/social/befuddled-burglar-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/befuddled-burglar-epic',
      to: 'veefriends/social/befuddled-burglar-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/befuddled-burglar-gold',
      to: 'veefriends/social/befuddled-burglar-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/befuddled-burglar-hologram',
      to: 'veefriends/social/befuddled-burglar-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/befuddled-burglar-lava',
      to: 'veefriends/social/befuddled-burglar-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/benevolent-barn-owl-core',
      to: 'veefriends/social/benevolent-barn-owl-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/benevolent-barn-owl-diamond',
      to: 'veefriends/social/benevolent-barn-owl-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/benevolent-barn-owl-emerald',
      to: 'veefriends/social/benevolent-barn-owl-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/benevolent-barn-owl-epic',
      to: 'veefriends/social/benevolent-barn-owl-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/benevolent-barn-owl-gold',
      to: 'veefriends/social/benevolent-barn-owl-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/benevolent-barn-owl-hologram',
      to: 'veefriends/social/benevolent-barn-owl-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/benevolent-barn-owl-lava',
      to: 'veefriends/social/benevolent-barn-owl-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/big-game-bandicoot-bubblegum',
      to: 'veefriends/social/big-game-bandicoot-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/big-game-bandicoot-core',
      to: 'veefriends/social/big-game-bandicoot-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/big-game-bandicoot-diamond',
      to: 'veefriends/social/big-game-bandicoot-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/big-game-bandicoot-emerald',
      to: 'veefriends/social/big-game-bandicoot-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/big-game-bandicoot-epic',
      to: 'veefriends/social/big-game-bandicoot-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/big-game-bandicoot-gold',
      to: 'veefriends/social/big-game-bandicoot-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/big-game-bandicoot-hologram',
      to: 'veefriends/social/big-game-bandicoot-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/big-game-bandicoot-lava',
      to: 'veefriends/social/big-game-bandicoot-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boisterous-beaver-bubblegum',
      to: 'veefriends/social/boisterous-beaver-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boisterous-beaver-core',
      to: 'veefriends/social/boisterous-beaver-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boisterous-beaver-diamond',
      to: 'veefriends/social/boisterous-beaver-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boisterous-beaver-emerald',
      to: 'veefriends/social/boisterous-beaver-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boisterous-beaver-epic',
      to: 'veefriends/social/boisterous-beaver-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boisterous-beaver-gold',
      to: 'veefriends/social/boisterous-beaver-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boisterous-beaver-hologram',
      to: 'veefriends/social/boisterous-beaver-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boisterous-beaver-lava',
      to: 'veefriends/social/boisterous-beaver-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bold-af-bat-bubblegum',
      to: 'veefriends/social/bold-af-bat-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bold-af-bat-core',
      to: 'veefriends/social/bold-af-bat-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bold-af-bat-diamond',
      to: 'veefriends/social/bold-af-bat-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bold-af-bat-emerald',
      to: 'veefriends/social/bold-af-bat-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bold-af-bat-epic',
      to: 'veefriends/social/bold-af-bat-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bold-af-bat-gold',
      to: 'veefriends/social/bold-af-bat-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bold-af-bat-hologram',
      to: 'veefriends/social/bold-af-bat-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bold-af-bat-lava',
      to: 'veefriends/social/bold-af-bat-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bombastic-baboon-bubblegum',
      to: 'veefriends/social/bombastic-baboon-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bombastic-baboon-core',
      to: 'veefriends/social/bombastic-baboon-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bombastic-baboon-diamond',
      to: 'veefriends/social/bombastic-baboon-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bombastic-baboon-emerald',
      to: 'veefriends/social/bombastic-baboon-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bombastic-baboon-epic',
      to: 'veefriends/social/bombastic-baboon-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bombastic-baboon-gold',
      to: 'veefriends/social/bombastic-baboon-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bombastic-baboon-hologram',
      to: 'veefriends/social/bombastic-baboon-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bombastic-baboon-lava',
      to: 'veefriends/social/bombastic-baboon-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boss-bobcat-bubblegum',
      to: 'veefriends/social/boss-bobcat-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boss-bobcat-core',
      to: 'veefriends/social/boss-bobcat-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boss-bobcat-diamond',
      to: 'veefriends/social/boss-bobcat-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boss-bobcat-emerald',
      to: 'veefriends/social/boss-bobcat-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boss-bobcat-epic',
      to: 'veefriends/social/boss-bobcat-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boss-bobcat-hologram',
      to: 'veefriends/social/boss-bobcat-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/boss-bobcat-lava',
      to: 'veefriends/social/boss-bobcat-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brave-bison-bubblegum',
      to: 'veefriends/social/brave-bison-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brave-bison-core',
      to: 'veefriends/social/brave-bison-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brave-bison-diamond',
      to: 'veefriends/social/brave-bison-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brave-bison-emerald',
      to: 'veefriends/social/brave-bison-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brave-bison-epic',
      to: 'veefriends/social/brave-bison-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brave-bison-gold',
      to: 'veefriends/social/brave-bison-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brave-bison-hologram',
      to: 'veefriends/social/brave-bison-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brave-bison-lava',
      to: 'veefriends/social/brave-bison-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brilliant-barb-bubblegum',
      to: 'veefriends/social/brilliant-barb-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brilliant-barb-core',
      to: 'veefriends/social/brilliant-barb-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brilliant-barb-diamond',
      to: 'veefriends/social/brilliant-barb-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brilliant-barb-emerald',
      to: 'veefriends/social/brilliant-barb-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brilliant-barb-epic',
      to: 'veefriends/social/brilliant-barb-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brilliant-barb-hologram',
      to: 'veefriends/social/brilliant-barb-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brilliant-barracuda-bubblegum',
      to: 'veefriends/social/brilliant-barracuda-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brilliant-barracuda-core',
      to: 'veefriends/social/brilliant-barracuda-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brilliant-barracuda-diamond',
      to: 'veefriends/social/brilliant-barracuda-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brilliant-barracuda-emerald',
      to: 'veefriends/social/brilliant-barracuda-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brilliant-barracuda-epic',
      to: 'veefriends/social/brilliant-barracuda-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brilliant-barracuda-gold',
      to: 'veefriends/social/brilliant-barracuda-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brilliant-barracuda-hologram',
      to: 'veefriends/social/brilliant-barracuda-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/brilliant-barracuda-lava',
      to: 'veefriends/social/brilliant-barracuda-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bubbly-buzzard-bubblegum',
      to: 'veefriends/social/bubbly-buzzard-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bubbly-buzzard-core',
      to: 'veefriends/social/bubbly-buzzard-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bubbly-buzzard-diamond',
      to: 'veefriends/social/bubbly-buzzard-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bubbly-buzzard-emerald',
      to: 'veefriends/social/bubbly-buzzard-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bubbly-buzzard-epic',
      to: 'veefriends/social/bubbly-buzzard-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bubbly-buzzard-gold',
      to: 'veefriends/social/bubbly-buzzard-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bubbly-buzzard-hologram',
      to: 'veefriends/social/bubbly-buzzard-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bubbly-buzzard-lava',
      to: 'veefriends/social/bubbly-buzzard-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bullish-bull-bubblegum',
      to: 'veefriends/social/bullish-bull-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bullish-bull-core',
      to: 'veefriends/social/bullish-bull-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bullish-bull-diamond',
      to: 'veefriends/social/bullish-bull-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bullish-bull-emerald',
      to: 'veefriends/social/bullish-bull-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bullish-bull-epic',
      to: 'veefriends/social/bullish-bull-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bullish-bull-gold',
      to: 'veefriends/social/bullish-bull-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bullish-bull-hologram',
      to: 'veefriends/social/bullish-bull-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/bullish-bull-lava',
      to: 'veefriends/social/bullish-bull-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/calm-clam-bubblegum',
      to: 'veefriends/social/calm-clam-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/calm-clam-core',
      to: 'veefriends/social/calm-clam-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/calm-clam-diamond',
      to: 'veefriends/social/calm-clam-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/calm-clam-emerald',
      to: 'veefriends/social/calm-clam-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/calm-clam-epic',
      to: 'veefriends/social/calm-clam-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/calm-clam-gold',
      to: 'veefriends/social/calm-clam-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/calm-clam-hologram',
      to: 'veefriends/social/calm-clam-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/calm-clam-lava',
      to: 'veefriends/social/calm-clam-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/candid-clownfish-bubblegum',
      to: 'veefriends/social/candid-clownfish-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/candid-clownfish-core',
      to: 'veefriends/social/candid-clownfish-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/candid-clownfish-diamond',
      to: 'veefriends/social/candid-clownfish-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/candid-clownfish-emerald',
      to: 'veefriends/social/candid-clownfish-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/candid-clownfish-epic',
      to: 'veefriends/social/candid-clownfish-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/candid-clownfish-gold',
      to: 'veefriends/social/candid-clownfish-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/candid-clownfish-hologram',
      to: 'veefriends/social/candid-clownfish-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/capable-caterpillar-bubblegum',
      to: 'veefriends/social/capable-caterpillar-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/capable-caterpillar-core',
      to: 'veefriends/social/capable-caterpillar-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/capable-caterpillar-diamond',
      to: 'veefriends/social/capable-caterpillar-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/capable-caterpillar-emerald',
      to: 'veefriends/social/capable-caterpillar-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/capable-caterpillar-epic',
      to: 'veefriends/social/capable-caterpillar-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/capable-caterpillar-gold',
      to: 'veefriends/social/capable-caterpillar-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/capable-caterpillar-hologram',
      to: 'veefriends/social/capable-caterpillar-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/capable-caterpillar-lava',
      to: 'veefriends/social/capable-caterpillar-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/caring-camel-bubblegum',
      to: 'veefriends/social/caring-camel-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/caring-camel-core',
      to: 'veefriends/social/caring-camel-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/caring-camel-diamond',
      to: 'veefriends/social/caring-camel-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/caring-camel-emerald',
      to: 'veefriends/social/caring-camel-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/caring-camel-epic',
      to: 'veefriends/social/caring-camel-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/caring-camel-gold',
      to: 'veefriends/social/caring-camel-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/caring-camel-hologram',
      to: 'veefriends/social/caring-camel-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/caring-camel-lava',
      to: 'veefriends/social/caring-camel-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charismatic-chameleon-bubblegum',
      to: 'veefriends/social/charismatic-chameleon-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charismatic-chameleon-core',
      to: 'veefriends/social/charismatic-chameleon-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charismatic-chameleon-diamond',
      to: 'veefriends/social/charismatic-chameleon-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charismatic-chameleon-emerald',
      to: 'veefriends/social/charismatic-chameleon-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charismatic-chameleon-epic',
      to: 'veefriends/social/charismatic-chameleon-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charismatic-chameleon-gold',
      to: 'veefriends/social/charismatic-chameleon-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charismatic-chameleon-hologram',
      to: 'veefriends/social/charismatic-chameleon-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charismatic-chameleon-lava',
      to: 'veefriends/social/charismatic-chameleon-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charming-cheetah-bubblegum',
      to: 'veefriends/social/charming-cheetah-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charming-cheetah-core',
      to: 'veefriends/social/charming-cheetah-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charming-cheetah-diamond',
      to: 'veefriends/social/charming-cheetah-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charming-cheetah-emerald',
      to: 'veefriends/social/charming-cheetah-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charming-cheetah-epic',
      to: 'veefriends/social/charming-cheetah-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charming-cheetah-gold',
      to: 'veefriends/social/charming-cheetah-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charming-cheetah-hologram',
      to: 'veefriends/social/charming-cheetah-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/charming-cheetah-lava',
      to: 'veefriends/social/charming-cheetah-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/cheerful-chipmunk-bubblegum',
      to: 'veefriends/social/cheerful-chipmunk-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/cheerful-chipmunk-core',
      to: 'veefriends/social/cheerful-chipmunk-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/cheerful-chipmunk-emerald',
      to: 'veefriends/social/cheerful-chipmunk-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/cheerful-chipmunk-epic',
      to: 'veefriends/social/cheerful-chipmunk-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/cheerful-chipmunk-gold',
      to: 'veefriends/social/cheerful-chipmunk-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/cheerful-chipmunk-hologram',
      to: 'veefriends/social/cheerful-chipmunk-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/chill-chinchilla-bubblegum',
      to: 'veefriends/social/chill-chinchilla-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/chill-chinchilla-core',
      to: 'veefriends/social/chill-chinchilla-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/chill-chinchilla-diamond',
      to: 'veefriends/social/chill-chinchilla-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/chill-chinchilla-emerald',
      to: 'veefriends/social/chill-chinchilla-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/chill-chinchilla-epic',
      to: 'veefriends/social/chill-chinchilla-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/chill-chinchilla-gold',
      to: 'veefriends/social/chill-chinchilla-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/chill-chinchilla-hologram',
      to: 'veefriends/social/chill-chinchilla-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/chill-chinchilla-lava',
      to: 'veefriends/social/chill-chinchilla-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/clever-crocodile-bubblegum',
      to: 'veefriends/social/clever-crocodile-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/clever-crocodile-core',
      to: 'veefriends/social/clever-crocodile-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/clever-crocodile-diamond',
      to: 'veefriends/social/clever-crocodile-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/clever-crocodile-emerald',
      to: 'veefriends/social/clever-crocodile-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/clever-crocodile-epic',
      to: 'veefriends/social/clever-crocodile-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/clever-crocodile-gold',
      to: 'veefriends/social/clever-crocodile-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/clever-crocodile-hologram',
      to: 'veefriends/social/clever-crocodile-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/clever-crocodile-lava',
      to: 'veefriends/social/clever-crocodile-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/compassionate-catfish-bubblegum',
      to: 'veefriends/social/compassionate-catfish-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/compassionate-catfish-core',
      to: 'veefriends/social/compassionate-catfish-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/compassionate-catfish-diamond',
      to: 'veefriends/social/compassionate-catfish-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/compassionate-catfish-emerald',
      to: 'veefriends/social/compassionate-catfish-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/compassionate-catfish-epic',
      to: 'veefriends/social/compassionate-catfish-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/compassionate-catfish-gold',
      to: 'veefriends/social/compassionate-catfish-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/compassionate-catfish-hologram',
      to: 'veefriends/social/compassionate-catfish-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/compassionate-catfish-lava',
      to: 'veefriends/social/compassionate-catfish-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/competitive-clown-core',
      to: 'veefriends/social/competitive-clown-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/competitive-clown-diamond',
      to: 'veefriends/social/competitive-clown-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/competitive-clown-emerald',
      to: 'veefriends/social/competitive-clown-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/competitive-clown-epic',
      to: 'veefriends/social/competitive-clown-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/competitive-clown-gold',
      to: 'veefriends/social/competitive-clown-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/competitive-clown-hologram',
      to: 'veefriends/social/competitive-clown-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/competitive-clown-lava',
      to: 'veefriends/social/competitive-clown-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/confident-cobra-bubblegum',
      to: 'veefriends/social/confident-cobra-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/confident-cobra-core',
      to: 'veefriends/social/confident-cobra-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/confident-cobra-diamond',
      to: 'veefriends/social/confident-cobra-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/confident-cobra-emerald',
      to: 'veefriends/social/confident-cobra-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/confident-cobra-epic',
      to: 'veefriends/social/confident-cobra-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/confident-cobra-gold',
      to: 'veefriends/social/confident-cobra-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/confident-cobra-hologram',
      to: 'veefriends/social/confident-cobra-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/confident-cobra-lava',
      to: 'veefriends/social/confident-cobra-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/considerate-cowboy-core',
      to: 'veefriends/social/considerate-cowboy-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/considerate-cowboy-emerald',
      to: 'veefriends/social/considerate-cowboy-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/considerate-cowboy-epic',
      to: 'veefriends/social/considerate-cowboy-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/considerate-cowboy-gold',
      to: 'veefriends/social/considerate-cowboy-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/considerate-cowboy-hologram',
      to: 'veefriends/social/considerate-cowboy-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/considerate-cowboy-lava',
      to: 'veefriends/social/considerate-cowboy-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/consistent-cougar-bubblegum',
      to: 'veefriends/social/consistent-cougar-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/consistent-cougar-core',
      to: 'veefriends/social/consistent-cougar-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/consistent-cougar-diamond',
      to: 'veefriends/social/consistent-cougar-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/consistent-cougar-emerald',
      to: 'veefriends/social/consistent-cougar-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/consistent-cougar-epic',
      to: 'veefriends/social/consistent-cougar-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/consistent-cougar-gold',
      to: 'veefriends/social/consistent-cougar-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/consistent-cougar-hologram',
      to: 'veefriends/social/consistent-cougar-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/consistent-cougar-lava',
      to: 'veefriends/social/consistent-cougar-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/content-condor-bubblegum',
      to: 'veefriends/social/content-condor-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/content-condor-core',
      to: 'veefriends/social/content-condor-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/content-condor-diamond',
      to: 'veefriends/social/content-condor-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/content-condor-emerald',
      to: 'veefriends/social/content-condor-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/content-condor-epic',
      to: 'veefriends/social/content-condor-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/content-condor-gold',
      to: 'veefriends/social/content-condor-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/content-condor-hologram',
      to: 'veefriends/social/content-condor-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/content-condor-lava',
      to: 'veefriends/social/content-condor-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/conviction-cockroach-bubblegum',
      to: 'veefriends/social/conviction-cockroach-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/conviction-cockroach-core',
      to: 'veefriends/social/conviction-cockroach-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/conviction-cockroach-diamond',
      to: 'veefriends/social/conviction-cockroach-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/conviction-cockroach-emerald',
      to: 'veefriends/social/conviction-cockroach-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/conviction-cockroach-epic',
      to: 'veefriends/social/conviction-cockroach-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/conviction-cockroach-gold',
      to: 'veefriends/social/conviction-cockroach-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/conviction-cockroach-hologram',
      to: 'veefriends/social/conviction-cockroach-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/conviction-cockroach-lava',
      to: 'veefriends/social/conviction-cockroach-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/courageous-cockatoo-bubblegum',
      to: 'veefriends/social/courageous-cockatoo-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/courageous-cockatoo-core',
      to: 'veefriends/social/courageous-cockatoo-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/courageous-cockatoo-diamond',
      to: 'veefriends/social/courageous-cockatoo-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/courageous-cockatoo-emerald',
      to: 'veefriends/social/courageous-cockatoo-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/courageous-cockatoo-epic',
      to: 'veefriends/social/courageous-cockatoo-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/courageous-cockatoo-gold',
      to: 'veefriends/social/courageous-cockatoo-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/courageous-cockatoo-hologram',
      to: 'veefriends/social/courageous-cockatoo-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/courageous-cockatoo-lava',
      to: 'veefriends/social/courageous-cockatoo-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/courteous-coyote-core',
      to: 'veefriends/social/courteous-coyote-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/courteous-coyote-diamond',
      to: 'veefriends/social/courteous-coyote-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/courteous-coyote-emerald',
      to: 'veefriends/social/courteous-coyote-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/courteous-coyote-epic',
      to: 'veefriends/social/courteous-coyote-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/courteous-coyote-hologram',
      to: 'veefriends/social/courteous-coyote-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/courteous-coyote-lava',
      to: 'veefriends/social/courteous-coyote-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/creative-crab-bubblegum',
      to: 'veefriends/social/creative-crab-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/creative-crab-core',
      to: 'veefriends/social/creative-crab-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/creative-crab-diamond',
      to: 'veefriends/social/creative-crab-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/creative-crab-emerald',
      to: 'veefriends/social/creative-crab-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/creative-crab-epic',
      to: 'veefriends/social/creative-crab-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/creative-crab-gold',
      to: 'veefriends/social/creative-crab-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/creative-crab-hologram',
      to: 'veefriends/social/creative-crab-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/creative-crab-lava',
      to: 'veefriends/social/creative-crab-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/curious-crane-bubblegum',
      to: 'veefriends/social/curious-crane-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/curious-crane-core',
      to: 'veefriends/social/curious-crane-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/curious-crane-diamond',
      to: 'veefriends/social/curious-crane-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/curious-crane-emerald',
      to: 'veefriends/social/curious-crane-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/curious-crane-epic',
      to: 'veefriends/social/curious-crane-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/curious-crane-hologram',
      to: 'veefriends/social/curious-crane-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/curious-crane-lava',
      to: 'veefriends/social/curious-crane-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/cynical-cat-bubblegum',
      to: 'veefriends/social/cynical-cat-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/cynical-cat-core',
      to: 'veefriends/social/cynical-cat-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/cynical-cat-diamond',
      to: 'veefriends/social/cynical-cat-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/cynical-cat-emerald',
      to: 'veefriends/social/cynical-cat-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/cynical-cat-epic',
      to: 'veefriends/social/cynical-cat-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/cynical-cat-gold',
      to: 'veefriends/social/cynical-cat-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/cynical-cat-hologram',
      to: 'veefriends/social/cynical-cat-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/cynical-cat-lava',
      to: 'veefriends/social/cynical-cat-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dapper-dachshund-bubblegum',
      to: 'veefriends/social/dapper-dachshund-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dapper-dachshund-core',
      to: 'veefriends/social/dapper-dachshund-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dapper-dachshund-diamond',
      to: 'veefriends/social/dapper-dachshund-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dapper-dachshund-emerald',
      to: 'veefriends/social/dapper-dachshund-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dapper-dachshund-epic',
      to: 'veefriends/social/dapper-dachshund-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dapper-dachshund-gold',
      to: 'veefriends/social/dapper-dachshund-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dapper-dachshund-hologram',
      to: 'veefriends/social/dapper-dachshund-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dapper-dachshund-lava',
      to: 'veefriends/social/dapper-dachshund-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/daring-dragonfly-bubblegum',
      to: 'veefriends/social/daring-dragonfly-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/daring-dragonfly-core',
      to: 'veefriends/social/daring-dragonfly-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/daring-dragonfly-diamond',
      to: 'veefriends/social/daring-dragonfly-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/daring-dragonfly-emerald',
      to: 'veefriends/social/daring-dragonfly-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/daring-dragonfly-epic',
      to: 'veefriends/social/daring-dragonfly-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/daring-dragonfly-gold',
      to: 'veefriends/social/daring-dragonfly-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/daring-dragonfly-hologram',
      to: 'veefriends/social/daring-dragonfly-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/decisive-duck-bubblegum',
      to: 'veefriends/social/decisive-duck-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/decisive-duck-core',
      to: 'veefriends/social/decisive-duck-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/decisive-duck-diamond',
      to: 'veefriends/social/decisive-duck-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/decisive-duck-emerald',
      to: 'veefriends/social/decisive-duck-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/decisive-duck-epic',
      to: 'veefriends/social/decisive-duck-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/decisive-duck-gold',
      to: 'veefriends/social/decisive-duck-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/decisive-duck-hologram',
      to: 'veefriends/social/decisive-duck-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/decisive-duck-lava',
      to: 'veefriends/social/decisive-duck-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dedicated-dragonfly-bubblegum',
      to: 'veefriends/social/dedicated-dragonfly-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dedicated-dragonfly-core',
      to: 'veefriends/social/dedicated-dragonfly-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dedicated-dragonfly-diamond',
      to: 'veefriends/social/dedicated-dragonfly-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dedicated-dragonfly-emerald',
      to: 'veefriends/social/dedicated-dragonfly-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dedicated-dragonfly-epic',
      to: 'veefriends/social/dedicated-dragonfly-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dedicated-dragonfly-hologram',
      to: 'veefriends/social/dedicated-dragonfly-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/detail-oriented-dumbo-octopus-bubblegum',
      to: 'veefriends/social/detail-oriented-dumbo-octopus-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/detail-oriented-dumbo-octopus-core',
      to: 'veefriends/social/detail-oriented-dumbo-octopus-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/detail-oriented-dumbo-octopus-diamond',
      to: 'veefriends/social/detail-oriented-dumbo-octopus-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/detail-oriented-dumbo-octopus-emerald',
      to: 'veefriends/social/detail-oriented-dumbo-octopus-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/detail-oriented-dumbo-octopus-epic',
      to: 'veefriends/social/detail-oriented-dumbo-octopus-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/detail-oriented-dumbo-octopus-gold',
      to: 'veefriends/social/detail-oriented-dumbo-octopus-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/detail-oriented-dumbo-octopus-hologram',
      to: 'veefriends/social/detail-oriented-dumbo-octopus-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/detail-oriented-dumbo-octopus-lava',
      to: 'veefriends/social/detail-oriented-dumbo-octopus-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/determined-dolphin-bubblegum',
      to: 'veefriends/social/determined-dolphin-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/determined-dolphin-core',
      to: 'veefriends/social/determined-dolphin-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/determined-dolphin-diamond',
      to: 'veefriends/social/determined-dolphin-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/determined-dolphin-emerald',
      to: 'veefriends/social/determined-dolphin-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/determined-dolphin-epic',
      to: 'veefriends/social/determined-dolphin-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/determined-dolphin-gold',
      to: 'veefriends/social/determined-dolphin-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/determined-dolphin-hologram',
      to: 'veefriends/social/determined-dolphin-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/determined-dolphin-lava',
      to: 'veefriends/social/determined-dolphin-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dialed-in-dog-bubblegum',
      to: 'veefriends/social/dialed-in-dog-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dialed-in-dog-core',
      to: 'veefriends/social/dialed-in-dog-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dialed-in-dog-diamond',
      to: 'veefriends/social/dialed-in-dog-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dialed-in-dog-emerald',
      to: 'veefriends/social/dialed-in-dog-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dialed-in-dog-epic',
      to: 'veefriends/social/dialed-in-dog-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dialed-in-dog-gold',
      to: 'veefriends/social/dialed-in-dog-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dialed-in-dog-hologram',
      to: 'veefriends/social/dialed-in-dog-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dialed-in-dog-lava',
      to: 'veefriends/social/dialed-in-dog-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/diamond-hands-hen-bubblegum',
      to: 'veefriends/social/diamond-hands-hen-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/diamond-hands-hen-core',
      to: 'veefriends/social/diamond-hands-hen-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dope-dodo-bubblegum',
      to: 'veefriends/social/dope-dodo-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dope-dodo-core',
      to: 'veefriends/social/dope-dodo-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dope-dodo-diamond',
      to: 'veefriends/social/dope-dodo-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dope-dodo-emerald',
      to: 'veefriends/social/dope-dodo-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dope-dodo-epic',
      to: 'veefriends/social/dope-dodo-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dope-dodo-hologram',
      to: 'veefriends/social/dope-dodo-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dope-dodo-lava',
      to: 'veefriends/social/dope-dodo-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/driven-dragon-bubblegum',
      to: 'veefriends/social/driven-dragon-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/driven-dragon-core',
      to: 'veefriends/social/driven-dragon-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/driven-dragon-diamond',
      to: 'veefriends/social/driven-dragon-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/driven-dragon-emerald',
      to: 'veefriends/social/driven-dragon-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/driven-dragon-epic',
      to: 'veefriends/social/driven-dragon-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/driven-dragon-gold',
      to: 'veefriends/social/driven-dragon-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/driven-dragon-hologram',
      to: 'veefriends/social/driven-dragon-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/driven-dragon-lava',
      to: 'veefriends/social/driven-dragon-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dynamic-dinosaur-bubblegum',
      to: 'veefriends/social/dynamic-dinosaur-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dynamic-dinosaur-core',
      to: 'veefriends/social/dynamic-dinosaur-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dynamic-dinosaur-diamond',
      to: 'veefriends/social/dynamic-dinosaur-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dynamic-dinosaur-emerald',
      to: 'veefriends/social/dynamic-dinosaur-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dynamic-dinosaur-epic',
      to: 'veefriends/social/dynamic-dinosaur-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dynamic-dinosaur-hologram',
      to: 'veefriends/social/dynamic-dinosaur-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/dynamic-dinosaur-lava',
      to: 'veefriends/social/dynamic-dinosaur-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/eager-eagle-bubblegum',
      to: 'veefriends/social/eager-eagle-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/eager-eagle-core',
      to: 'veefriends/social/eager-eagle-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/eager-eagle-diamond',
      to: 'veefriends/social/eager-eagle-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/eager-eagle-emerald',
      to: 'veefriends/social/eager-eagle-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/eager-eagle-epic',
      to: 'veefriends/social/eager-eagle-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/eager-eagle-gold',
      to: 'veefriends/social/eager-eagle-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/eager-eagle-hologram',
      to: 'veefriends/social/eager-eagle-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/eager-eagle-lava',
      to: 'veefriends/social/eager-eagle-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/earnest-ermine-bubblegum',
      to: 'veefriends/social/earnest-ermine-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/earnest-ermine-core',
      to: 'veefriends/social/earnest-ermine-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/earnest-ermine-diamond',
      to: 'veefriends/social/earnest-ermine-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/earnest-ermine-emerald',
      to: 'veefriends/social/earnest-ermine-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/earnest-ermine-epic',
      to: 'veefriends/social/earnest-ermine-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/earnest-ermine-gold',
      to: 'veefriends/social/earnest-ermine-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/earnest-ermine-hologram',
      to: 'veefriends/social/earnest-ermine-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/earnest-ermine-lava',
      to: 'veefriends/social/earnest-ermine-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/emerald-hands-hen-diamond',
      to: 'veefriends/social/emerald-hands-hen-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/empathy-elephant-bubblegum',
      to: 'veefriends/social/empathy-elephant-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/empathy-elephant-core',
      to: 'veefriends/social/empathy-elephant-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/empathy-elephant-diamond',
      to: 'veefriends/social/empathy-elephant-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/empathy-elephant-emerald',
      to: 'veefriends/social/empathy-elephant-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/empathy-elephant-epic',
      to: 'veefriends/social/empathy-elephant-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/empathy-elephant-gold',
      to: 'veefriends/social/empathy-elephant-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/empathy-elephant-hologram',
      to: 'veefriends/social/empathy-elephant-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/empathy-elephant-lava',
      to: 'veefriends/social/empathy-elephant-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/enamoured-emu-bubblegum',
      to: 'veefriends/social/enamoured-emu-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/enamoured-emu-core',
      to: 'veefriends/social/enamoured-emu-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/enamoured-emu-diamond',
      to: 'veefriends/social/enamoured-emu-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/enamoured-emu-emerald',
      to: 'veefriends/social/enamoured-emu-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/enamoured-emu-epic',
      to: 'veefriends/social/enamoured-emu-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/enamoured-emu-gold',
      to: 'veefriends/social/enamoured-emu-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/enamoured-emu-hologram',
      to: 'veefriends/social/enamoured-emu-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/enamoured-emu-lava',
      to: 'veefriends/social/enamoured-emu-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/energetic-electric-eel-bubblegum',
      to: 'veefriends/social/energetic-electric-eel-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/energetic-electric-eel-core',
      to: 'veefriends/social/energetic-electric-eel-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/energetic-electric-eel-diamond',
      to: 'veefriends/social/energetic-electric-eel-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/energetic-electric-eel-emerald',
      to: 'veefriends/social/energetic-electric-eel-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/energetic-electric-eel-epic',
      to: 'veefriends/social/energetic-electric-eel-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/energetic-electric-eel-hologram',
      to: 'veefriends/social/energetic-electric-eel-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/energetic-electric-eel-lava',
      to: 'veefriends/social/energetic-electric-eel-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/entrepreneur-elf-bubblegum',
      to: 'veefriends/social/entrepreneur-elf-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/entrepreneur-elf-core',
      to: 'veefriends/social/entrepreneur-elf-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/entrepreneur-elf-diamond',
      to: 'veefriends/social/entrepreneur-elf-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/entrepreneur-elf-emerald',
      to: 'veefriends/social/entrepreneur-elf-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/entrepreneur-elf-epic',
      to: 'veefriends/social/entrepreneur-elf-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/entrepreneur-elf-gold',
      to: 'veefriends/social/entrepreneur-elf-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/entrepreneur-elf-hologram',
      to: 'veefriends/social/entrepreneur-elf-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/entrepreneur-elf-lava',
      to: 'veefriends/social/entrepreneur-elf-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/epic-hands-hen-diamond',
      to: 'veefriends/social/epic-hands-hen-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/faithful-pheasant-bubblegum',
      to: 'veefriends/social/faithful-pheasant-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/faithful-pheasant-core',
      to: 'veefriends/social/faithful-pheasant-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/faithful-pheasant-diamond',
      to: 'veefriends/social/faithful-pheasant-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/faithful-pheasant-emerald',
      to: 'veefriends/social/faithful-pheasant-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/faithful-pheasant-epic',
      to: 'veefriends/social/faithful-pheasant-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/faithful-pheasant-gold',
      to: 'veefriends/social/faithful-pheasant-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/faithful-pheasant-hologram',
      to: 'veefriends/social/faithful-pheasant-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/faithful-pheasant-lava',
      to: 'veefriends/social/faithful-pheasant-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fearless-fairy-bubblegum',
      to: 'veefriends/social/fearless-fairy-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fearless-fairy-core',
      to: 'veefriends/social/fearless-fairy-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fearless-fairy-diamond',
      to: 'veefriends/social/fearless-fairy-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fearless-fairy-emerald',
      to: 'veefriends/social/fearless-fairy-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fearless-fairy-epic',
      to: 'veefriends/social/fearless-fairy-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fearless-fairy-gold',
      to: 'veefriends/social/fearless-fairy-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fearless-fairy-hologram',
      to: 'veefriends/social/fearless-fairy-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fearless-fairy-lava',
      to: 'veefriends/social/fearless-fairy-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/flexn-fox-bubblegum',
      to: 'veefriends/social/flexn-fox-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/flexn-fox-core',
      to: 'veefriends/social/flexn-fox-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/flexn-fox-diamond',
      to: 'veefriends/social/flexn-fox-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/flexn-fox-emerald',
      to: 'veefriends/social/flexn-fox-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/flexn-fox-epic',
      to: 'veefriends/social/flexn-fox-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/flexn-fox-gold',
      to: 'veefriends/social/flexn-fox-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/flexn-fox-hologram',
      to: 'veefriends/social/flexn-fox-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/flexn-fox-lava',
      to: 'veefriends/social/flexn-fox-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fly-firefly-bubblegum',
      to: 'veefriends/social/fly-firefly-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fly-firefly-core',
      to: 'veefriends/social/fly-firefly-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fly-firefly-diamond',
      to: 'veefriends/social/fly-firefly-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fly-firefly-emerald',
      to: 'veefriends/social/fly-firefly-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fly-firefly-epic',
      to: 'veefriends/social/fly-firefly-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fly-firefly-gold',
      to: 'veefriends/social/fly-firefly-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fly-firefly-hologram',
      to: 'veefriends/social/fly-firefly-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fly-firefly-lava',
      to: 'veefriends/social/fly-firefly-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/focused-falcon-bubblegum',
      to: 'veefriends/social/focused-falcon-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/focused-falcon-core',
      to: 'veefriends/social/focused-falcon-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/focused-falcon-diamond',
      to: 'veefriends/social/focused-falcon-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/focused-falcon-emerald',
      to: 'veefriends/social/focused-falcon-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/focused-falcon-epic',
      to: 'veefriends/social/focused-falcon-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/focused-falcon-gold',
      to: 'veefriends/social/focused-falcon-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/focused-falcon-hologram',
      to: 'veefriends/social/focused-falcon-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/focused-falcon-lava',
      to: 'veefriends/social/focused-falcon-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forever-phoenix-bubblegum',
      to: 'veefriends/social/forever-phoenix-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forever-phoenix-core',
      to: 'veefriends/social/forever-phoenix-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forever-phoenix-diamond',
      to: 'veefriends/social/forever-phoenix-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forever-phoenix-emerald',
      to: 'veefriends/social/forever-phoenix-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forever-phoenix-epic',
      to: 'veefriends/social/forever-phoenix-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forever-phoenix-hologram',
      to: 'veefriends/social/forever-phoenix-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forever-phoenix-lava',
      to: 'veefriends/social/forever-phoenix-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forgiving-horned-frog-bubblegum',
      to: 'veefriends/social/forgiving-horned-frog-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forgiving-horned-frog-core',
      to: 'veefriends/social/forgiving-horned-frog-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forgiving-horned-frog-diamond',
      to: 'veefriends/social/forgiving-horned-frog-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forgiving-horned-frog-emerald',
      to: 'veefriends/social/forgiving-horned-frog-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forgiving-horned-frog-epic',
      to: 'veefriends/social/forgiving-horned-frog-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forgiving-horned-frog-gold',
      to: 'veefriends/social/forgiving-horned-frog-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forgiving-horned-frog-hologram',
      to: 'veefriends/social/forgiving-horned-frog-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forgiving-horned-frog-lava',
      to: 'veefriends/social/forgiving-horned-frog-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forthright-flamingo-bubblegum',
      to: 'veefriends/social/forthright-flamingo-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forthright-flamingo-core',
      to: 'veefriends/social/forthright-flamingo-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forthright-flamingo-diamond',
      to: 'veefriends/social/forthright-flamingo-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forthright-flamingo-emerald',
      to: 'veefriends/social/forthright-flamingo-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forthright-flamingo-epic',
      to: 'veefriends/social/forthright-flamingo-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forthright-flamingo-gold',
      to: 'veefriends/social/forthright-flamingo-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forthright-flamingo-hologram',
      to: 'veefriends/social/forthright-flamingo-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/forthright-flamingo-lava',
      to: 'veefriends/social/forthright-flamingo-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fu-monday-mole-core',
      to: 'veefriends/social/fu-monday-mole-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fu-monday-mole-diamond',
      to: 'veefriends/social/fu-monday-mole-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fu-monday-mole-emerald',
      to: 'veefriends/social/fu-monday-mole-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fu-monday-mole-epic',
      to: 'veefriends/social/fu-monday-mole-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fu-monday-mole-gold',
      to: 'veefriends/social/fu-monday-mole-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fu-monday-mole-hologram',
      to: 'veefriends/social/fu-monday-mole-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/fu-monday-mole-lava',
      to: 'veefriends/social/fu-monday-mole-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gary-bee-bubblegum',
      to: 'veefriends/social/gary-bee-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gary-bee-core',
      to: 'veefriends/social/gary-bee-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gary-bee-diamond',
      to: 'veefriends/social/gary-bee-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gary-bee-emerald',
      to: 'veefriends/social/gary-bee-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gary-bee-epic',
      to: 'veefriends/social/gary-bee-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gary-bee-gold',
      to: 'veefriends/social/gary-bee-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gary-bee-hologram',
      to: 'veefriends/social/gary-bee-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gary-bee-lava',
      to: 'veefriends/social/gary-bee-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/generous-gerbil-bubblegum',
      to: 'veefriends/social/generous-gerbil-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/generous-gerbil-core',
      to: 'veefriends/social/generous-gerbil-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/generous-gerbil-emerald',
      to: 'veefriends/social/generous-gerbil-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/generous-gerbil-epic',
      to: 'veefriends/social/generous-gerbil-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/generous-gerbil-gold',
      to: 'veefriends/social/generous-gerbil-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/generous-gerbil-hologram',
      to: 'veefriends/social/generous-gerbil-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/generous-gerbil-lava',
      to: 'veefriends/social/generous-gerbil-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gentle-giant-bubblegum',
      to: 'veefriends/social/gentle-giant-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gentle-giant-core',
      to: 'veefriends/social/gentle-giant-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gentle-giant-diamond',
      to: 'veefriends/social/gentle-giant-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gentle-giant-emerald',
      to: 'veefriends/social/gentle-giant-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gentle-giant-epic',
      to: 'veefriends/social/gentle-giant-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gentle-giant-gold',
      to: 'veefriends/social/gentle-giant-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gentle-giant-hologram',
      to: 'veefriends/social/gentle-giant-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gentle-giant-lava',
      to: 'veefriends/social/gentle-giant-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/genuine-giraffe-bubblegum',
      to: 'veefriends/social/genuine-giraffe-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/genuine-giraffe-core',
      to: 'veefriends/social/genuine-giraffe-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/genuine-giraffe-diamond',
      to: 'veefriends/social/genuine-giraffe-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/genuine-giraffe-emerald',
      to: 'veefriends/social/genuine-giraffe-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/genuine-giraffe-epic',
      to: 'veefriends/social/genuine-giraffe-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/genuine-giraffe-gold',
      to: 'veefriends/social/genuine-giraffe-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/genuine-giraffe-hologram',
      to: 'veefriends/social/genuine-giraffe-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/genuine-giraffe-lava',
      to: 'veefriends/social/genuine-giraffe-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gifted-gopher-bubblegum',
      to: 'veefriends/social/gifted-gopher-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gifted-gopher-core',
      to: 'veefriends/social/gifted-gopher-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gifted-gopher-diamond',
      to: 'veefriends/social/gifted-gopher-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gifted-gopher-emerald',
      to: 'veefriends/social/gifted-gopher-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gifted-gopher-epic',
      to: 'veefriends/social/gifted-gopher-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gifted-gopher-gold',
      to: 'veefriends/social/gifted-gopher-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gifted-gopher-hologram',
      to: 'veefriends/social/gifted-gopher-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gifted-gopher-lava',
      to: 'veefriends/social/gifted-gopher-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/giftgoat-gift-goat-unknown',
      to: 'veefriends/social/giftgoat-gift-goat-unknown',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gleeful-sugar-glider-bubblegum',
      to: 'veefriends/social/gleeful-sugar-glider-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gleeful-sugar-glider-core',
      to: 'veefriends/social/gleeful-sugar-glider-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gleeful-sugar-glider-diamond',
      to: 'veefriends/social/gleeful-sugar-glider-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gleeful-sugar-glider-emerald',
      to: 'veefriends/social/gleeful-sugar-glider-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gleeful-sugar-glider-epic',
      to: 'veefriends/social/gleeful-sugar-glider-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gleeful-sugar-glider-gold',
      to: 'veefriends/social/gleeful-sugar-glider-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gleeful-sugar-glider-hologram',
      to: 'veefriends/social/gleeful-sugar-glider-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gleeful-sugar-glider-lava',
      to: 'veefriends/social/gleeful-sugar-glider-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/glowing-glow-worm-bubblegum',
      to: 'veefriends/social/glowing-glow-worm-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/glowing-glow-worm-diamond',
      to: 'veefriends/social/glowing-glow-worm-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/glowing-glow-worm-emerald',
      to: 'veefriends/social/glowing-glow-worm-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/glowing-glow-worm-epic',
      to: 'veefriends/social/glowing-glow-worm-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/glowing-glow-worm-gold',
      to: 'veefriends/social/glowing-glow-worm-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/glowing-glow-worm-hologram',
      to: 'veefriends/social/glowing-glow-worm-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/glowing-glow-worm-lava',
      to: 'veefriends/social/glowing-glow-worm-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gold-hands-hen-diamond',
      to: 'veefriends/social/gold-hands-hen-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/graceful-goldfish-bubblegum',
      to: 'veefriends/social/graceful-goldfish-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/graceful-goldfish-core',
      to: 'veefriends/social/graceful-goldfish-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/graceful-goldfish-diamond',
      to: 'veefriends/social/graceful-goldfish-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/graceful-goldfish-emerald',
      to: 'veefriends/social/graceful-goldfish-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/graceful-goldfish-epic',
      to: 'veefriends/social/graceful-goldfish-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/graceful-goldfish-gold',
      to: 'veefriends/social/graceful-goldfish-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/graceful-goldfish-hologram',
      to: 'veefriends/social/graceful-goldfish-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/graceful-goldfish-lava',
      to: 'veefriends/social/graceful-goldfish-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-goose-bubblegum',
      to: 'veefriends/social/gracious-goose-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-goose-core',
      to: 'veefriends/social/gracious-goose-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-goose-diamond',
      to: 'veefriends/social/gracious-goose-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-goose-emerald',
      to: 'veefriends/social/gracious-goose-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-goose-epic',
      to: 'veefriends/social/gracious-goose-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-goose-gold',
      to: 'veefriends/social/gracious-goose-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-goose-hologram',
      to: 'veefriends/social/gracious-goose-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grasshopper-bubblegum',
      to: 'veefriends/social/gracious-grasshopper-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grasshopper-core',
      to: 'veefriends/social/gracious-grasshopper-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grasshopper-diamond',
      to: 'veefriends/social/gracious-grasshopper-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grasshopper-emerald',
      to: 'veefriends/social/gracious-grasshopper-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grasshopper-epic',
      to: 'veefriends/social/gracious-grasshopper-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grasshopper-gold',
      to: 'veefriends/social/gracious-grasshopper-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grasshopper-hologram',
      to: 'veefriends/social/gracious-grasshopper-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grasshopper-lava',
      to: 'veefriends/social/gracious-grasshopper-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grizzly-bear-bubblegum',
      to: 'veefriends/social/gracious-grizzly-bear-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grizzly-bear-core',
      to: 'veefriends/social/gracious-grizzly-bear-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grizzly-bear-diamond',
      to: 'veefriends/social/gracious-grizzly-bear-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grizzly-bear-emerald',
      to: 'veefriends/social/gracious-grizzly-bear-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grizzly-bear-epic',
      to: 'veefriends/social/gracious-grizzly-bear-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grizzly-bear-gold',
      to: 'veefriends/social/gracious-grizzly-bear-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grizzly-bear-hologram',
      to: 'veefriends/social/gracious-grizzly-bear-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gracious-grizzly-bear-lava',
      to: 'veefriends/social/gracious-grizzly-bear-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/grateful-gar-bubblegum',
      to: 'veefriends/social/grateful-gar-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/grateful-gar-core',
      to: 'veefriends/social/grateful-gar-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/grateful-gar-diamond',
      to: 'veefriends/social/grateful-gar-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/grateful-gar-emerald',
      to: 'veefriends/social/grateful-gar-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/grateful-gar-epic',
      to: 'veefriends/social/grateful-gar-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/grateful-gar-gold',
      to: 'veefriends/social/grateful-gar-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/grateful-gar-hologram',
      to: 'veefriends/social/grateful-gar-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/grateful-gar-lava',
      to: 'veefriends/social/grateful-gar-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gratitude-gorilla-bubblegum',
      to: 'veefriends/social/gratitude-gorilla-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gratitude-gorilla-core',
      to: 'veefriends/social/gratitude-gorilla-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gratitude-gorilla-diamond',
      to: 'veefriends/social/gratitude-gorilla-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gratitude-gorilla-emerald',
      to: 'veefriends/social/gratitude-gorilla-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gratitude-gorilla-epic',
      to: 'veefriends/social/gratitude-gorilla-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gratitude-gorilla-gold',
      to: 'veefriends/social/gratitude-gorilla-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gratitude-gorilla-hologram',
      to: 'veefriends/social/gratitude-gorilla-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gratitude-gorilla-lava',
      to: 'veefriends/social/gratitude-gorilla-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gritty-ghost-bubblegum',
      to: 'veefriends/social/gritty-ghost-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gritty-ghost-core',
      to: 'veefriends/social/gritty-ghost-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gritty-ghost-diamond',
      to: 'veefriends/social/gritty-ghost-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gritty-ghost-emerald',
      to: 'veefriends/social/gritty-ghost-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gritty-ghost-epic',
      to: 'veefriends/social/gritty-ghost-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gritty-ghost-gold',
      to: 'veefriends/social/gritty-ghost-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gritty-ghost-hologram',
      to: 'veefriends/social/gritty-ghost-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gutsy-gecko-bubblegum',
      to: 'veefriends/social/gutsy-gecko-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gutsy-gecko-core',
      to: 'veefriends/social/gutsy-gecko-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gutsy-gecko-diamond',
      to: 'veefriends/social/gutsy-gecko-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gutsy-gecko-emerald',
      to: 'veefriends/social/gutsy-gecko-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gutsy-gecko-epic',
      to: 'veefriends/social/gutsy-gecko-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gutsy-gecko-gold',
      to: 'veefriends/social/gutsy-gecko-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gutsy-gecko-hologram',
      to: 'veefriends/social/gutsy-gecko-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/gutsy-gecko-lava',
      to: 'veefriends/social/gutsy-gecko-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hands-hen-diamond',
      to: 'veefriends/social/hands-hen-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/happy-hermit-crab-bubblegum',
      to: 'veefriends/social/happy-hermit-crab-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/happy-hermit-crab-core',
      to: 'veefriends/social/happy-hermit-crab-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/happy-hermit-crab-diamond',
      to: 'veefriends/social/happy-hermit-crab-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/happy-hermit-crab-emerald',
      to: 'veefriends/social/happy-hermit-crab-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/happy-hermit-crab-epic',
      to: 'veefriends/social/happy-hermit-crab-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/happy-hermit-crab-gold',
      to: 'veefriends/social/happy-hermit-crab-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/happy-hermit-crab-hologram',
      to: 'veefriends/social/happy-hermit-crab-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/happy-hermit-crab-lava',
      to: 'veefriends/social/happy-hermit-crab-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hard-working-wombat-bubblegum',
      to: 'veefriends/social/hard-working-wombat-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hard-working-wombat-core',
      to: 'veefriends/social/hard-working-wombat-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hard-working-wombat-diamond',
      to: 'veefriends/social/hard-working-wombat-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hard-working-wombat-emerald',
      to: 'veefriends/social/hard-working-wombat-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hard-working-wombat-epic',
      to: 'veefriends/social/hard-working-wombat-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hard-working-wombat-gold',
      to: 'veefriends/social/hard-working-wombat-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hard-working-wombat-hologram',
      to: 'veefriends/social/hard-working-wombat-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hard-working-wombat-lava',
      to: 'veefriends/social/hard-working-wombat-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/headstrong-honey-badger-bubblegum',
      to: 'veefriends/social/headstrong-honey-badger-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/headstrong-honey-badger-core',
      to: 'veefriends/social/headstrong-honey-badger-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/headstrong-honey-badger-diamond',
      to: 'veefriends/social/headstrong-honey-badger-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/headstrong-honey-badger-emerald',
      to: 'veefriends/social/headstrong-honey-badger-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/headstrong-honey-badger-epic',
      to: 'veefriends/social/headstrong-honey-badger-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/headstrong-honey-badger-gold',
      to: 'veefriends/social/headstrong-honey-badger-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/headstrong-honey-badger-hologram',
      to: 'veefriends/social/headstrong-honey-badger-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/headstrong-honey-badger-lava',
      to: 'veefriends/social/headstrong-honey-badger-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/heart-trooper-bubblegum',
      to: 'veefriends/social/heart-trooper-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/heart-trooper-core',
      to: 'veefriends/social/heart-trooper-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/heart-trooper-emerald',
      to: 'veefriends/social/heart-trooper-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/heart-trooper-epic',
      to: 'veefriends/social/heart-trooper-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/heart-trooper-gold',
      to: 'veefriends/social/heart-trooper-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/heart-trooper-hologram',
      to: 'veefriends/social/heart-trooper-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/heart-trooper-lava',
      to: 'veefriends/social/heart-trooper-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/helpful-hippo-bubblegum',
      to: 'veefriends/social/helpful-hippo-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/helpful-hippo-core',
      to: 'veefriends/social/helpful-hippo-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/helpful-hippo-diamond',
      to: 'veefriends/social/helpful-hippo-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/helpful-hippo-emerald',
      to: 'veefriends/social/helpful-hippo-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/helpful-hippo-epic',
      to: 'veefriends/social/helpful-hippo-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/helpful-hippo-gold',
      to: 'veefriends/social/helpful-hippo-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/helpful-hippo-hologram',
      to: 'veefriends/social/helpful-hippo-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/helpful-hippo-lava',
      to: 'veefriends/social/helpful-hippo-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hodl-hyena-bubblegum',
      to: 'veefriends/social/hodl-hyena-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hodl-hyena-core',
      to: 'veefriends/social/hodl-hyena-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hodl-hyena-emerald',
      to: 'veefriends/social/hodl-hyena-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hodl-hyena-epic',
      to: 'veefriends/social/hodl-hyena-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hodl-hyena-hologram',
      to: 'veefriends/social/hodl-hyena-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hodl-hyena-lava',
      to: 'veefriends/social/hodl-hyena-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hologram-hands-hen-diamond',
      to: 'veefriends/social/hologram-hands-hen-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honest-honey-bee-bubblegum',
      to: 'veefriends/social/honest-honey-bee-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honest-honey-bee-core',
      to: 'veefriends/social/honest-honey-bee-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honest-honey-bee-diamond',
      to: 'veefriends/social/honest-honey-bee-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honest-honey-bee-emerald',
      to: 'veefriends/social/honest-honey-bee-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honest-honey-bee-epic',
      to: 'veefriends/social/honest-honey-bee-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honest-honey-bee-gold',
      to: 'veefriends/social/honest-honey-bee-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honest-honey-bee-hologram',
      to: 'veefriends/social/honest-honey-bee-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honest-honey-bee-lava',
      to: 'veefriends/social/honest-honey-bee-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honorable-olm-bubblegum',
      to: 'veefriends/social/honorable-olm-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honorable-olm-core',
      to: 'veefriends/social/honorable-olm-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honorable-olm-diamond',
      to: 'veefriends/social/honorable-olm-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honorable-olm-emerald',
      to: 'veefriends/social/honorable-olm-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honorable-olm-epic',
      to: 'veefriends/social/honorable-olm-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honorable-olm-gold',
      to: 'veefriends/social/honorable-olm-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honorable-olm-hologram',
      to: 'veefriends/social/honorable-olm-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/honorable-olm-lava',
      to: 'veefriends/social/honorable-olm-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hot-sht-hornet-bubblegum',
      to: 'veefriends/social/hot-sht-hornet-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hot-sht-hornet-core',
      to: 'veefriends/social/hot-sht-hornet-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hot-sht-hornet-diamond',
      to: 'veefriends/social/hot-sht-hornet-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hot-sht-hornet-emerald',
      to: 'veefriends/social/hot-sht-hornet-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hot-sht-hornet-epic',
      to: 'veefriends/social/hot-sht-hornet-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hot-sht-hornet-hologram',
      to: 'veefriends/social/hot-sht-hornet-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hot-sht-hornet-lava',
      to: 'veefriends/social/hot-sht-hornet-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/humble-hedgehog-bubblegum',
      to: 'veefriends/social/humble-hedgehog-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/humble-hedgehog-core',
      to: 'veefriends/social/humble-hedgehog-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/humble-hedgehog-diamond',
      to: 'veefriends/social/humble-hedgehog-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/humble-hedgehog-emerald',
      to: 'veefriends/social/humble-hedgehog-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/humble-hedgehog-epic',
      to: 'veefriends/social/humble-hedgehog-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/humble-hedgehog-gold',
      to: 'veefriends/social/humble-hedgehog-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/humble-hedgehog-hologram',
      to: 'veefriends/social/humble-hedgehog-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/humble-hedgehog-lava',
      to: 'veefriends/social/humble-hedgehog-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/humble-hummingbird-core',
      to: 'veefriends/social/humble-hummingbird-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/humble-hummingbird-diamond',
      to: 'veefriends/social/humble-hummingbird-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/humble-hummingbird-emerald',
      to: 'veefriends/social/humble-hummingbird-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/humble-hummingbird-epic',
      to: 'veefriends/social/humble-hummingbird-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/humble-hummingbird-hologram',
      to: 'veefriends/social/humble-hummingbird-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/humble-hummingbird-lava',
      to: 'veefriends/social/humble-hummingbird-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hungry-hammerhead-bubblegum',
      to: 'veefriends/social/hungry-hammerhead-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hungry-hammerhead-core',
      to: 'veefriends/social/hungry-hammerhead-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hungry-hammerhead-diamond',
      to: 'veefriends/social/hungry-hammerhead-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hungry-hammerhead-emerald',
      to: 'veefriends/social/hungry-hammerhead-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hungry-hammerhead-epic',
      to: 'veefriends/social/hungry-hammerhead-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hungry-hammerhead-gold',
      to: 'veefriends/social/hungry-hammerhead-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hungry-hammerhead-hologram',
      to: 'veefriends/social/hungry-hammerhead-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hungry-hammerhead-lava',
      to: 'veefriends/social/hungry-hammerhead-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hustling-hamster-bubblegum',
      to: 'veefriends/social/hustling-hamster-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hustling-hamster-core',
      to: 'veefriends/social/hustling-hamster-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hustling-hamster-diamond',
      to: 'veefriends/social/hustling-hamster-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hustling-hamster-emerald',
      to: 'veefriends/social/hustling-hamster-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hustling-hamster-epic',
      to: 'veefriends/social/hustling-hamster-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hustling-hamster-hologram',
      to: 'veefriends/social/hustling-hamster-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hustling-hamster-lava',
      to: 'veefriends/social/hustling-hamster-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hype-horse-bubblegum',
      to: 'veefriends/social/hype-horse-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hype-horse-core',
      to: 'veefriends/social/hype-horse-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hype-horse-diamond',
      to: 'veefriends/social/hype-horse-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hype-horse-emerald',
      to: 'veefriends/social/hype-horse-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hype-horse-epic',
      to: 'veefriends/social/hype-horse-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hype-horse-gold',
      to: 'veefriends/social/hype-horse-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hype-horse-hologram',
      to: 'veefriends/social/hype-horse-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/hype-horse-lava',
      to: 'veefriends/social/hype-horse-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/impeccable-inostranet-bubblegum',
      to: 'veefriends/social/impeccable-inostranet-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/impeccable-inostranet-core',
      to: 'veefriends/social/impeccable-inostranet-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/impeccable-inostranet-diamond',
      to: 'veefriends/social/impeccable-inostranet-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/impeccable-inostranet-emerald',
      to: 'veefriends/social/impeccable-inostranet-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/impeccable-inostranet-epic',
      to: 'veefriends/social/impeccable-inostranet-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/impeccable-inostranet-gold',
      to: 'veefriends/social/impeccable-inostranet-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/impeccable-inostranet-hologram',
      to: 'veefriends/social/impeccable-inostranet-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/impeccable-inostranet-lava',
      to: 'veefriends/social/impeccable-inostranet-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/independent-inch-worm-bubblegum',
      to: 'veefriends/social/independent-inch-worm-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/independent-inch-worm-core',
      to: 'veefriends/social/independent-inch-worm-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/independent-inch-worm-diamond',
      to: 'veefriends/social/independent-inch-worm-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/independent-inch-worm-emerald',
      to: 'veefriends/social/independent-inch-worm-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/independent-inch-worm-epic',
      to: 'veefriends/social/independent-inch-worm-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/independent-inch-worm-hologram',
      to: 'veefriends/social/independent-inch-worm-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/innovative-impala-bubblegum',
      to: 'veefriends/social/innovative-impala-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/innovative-impala-core',
      to: 'veefriends/social/innovative-impala-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/innovative-impala-diamond',
      to: 'veefriends/social/innovative-impala-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/innovative-impala-emerald',
      to: 'veefriends/social/innovative-impala-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/innovative-impala-epic',
      to: 'veefriends/social/innovative-impala-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/innovative-impala-gold',
      to: 'veefriends/social/innovative-impala-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/innovative-impala-hologram',
      to: 'veefriends/social/innovative-impala-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/innovative-impala-lava',
      to: 'veefriends/social/innovative-impala-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/insightful-irish-terrier-bubblegum',
      to: 'veefriends/social/insightful-irish-terrier-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/insightful-irish-terrier-core',
      to: 'veefriends/social/insightful-irish-terrier-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/insightful-irish-terrier-diamond',
      to: 'veefriends/social/insightful-irish-terrier-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/insightful-irish-terrier-emerald',
      to: 'veefriends/social/insightful-irish-terrier-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/insightful-irish-terrier-epic',
      to: 'veefriends/social/insightful-irish-terrier-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/insightful-irish-terrier-lava',
      to: 'veefriends/social/insightful-irish-terrier-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/intuitive-iguana-bubblegum',
      to: 'veefriends/social/intuitive-iguana-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/intuitive-iguana-core',
      to: 'veefriends/social/intuitive-iguana-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/intuitive-iguana-diamond',
      to: 'veefriends/social/intuitive-iguana-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/intuitive-iguana-emerald',
      to: 'veefriends/social/intuitive-iguana-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/intuitive-iguana-epic',
      to: 'veefriends/social/intuitive-iguana-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/intuitive-iguana-gold',
      to: 'veefriends/social/intuitive-iguana-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/intuitive-iguana-hologram',
      to: 'veefriends/social/intuitive-iguana-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/intuitive-iguana-lava',
      to: 'veefriends/social/intuitive-iguana-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/jolly-jack-o-bubblegum',
      to: 'veefriends/social/jolly-jack-o-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/jolly-jack-o-core',
      to: 'veefriends/social/jolly-jack-o-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/jolly-jack-o-diamond',
      to: 'veefriends/social/jolly-jack-o-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/jolly-jack-o-emerald',
      to: 'veefriends/social/jolly-jack-o-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/jolly-jack-o-epic',
      to: 'veefriends/social/jolly-jack-o-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/jolly-jack-o-gold',
      to: 'veefriends/social/jolly-jack-o-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/jolly-jack-o-hologram',
      to: 'veefriends/social/jolly-jack-o-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/jolly-jack-o-lava',
      to: 'veefriends/social/jolly-jack-o-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/joyous-jellyfish-bubblegum',
      to: 'veefriends/social/joyous-jellyfish-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/joyous-jellyfish-core',
      to: 'veefriends/social/joyous-jellyfish-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/joyous-jellyfish-diamond',
      to: 'veefriends/social/joyous-jellyfish-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/joyous-jellyfish-emerald',
      to: 'veefriends/social/joyous-jellyfish-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/joyous-jellyfish-epic',
      to: 'veefriends/social/joyous-jellyfish-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/joyous-jellyfish-gold',
      to: 'veefriends/social/joyous-jellyfish-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/joyous-jellyfish-hologram',
      to: 'veefriends/social/joyous-jellyfish-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/juicy-jaguar-bubblegum',
      to: 'veefriends/social/juicy-jaguar-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/juicy-jaguar-core',
      to: 'veefriends/social/juicy-jaguar-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/juicy-jaguar-diamond',
      to: 'veefriends/social/juicy-jaguar-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/juicy-jaguar-emerald',
      to: 'veefriends/social/juicy-jaguar-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/juicy-jaguar-epic',
      to: 'veefriends/social/juicy-jaguar-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/juicy-jaguar-gold',
      to: 'veefriends/social/juicy-jaguar-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/juicy-jaguar-hologram',
      to: 'veefriends/social/juicy-jaguar-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/juicy-jaguar-lava',
      to: 'veefriends/social/juicy-jaguar-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/just-jackal-bubblegum',
      to: 'veefriends/social/just-jackal-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/just-jackal-core',
      to: 'veefriends/social/just-jackal-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/just-jackal-diamond',
      to: 'veefriends/social/just-jackal-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/just-jackal-emerald',
      to: 'veefriends/social/just-jackal-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/just-jackal-epic',
      to: 'veefriends/social/just-jackal-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/just-jackal-hologram',
      to: 'veefriends/social/just-jackal-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/just-jackal-lava',
      to: 'veefriends/social/just-jackal-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/karma-kiwi-bubblegum',
      to: 'veefriends/social/karma-kiwi-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/karma-kiwi-core',
      to: 'veefriends/social/karma-kiwi-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/karma-kiwi-diamond',
      to: 'veefriends/social/karma-kiwi-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/karma-kiwi-emerald',
      to: 'veefriends/social/karma-kiwi-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/karma-kiwi-epic',
      to: 'veefriends/social/karma-kiwi-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/karma-kiwi-gold',
      to: 'veefriends/social/karma-kiwi-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/karma-kiwi-hologram',
      to: 'veefriends/social/karma-kiwi-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/karma-kiwi-lava',
      to: 'veefriends/social/karma-kiwi-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/keen-kingfisher-bubblegum',
      to: 'veefriends/social/keen-kingfisher-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/keen-kingfisher-core',
      to: 'veefriends/social/keen-kingfisher-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/keen-kingfisher-diamond',
      to: 'veefriends/social/keen-kingfisher-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/keen-kingfisher-emerald',
      to: 'veefriends/social/keen-kingfisher-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/keen-kingfisher-epic',
      to: 'veefriends/social/keen-kingfisher-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/keen-kingfisher-hologram',
      to: 'veefriends/social/keen-kingfisher-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/keen-kingfisher-lava',
      to: 'veefriends/social/keen-kingfisher-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-kudu-bubblegum',
      to: 'veefriends/social/kind-kudu-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-kudu-core',
      to: 'veefriends/social/kind-kudu-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-kudu-diamond',
      to: 'veefriends/social/kind-kudu-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-kudu-emerald',
      to: 'veefriends/social/kind-kudu-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-kudu-epic',
      to: 'veefriends/social/kind-kudu-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-kudu-gold',
      to: 'veefriends/social/kind-kudu-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-kudu-hologram',
      to: 'veefriends/social/kind-kudu-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-kudu-lava',
      to: 'veefriends/social/kind-kudu-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-warrior-bubblegum',
      to: 'veefriends/social/kind-warrior-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-warrior-core',
      to: 'veefriends/social/kind-warrior-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-warrior-diamond',
      to: 'veefriends/social/kind-warrior-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-warrior-emerald',
      to: 'veefriends/social/kind-warrior-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-warrior-epic',
      to: 'veefriends/social/kind-warrior-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-warrior-gold',
      to: 'veefriends/social/kind-warrior-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-warrior-hologram',
      to: 'veefriends/social/kind-warrior-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kind-warrior-lava',
      to: 'veefriends/social/kind-warrior-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kindred-kangaroo-core',
      to: 'veefriends/social/kindred-kangaroo-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kindred-kangaroo-diamond',
      to: 'veefriends/social/kindred-kangaroo-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kindred-kangaroo-emerald',
      to: 'veefriends/social/kindred-kangaroo-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kindred-kangaroo-epic',
      to: 'veefriends/social/kindred-kangaroo-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kindred-kangaroo-hologram',
      to: 'veefriends/social/kindred-kangaroo-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/kindred-kangaroo-lava',
      to: 'veefriends/social/kindred-kangaroo-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/knowing-gnome-bubblegum',
      to: 'veefriends/social/knowing-gnome-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/knowing-gnome-core',
      to: 'veefriends/social/knowing-gnome-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/knowing-gnome-diamond',
      to: 'veefriends/social/knowing-gnome-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/knowing-gnome-emerald',
      to: 'veefriends/social/knowing-gnome-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/knowing-gnome-epic',
      to: 'veefriends/social/knowing-gnome-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/knowing-gnome-gold',
      to: 'veefriends/social/knowing-gnome-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/knowing-gnome-hologram',
      to: 'veefriends/social/knowing-gnome-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/knowing-gnome-lava',
      to: 'veefriends/social/knowing-gnome-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/last-glass-standing-bubblegum',
      to: 'veefriends/social/last-glass-standing-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/last-glass-standing-core',
      to: 'veefriends/social/last-glass-standing-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/last-glass-standing-diamond',
      to: 'veefriends/social/last-glass-standing-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/last-glass-standing-emerald',
      to: 'veefriends/social/last-glass-standing-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/last-glass-standing-epic',
      to: 'veefriends/social/last-glass-standing-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/last-glass-standing-hologram',
      to: 'veefriends/social/last-glass-standing-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/last-glass-standing-lava',
      to: 'veefriends/social/last-glass-standing-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/lava-hands-hen-diamond',
      to: 'veefriends/social/lava-hands-hen-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/legit-llama-bubblegum',
      to: 'veefriends/social/legit-llama-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/legit-llama-core',
      to: 'veefriends/social/legit-llama-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/legit-llama-diamond',
      to: 'veefriends/social/legit-llama-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/legit-llama-emerald',
      to: 'veefriends/social/legit-llama-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/legit-llama-epic',
      to: 'veefriends/social/legit-llama-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/legit-llama-gold',
      to: 'veefriends/social/legit-llama-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/legit-llama-hologram',
      to: 'veefriends/social/legit-llama-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/legit-llama-lava',
      to: 'veefriends/social/legit-llama-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/level-headed-lizard-bubblegum',
      to: 'veefriends/social/level-headed-lizard-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/level-headed-lizard-core',
      to: 'veefriends/social/level-headed-lizard-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/level-headed-lizard-diamond',
      to: 'veefriends/social/level-headed-lizard-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/level-headed-lizard-emerald',
      to: 'veefriends/social/level-headed-lizard-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/level-headed-lizard-epic',
      to: 'veefriends/social/level-headed-lizard-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/level-headed-lizard-gold',
      to: 'veefriends/social/level-headed-lizard-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/level-headed-lizard-hologram',
      to: 'veefriends/social/level-headed-lizard-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/level-headed-lizard-lava',
      to: 'veefriends/social/level-headed-lizard-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/likable-leopard-bubblegum',
      to: 'veefriends/social/likable-leopard-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/likable-leopard-core',
      to: 'veefriends/social/likable-leopard-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/likable-leopard-diamond',
      to: 'veefriends/social/likable-leopard-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/likable-leopard-emerald',
      to: 'veefriends/social/likable-leopard-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/likable-leopard-epic',
      to: 'veefriends/social/likable-leopard-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/likable-leopard-gold',
      to: 'veefriends/social/likable-leopard-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/likable-leopard-hologram',
      to: 'veefriends/social/likable-leopard-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/likable-leopard-lava',
      to: 'veefriends/social/likable-leopard-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/like-a-sponge-bubblegum',
      to: 'veefriends/social/like-a-sponge-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/like-a-sponge-core',
      to: 'veefriends/social/like-a-sponge-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/like-a-sponge-diamond',
      to: 'veefriends/social/like-a-sponge-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/like-a-sponge-emerald',
      to: 'veefriends/social/like-a-sponge-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/like-a-sponge-epic',
      to: 'veefriends/social/like-a-sponge-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/like-a-sponge-hologram',
      to: 'veefriends/social/like-a-sponge-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/like-a-sponge-lava',
      to: 'veefriends/social/like-a-sponge-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/lit-lamb-bubblegum',
      to: 'veefriends/social/lit-lamb-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/lit-lamb-core',
      to: 'veefriends/social/lit-lamb-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/lit-lamb-diamond',
      to: 'veefriends/social/lit-lamb-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/lit-lamb-emerald',
      to: 'veefriends/social/lit-lamb-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/lit-lamb-epic',
      to: 'veefriends/social/lit-lamb-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/lit-lamb-gold',
      to: 'veefriends/social/lit-lamb-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/lit-lamb-hologram',
      to: 'veefriends/social/lit-lamb-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/lit-lamb-lava',
      to: 'veefriends/social/lit-lamb-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/logical-lion-bubblegum',
      to: 'veefriends/social/logical-lion-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/logical-lion-core',
      to: 'veefriends/social/logical-lion-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/logical-lion-diamond',
      to: 'veefriends/social/logical-lion-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/logical-lion-emerald',
      to: 'veefriends/social/logical-lion-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/logical-lion-epic',
      to: 'veefriends/social/logical-lion-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/logical-lion-hologram',
      to: 'veefriends/social/logical-lion-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/logical-lion-lava',
      to: 'veefriends/social/logical-lion-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/loyal-lobster-bubblegum',
      to: 'veefriends/social/loyal-lobster-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/loyal-lobster-core',
      to: 'veefriends/social/loyal-lobster-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/loyal-lobster-diamond',
      to: 'veefriends/social/loyal-lobster-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/loyal-lobster-emerald',
      to: 'veefriends/social/loyal-lobster-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/loyal-lobster-epic',
      to: 'veefriends/social/loyal-lobster-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/loyal-lobster-gold',
      to: 'veefriends/social/loyal-lobster-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/loyal-lobster-hologram',
      to: 'veefriends/social/loyal-lobster-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/loyal-lobster-lava',
      to: 'veefriends/social/loyal-lobster-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macho-manta-ray-bubblegum',
      to: 'veefriends/social/macho-manta-ray-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macho-manta-ray-core',
      to: 'veefriends/social/macho-manta-ray-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macho-manta-ray-diamond',
      to: 'veefriends/social/macho-manta-ray-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macho-manta-ray-emerald',
      to: 'veefriends/social/macho-manta-ray-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macho-manta-ray-epic',
      to: 'veefriends/social/macho-manta-ray-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macho-manta-ray-gold',
      to: 'veefriends/social/macho-manta-ray-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macho-manta-ray-hologram',
      to: 'veefriends/social/macho-manta-ray-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macho-manta-ray-lava',
      to: 'veefriends/social/macho-manta-ray-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macro-micro-bubblegum',
      to: 'veefriends/social/macro-micro-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macro-micro-core',
      to: 'veefriends/social/macro-micro-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macro-micro-diamond',
      to: 'veefriends/social/macro-micro-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macro-micro-emerald',
      to: 'veefriends/social/macro-micro-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macro-micro-epic',
      to: 'veefriends/social/macro-micro-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macro-micro-gold',
      to: 'veefriends/social/macro-micro-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macro-micro-hologram',
      to: 'veefriends/social/macro-micro-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/macro-micro-lava',
      to: 'veefriends/social/macro-micro-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/magnanimous-maltese-bubblegum',
      to: 'veefriends/social/magnanimous-maltese-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/magnanimous-maltese-core',
      to: 'veefriends/social/magnanimous-maltese-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/magnanimous-maltese-diamond',
      to: 'veefriends/social/magnanimous-maltese-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/magnanimous-maltese-emerald',
      to: 'veefriends/social/magnanimous-maltese-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/magnanimous-maltese-epic',
      to: 'veefriends/social/magnanimous-maltese-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/magnanimous-maltese-gold',
      to: 'veefriends/social/magnanimous-maltese-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/magnanimous-maltese-hologram',
      to: 'veefriends/social/magnanimous-maltese-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/magnanimous-maltese-lava',
      to: 'veefriends/social/magnanimous-maltese-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/major-moth-bubblegum',
      to: 'veefriends/social/major-moth-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/major-moth-core',
      to: 'veefriends/social/major-moth-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/major-moth-diamond',
      to: 'veefriends/social/major-moth-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/major-moth-emerald',
      to: 'veefriends/social/major-moth-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/major-moth-epic',
      to: 'veefriends/social/major-moth-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/major-moth-lava',
      to: 'veefriends/social/major-moth-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mature-mule-bubblegum',
      to: 'veefriends/social/mature-mule-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mature-mule-core',
      to: 'veefriends/social/mature-mule-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mature-mule-diamond',
      to: 'veefriends/social/mature-mule-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mature-mule-emerald',
      to: 'veefriends/social/mature-mule-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mature-mule-epic',
      to: 'veefriends/social/mature-mule-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mature-mule-gold',
      to: 'veefriends/social/mature-mule-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mature-mule-hologram',
      to: 'veefriends/social/mature-mule-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mature-mule-lava',
      to: 'veefriends/social/mature-mule-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/methodical-mammoth-bubblegum',
      to: 'veefriends/social/methodical-mammoth-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/methodical-mammoth-core',
      to: 'veefriends/social/methodical-mammoth-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/methodical-mammoth-diamond',
      to: 'veefriends/social/methodical-mammoth-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/methodical-mammoth-emerald',
      to: 'veefriends/social/methodical-mammoth-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/methodical-mammoth-epic',
      to: 'veefriends/social/methodical-mammoth-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/methodical-mammoth-gold',
      to: 'veefriends/social/methodical-mammoth-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/methodical-mammoth-hologram',
      to: 'veefriends/social/methodical-mammoth-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/methodical-mammoth-lava',
      to: 'veefriends/social/methodical-mammoth-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/meticulous-magpie-bubblegum',
      to: 'veefriends/social/meticulous-magpie-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/meticulous-magpie-core',
      to: 'veefriends/social/meticulous-magpie-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/meticulous-magpie-diamond',
      to: 'veefriends/social/meticulous-magpie-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/meticulous-magpie-emerald',
      to: 'veefriends/social/meticulous-magpie-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/meticulous-magpie-epic',
      to: 'veefriends/social/meticulous-magpie-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/meticulous-magpie-gold',
      to: 'veefriends/social/meticulous-magpie-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/meticulous-magpie-hologram',
      to: 'veefriends/social/meticulous-magpie-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/meticulous-magpie-lava',
      to: 'veefriends/social/meticulous-magpie-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mindful-minokawa-bubblegum',
      to: 'veefriends/social/mindful-minokawa-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mindful-minokawa-core',
      to: 'veefriends/social/mindful-minokawa-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mindful-minokawa-diamond',
      to: 'veefriends/social/mindful-minokawa-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mindful-minokawa-emerald',
      to: 'veefriends/social/mindful-minokawa-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mindful-minokawa-epic',
      to: 'veefriends/social/mindful-minokawa-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mindful-minokawa-gold',
      to: 'veefriends/social/mindful-minokawa-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mindful-minokawa-hologram',
      to: 'veefriends/social/mindful-minokawa-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mindful-minokawa-lava',
      to: 'veefriends/social/mindful-minokawa-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mint-mink-bubblegum',
      to: 'veefriends/social/mint-mink-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mint-mink-core',
      to: 'veefriends/social/mint-mink-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mint-mink-emerald',
      to: 'veefriends/social/mint-mink-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mint-mink-epic',
      to: 'veefriends/social/mint-mink-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mint-mink-gold',
      to: 'veefriends/social/mint-mink-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mint-mink-hologram',
      to: 'veefriends/social/mint-mink-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mint-mink-lava',
      to: 'veefriends/social/mint-mink-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/modest-moose-bubblegum',
      to: 'veefriends/social/modest-moose-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/modest-moose-core',
      to: 'veefriends/social/modest-moose-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/modest-moose-diamond',
      to: 'veefriends/social/modest-moose-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/modest-moose-emerald',
      to: 'veefriends/social/modest-moose-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/modest-moose-epic',
      to: 'veefriends/social/modest-moose-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/modest-moose-gold',
      to: 'veefriends/social/modest-moose-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/modest-moose-hologram',
      to: 'veefriends/social/modest-moose-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/modest-moose-lava',
      to: 'veefriends/social/modest-moose-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mojo-mouse-bubblegum',
      to: 'veefriends/social/mojo-mouse-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mojo-mouse-core',
      to: 'veefriends/social/mojo-mouse-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mojo-mouse-diamond',
      to: 'veefriends/social/mojo-mouse-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mojo-mouse-emerald',
      to: 'veefriends/social/mojo-mouse-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mojo-mouse-epic',
      to: 'veefriends/social/mojo-mouse-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mojo-mouse-hologram',
      to: 'veefriends/social/mojo-mouse-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/mojo-mouse-lava',
      to: 'veefriends/social/mojo-mouse-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/moral-monkey-bubblegum',
      to: 'veefriends/social/moral-monkey-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/moral-monkey-core',
      to: 'veefriends/social/moral-monkey-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/moral-monkey-diamond',
      to: 'veefriends/social/moral-monkey-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/moral-monkey-emerald',
      to: 'veefriends/social/moral-monkey-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/moral-monkey-epic',
      to: 'veefriends/social/moral-monkey-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/moral-monkey-gold',
      to: 'veefriends/social/moral-monkey-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/moral-monkey-hologram',
      to: 'veefriends/social/moral-monkey-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/moral-monkey-lava',
      to: 'veefriends/social/moral-monkey-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/motivated-monster-bubblegum',
      to: 'veefriends/social/motivated-monster-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/motivated-monster-core',
      to: 'veefriends/social/motivated-monster-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/motivated-monster-diamond',
      to: 'veefriends/social/motivated-monster-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/motivated-monster-emerald',
      to: 'veefriends/social/motivated-monster-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/motivated-monster-epic',
      to: 'veefriends/social/motivated-monster-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/motivated-monster-gold',
      to: 'veefriends/social/motivated-monster-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/motivated-monster-hologram',
      to: 'veefriends/social/motivated-monster-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/motivated-monster-lava',
      to: 'veefriends/social/motivated-monster-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/nifty-narwhal-bubblegum',
      to: 'veefriends/social/nifty-narwhal-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/nifty-narwhal-core',
      to: 'veefriends/social/nifty-narwhal-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/nifty-narwhal-diamond',
      to: 'veefriends/social/nifty-narwhal-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/nifty-narwhal-emerald',
      to: 'veefriends/social/nifty-narwhal-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/nifty-narwhal-epic',
      to: 'veefriends/social/nifty-narwhal-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/nifty-narwhal-gold',
      to: 'veefriends/social/nifty-narwhal-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/nifty-narwhal-hologram',
      to: 'veefriends/social/nifty-narwhal-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/nifty-narwhal-lava',
      to: 'veefriends/social/nifty-narwhal-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/noble-numbat-bubblegum',
      to: 'veefriends/social/noble-numbat-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/noble-numbat-core',
      to: 'veefriends/social/noble-numbat-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/noble-numbat-diamond',
      to: 'veefriends/social/noble-numbat-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/noble-numbat-emerald',
      to: 'veefriends/social/noble-numbat-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/noble-numbat-epic',
      to: 'veefriends/social/noble-numbat-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/noble-numbat-gold',
      to: 'veefriends/social/noble-numbat-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/noble-numbat-hologram',
      to: 'veefriends/social/noble-numbat-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/noble-numbat-lava',
      to: 'veefriends/social/noble-numbat-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/notorious-ninja-bubblegum',
      to: 'veefriends/social/notorious-ninja-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/notorious-ninja-core',
      to: 'veefriends/social/notorious-ninja-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/notorious-ninja-diamond',
      to: 'veefriends/social/notorious-ninja-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/notorious-ninja-emerald',
      to: 'veefriends/social/notorious-ninja-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/notorious-ninja-epic',
      to: 'veefriends/social/notorious-ninja-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/notorious-ninja-hologram',
      to: 'veefriends/social/notorious-ninja-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/notorious-ninja-lava',
      to: 'veefriends/social/notorious-ninja-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/observant-oyster-bubblegum',
      to: 'veefriends/social/observant-oyster-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/observant-oyster-core',
      to: 'veefriends/social/observant-oyster-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/observant-oyster-diamond',
      to: 'veefriends/social/observant-oyster-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/observant-oyster-emerald',
      to: 'veefriends/social/observant-oyster-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/observant-oyster-epic',
      to: 'veefriends/social/observant-oyster-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/observant-oyster-gold',
      to: 'veefriends/social/observant-oyster-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/observant-oyster-hologram',
      to: 'veefriends/social/observant-oyster-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/observant-oyster-lava',
      to: 'veefriends/social/observant-oyster-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/offense-oriented-orangutan-bubblegum',
      to: 'veefriends/social/offense-oriented-orangutan-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/offense-oriented-orangutan-core',
      to: 'veefriends/social/offense-oriented-orangutan-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/offense-oriented-orangutan-diamond',
      to: 'veefriends/social/offense-oriented-orangutan-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/offense-oriented-orangutan-emerald',
      to: 'veefriends/social/offense-oriented-orangutan-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/offense-oriented-orangutan-epic',
      to: 'veefriends/social/offense-oriented-orangutan-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/offense-oriented-orangutan-gold',
      to: 'veefriends/social/offense-oriented-orangutan-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/offense-oriented-orangutan-hologram',
      to: 'veefriends/social/offense-oriented-orangutan-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/offense-oriented-orangutan-lava',
      to: 'veefriends/social/offense-oriented-orangutan-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/og-ox-bubblegum',
      to: 'veefriends/social/og-ox-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/og-ox-core',
      to: 'veefriends/social/og-ox-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/og-ox-diamond',
      to: 'veefriends/social/og-ox-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/og-ox-emerald',
      to: 'veefriends/social/og-ox-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/og-ox-epic',
      to: 'veefriends/social/og-ox-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/og-ox-gold',
      to: 'veefriends/social/og-ox-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/og-ox-hologram',
      to: 'veefriends/social/og-ox-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/og-ox-lava',
      to: 'veefriends/social/og-ox-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/optimistic-otter-bubblegum',
      to: 'veefriends/social/optimistic-otter-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/optimistic-otter-core',
      to: 'veefriends/social/optimistic-otter-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/optimistic-otter-diamond',
      to: 'veefriends/social/optimistic-otter-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/optimistic-otter-emerald',
      to: 'veefriends/social/optimistic-otter-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/optimistic-otter-epic',
      to: 'veefriends/social/optimistic-otter-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/optimistic-otter-gold',
      to: 'veefriends/social/optimistic-otter-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/optimistic-otter-hologram',
      to: 'veefriends/social/optimistic-otter-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/optimistic-otter-lava',
      to: 'veefriends/social/optimistic-otter-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/organized-ostrich-bubblegum',
      to: 'veefriends/social/organized-ostrich-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/organized-ostrich-core',
      to: 'veefriends/social/organized-ostrich-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/organized-ostrich-diamond',
      to: 'veefriends/social/organized-ostrich-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/organized-ostrich-epic',
      to: 'veefriends/social/organized-ostrich-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/organized-ostrich-gold',
      to: 'veefriends/social/organized-ostrich-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/organized-ostrich-hologram',
      to: 'veefriends/social/organized-ostrich-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/organized-ostrich-lava',
      to: 'veefriends/social/organized-ostrich-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/outgoing-octopus-bubblegum',
      to: 'veefriends/social/outgoing-octopus-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/outgoing-octopus-core',
      to: 'veefriends/social/outgoing-octopus-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/outgoing-octopus-diamond',
      to: 'veefriends/social/outgoing-octopus-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/outgoing-octopus-emerald',
      to: 'veefriends/social/outgoing-octopus-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/outgoing-octopus-epic',
      to: 'veefriends/social/outgoing-octopus-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/outgoing-octopus-gold',
      to: 'veefriends/social/outgoing-octopus-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/outgoing-octopus-hologram',
      to: 'veefriends/social/outgoing-octopus-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/outgoing-octopus-lava',
      to: 'veefriends/social/outgoing-octopus-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/passionate-parrot-bubblegum',
      to: 'veefriends/social/passionate-parrot-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/passionate-parrot-core',
      to: 'veefriends/social/passionate-parrot-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/passionate-parrot-diamond',
      to: 'veefriends/social/passionate-parrot-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/passionate-parrot-emerald',
      to: 'veefriends/social/passionate-parrot-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/passionate-parrot-epic',
      to: 'veefriends/social/passionate-parrot-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/passionate-parrot-hologram',
      to: 'veefriends/social/passionate-parrot-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/passionate-parrot-lava',
      to: 'veefriends/social/passionate-parrot-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-panda-bubblegum',
      to: 'veefriends/social/patient-panda-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-panda-core',
      to: 'veefriends/social/patient-panda-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-panda-diamond',
      to: 'veefriends/social/patient-panda-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-panda-emerald',
      to: 'veefriends/social/patient-panda-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-panda-epic',
      to: 'veefriends/social/patient-panda-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-panda-gold',
      to: 'veefriends/social/patient-panda-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-panda-hologram',
      to: 'veefriends/social/patient-panda-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-panda-lava',
      to: 'veefriends/social/patient-panda-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-pig-bubblegum',
      to: 'veefriends/social/patient-pig-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-pig-core',
      to: 'veefriends/social/patient-pig-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-pig-diamond',
      to: 'veefriends/social/patient-pig-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-pig-emerald',
      to: 'veefriends/social/patient-pig-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-pig-epic',
      to: 'veefriends/social/patient-pig-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-pig-gold',
      to: 'veefriends/social/patient-pig-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-pig-hologram',
      to: 'veefriends/social/patient-pig-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/patient-pig-lava',
      to: 'veefriends/social/patient-pig-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/pea-salad-bubblegum',
      to: 'veefriends/social/pea-salad-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/pea-salad-core',
      to: 'veefriends/social/pea-salad-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/pea-salad-emerald',
      to: 'veefriends/social/pea-salad-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/pea-salad-epic',
      to: 'veefriends/social/pea-salad-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/pea-salad-gold',
      to: 'veefriends/social/pea-salad-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/pea-salad-hologram',
      to: 'veefriends/social/pea-salad-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/pea-salad-lava',
      to: 'veefriends/social/pea-salad-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/peaceful-pelican-bubblegum',
      to: 'veefriends/social/peaceful-pelican-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/peaceful-pelican-core',
      to: 'veefriends/social/peaceful-pelican-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/peaceful-pelican-diamond',
      to: 'veefriends/social/peaceful-pelican-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/peaceful-pelican-emerald',
      to: 'veefriends/social/peaceful-pelican-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/peaceful-pelican-epic',
      to: 'veefriends/social/peaceful-pelican-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/peaceful-pelican-gold',
      to: 'veefriends/social/peaceful-pelican-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/peaceful-pelican-hologram',
      to: 'veefriends/social/peaceful-pelican-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/peaceful-pelican-lava',
      to: 'veefriends/social/peaceful-pelican-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perceptive-puma-bubblegum',
      to: 'veefriends/social/perceptive-puma-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perceptive-puma-core',
      to: 'veefriends/social/perceptive-puma-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perceptive-puma-emerald',
      to: 'veefriends/social/perceptive-puma-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perceptive-puma-epic',
      to: 'veefriends/social/perceptive-puma-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perceptive-puma-gold',
      to: 'veefriends/social/perceptive-puma-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perceptive-puma-hologram',
      to: 'veefriends/social/perceptive-puma-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perceptive-puma-lava',
      to: 'veefriends/social/perceptive-puma-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perfect-persian-cat-bubblegum',
      to: 'veefriends/social/perfect-persian-cat-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perfect-persian-cat-core',
      to: 'veefriends/social/perfect-persian-cat-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perfect-persian-cat-diamond',
      to: 'veefriends/social/perfect-persian-cat-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perfect-persian-cat-emerald',
      to: 'veefriends/social/perfect-persian-cat-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perfect-persian-cat-epic',
      to: 'veefriends/social/perfect-persian-cat-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perfect-persian-cat-gold',
      to: 'veefriends/social/perfect-persian-cat-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perfect-persian-cat-hologram',
      to: 'veefriends/social/perfect-persian-cat-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perfect-persian-cat-lava',
      to: 'veefriends/social/perfect-persian-cat-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persistent-penguin-bubblegum',
      to: 'veefriends/social/persistent-penguin-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persistent-penguin-core',
      to: 'veefriends/social/persistent-penguin-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persistent-penguin-diamond',
      to: 'veefriends/social/persistent-penguin-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persistent-penguin-emerald',
      to: 'veefriends/social/persistent-penguin-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persistent-penguin-epic',
      to: 'veefriends/social/persistent-penguin-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persistent-penguin-gold',
      to: 'veefriends/social/persistent-penguin-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persistent-penguin-hologram',
      to: 'veefriends/social/persistent-penguin-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persistent-penguin-lava',
      to: 'veefriends/social/persistent-penguin-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perspective-pigeon-bubblegum',
      to: 'veefriends/social/perspective-pigeon-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perspective-pigeon-core',
      to: 'veefriends/social/perspective-pigeon-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perspective-pigeon-diamond',
      to: 'veefriends/social/perspective-pigeon-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perspective-pigeon-emerald',
      to: 'veefriends/social/perspective-pigeon-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perspective-pigeon-epic',
      to: 'veefriends/social/perspective-pigeon-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perspective-pigeon-gold',
      to: 'veefriends/social/perspective-pigeon-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perspective-pigeon-hologram',
      to: 'veefriends/social/perspective-pigeon-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/perspective-pigeon-lava',
      to: 'veefriends/social/perspective-pigeon-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persuasive-pigeon-bubblegum',
      to: 'veefriends/social/persuasive-pigeon-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persuasive-pigeon-core',
      to: 'veefriends/social/persuasive-pigeon-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persuasive-pigeon-diamond',
      to: 'veefriends/social/persuasive-pigeon-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persuasive-pigeon-emerald',
      to: 'veefriends/social/persuasive-pigeon-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persuasive-pigeon-epic',
      to: 'veefriends/social/persuasive-pigeon-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persuasive-pigeon-gold',
      to: 'veefriends/social/persuasive-pigeon-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persuasive-pigeon-hologram',
      to: 'veefriends/social/persuasive-pigeon-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/persuasive-pigeon-lava',
      to: 'veefriends/social/persuasive-pigeon-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/pleasant-platypus-bubblegum',
      to: 'veefriends/social/pleasant-platypus-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/pleasant-platypus-core',
      to: 'veefriends/social/pleasant-platypus-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/pleasant-platypus-emerald',
      to: 'veefriends/social/pleasant-platypus-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/pleasant-platypus-epic',
      to: 'veefriends/social/pleasant-platypus-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/pleasant-platypus-gold',
      to: 'veefriends/social/pleasant-platypus-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/pleasant-platypus-hologram',
      to: 'veefriends/social/pleasant-platypus-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/pleasant-platypus-lava',
      to: 'veefriends/social/pleasant-platypus-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/poised-pug-bubblegum',
      to: 'veefriends/social/poised-pug-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/poised-pug-core',
      to: 'veefriends/social/poised-pug-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/poised-pug-diamond',
      to: 'veefriends/social/poised-pug-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/poised-pug-emerald',
      to: 'veefriends/social/poised-pug-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/poised-pug-epic',
      to: 'veefriends/social/poised-pug-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/poised-pug-gold',
      to: 'veefriends/social/poised-pug-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/poised-pug-hologram',
      to: 'veefriends/social/poised-pug-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/poised-pug-lava',
      to: 'veefriends/social/poised-pug-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/polished-poodle-bubblegum',
      to: 'veefriends/social/polished-poodle-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/polished-poodle-core',
      to: 'veefriends/social/polished-poodle-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/polished-poodle-diamond',
      to: 'veefriends/social/polished-poodle-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/polished-poodle-emerald',
      to: 'veefriends/social/polished-poodle-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/polished-poodle-epic',
      to: 'veefriends/social/polished-poodle-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/polished-poodle-hologram',
      to: 'veefriends/social/polished-poodle-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/polished-poodle-lava',
      to: 'veefriends/social/polished-poodle-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ponder-it-from-all-angles-bubblegum',
      to: 'veefriends/social/ponder-it-from-all-angles-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ponder-it-from-all-angles-core',
      to: 'veefriends/social/ponder-it-from-all-angles-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ponder-it-from-all-angles-diamond',
      to: 'veefriends/social/ponder-it-from-all-angles-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ponder-it-from-all-angles-emerald',
      to: 'veefriends/social/ponder-it-from-all-angles-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ponder-it-from-all-angles-epic',
      to: 'veefriends/social/ponder-it-from-all-angles-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ponder-it-from-all-angles-gold',
      to: 'veefriends/social/ponder-it-from-all-angles-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ponder-it-from-all-angles-hologram',
      to: 'veefriends/social/ponder-it-from-all-angles-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/ponder-it-from-all-angles-lava',
      to: 'veefriends/social/ponder-it-from-all-angles-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/positive-porcupine-bubblegum',
      to: 'veefriends/social/positive-porcupine-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/positive-porcupine-core',
      to: 'veefriends/social/positive-porcupine-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/positive-porcupine-diamond',
      to: 'veefriends/social/positive-porcupine-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/positive-porcupine-emerald',
      to: 'veefriends/social/positive-porcupine-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/positive-porcupine-epic',
      to: 'veefriends/social/positive-porcupine-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/positive-porcupine-gold',
      to: 'veefriends/social/positive-porcupine-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/positive-porcupine-hologram',
      to: 'veefriends/social/positive-porcupine-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/positive-porcupine-lava',
      to: 'veefriends/social/positive-porcupine-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/practical-peacock-bubblegum',
      to: 'veefriends/social/practical-peacock-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/practical-peacock-core',
      to: 'veefriends/social/practical-peacock-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/practical-peacock-diamond',
      to: 'veefriends/social/practical-peacock-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/practical-peacock-emerald',
      to: 'veefriends/social/practical-peacock-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/practical-peacock-epic',
      to: 'veefriends/social/practical-peacock-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/practical-peacock-gold',
      to: 'veefriends/social/practical-peacock-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/practical-peacock-hologram',
      to: 'veefriends/social/practical-peacock-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/practical-peacock-lava',
      to: 'veefriends/social/practical-peacock-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/principled-praying-mantis-bubblegum',
      to: 'veefriends/social/principled-praying-mantis-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/principled-praying-mantis-core',
      to: 'veefriends/social/principled-praying-mantis-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/principled-praying-mantis-diamond',
      to: 'veefriends/social/principled-praying-mantis-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/principled-praying-mantis-emerald',
      to: 'veefriends/social/principled-praying-mantis-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/principled-praying-mantis-epic',
      to: 'veefriends/social/principled-praying-mantis-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/principled-praying-mantis-gold',
      to: 'veefriends/social/principled-praying-mantis-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/principled-praying-mantis-hologram',
      to: 'veefriends/social/principled-praying-mantis-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/principled-praying-mantis-lava',
      to: 'veefriends/social/principled-praying-mantis-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/proactive-piranha-core',
      to: 'veefriends/social/proactive-piranha-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/proactive-piranha-diamond',
      to: 'veefriends/social/proactive-piranha-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/proactive-piranha-emerald',
      to: 'veefriends/social/proactive-piranha-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/proactive-piranha-epic',
      to: 'veefriends/social/proactive-piranha-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/proactive-piranha-gold',
      to: 'veefriends/social/proactive-piranha-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/proactive-piranha-hologram',
      to: 'veefriends/social/proactive-piranha-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/proactive-piranha-lava',
      to: 'veefriends/social/proactive-piranha-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/productive-puffin-bubblegum',
      to: 'veefriends/social/productive-puffin-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/productive-puffin-core',
      to: 'veefriends/social/productive-puffin-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/productive-puffin-diamond',
      to: 'veefriends/social/productive-puffin-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/productive-puffin-emerald',
      to: 'veefriends/social/productive-puffin-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/productive-puffin-epic',
      to: 'veefriends/social/productive-puffin-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/productive-puffin-gold',
      to: 'veefriends/social/productive-puffin-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/productive-puffin-hologram',
      to: 'veefriends/social/productive-puffin-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/productive-puffin-lava',
      to: 'veefriends/social/productive-puffin-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/profound-possum-bubblegum',
      to: 'veefriends/social/profound-possum-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/profound-possum-core',
      to: 'veefriends/social/profound-possum-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/profound-possum-diamond',
      to: 'veefriends/social/profound-possum-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/profound-possum-emerald',
      to: 'veefriends/social/profound-possum-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/profound-possum-epic',
      to: 'veefriends/social/profound-possum-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/profound-possum-gold',
      to: 'veefriends/social/profound-possum-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/profound-possum-hologram',
      to: 'veefriends/social/profound-possum-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/profound-possum-lava',
      to: 'veefriends/social/profound-possum-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/protective-panther-bubblegum',
      to: 'veefriends/social/protective-panther-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/protective-panther-core',
      to: 'veefriends/social/protective-panther-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/protective-panther-diamond',
      to: 'veefriends/social/protective-panther-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/protective-panther-emerald',
      to: 'veefriends/social/protective-panther-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/protective-panther-epic',
      to: 'veefriends/social/protective-panther-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/protective-panther-gold',
      to: 'veefriends/social/protective-panther-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/protective-panther-hologram',
      to: 'veefriends/social/protective-panther-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/protective-panther-lava',
      to: 'veefriends/social/protective-panther-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/prudent-polar-bear-bubblegum',
      to: 'veefriends/social/prudent-polar-bear-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/prudent-polar-bear-core',
      to: 'veefriends/social/prudent-polar-bear-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/prudent-polar-bear-diamond',
      to: 'veefriends/social/prudent-polar-bear-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/prudent-polar-bear-emerald',
      to: 'veefriends/social/prudent-polar-bear-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/prudent-polar-bear-epic',
      to: 'veefriends/social/prudent-polar-bear-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/prudent-polar-bear-gold',
      to: 'veefriends/social/prudent-polar-bear-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/prudent-polar-bear-hologram',
      to: 'veefriends/social/prudent-polar-bear-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/prudent-polar-bear-lava',
      to: 'veefriends/social/prudent-polar-bear-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/quick-quail-core',
      to: 'veefriends/social/quick-quail-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/quick-quail-emerald',
      to: 'veefriends/social/quick-quail-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/quick-quail-epic',
      to: 'veefriends/social/quick-quail-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/quick-quail-gold',
      to: 'veefriends/social/quick-quail-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/quick-quail-hologram',
      to: 'veefriends/social/quick-quail-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/quick-quail-lava',
      to: 'veefriends/social/quick-quail-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/radical-rabbit-bubblegum',
      to: 'veefriends/social/radical-rabbit-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/radical-rabbit-core',
      to: 'veefriends/social/radical-rabbit-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/radical-rabbit-diamond',
      to: 'veefriends/social/radical-rabbit-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/radical-rabbit-emerald',
      to: 'veefriends/social/radical-rabbit-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/radical-rabbit-epic',
      to: 'veefriends/social/radical-rabbit-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/radical-rabbit-gold',
      to: 'veefriends/social/radical-rabbit-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/radical-rabbit-hologram',
      to: 'veefriends/social/radical-rabbit-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/radical-rabbit-lava',
      to: 'veefriends/social/radical-rabbit-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/rational-rattlesnake-bubblegum',
      to: 'veefriends/social/rational-rattlesnake-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/rational-rattlesnake-core',
      to: 'veefriends/social/rational-rattlesnake-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/rational-rattlesnake-diamond',
      to: 'veefriends/social/rational-rattlesnake-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/rational-rattlesnake-emerald',
      to: 'veefriends/social/rational-rattlesnake-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/rational-rattlesnake-epic',
      to: 'veefriends/social/rational-rattlesnake-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/rational-rattlesnake-gold',
      to: 'veefriends/social/rational-rattlesnake-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/rational-rattlesnake-hologram',
      to: 'veefriends/social/rational-rattlesnake-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/rational-rattlesnake-lava',
      to: 'veefriends/social/rational-rattlesnake-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reflective-rhinoceros-bubblegum',
      to: 'veefriends/social/reflective-rhinoceros-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reflective-rhinoceros-core',
      to: 'veefriends/social/reflective-rhinoceros-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reflective-rhinoceros-diamond',
      to: 'veefriends/social/reflective-rhinoceros-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reflective-rhinoceros-emerald',
      to: 'veefriends/social/reflective-rhinoceros-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reflective-rhinoceros-epic',
      to: 'veefriends/social/reflective-rhinoceros-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reflective-rhinoceros-gold',
      to: 'veefriends/social/reflective-rhinoceros-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reflective-rhinoceros-hologram',
      to: 'veefriends/social/reflective-rhinoceros-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reflective-rhinoceros-lava',
      to: 'veefriends/social/reflective-rhinoceros-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reliable-rat-core',
      to: 'veefriends/social/reliable-rat-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reliable-rat-diamond',
      to: 'veefriends/social/reliable-rat-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reliable-rat-emerald',
      to: 'veefriends/social/reliable-rat-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reliable-rat-epic',
      to: 'veefriends/social/reliable-rat-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reliable-rat-gold',
      to: 'veefriends/social/reliable-rat-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reliable-rat-hologram',
      to: 'veefriends/social/reliable-rat-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/reliable-rat-lava',
      to: 'veefriends/social/reliable-rat-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resilient-red-devil-bubblegum',
      to: 'veefriends/social/resilient-red-devil-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resilient-red-devil-core',
      to: 'veefriends/social/resilient-red-devil-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resilient-red-devil-diamond',
      to: 'veefriends/social/resilient-red-devil-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resilient-red-devil-emerald',
      to: 'veefriends/social/resilient-red-devil-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resilient-red-devil-epic',
      to: 'veefriends/social/resilient-red-devil-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resilient-red-devil-gold',
      to: 'veefriends/social/resilient-red-devil-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resilient-red-devil-hologram',
      to: 'veefriends/social/resilient-red-devil-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resilient-red-devil-lava',
      to: 'veefriends/social/resilient-red-devil-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resourceful-robin-core',
      to: 'veefriends/social/resourceful-robin-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resourceful-robin-diamond',
      to: 'veefriends/social/resourceful-robin-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resourceful-robin-emerald',
      to: 'veefriends/social/resourceful-robin-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resourceful-robin-epic',
      to: 'veefriends/social/resourceful-robin-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resourceful-robin-gold',
      to: 'veefriends/social/resourceful-robin-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resourceful-robin-hologram',
      to: 'veefriends/social/resourceful-robin-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/resourceful-robin-lava',
      to: 'veefriends/social/resourceful-robin-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/respectful-racoon-bubblegum',
      to: 'veefriends/social/respectful-racoon-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/respectful-racoon-core',
      to: 'veefriends/social/respectful-racoon-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/respectful-racoon-diamond',
      to: 'veefriends/social/respectful-racoon-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/respectful-racoon-emerald',
      to: 'veefriends/social/respectful-racoon-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/respectful-racoon-epic',
      to: 'veefriends/social/respectful-racoon-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/respectful-racoon-gold',
      to: 'veefriends/social/respectful-racoon-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/respectful-racoon-hologram',
      to: 'veefriends/social/respectful-racoon-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/respectful-racoon-lava',
      to: 'veefriends/social/respectful-racoon-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/responsive-ram-bubblegum',
      to: 'veefriends/social/responsive-ram-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/responsive-ram-core',
      to: 'veefriends/social/responsive-ram-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/responsive-ram-diamond',
      to: 'veefriends/social/responsive-ram-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/responsive-ram-emerald',
      to: 'veefriends/social/responsive-ram-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/responsive-ram-epic',
      to: 'veefriends/social/responsive-ram-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/responsive-ram-gold',
      to: 'veefriends/social/responsive-ram-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/responsive-ram-hologram',
      to: 'veefriends/social/responsive-ram-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/responsive-ram-lava',
      to: 'veefriends/social/responsive-ram-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/secure-sparrow-bubblegum',
      to: 'veefriends/social/secure-sparrow-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/secure-sparrow-core',
      to: 'veefriends/social/secure-sparrow-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/secure-sparrow-diamond',
      to: 'veefriends/social/secure-sparrow-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/secure-sparrow-emerald',
      to: 'veefriends/social/secure-sparrow-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/secure-sparrow-epic',
      to: 'veefriends/social/secure-sparrow-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/secure-sparrow-gold',
      to: 'veefriends/social/secure-sparrow-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/secure-sparrow-hologram',
      to: 'veefriends/social/secure-sparrow-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/secure-sparrow-lava',
      to: 'veefriends/social/secure-sparrow-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/self-aware-hare-bubblegum',
      to: 'veefriends/social/self-aware-hare-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/self-aware-hare-core',
      to: 'veefriends/social/self-aware-hare-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/self-aware-hare-diamond',
      to: 'veefriends/social/self-aware-hare-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/self-aware-hare-emerald',
      to: 'veefriends/social/self-aware-hare-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/self-aware-hare-epic',
      to: 'veefriends/social/self-aware-hare-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/self-aware-hare-gold',
      to: 'veefriends/social/self-aware-hare-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/self-aware-hare-hologram',
      to: 'veefriends/social/self-aware-hare-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/self-aware-hare-lava',
      to: 'veefriends/social/self-aware-hare-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/selfless-sloth-bubblegum',
      to: 'veefriends/social/selfless-sloth-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/selfless-sloth-core',
      to: 'veefriends/social/selfless-sloth-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/selfless-sloth-diamond',
      to: 'veefriends/social/selfless-sloth-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/selfless-sloth-epic',
      to: 'veefriends/social/selfless-sloth-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/selfless-sloth-gold',
      to: 'veefriends/social/selfless-sloth-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/selfless-sloth-hologram',
      to: 'veefriends/social/selfless-sloth-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/selfless-sloth-lava',
      to: 'veefriends/social/selfless-sloth-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensible-sommelier-bubblegum',
      to: 'veefriends/social/sensible-sommelier-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensible-sommelier-core',
      to: 'veefriends/social/sensible-sommelier-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensible-sommelier-diamond',
      to: 'veefriends/social/sensible-sommelier-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensible-sommelier-emerald',
      to: 'veefriends/social/sensible-sommelier-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensible-sommelier-epic',
      to: 'veefriends/social/sensible-sommelier-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensible-sommelier-gold',
      to: 'veefriends/social/sensible-sommelier-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensible-sommelier-hologram',
      to: 'veefriends/social/sensible-sommelier-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensible-sommelier-lava',
      to: 'veefriends/social/sensible-sommelier-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensitive-centipede-bubblegum',
      to: 'veefriends/social/sensitive-centipede-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensitive-centipede-core',
      to: 'veefriends/social/sensitive-centipede-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensitive-centipede-diamond',
      to: 'veefriends/social/sensitive-centipede-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensitive-centipede-emerald',
      to: 'veefriends/social/sensitive-centipede-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensitive-centipede-epic',
      to: 'veefriends/social/sensitive-centipede-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensitive-centipede-gold',
      to: 'veefriends/social/sensitive-centipede-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensitive-centipede-hologram',
      to: 'veefriends/social/sensitive-centipede-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sensitive-centipede-lava',
      to: 'veefriends/social/sensitive-centipede-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sentimental-salamander-bubblegum',
      to: 'veefriends/social/sentimental-salamander-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sentimental-salamander-core',
      to: 'veefriends/social/sentimental-salamander-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sentimental-salamander-diamond',
      to: 'veefriends/social/sentimental-salamander-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sentimental-salamander-emerald',
      to: 'veefriends/social/sentimental-salamander-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sentimental-salamander-epic',
      to: 'veefriends/social/sentimental-salamander-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sentimental-salamander-gold',
      to: 'veefriends/social/sentimental-salamander-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sentimental-salamander-hologram',
      to: 'veefriends/social/sentimental-salamander-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sentimental-salamander-lava',
      to: 'veefriends/social/sentimental-salamander-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/serious-sperm-whale-bubblegum',
      to: 'veefriends/social/serious-sperm-whale-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/serious-sperm-whale-core',
      to: 'veefriends/social/serious-sperm-whale-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/serious-sperm-whale-diamond',
      to: 'veefriends/social/serious-sperm-whale-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/serious-sperm-whale-emerald',
      to: 'veefriends/social/serious-sperm-whale-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/serious-sperm-whale-epic',
      to: 'veefriends/social/serious-sperm-whale-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/serious-sperm-whale-gold',
      to: 'veefriends/social/serious-sperm-whale-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/serious-sperm-whale-hologram',
      to: 'veefriends/social/serious-sperm-whale-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/serious-sperm-whale-lava',
      to: 'veefriends/social/serious-sperm-whale-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sharing-squirrel-bubblegum',
      to: 'veefriends/social/sharing-squirrel-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sharing-squirrel-core',
      to: 'veefriends/social/sharing-squirrel-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sharing-squirrel-diamond',
      to: 'veefriends/social/sharing-squirrel-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sharing-squirrel-emerald',
      to: 'veefriends/social/sharing-squirrel-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sharing-squirrel-epic',
      to: 'veefriends/social/sharing-squirrel-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sharing-squirrel-gold',
      to: 'veefriends/social/sharing-squirrel-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sharing-squirrel-hologram',
      to: 'veefriends/social/sharing-squirrel-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sharing-squirrel-lava',
      to: 'veefriends/social/sharing-squirrel-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-shark-bubblegum',
      to: 'veefriends/social/shrewd-shark-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-shark-core',
      to: 'veefriends/social/shrewd-shark-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-shark-diamond',
      to: 'veefriends/social/shrewd-shark-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-shark-emerald',
      to: 'veefriends/social/shrewd-shark-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-shark-epic',
      to: 'veefriends/social/shrewd-shark-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-shark-gold',
      to: 'veefriends/social/shrewd-shark-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-shark-hologram',
      to: 'veefriends/social/shrewd-shark-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-shark-lava',
      to: 'veefriends/social/shrewd-shark-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-sheep-bubblegum',
      to: 'veefriends/social/shrewd-sheep-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-sheep-core',
      to: 'veefriends/social/shrewd-sheep-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-sheep-diamond',
      to: 'veefriends/social/shrewd-sheep-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-sheep-emerald',
      to: 'veefriends/social/shrewd-sheep-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-sheep-epic',
      to: 'veefriends/social/shrewd-sheep-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-sheep-gold',
      to: 'veefriends/social/shrewd-sheep-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-sheep-hologram',
      to: 'veefriends/social/shrewd-sheep-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/shrewd-sheep-lava',
      to: 'veefriends/social/shrewd-sheep-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sincere-skunk-bubblegum',
      to: 'veefriends/social/sincere-skunk-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sincere-skunk-core',
      to: 'veefriends/social/sincere-skunk-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sincere-skunk-diamond',
      to: 'veefriends/social/sincere-skunk-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sincere-skunk-emerald',
      to: 'veefriends/social/sincere-skunk-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sincere-skunk-epic',
      to: 'veefriends/social/sincere-skunk-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sincere-skunk-gold',
      to: 'veefriends/social/sincere-skunk-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sincere-skunk-hologram',
      to: 'veefriends/social/sincere-skunk-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sincere-skunk-lava',
      to: 'veefriends/social/sincere-skunk-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/skilled-skeleton-bubblegum',
      to: 'veefriends/social/skilled-skeleton-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/skilled-skeleton-core',
      to: 'veefriends/social/skilled-skeleton-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/skilled-skeleton-diamond',
      to: 'veefriends/social/skilled-skeleton-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/skilled-skeleton-emerald',
      to: 'veefriends/social/skilled-skeleton-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/skilled-skeleton-epic',
      to: 'veefriends/social/skilled-skeleton-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/skilled-skeleton-gold',
      to: 'veefriends/social/skilled-skeleton-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/skilled-skeleton-hologram',
      to: 'veefriends/social/skilled-skeleton-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/skilled-skeleton-lava',
      to: 'veefriends/social/skilled-skeleton-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/slayn-slug-bubblegum',
      to: 'veefriends/social/slayn-slug-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/slayn-slug-core',
      to: 'veefriends/social/slayn-slug-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/slayn-slug-diamond',
      to: 'veefriends/social/slayn-slug-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/slayn-slug-emerald',
      to: 'veefriends/social/slayn-slug-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/slayn-slug-epic',
      to: 'veefriends/social/slayn-slug-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/slayn-slug-gold',
      to: 'veefriends/social/slayn-slug-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/slayn-slug-hologram',
      to: 'veefriends/social/slayn-slug-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/slayn-slug-lava',
      to: 'veefriends/social/slayn-slug-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/smooth-spider-bubblegum',
      to: 'veefriends/social/smooth-spider-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/smooth-spider-core',
      to: 'veefriends/social/smooth-spider-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/smooth-spider-diamond',
      to: 'veefriends/social/smooth-spider-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/smooth-spider-emerald',
      to: 'veefriends/social/smooth-spider-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/smooth-spider-epic',
      to: 'veefriends/social/smooth-spider-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/smooth-spider-gold',
      to: 'veefriends/social/smooth-spider-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/smooth-spider-hologram',
      to: 'veefriends/social/smooth-spider-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/smooth-spider-lava',
      to: 'veefriends/social/smooth-spider-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sophisticated-stingray-bubblegum',
      to: 'veefriends/social/sophisticated-stingray-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sophisticated-stingray-core',
      to: 'veefriends/social/sophisticated-stingray-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sophisticated-stingray-diamond',
      to: 'veefriends/social/sophisticated-stingray-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sophisticated-stingray-emerald',
      to: 'veefriends/social/sophisticated-stingray-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sophisticated-stingray-epic',
      to: 'veefriends/social/sophisticated-stingray-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sophisticated-stingray-gold',
      to: 'veefriends/social/sophisticated-stingray-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sophisticated-stingray-hologram',
      to: 'veefriends/social/sophisticated-stingray-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sophisticated-stingray-lava',
      to: 'veefriends/social/sophisticated-stingray-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spiffy-salmon-bubblegum',
      to: 'veefriends/social/spiffy-salmon-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spiffy-salmon-core',
      to: 'veefriends/social/spiffy-salmon-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spiffy-salmon-diamond',
      to: 'veefriends/social/spiffy-salmon-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spiffy-salmon-emerald',
      to: 'veefriends/social/spiffy-salmon-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spiffy-salmon-epic',
      to: 'veefriends/social/spiffy-salmon-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spiffy-salmon-gold',
      to: 'veefriends/social/spiffy-salmon-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spiffy-salmon-hologram',
      to: 'veefriends/social/spiffy-salmon-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spiffy-salmon-lava',
      to: 'veefriends/social/spiffy-salmon-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spontaneous-seahorse-bubblegum',
      to: 'veefriends/social/spontaneous-seahorse-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spontaneous-seahorse-core',
      to: 'veefriends/social/spontaneous-seahorse-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spontaneous-seahorse-diamond',
      to: 'veefriends/social/spontaneous-seahorse-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spontaneous-seahorse-emerald',
      to: 'veefriends/social/spontaneous-seahorse-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spontaneous-seahorse-epic',
      to: 'veefriends/social/spontaneous-seahorse-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spontaneous-seahorse-hologram',
      to: 'veefriends/social/spontaneous-seahorse-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/spontaneous-seahorse-lava',
      to: 'veefriends/social/spontaneous-seahorse-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/steadfast-snake-bubblegum',
      to: 'veefriends/social/steadfast-snake-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/steadfast-snake-core',
      to: 'veefriends/social/steadfast-snake-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/steadfast-snake-diamond',
      to: 'veefriends/social/steadfast-snake-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/steadfast-snake-emerald',
      to: 'veefriends/social/steadfast-snake-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/steadfast-snake-epic',
      to: 'veefriends/social/steadfast-snake-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/steadfast-snake-gold',
      to: 'veefriends/social/steadfast-snake-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/steadfast-snake-hologram',
      to: 'veefriends/social/steadfast-snake-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/steadfast-snake-lava',
      to: 'veefriends/social/steadfast-snake-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stoic-slime-bubblegum',
      to: 'veefriends/social/stoic-slime-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stoic-slime-core',
      to: 'veefriends/social/stoic-slime-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stoic-slime-diamond',
      to: 'veefriends/social/stoic-slime-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stoic-slime-emerald',
      to: 'veefriends/social/stoic-slime-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stoic-slime-epic',
      to: 'veefriends/social/stoic-slime-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stoic-slime-gold',
      to: 'veefriends/social/stoic-slime-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stoic-slime-hologram',
      to: 'veefriends/social/stoic-slime-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stoic-slime-lava',
      to: 'veefriends/social/stoic-slime-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stunned-sun-bubblegum',
      to: 'veefriends/social/stunned-sun-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stunned-sun-core',
      to: 'veefriends/social/stunned-sun-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stunned-sun-diamond',
      to: 'veefriends/social/stunned-sun-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stunned-sun-emerald',
      to: 'veefriends/social/stunned-sun-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stunned-sun-epic',
      to: 'veefriends/social/stunned-sun-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stunned-sun-hologram',
      to: 'veefriends/social/stunned-sun-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/stunned-sun-lava',
      to: 'veefriends/social/stunned-sun-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sufficient-shrimp-bubblegum',
      to: 'veefriends/social/sufficient-shrimp-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sufficient-shrimp-core',
      to: 'veefriends/social/sufficient-shrimp-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sufficient-shrimp-diamond',
      to: 'veefriends/social/sufficient-shrimp-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sufficient-shrimp-emerald',
      to: 'veefriends/social/sufficient-shrimp-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sufficient-shrimp-epic',
      to: 'veefriends/social/sufficient-shrimp-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sufficient-shrimp-gold',
      to: 'veefriends/social/sufficient-shrimp-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sufficient-shrimp-hologram',
      to: 'veefriends/social/sufficient-shrimp-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sufficient-shrimp-lava',
      to: 'veefriends/social/sufficient-shrimp-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/suffocate-hate-bubblegum',
      to: 'veefriends/social/suffocate-hate-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/suffocate-hate-core',
      to: 'veefriends/social/suffocate-hate-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/suffocate-hate-diamond',
      to: 'veefriends/social/suffocate-hate-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/suffocate-hate-emerald',
      to: 'veefriends/social/suffocate-hate-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/suffocate-hate-epic',
      to: 'veefriends/social/suffocate-hate-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/suffocate-hate-hologram',
      to: 'veefriends/social/suffocate-hate-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/suffocate-hate-lava',
      to: 'veefriends/social/suffocate-hate-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/swaggy-sea-lion-bubblegum',
      to: 'veefriends/social/swaggy-sea-lion-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/swaggy-sea-lion-core',
      to: 'veefriends/social/swaggy-sea-lion-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/swaggy-sea-lion-diamond',
      to: 'veefriends/social/swaggy-sea-lion-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/swaggy-sea-lion-emerald',
      to: 'veefriends/social/swaggy-sea-lion-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/swaggy-sea-lion-epic',
      to: 'veefriends/social/swaggy-sea-lion-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/swaggy-sea-lion-gold',
      to: 'veefriends/social/swaggy-sea-lion-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/swaggy-sea-lion-hologram',
      to: 'veefriends/social/swaggy-sea-lion-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/swaggy-sea-lion-lava',
      to: 'veefriends/social/swaggy-sea-lion-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sweet-swan-bubblegum',
      to: 'veefriends/social/sweet-swan-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sweet-swan-core',
      to: 'veefriends/social/sweet-swan-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sweet-swan-diamond',
      to: 'veefriends/social/sweet-swan-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sweet-swan-emerald',
      to: 'veefriends/social/sweet-swan-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sweet-swan-epic',
      to: 'veefriends/social/sweet-swan-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sweet-swan-gold',
      to: 'veefriends/social/sweet-swan-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sweet-swan-hologram',
      to: 'veefriends/social/sweet-swan-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sweet-swan-lava',
      to: 'veefriends/social/sweet-swan-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sympathetic-squid-bubblegum',
      to: 'veefriends/social/sympathetic-squid-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sympathetic-squid-core',
      to: 'veefriends/social/sympathetic-squid-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sympathetic-squid-diamond',
      to: 'veefriends/social/sympathetic-squid-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sympathetic-squid-emerald',
      to: 'veefriends/social/sympathetic-squid-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sympathetic-squid-epic',
      to: 'veefriends/social/sympathetic-squid-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sympathetic-squid-hologram',
      to: 'veefriends/social/sympathetic-squid-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/sympathetic-squid-lava',
      to: 'veefriends/social/sympathetic-squid-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tasteful-malayan-tapir-bubblegum',
      to: 'veefriends/social/tasteful-malayan-tapir-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tasteful-malayan-tapir-core',
      to: 'veefriends/social/tasteful-malayan-tapir-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tasteful-malayan-tapir-diamond',
      to: 'veefriends/social/tasteful-malayan-tapir-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tasteful-malayan-tapir-emerald',
      to: 'veefriends/social/tasteful-malayan-tapir-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tasteful-malayan-tapir-epic',
      to: 'veefriends/social/tasteful-malayan-tapir-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tasteful-malayan-tapir-gold',
      to: 'veefriends/social/tasteful-malayan-tapir-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tasteful-malayan-tapir-hologram',
      to: 'veefriends/social/tasteful-malayan-tapir-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tasteful-malayan-tapir-lava',
      to: 'veefriends/social/tasteful-malayan-tapir-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-termite-bubblegum',
      to: 'veefriends/social/tenacious-termite-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-termite-core',
      to: 'veefriends/social/tenacious-termite-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-termite-diamond',
      to: 'veefriends/social/tenacious-termite-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-termite-emerald',
      to: 'veefriends/social/tenacious-termite-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-termite-epic',
      to: 'veefriends/social/tenacious-termite-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-termite-hologram',
      to: 'veefriends/social/tenacious-termite-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-termite-lava',
      to: 'veefriends/social/tenacious-termite-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-turkey-bubblegum',
      to: 'veefriends/social/tenacious-turkey-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-turkey-core',
      to: 'veefriends/social/tenacious-turkey-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-turkey-diamond',
      to: 'veefriends/social/tenacious-turkey-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-turkey-emerald',
      to: 'veefriends/social/tenacious-turkey-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-turkey-epic',
      to: 'veefriends/social/tenacious-turkey-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-turkey-gold',
      to: 'veefriends/social/tenacious-turkey-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-turkey-hologram',
      to: 'veefriends/social/tenacious-turkey-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tenacious-turkey-lava',
      to: 'veefriends/social/tenacious-turkey-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-oak-monster-bubblegum',
      to: 'veefriends/social/the-oak-monster-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-oak-monster-core',
      to: 'veefriends/social/the-oak-monster-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-oak-monster-diamond',
      to: 'veefriends/social/the-oak-monster-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-oak-monster-emerald',
      to: 'veefriends/social/the-oak-monster-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-oak-monster-epic',
      to: 'veefriends/social/the-oak-monster-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-oak-monster-hologram',
      to: 'veefriends/social/the-oak-monster-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-oak-monster-lava',
      to: 'veefriends/social/the-oak-monster-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-world-has-plenty-of-love-start-listening-to-it-bubblegum',
      to: 'veefriends/social/the-world-has-plenty-of-love-start-listening-to-it-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-world-has-plenty-of-love-start-listening-to-it-core',
      to: 'veefriends/social/the-world-has-plenty-of-love-start-listening-to-it-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-world-has-plenty-of-love-start-listening-to-it-diamond',
      to: 'veefriends/social/the-world-has-plenty-of-love-start-listening-to-it-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-world-has-plenty-of-love-start-listening-to-it-emerald',
      to: 'veefriends/social/the-world-has-plenty-of-love-start-listening-to-it-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-world-has-plenty-of-love-start-listening-to-it-epic',
      to: 'veefriends/social/the-world-has-plenty-of-love-start-listening-to-it-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-world-has-plenty-of-love-start-listening-to-it-gold',
      to: 'veefriends/social/the-world-has-plenty-of-love-start-listening-to-it-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-world-has-plenty-of-love-start-listening-to-it-hologram',
      to: 'veefriends/social/the-world-has-plenty-of-love-start-listening-to-it-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/the-world-has-plenty-of-love-start-listening-to-it-lava',
      to: 'veefriends/social/the-world-has-plenty-of-love-start-listening-to-it-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/thoughtful-three-horned-harpik-bubblegum',
      to: 'veefriends/social/thoughtful-three-horned-harpik-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/thoughtful-three-horned-harpik-core',
      to: 'veefriends/social/thoughtful-three-horned-harpik-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/thoughtful-three-horned-harpik-diamond',
      to: 'veefriends/social/thoughtful-three-horned-harpik-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/thoughtful-three-horned-harpik-emerald',
      to: 'veefriends/social/thoughtful-three-horned-harpik-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/thoughtful-three-horned-harpik-epic',
      to: 'veefriends/social/thoughtful-three-horned-harpik-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/thoughtful-three-horned-harpik-gold',
      to: 'veefriends/social/thoughtful-three-horned-harpik-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/thoughtful-three-horned-harpik-hologram',
      to: 'veefriends/social/thoughtful-three-horned-harpik-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/thoughtful-three-horned-harpik-lava',
      to: 'veefriends/social/thoughtful-three-horned-harpik-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tidy-troll-bubblegum',
      to: 'veefriends/social/tidy-troll-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tidy-troll-core',
      to: 'veefriends/social/tidy-troll-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tidy-troll-diamond',
      to: 'veefriends/social/tidy-troll-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tidy-troll-emerald',
      to: 'veefriends/social/tidy-troll-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tidy-troll-epic',
      to: 'veefriends/social/tidy-troll-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tidy-troll-hologram',
      to: 'veefriends/social/tidy-troll-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tidy-troll-lava',
      to: 'veefriends/social/tidy-troll-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/to-the-moon-meerkat-bubblegum',
      to: 'veefriends/social/to-the-moon-meerkat-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/to-the-moon-meerkat-core',
      to: 'veefriends/social/to-the-moon-meerkat-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/to-the-moon-meerkat-diamond',
      to: 'veefriends/social/to-the-moon-meerkat-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/to-the-moon-meerkat-emerald',
      to: 'veefriends/social/to-the-moon-meerkat-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/to-the-moon-meerkat-epic',
      to: 'veefriends/social/to-the-moon-meerkat-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/to-the-moon-meerkat-gold',
      to: 'veefriends/social/to-the-moon-meerkat-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/to-the-moon-meerkat-hologram',
      to: 'veefriends/social/to-the-moon-meerkat-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/to-the-moon-meerkat-lava',
      to: 'veefriends/social/to-the-moon-meerkat-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tortoise-bubblegum',
      to: 'veefriends/social/tolerant-tortoise-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tortoise-core',
      to: 'veefriends/social/tolerant-tortoise-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tortoise-diamond',
      to: 'veefriends/social/tolerant-tortoise-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tortoise-emerald',
      to: 'veefriends/social/tolerant-tortoise-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tortoise-epic',
      to: 'veefriends/social/tolerant-tortoise-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tortoise-hologram',
      to: 'veefriends/social/tolerant-tortoise-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tortoise-lava',
      to: 'veefriends/social/tolerant-tortoise-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tuna-bubblegum',
      to: 'veefriends/social/tolerant-tuna-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tuna-core',
      to: 'veefriends/social/tolerant-tuna-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tuna-diamond',
      to: 'veefriends/social/tolerant-tuna-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tuna-emerald',
      to: 'veefriends/social/tolerant-tuna-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tuna-epic',
      to: 'veefriends/social/tolerant-tuna-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tuna-gold',
      to: 'veefriends/social/tolerant-tuna-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tuna-hologram',
      to: 'veefriends/social/tolerant-tuna-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tolerant-tuna-lava',
      to: 'veefriends/social/tolerant-tuna-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/toronto-st-louis-bubblegum',
      to: 'veefriends/social/toronto-st-louis-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/toronto-st-louis-core',
      to: 'veefriends/social/toronto-st-louis-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/toronto-st-louis-diamond',
      to: 'veefriends/social/toronto-st-louis-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/toronto-st-louis-emerald',
      to: 'veefriends/social/toronto-st-louis-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/toronto-st-louis-epic',
      to: 'veefriends/social/toronto-st-louis-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/toronto-st-louis-gold',
      to: 'veefriends/social/toronto-st-louis-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/toronto-st-louis-hologram',
      to: 'veefriends/social/toronto-st-louis-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/toronto-st-louis-lava',
      to: 'veefriends/social/toronto-st-louis-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tough-to-beat-a-worm-from-the-dirt-bubblegum',
      to: 'veefriends/social/tough-to-beat-a-worm-from-the-dirt-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tough-to-beat-a-worm-from-the-dirt-core',
      to: 'veefriends/social/tough-to-beat-a-worm-from-the-dirt-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tough-to-beat-a-worm-from-the-dirt-diamond',
      to: 'veefriends/social/tough-to-beat-a-worm-from-the-dirt-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tough-to-beat-a-worm-from-the-dirt-emerald',
      to: 'veefriends/social/tough-to-beat-a-worm-from-the-dirt-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tough-to-beat-a-worm-from-the-dirt-epic',
      to: 'veefriends/social/tough-to-beat-a-worm-from-the-dirt-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tough-to-beat-a-worm-from-the-dirt-gold',
      to: 'veefriends/social/tough-to-beat-a-worm-from-the-dirt-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tough-to-beat-a-worm-from-the-dirt-hologram',
      to: 'veefriends/social/tough-to-beat-a-worm-from-the-dirt-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tough-to-beat-a-worm-from-the-dirt-lava',
      to: 'veefriends/social/tough-to-beat-a-worm-from-the-dirt-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tranquil-toad-bubblegum',
      to: 'veefriends/social/tranquil-toad-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tranquil-toad-core',
      to: 'veefriends/social/tranquil-toad-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tranquil-toad-diamond',
      to: 'veefriends/social/tranquil-toad-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tranquil-toad-emerald',
      to: 'veefriends/social/tranquil-toad-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tranquil-toad-epic',
      to: 'veefriends/social/tranquil-toad-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tranquil-toad-gold',
      to: 'veefriends/social/tranquil-toad-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tranquil-toad-hologram',
      to: 'veefriends/social/tranquil-toad-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tranquil-toad-lava',
      to: 'veefriends/social/tranquil-toad-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tremendous-tiger-bubblegum',
      to: 'veefriends/social/tremendous-tiger-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tremendous-tiger-core',
      to: 'veefriends/social/tremendous-tiger-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tremendous-tiger-diamond',
      to: 'veefriends/social/tremendous-tiger-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tremendous-tiger-emerald',
      to: 'veefriends/social/tremendous-tiger-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tremendous-tiger-epic',
      to: 'veefriends/social/tremendous-tiger-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tremendous-tiger-hologram',
      to: 'veefriends/social/tremendous-tiger-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/tremendous-tiger-lava',
      to: 'veefriends/social/tremendous-tiger-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/truculent-t-rex-bubblegum',
      to: 'veefriends/social/truculent-t-rex-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/truculent-t-rex-core',
      to: 'veefriends/social/truculent-t-rex-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/truculent-t-rex-diamond',
      to: 'veefriends/social/truculent-t-rex-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/truculent-t-rex-emerald',
      to: 'veefriends/social/truculent-t-rex-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/truculent-t-rex-epic',
      to: 'veefriends/social/truculent-t-rex-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/truculent-t-rex-gold',
      to: 'veefriends/social/truculent-t-rex-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/truculent-t-rex-hologram',
      to: 'veefriends/social/truculent-t-rex-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/truculent-t-rex-lava',
      to: 'veefriends/social/truculent-t-rex-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/trusting-tarantula-bubblegum',
      to: 'veefriends/social/trusting-tarantula-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/trusting-tarantula-core',
      to: 'veefriends/social/trusting-tarantula-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/trusting-tarantula-diamond',
      to: 'veefriends/social/trusting-tarantula-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/trusting-tarantula-emerald',
      to: 'veefriends/social/trusting-tarantula-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/trusting-tarantula-epic',
      to: 'veefriends/social/trusting-tarantula-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/trusting-tarantula-hologram',
      to: 'veefriends/social/trusting-tarantula-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/trusting-tarantula-lava',
      to: 'veefriends/social/trusting-tarantula-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/turnt-tick-bubblegum',
      to: 'veefriends/social/turnt-tick-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/turnt-tick-core',
      to: 'veefriends/social/turnt-tick-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/turnt-tick-diamond',
      to: 'veefriends/social/turnt-tick-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/turnt-tick-emerald',
      to: 'veefriends/social/turnt-tick-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/turnt-tick-epic',
      to: 'veefriends/social/turnt-tick-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/turnt-tick-gold',
      to: 'veefriends/social/turnt-tick-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/turnt-tick-hologram',
      to: 'veefriends/social/turnt-tick-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/turnt-tick-lava',
      to: 'veefriends/social/turnt-tick-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/unwavering-urchin-bubblegum',
      to: 'veefriends/social/unwavering-urchin-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/unwavering-urchin-core',
      to: 'veefriends/social/unwavering-urchin-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/unwavering-urchin-diamond',
      to: 'veefriends/social/unwavering-urchin-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/unwavering-urchin-emerald',
      to: 'veefriends/social/unwavering-urchin-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/unwavering-urchin-epic',
      to: 'veefriends/social/unwavering-urchin-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/unwavering-urchin-gold',
      to: 'veefriends/social/unwavering-urchin-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/unwavering-urchin-hologram',
      to: 'veefriends/social/unwavering-urchin-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/unwavering-urchin-lava',
      to: 'veefriends/social/unwavering-urchin-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/versatile-viking-bubblegum',
      to: 'veefriends/social/versatile-viking-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/versatile-viking-core',
      to: 'veefriends/social/versatile-viking-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/versatile-viking-diamond',
      to: 'veefriends/social/versatile-viking-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/versatile-viking-emerald',
      to: 'veefriends/social/versatile-viking-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/versatile-viking-epic',
      to: 'veefriends/social/versatile-viking-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/versatile-viking-hologram',
      to: 'veefriends/social/versatile-viking-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/versatile-viking-lava',
      to: 'veefriends/social/versatile-viking-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/very-very-very-very-lucky-black-cat-bubblegum',
      to: 'veefriends/social/very-very-very-very-lucky-black-cat-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/very-very-very-very-lucky-black-cat-core',
      to: 'veefriends/social/very-very-very-very-lucky-black-cat-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/very-very-very-very-lucky-black-cat-diamond',
      to: 'veefriends/social/very-very-very-very-lucky-black-cat-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/very-very-very-very-lucky-black-cat-emerald',
      to: 'veefriends/social/very-very-very-very-lucky-black-cat-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/very-very-very-very-lucky-black-cat-epic',
      to: 'veefriends/social/very-very-very-very-lucky-black-cat-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/very-very-very-very-lucky-black-cat-gold',
      to: 'veefriends/social/very-very-very-very-lucky-black-cat-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/very-very-very-very-lucky-black-cat-hologram',
      to: 'veefriends/social/very-very-very-very-lucky-black-cat-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/very-very-very-very-lucky-black-cat-lava',
      to: 'veefriends/social/very-very-very-very-lucky-black-cat-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/viben-vampire-bubblegum',
      to: 'veefriends/social/viben-vampire-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/viben-vampire-core',
      to: 'veefriends/social/viben-vampire-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/viben-vampire-diamond',
      to: 'veefriends/social/viben-vampire-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/viben-vampire-emerald',
      to: 'veefriends/social/viben-vampire-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/viben-vampire-epic',
      to: 'veefriends/social/viben-vampire-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/viben-vampire-hologram',
      to: 'veefriends/social/viben-vampire-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/viben-vampire-lava',
      to: 'veefriends/social/viben-vampire-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/warm-wolverine-bubblegum',
      to: 'veefriends/social/warm-wolverine-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/warm-wolverine-core',
      to: 'veefriends/social/warm-wolverine-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/warm-wolverine-diamond',
      to: 'veefriends/social/warm-wolverine-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/warm-wolverine-emerald',
      to: 'veefriends/social/warm-wolverine-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/warm-wolverine-epic',
      to: 'veefriends/social/warm-wolverine-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/warm-wolverine-gold',
      to: 'veefriends/social/warm-wolverine-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/warm-wolverine-hologram',
      to: 'veefriends/social/warm-wolverine-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/warm-wolverine-lava',
      to: 'veefriends/social/warm-wolverine-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-connected-werewolf-bubblegum',
      to: 'veefriends/social/well-connected-werewolf-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-connected-werewolf-core',
      to: 'veefriends/social/well-connected-werewolf-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-connected-werewolf-diamond',
      to: 'veefriends/social/well-connected-werewolf-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-connected-werewolf-emerald',
      to: 'veefriends/social/well-connected-werewolf-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-connected-werewolf-epic',
      to: 'veefriends/social/well-connected-werewolf-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-connected-werewolf-gold',
      to: 'veefriends/social/well-connected-werewolf-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-connected-werewolf-hologram',
      to: 'veefriends/social/well-connected-werewolf-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-connected-werewolf-lava',
      to: 'veefriends/social/well-connected-werewolf-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-rounded-warthog-bubblegum',
      to: 'veefriends/social/well-rounded-warthog-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-rounded-warthog-core',
      to: 'veefriends/social/well-rounded-warthog-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-rounded-warthog-diamond',
      to: 'veefriends/social/well-rounded-warthog-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-rounded-warthog-emerald',
      to: 'veefriends/social/well-rounded-warthog-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-rounded-warthog-epic',
      to: 'veefriends/social/well-rounded-warthog-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-rounded-warthog-gold',
      to: 'veefriends/social/well-rounded-warthog-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-rounded-warthog-hologram',
      to: 'veefriends/social/well-rounded-warthog-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/well-rounded-warthog-lava',
      to: 'veefriends/social/well-rounded-warthog-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/when-you-live-for-their-validation-you-arent-living-bubblegum',
      to: 'veefriends/social/when-you-live-for-their-validation-you-arent-living-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/when-you-live-for-their-validation-you-arent-living-core',
      to: 'veefriends/social/when-you-live-for-their-validation-you-arent-living-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/when-you-live-for-their-validation-you-arent-living-diamond',
      to: 'veefriends/social/when-you-live-for-their-validation-you-arent-living-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/when-you-live-for-their-validation-you-arent-living-emerald',
      to: 'veefriends/social/when-you-live-for-their-validation-you-arent-living-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/when-you-live-for-their-validation-you-arent-living-epic',
      to: 'veefriends/social/when-you-live-for-their-validation-you-arent-living-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/when-you-live-for-their-validation-you-arent-living-gold',
      to: 'veefriends/social/when-you-live-for-their-validation-you-arent-living-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/when-you-live-for-their-validation-you-arent-living-hologram',
      to: 'veefriends/social/when-you-live-for-their-validation-you-arent-living-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/when-you-live-for-their-validation-you-arent-living-lava',
      to: 'veefriends/social/when-you-live-for-their-validation-you-arent-living-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/whimsical-wolf-bubblegum',
      to: 'veefriends/social/whimsical-wolf-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/whimsical-wolf-core',
      to: 'veefriends/social/whimsical-wolf-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/whimsical-wolf-diamond',
      to: 'veefriends/social/whimsical-wolf-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/whimsical-wolf-emerald',
      to: 'veefriends/social/whimsical-wolf-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/whimsical-wolf-epic',
      to: 'veefriends/social/whimsical-wolf-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/whimsical-wolf-hologram',
      to: 'veefriends/social/whimsical-wolf-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/whimsical-wolf-lava',
      to: 'veefriends/social/whimsical-wolf-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/who-was-born-in-1997-bubblegum',
      to: 'veefriends/social/who-was-born-in-1997-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/who-was-born-in-1997-core',
      to: 'veefriends/social/who-was-born-in-1997-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/who-was-born-in-1997-diamond',
      to: 'veefriends/social/who-was-born-in-1997-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/who-was-born-in-1997-emerald',
      to: 'veefriends/social/who-was-born-in-1997-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/who-was-born-in-1997-epic',
      to: 'veefriends/social/who-was-born-in-1997-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/who-was-born-in-1997-gold',
      to: 'veefriends/social/who-was-born-in-1997-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/who-was-born-in-1997-hologram',
      to: 'veefriends/social/who-was-born-in-1997-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/who-was-born-in-1997-lava',
      to: 'veefriends/social/who-was-born-in-1997-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wild-wallaby-bubblegum',
      to: 'veefriends/social/wild-wallaby-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wild-wallaby-core',
      to: 'veefriends/social/wild-wallaby-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wild-wallaby-diamond',
      to: 'veefriends/social/wild-wallaby-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wild-wallaby-emerald',
      to: 'veefriends/social/wild-wallaby-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wild-wallaby-epic',
      to: 'veefriends/social/wild-wallaby-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wild-wallaby-hologram',
      to: 'veefriends/social/wild-wallaby-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wild-wallaby-lava',
      to: 'veefriends/social/wild-wallaby-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/willful-wizard-bubblegum',
      to: 'veefriends/social/willful-wizard-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/willful-wizard-core',
      to: 'veefriends/social/willful-wizard-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/willful-wizard-diamond',
      to: 'veefriends/social/willful-wizard-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/willful-wizard-emerald',
      to: 'veefriends/social/willful-wizard-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/willful-wizard-epic',
      to: 'veefriends/social/willful-wizard-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/willful-wizard-gold',
      to: 'veefriends/social/willful-wizard-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/willful-wizard-hologram',
      to: 'veefriends/social/willful-wizard-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/willful-wizard-lava',
      to: 'veefriends/social/willful-wizard-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wily-wild-boar-bubblegum',
      to: 'veefriends/social/wily-wild-boar-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wily-wild-boar-core',
      to: 'veefriends/social/wily-wild-boar-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wily-wild-boar-diamond',
      to: 'veefriends/social/wily-wild-boar-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wily-wild-boar-emerald',
      to: 'veefriends/social/wily-wild-boar-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wily-wild-boar-epic',
      to: 'veefriends/social/wily-wild-boar-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wily-wild-boar-gold',
      to: 'veefriends/social/wily-wild-boar-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wily-wild-boar-hologram',
      to: 'veefriends/social/wily-wild-boar-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wily-wild-boar-lava',
      to: 'veefriends/social/wily-wild-boar-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wise-wasp-bubblegum',
      to: 'veefriends/social/wise-wasp-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wise-wasp-core',
      to: 'veefriends/social/wise-wasp-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wise-wasp-diamond',
      to: 'veefriends/social/wise-wasp-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wise-wasp-emerald',
      to: 'veefriends/social/wise-wasp-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wise-wasp-epic',
      to: 'veefriends/social/wise-wasp-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wise-wasp-hologram',
      to: 'veefriends/social/wise-wasp-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/wise-wasp-lava',
      to: 'veefriends/social/wise-wasp-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/witty-weasel-bubblegum',
      to: 'veefriends/social/witty-weasel-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/witty-weasel-core',
      to: 'veefriends/social/witty-weasel-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/witty-weasel-diamond',
      to: 'veefriends/social/witty-weasel-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/witty-weasel-emerald',
      to: 'veefriends/social/witty-weasel-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/witty-weasel-epic',
      to: 'veefriends/social/witty-weasel-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/witty-weasel-gold',
      to: 'veefriends/social/witty-weasel-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/witty-weasel-hologram',
      to: 'veefriends/social/witty-weasel-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/witty-weasel-lava',
      to: 'veefriends/social/witty-weasel-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/woke-walrus-bubblegum',
      to: 'veefriends/social/woke-walrus-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/woke-walrus-core',
      to: 'veefriends/social/woke-walrus-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/woke-walrus-diamond',
      to: 'veefriends/social/woke-walrus-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/woke-walrus-emerald',
      to: 'veefriends/social/woke-walrus-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/woke-walrus-epic',
      to: 'veefriends/social/woke-walrus-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/woke-walrus-hologram',
      to: 'veefriends/social/woke-walrus-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/woke-walrus-lava',
      to: 'veefriends/social/woke-walrus-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/yolo-yak-bubblegum',
      to: 'veefriends/social/yolo-yak-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/yolo-yak-core',
      to: 'veefriends/social/yolo-yak-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/yolo-yak-diamond',
      to: 'veefriends/social/yolo-yak-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/yolo-yak-emerald',
      to: 'veefriends/social/yolo-yak-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/yolo-yak-epic',
      to: 'veefriends/social/yolo-yak-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/yolo-yak-gold',
      to: 'veefriends/social/yolo-yak-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/yolo-yak-hologram',
      to: 'veefriends/social/yolo-yak-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/yolo-yak-lava',
      to: 'veefriends/social/yolo-yak-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/your-poor-relationship-with-time-is-your-biggest-vulnerability-bubblegum',
      to: 'veefriends/social/your-poor-relationship-with-time-is-your-biggest-vulnerability-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/your-poor-relationship-with-time-is-your-biggest-vulnerability-core',
      to: 'veefriends/social/your-poor-relationship-with-time-is-your-biggest-vulnerability-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/your-poor-relationship-with-time-is-your-biggest-vulnerability-diamond',
      to: 'veefriends/social/your-poor-relationship-with-time-is-your-biggest-vulnerability-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/your-poor-relationship-with-time-is-your-biggest-vulnerability-emerald',
      to: 'veefriends/social/your-poor-relationship-with-time-is-your-biggest-vulnerability-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/your-poor-relationship-with-time-is-your-biggest-vulnerability-epic',
      to: 'veefriends/social/your-poor-relationship-with-time-is-your-biggest-vulnerability-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/your-poor-relationship-with-time-is-your-biggest-vulnerability-gold',
      to: 'veefriends/social/your-poor-relationship-with-time-is-your-biggest-vulnerability-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/your-poor-relationship-with-time-is-your-biggest-vulnerability-hologram',
      to: 'veefriends/social/your-poor-relationship-with-time-is-your-biggest-vulnerability-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/your-poor-relationship-with-time-is-your-biggest-vulnerability-lava',
      to: 'veefriends/social/your-poor-relationship-with-time-is-your-biggest-vulnerability-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/youre-gonna-die-fly-bubblegum',
      to: 'veefriends/social/youre-gonna-die-fly-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/youre-gonna-die-fly-core',
      to: 'veefriends/social/youre-gonna-die-fly-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/youre-gonna-die-fly-diamond',
      to: 'veefriends/social/youre-gonna-die-fly-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/youre-gonna-die-fly-emerald',
      to: 'veefriends/social/youre-gonna-die-fly-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/youre-gonna-die-fly-epic',
      to: 'veefriends/social/youre-gonna-die-fly-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/youre-gonna-die-fly-gold',
      to: 'veefriends/social/youre-gonna-die-fly-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/youre-gonna-die-fly-hologram',
      to: 'veefriends/social/youre-gonna-die-fly-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/youre-gonna-die-fly-lava',
      to: 'veefriends/social/youre-gonna-die-fly-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/zealous-zombie-bubblegum',
      to: 'veefriends/social/zealous-zombie-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/zealous-zombie-core',
      to: 'veefriends/social/zealous-zombie-core',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/zealous-zombie-diamond',
      to: 'veefriends/social/zealous-zombie-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/zealous-zombie-emerald',
      to: 'veefriends/social/zealous-zombie-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/zealous-zombie-epic',
      to: 'veefriends/social/zealous-zombie-epic',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/zealous-zombie-gold',
      to: 'veefriends/social/zealous-zombie-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/zealous-zombie-hologram',
      to: 'veefriends/social/zealous-zombie-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/zealous-zombie-lava',
      to: 'veefriends/social/zealous-zombie-lava',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/zestful-zebra-bubblegum',
      to: 'veefriends/social/zestful-zebra-bubblegum',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/zestful-zebra-diamond',
      to: 'veefriends/social/zestful-zebra-diamond',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/zestful-zebra-emerald',
      to: 'veefriends/social/zestful-zebra-emerald',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/zestful-zebra-gold',
      to: 'veefriends/social/zestful-zebra-gold',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/zestful-zebra-hologram',
      to: 'veefriends/social/zestful-zebra-hologram',
      reason: 'No rarity suffix'
    },
    {
      from: 'veefriends/cards/zestful-zebra-lava',
      to: 'veefriends/social/zestful-zebra-lava',
      reason: 'No rarity suffix'
    }
  ];

  console.log(`🚀 Moving ${moves.length} misplaced images...`);
  
  for (const move of moves) {
    try {
      console.log(`📁 Moving: ${move.from} → ${move.to}`);
      await cloudinary.uploader.rename(move.from, move.to);
      console.log(`   ✅ Success`);
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`);
    }
  }
}

moveImages();