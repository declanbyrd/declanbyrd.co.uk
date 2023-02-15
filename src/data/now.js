const { getBook } = require('../utils');

const BOOK = '9781804911136';
const PAGES = 164;

module.exports = async () => {
  return {
    reading: await getBook(BOOK, PAGES),
  };
};
