const { getBook } = require('../utils');

const BOOK = '9781839762024';
const PAGES = 200;

module.exports = async () => {
  return {
    reading: await getBook(BOOK),
  };
};
