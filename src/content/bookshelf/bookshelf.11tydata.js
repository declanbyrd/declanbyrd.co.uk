const isbn = require('node-isbn');

/*
  By default the library has a timeout of 5 seconds.
  This means that any request that takes longer than 5 seconds will error.
  Frustrating when the API is slow and out of your control.
  By setting a large timeout value, if the API is slow it will not break the build.
  If it doesn't resolve then it will just error later, but hopefully this won't be the case.
  This line here is also why it wouldn't work when I tried moving the shortcodes before.
 */
const TIMEOUT = 30000;

const getBook = async (bookIsbn) => {
  return isbn
    .provider([isbn.PROVIDER_NAMES.GOOGLE])
    .resolve(bookIsbn, { timeout: TIMEOUT })
    .then((book) => {
      return {
        title: book.title,
        authors: book.authors.join(', '),
        thumbnail: book.imageLinks.smallThumbnail,
        pageCount: book.pageCount,
        description: book.description,
        summary: book.description.split(' ').slice(0, 25).join(' '),
      };
    });
};

module.exports = {
  layout: 'layouts/book.njk',
  permalink: '/reading/{{page.fileSlug}}/',
  eleventyComputed: {
    book: async (data) => await getBook(data.isbn),
  },
};
