const { getBook } = require('../../utils');

module.exports = {
  layout: 'layouts/book.njk',
  permalink: '/reading/{{page.fileSlug}}/',
  eleventyComputed: {
    book: async (data) => await getBook(data.isbn, data.pages),
    title: (data) => data.book.title,
    description: (data) =>
      `Declan's notes for ${data.book.title} by ${data.book.authors}`,
  },
};
