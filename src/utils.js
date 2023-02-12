const isbn = require('node-isbn');
const flatCache = require('flat-cache');
const path = require('path');

module.exports.getBook = async (bookIsbn, pages) => {
  const cache = flatCache.load(bookIsbn, path.resolve('.cache'));
  const cachedBook = cache.getKey(bookIsbn);
  if (cachedBook) {
    console.log(`>>> Got data for ${bookIsbn} from the cache`);
    return cachedBook;
  }
  console.log(`>>> Fetching data for ${bookIsbn}`);
  const TIMEOUT = 30000;
  return isbn
    .provider([isbn.PROVIDER_NAMES.GOOGLE])
    .resolve(bookIsbn, { timeout: TIMEOUT })
    .then((book) => {
      const words = book.description.split(' ');
      const start = words.slice(0, 25).join(' ');
      const rest = [' ', ...words.slice(25)].join(' ');
      const newBook = {
        title: book.title,
        authors: book.authors.join(', '),
        thumbnail: book.imageLinks.smallThumbnail,
        pageCount: book.pageCount !== 0 ? book.pageCount : pages,
        description: rest,
        summary: start,
      };
      cache.setKey(bookIsbn, newBook);
      cache.save();
      return newBook;
    });
};
