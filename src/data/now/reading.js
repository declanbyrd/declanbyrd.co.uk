const { getBook } = require('../../utils');

const BOOK = '9781787463004';

module.exports = async () => {
  return await getBook(BOOK, 433);
};
