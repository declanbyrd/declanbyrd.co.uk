const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const apiKey = process.env.API_KEY;
  const userId = process.env.USER_ID;
  try {
    const response = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${apiKey}&user_id=${userId}&extras=date_taken&format=json&nojsoncallback=1`
    );
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();
    const photos = data.photos.photo;
    photos.sort(
      (photo1, photo2) =>
        new Date(photo2.datetaken) - new Date(photo1.datetaken)
    );

    return {
      statusCode: 200,
      body: photos
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
