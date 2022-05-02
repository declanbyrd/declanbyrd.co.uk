// @ts-check

const fetch = require('node-fetch');
const fs = require('fs');
const unionBy = require('lodash/unionBy');

require('dotenv').config();

const API = 'https://webmention.io/api/mentions.jf2';
const CACHE_FILE_PATH = '.cache/webmentions.json';
const domain = 'declanbyrd.co.uk';
const TOKEN = process.env.WEBMENTION_IO_TOKEN;

const fetchWebmentions = async (since) => {
  // If we dont have a domain name or token, abort
  if (!domain || !TOKEN) {
    console.warn('>>> unable to fetch webmentions: missing domain or token');
    return false;
  }

  let url = `${API}/mentions.jf2?domain=${domain}&token=${TOKEN}`;
  if (since) url += `&since=${since}`; // only fetch new mentions

  const response = await fetch(url);
  if (response.ok) {
    const feed = await response.json();
    console.log(
      `>>> ${feed.children.length} new webmentions fetched from ${API}`
    );
    return feed;
  }

  return null;
};

const readFromCache = () => {
  if (fs.existsSync(CACHE_FILE_PATH)) {
    const cacheFile = fs.readFileSync(CACHE_FILE_PATH);
    return JSON.parse(cacheFile.toString());
  }
  // no cache found.
  return { lastFetched: null, children: [] };
};

const writeToCache = (data) => {
  const dir = '_cache';
  const fileContent = JSON.stringify(data, null, 2);
  // create cache folder if it doesnt exist already
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  // write data to cache json file
  fs.writeFile(CACHE_FILE_PATH, fileContent, (err) => {
    if (err) throw err;
    console.log(`>>> webmentions cached to ${CACHE_FILE_PATH}`);
  });
};

// Merge fresh webmentions with cached entries, unique per id
const mergeWebmentions = (a, b) => {
  return unionBy(a.children, b.children, 'wm-id');
};

module.exports = async function () {
  console.log('>>> Reading webmentions from cache...');
  const cache = readFromCache();

  if (cache.children.length) {
    console.log(`>>> ${cache.children.length} webmentions loaded from cache`);
  }

  // Only fetch new mentions in production
  if (process.env.NODE_ENV === 'production') {
    console.log('>>> Checking for new webmentions...');
    const feed = await fetchWebmentions(cache.lastFetched);
    if (feed) {
      const webmentions = {
        lastFetched: new Date().toISOString(),
        children: mergeWebmentions(cache, feed),
      };

      writeToCache(webmentions);
      return webmentions;
    }
  }

  return cache;
};
