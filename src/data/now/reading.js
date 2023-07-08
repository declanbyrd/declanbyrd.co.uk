const { getBook } = require('../../utils');

const BOOK = '9781846536892';

module.exports = async () => {
  return await getBook(BOOK, 312);
};
