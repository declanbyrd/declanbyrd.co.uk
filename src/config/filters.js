// @ts-check

import { DateTime } from 'luxon';
import CleanCSS from 'clean-css';

export const getYear = (date) => {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat('yyyy');
};

export const htmlDateTime = (date) => {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat('yyyy-LL-dd');
};

export const noteTimestamp = (dateStr) => {
  const date = new Date(dateStr);
  return DateTime.fromJSDate(date, { zone: 'Europe/London' })
    .setLocale('en-gb')
    .toFormat('yyyy-LL-dd-HH-mm-ss');
};

export const metadataDate = (date) => {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toISO();
};

export const readableDates = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

export const previewCollection = (array, n) => {
  return n < 0 ? array.slice(n) : array.slice(0, n);
};

export const cssmin = (code) => {
  return new CleanCSS({}).minify(code).styles;
};

export const getWebmentionsForUrl = (webmentions, url) => {
  return webmentions.children.filter((entry) => entry['wm-target'] === url);
};

export const webmentionsLastFetched = (webmentions) => {
  return webmentions.lastFetched;
};

export const webmentionsSize = (mentions) => {
  return !mentions ? 0 : mentions.length;
};

export const webmentionsByType = (mentions, mentionType) => {
  return mentions.filter((entry) => !!entry[mentionType]);
};

export const readableDateFromISO = (
  dateStr,
  formatStr = "dd LLL yyyy 'at' HH:mm"
) => {
  return DateTime.fromISO(dateStr).toFormat(formatStr);
};

export const readableDateFromTimestamp = (
  dateStr,
  formatStr = "dd LLLL yyyy 'at' HH:mm:ss"
) => {
  const date = new Date(dateStr);
  return DateTime.fromJSDate(date, { zone: 'Europe/London' }).toFormat(
    formatStr
  );
};

export const noteTitle = (dateStr, formatStr = "DDDD 'at' HH:mm") => {
  const date = new Date(dateStr);
  return DateTime.fromJSDate(date, { zone: 'Europe/London' }).toFormat(
    formatStr
  );
};

export const getWebmentionSource = (url) => {
  const { hostname } = new URL(url);
  return hostname;
};

export const sortNavigationByTitle = (collection) => {
  return collection.sort((a, b) => a.title.localeCompare(b.title));
};
