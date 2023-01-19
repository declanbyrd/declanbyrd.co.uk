const { getBook } = require('../utils');

const BOOK = '9781804910269';

module.exports = async () => {
  return {
    reading: await getBook(BOOK),
  };
};
