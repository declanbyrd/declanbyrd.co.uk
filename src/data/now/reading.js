const { getBook } = require('../../utils');

const BOOK = '9781804910542';

module.exports = async () => {
  return await getBook(BOOK, 304);
};
