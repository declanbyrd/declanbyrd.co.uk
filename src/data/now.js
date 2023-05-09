const { getBook } = require('../utils');

const BOOK = '9781399402804';
const PAGES = 177;

module.exports = async () => {
  return {
    reading: await getBook(BOOK, PAGES),
  };
};
