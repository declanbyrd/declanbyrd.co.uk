const { getBook } = require('../utils');

const BOOK = '9781804910252';

module.exports = async () => {
  return {
    reading: await getBook(BOOK),
  };
};
