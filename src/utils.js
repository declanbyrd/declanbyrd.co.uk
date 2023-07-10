const isbn = require('node-isbn');
const EleventyFetch = require('@11ty/eleventy-fetch');
require('dotenv').config();

module.exports.getBook = async (bookIsbn) => {
  console.log(`>>> Fetching data for ${bookIsbn}`);
  const TIMEOUT = 30000;
  return isbn
    .provider([isbn.PROVIDER_NAMES.GOOGLE])
    .resolve(bookIsbn, { timeout: TIMEOUT })
    .then((book) => {
      const words = book.description.split(' ');
      const start = words.slice(0, 25).join(' ');
      const rest = [' ', ...words.slice(25)].join(' ');
      return {
        title: book.title,
        authors: book.authors.join(', '),
        thumbnail: book.imageLinks.smallThumbnail,
        pageCount: book.pageCount,
        description: rest,
        summary: start,
      };
    });
};

module.exports.getGames = async () => {
  const url = `https://api.raindrop.io/rest/v1/raindrops/${process.env.RAINDROPP_GAMES_COLLECTION_ID}`;
  const games = await EleventyFetch(url, {
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${process.env.RAINDROP_TOKEN}`,
      },
    },
    duration: '1d',
    type: 'json',
  });
  return games.items;
};
