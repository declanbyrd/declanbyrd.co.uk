const isbn = require('node-isbn');
const image = require('./cloudImage');

const nowReading = async (bookIsbn) => {
  const book = await isbn.resolve(bookIsbn);
  return `<div class="book-container now-reading">
    ${await image(
      book.imageLinks.smallThumbnail,
      `book cover for ${book.title}`
    )}
    <div>
      <a href="/reading/${bookIsbn}/">${book.title}</a>
      <p>by ${book.authors.join(', ')}</p>
    </div>
  </div>`;
};

module.exports = nowReading;
