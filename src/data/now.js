const { getBook } = require('../utils');

const BOOK = '0321965515';

const data = {
  work: {
    role: 'software engineer',
    company: {
      name: 'Twilio',
      website: 'https://twilio.com',
    },
  },
  reading: '0321965515',
  gaming: {
    game: 'Spider-man',
    platform: 'Playstation 5',
  },
};

module.exports = async () => {
  return {
    reading: await getBook(BOOK),
  };
};
