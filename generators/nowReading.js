// @ts-check

const fs = require('fs');
const { getBook } = require('../src/utils');

const NOW_READING = 'src/data/now/reading.json';

const updateNowReading = async () => {
  const isbn = process.argv[2];
  const book = await getBook(isbn);
  const bookDetails = JSON.stringify(
    { isbn, ...book, started: new Date() },
    null,
    2
  );
  fs.writeFile(NOW_READING, bookDetails, (err) => {
    if (err) throw err;
    console.log(`Added book details for ${book.title} to ${NOW_READING}`);
  });
};

updateNowReading();
