const { getGames } = require('../../utils');

module.exports = async () => {
  const games = await getGames();
  return games.filter((game) => game.tags.includes('Now Playing'));
};
