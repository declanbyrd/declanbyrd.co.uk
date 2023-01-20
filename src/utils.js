const isbn = require('node-isbn');

module.exports.getBook = async (bookIsbn, pages) => {
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
        pageCount: book.pageCount !== 0 ? book.pageCount : pages,
        description: rest,
        summary: start,
      };
    });
};
