const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_CON_KEY,
  consumer_secret: process.env.TWITTER_API_CON_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
});

// @ts-check

const fs = require('fs');
const unionBy = require('lodash/unionBy');

require('dotenv').config();

const CACHE_FILE_PATH = '.cache/tweets.json';

const formatLinks = (links) => {
  return links.map((link) => {
    return {
      expanded_url: link.expanded_url,
      display_url: link.display_url,
    };
  });
};

// remove all t.co links that are included in tweet body
const removeLinksFromContent = (tweetContent) => {
  return tweetContent.replaceAll(/(?:https?|ftp):\/\/[\n\S]+/g, '');
};

// We don't need all the data that comes back
// Using standardised property names will help when sorting later
const formatTimeline = (timeline) => {
  const noSyndicates = timeline.filter(
    (tweet) =>
      !tweet.entities?.urls[0]?.expanded_url.includes('declanbyrd.co.uk')
  );

  const formatted = noSyndicates.map((tweet) => {
    return {
      date: new Date(tweet.created_at).toISOString(),
      id: tweet.id_str,
      content: removeLinksFromContent(tweet.full_text),
      source_url: `https://twitter.com/declan_byrd/status/${tweet.id_str}`,
      site: 'Twitter',
      media: {
        image: tweet.extended_entities?.media[0]?.media_url_https,
        alt: tweet.extended_entities?.media[0]?.ext_alt_text,
        width: tweet.extended_entities?.media[0]?.sizes?.small?.w,
        height: tweet.extended_entities?.media[0]?.sizes?.small?.h,
        aspect: undefined,
      },
      links: formatLinks(tweet.entities.urls),
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

const fetchTweets = async (lastTweetId) => {
  const params = {
    screen_name: 'declan_byrd',
    exclude_replies: true,
    tweet_mode: 'extended',
    trim_user: true,
    count: 200,
    include_ext_alt_text: true,
    include_rts: false,
  };
  if (lastTweetId) {
    params.since_id = lastTweetId;
  }
  const response = await client.get('statuses/user_timeline', params);
  if (response) {
    console.log(`>>> ${response.length} new tweets fetched`);
    return formatTimeline(response);
  }
  console.warn('>>> unable to fetch tweets', response.statusText);
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
    console.log(
      `>>> ${data.children.length} tweets cached to ${CACHE_FILE_PATH}`
    );
  });
};

// Merge fresh tweets with cached entries, unique per id
const mergeTweets = (cache, feed) => {
  return unionBy(cache.children, feed, 'id');
};

module.exports = async function () {
  console.log('>>> Reading tweets from cache...');
  const cache = readFromCache();

  if (cache.children.length) {
    console.log(`>>> ${cache.children.length} tweets loaded from cache`);
  }

  // Only fetch new tweets in production
  if (process.env.ELEVENTY_ENV === 'production') {
    console.log('>>> Checking for new tweets...');
    const feed = await fetchTweets(cache?.children[0]?.id);
    if (feed) {
      const tweets = {
        lastFetched: new Date().toISOString(),
        children: mergeTweets(cache, feed),
      };
      writeToCache(tweets);
      return tweets;
    }
  }

  return cache;
};
