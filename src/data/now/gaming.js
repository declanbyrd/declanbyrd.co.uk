const fetch = require('node-fetch');
require('dotenv').config();

module.exports = async () => {
  const url = `https://api.raindrop.io/rest/v1/raindrops/${process.env.RAINDROPP_GAMES_COLLECTION_ID}`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.RAINDROP_TOKEN}`,
    },
  });

  const games = await req.json();
  return games.items;
};
