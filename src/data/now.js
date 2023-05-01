const { getBook } = require('../utils');

const BOOK = '9781399402804';
const PAGES = 132;

module.exports = async () => {
  return {
    reading: await getBook(BOOK),
  };
};
