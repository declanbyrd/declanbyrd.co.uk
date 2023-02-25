const { getBook } = require('../utils');

const BOOK = '9781529019001';
const PAGES = 164;

module.exports = async () => {
  return {
    reading: await getBook(BOOK),
  };
};
