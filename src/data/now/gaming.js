import { getGames } from '../../utils.js';

export const nowGaming = async () => {
  const games = await getGames();
  return games.filter((game) => game.tags.includes('Now Playing'));
};
