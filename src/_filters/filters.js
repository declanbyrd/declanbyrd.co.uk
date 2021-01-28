const { DateTime } = require('luxon');
const cleanCSS = require('clean-css');

module.exports.getYear = (date) => {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat('yyyy');
};

module.exports.htmlDateTime = (date) => {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat('yyyy-LL-dd');
};

module.exports.readableDates = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

module.exports.previewCollection = (array, n) => {
  return n < 0 ? array.slice(n) : array.slice(0, n);
};

module.exports.cssmin = (code) => {
  return new cleanCSS({}).minify(code).styles;
};
