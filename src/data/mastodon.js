const fetch = require('node-fetch');
const fs = require('fs');
const unionBy = require('lodash/unionBy');

require('dotenv').config();

const MASTODON_HOST = 'https://toots.declanbyrd.co.uk';
const MASTODON_USER_ID = '108194763529328183';
const MASTODON_STATUS_API = `${MASTODON_HOST}/api/v1/accounts/${MASTODON_USER_ID}/statuses`;

// @ts-check

const CACHE_FILE_PATH = '.cache/mastodon.json';

// We don't need all the data that comes back
// Using standardised property names will help when sorting later
const formatTimeline = (timeline) => {
  const noSyndicates = timeline.filter(
    (post) =>
      !post.content.includes('declanbyrd.co.uk') && !post.in_reply_to_account_id
  );
  const formatted = noSyndicates.map((post) => {
    return {
      date: post.created_at,
      id: post.id,
      content: post.content,
      source_url: post.url,
      site: 'Mastodon',
      media: {
        image: post.media_attachments[0]?.url,
        alt: post.media_attachments[0]?.description,
        width: post.media_attachments[0]?.meta?.small?.width,
        height: post.media_attachments[0]?.meta?.small?.height,
        aspect: post.media_attachments[0]?.meta?.small?.aspect,
      },
    };
  });
  const goodPosts = formatted.filter((post) => {
    if (post.media && post.media.alt === null) {
      return false;
    }
    return true;
  });
  return goodPosts;
};

const fetchMastodonPosts = async () => {
  const response = await fetch(MASTODON_STATUS_API);
  if (response.ok) {
    const feed = await response.json();
    console.log(`>>> ${feed.length} new mastodon posts fetched`);
    const timeline = formatTimeline(feed);
    return timeline;
  }
  console.warn('>>> unable to fetch mastodon posts', response.statusText);
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
  const dir = '.cache';
  const fileContent = JSON.stringify(data, null, 2);
  // create cache folder if it doesnt exist already
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  // write data to cache json file
  fs.writeFile(CACHE_FILE_PATH, fileContent, (err) => {
    if (err) throw err;
    console.log(`>>> mastodon posts cached to ${CACHE_FILE_PATH}`);
  });
};

// Merge fresh posts with cached entries, unique per id
const mergePosts = (cache, feed) => {
  return unionBy(cache.children, feed, 'id');
};

module.exports = async function () {
  let lastFetched;
  console.log('>>> Reading mastodon posts from cache...');
  const cache = readFromCache();

  if (cache.children.length) {
    console.log(
      `>>> ${cache.children.length} mastodon posts loaded from cache`
    );
    lastFetched = cache.children[0].id;
  }

  // Only fetch new posts in production
  if (process.env.ELEVENTY_ENV === 'production') {
    console.log('>>> Checking for new mastodon posts...');
    const feed = await fetchMastodonPosts(lastFetched);
    if (feed) {
      const posts = {
        lastFetched: new Date().toISOString(),
        children: mergePosts(cache, feed),
      };

      writeToCache(posts);
      return posts;
    }
  }

  return cache;
};
