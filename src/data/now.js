const { getBook } = require('../utils');

const BOOK = '9781804910245';
const PAGES = 200;

module.exports = async () => {
  return {
    reading: await getBook(BOOK, PAGES),
  };
};
