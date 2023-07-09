const { getBook } = require('../../utils');

const BOOK = '9781444775815';

module.exports = async () => {
  return await getBook(BOOK, 320);
};
