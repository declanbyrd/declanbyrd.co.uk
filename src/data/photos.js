'use strict';
require('dotenv').config();
const axios = require('axios');

const createFlickrUrl = photo => {
  return (
    'https://farm' +
    photo.farm +
    '.staticflickr.com/' +
    photo.server +
    '/' +
    photo.id +
    '_' +
    photo.secret +
    '.jpg'
  );
};

module.exports = async function() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${process.env.API_KEY}&user_id=${process.env.USER_ID}&extras=date_taken&format=json&nojsoncallback=1`;

  const res = await axios.get(url);
  const data = res.data;
  const photos = data.photos.photo;
  photos.sort(
    (photo1, photo2) => new Date(photo2.datetaken) - new Date(photo1.datetaken)
  );

  photos.forEach(photo => {
    photo.url = createFlickrUrl(photo);
  });
  return photos;
};
