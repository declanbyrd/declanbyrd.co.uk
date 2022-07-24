const { DateTime } = require('luxon');
const cleanCSS = require('clean-css');

module.exports.getYear = (date) => {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat('yyyy');
};

module.exports.htmlDateTime = (date) => {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat('yyyy-LL-dd');
};

module.exports.metadataDate = (date) => {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toISO();
};

module.exports.readableDates = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

module.exports.previewCollection = (array, n) => {
  return n < 0 ? array.slice(n) : array.slice(0, n);
};

module.exports.cssmin = (code) => {
  return new cleanCSS({}).minify(code).styles;
};

module.exports.getWebmentionsForUrl = (webmentions, url) => {
  return webmentions.children.filter((entry) => entry['wm-target'] === url);
};

module.exports.webmentionsLastFetched = (webmentions) => {
  return webmentions.lastFetched;
};

module.exports.webmentionsSize = (mentions) => {
  return !mentions ? 0 : mentions.length;
};

module.exports.webmentionsByType = (mentions, mentionType) => {
  return mentions.filter((entry) => !!entry[mentionType]);
};

module.exports.readableDateFromISO = (
  dateStr,
  formatStr = "dd LLL yyyy 'at' HH:mm"
) => {
  return DateTime.fromISO(dateStr).toFormat(formatStr);
};

module.exports.readableDateFromTimestamp = (
  dateStr,
  formatStr = "dd LLLL yyyy 'at' HH:mm:ss"
) => {
  const date = new Date(dateStr);
  return DateTime.fromJSDate(date).toFormat(formatStr);
};

module.exports.getWebmentionSource = (url) => {
  const { hostname } = new URL(url);
  return hostname;
};
