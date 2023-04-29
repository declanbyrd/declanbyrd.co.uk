const { getBook } = require('../utils');

const BOOK = '9781804911150';
const PAGES = 132;

module.exports = async () => {
  return {
    reading: await getBook(BOOK, PAGES),
  };
};
