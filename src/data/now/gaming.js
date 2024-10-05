import { getGames } from '../../utils.js';

export default async () => {
  const games = await getGames();
  return games.filter((game) => game.tags.includes('Now Playing'));
};
