const { getBook } = require('../../utils');

const BOOK = '9781846532894';

module.exports = async () => {
  return await getBook(BOOK);
};
