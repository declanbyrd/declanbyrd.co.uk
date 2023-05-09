const {
  exchangeNpssoForCode,
  exchangeCodeForAccessToken,
  getRecentlyPlayedGames,
} = require('psn-api');

require('dotenv').config();

module.exports = async function () {
  const accessCode = await exchangeNpssoForCode(process.env.NPSSO);
  const auth = await exchangeCodeForAccessToken(accessCode);

  const games = await getRecentlyPlayedGames(auth, { limit: 4 });

  return games.data.gameLibraryTitlesRetrieve.games;
};
