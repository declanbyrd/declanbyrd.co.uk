const isbn = require('node-isbn');
const image = require('./cloudImage');

const bookShortcode = async (bookIsbn, preview = false) => {
  const book = await isbn.provider(['google']).resolve(bookIsbn);

  if (preview) {
    return `<a href="/reading/${bookIsbn}/" >
    <div class="book-container preview">
      ${await image(
        book.imageLinks.smallThumbnail,
        `book cover for ${book.title}`
      )}
      <div>
        <p>${book.title}</p>
        <p>by ${book.authors.join(', ')}</p>
      </div>
    </div>
  </a>`;
  }
  const words = book.description.split(' ');
  const start = words.slice(0, 25).join(' ');
  const rest = [' ', ...words.slice(25)].join(' ');
  return `<div class="book-container">
    ${await image(
      book.imageLinks.smallThumbnail,
      `book cover for ${book.title}`
    )}
    <div>
      <h2>${book.title}</h2>
      <p>by ${book.authors.join(', ')}</p>
      <p>${book.pageCount} pages</p>
    </div>
    <details><summary>${start}</summary>${rest}</details>
  </div>`;
};

module.exports = bookShortcode;
