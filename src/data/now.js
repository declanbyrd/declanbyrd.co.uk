const { getBook } = require('../utils');

const BOOK = '9781846532894';
const PAGES = 177;

module.exports = async () => {
  return {
    reading: await getBook(BOOK),
  };
};
