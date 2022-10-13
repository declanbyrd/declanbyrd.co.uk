---
title: Building a Mastodon post archive
description: How I PESOS my Mastodon posts to my site to create an archive of my own social media feed.
tags: ['Mastodon', 'IndieWeb', 'article']
date: 2022-10-13
---

With the announcement that [mastodon.technology is being shut down](https://ashfurrow.com/blog/mastodon-technology-shutdown/), one of the comments I saw mentioned that it was disappointing that while you could migrate your account and followers to a new server, your posts were not transferred. I thought this would be a good time to share how I've been syndicating my Mastodon posts to my own site to create a social media archive.

> My posts and profile on Mastodon have public visibility so I don't have to authenticate the request. Private posts or accounts require OAuth2.0 authentication for all requests.

## Getting your Mastodon User ID

In order to get the public statuses from your Mastodon account, you will need the user ID associated with your account. The way I achieved this was to use the results from the Mastodon search API. The search API requires OAuth to authenticate the request which would normally require creating an application in order to authenticate a user. However, as a Mastodon user, you can use another application that you are likely already authenticated with - your Mastodon server.

On the webpage of your Mastodon server, open your browser's developer tools to inspect the network traffic, enter your username into the search bar and press enter on your keyboard. This will trigger a HTTP request to your Mastodon server's search API that looks like `https://{mastodon_server}/api/v2/search?q=@{your_mastodon_username}`. I've left out some of the additional information returned by the API but the response should look similar to below. Make sure to keep a note of the user ID, this is needed to get the public posts.

```json
{
    "accounts":[
        {
            "id": {your user ID},
            "username": {your Mastodon username},
            ...
        }
    ],
    "statuses":[],
    "hashtags":[]
}
```

## Getting your public posts

Now that you have your user ID, you can use it to make requests to the statuses API to get all your public posts. The URL of the request will be in the form `https://{your_mastodon_server}/api/v1/accounts/{your_user_id}/statuses`. This is how I use the API in my code:

```js
const MASTODON_HOST = 'my_mastodon_host';
const MASTODON_USER_ID = 'my_mastodon_user_id';
const MASTODON_STATUS_API = `${MASTODON_HOST}/api/v1/accounts/${MASTODON_USER_ID}/statuses`;

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
```

This returns all my public posts. However, I had some criteria for the kind of posts I wanted to display on my site. While I value the conversations that social media can bring, I didn't want to display any replies on my site as I would not have the original context of the conversation. I also didn't want to show any posts that contained links to pages on my site. So I created a function to format the timeline of posts which is shown below.

```js
const formatTimeline = (timeline) => {
  const noSyndicates = timeline.filter(
    (post) =>
      !post.content.includes('declanbyrd.co.uk') && !post.in_reply_to_account_id
  );
  return noSyndicates;
};
```

The status API returned lots of data about each post that I didn't need so I chose to extract the data for each post that I wanted to keep. The fields I wanted to keep are the:

- id - the unique post id.
- content - the content of the Mastodon post. This is formatted as URL encoded HTML which means the post can be displayed as it is on the Mastodon server.
- url - the URL of the post on the Mastodon server.
- media - any images, videos, GIFs that are attached to the post.

I then mapped over my filtered posts to create post objects that only contained the data I wanted to keep. I chose to use standardised key names for the object so that I could re-use the object type for other social media sites such as Twitter and re-use a single Nunjucks template to render the posts.

```js
const formatTimeline = (timeline) => {
  const noSyndicates = timeline.filter(
    (post) =>
      !post.content.includes('declanbyrd.co.uk') && !post.in_reply_to_account_id
  );
  const formatted = noSyndicates.map((post) => {
    return {
      date: new Date(post.created_at).toISOString(),
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
  return formatted;
};
```

The last piece of filtering I wanted to do was to remove all posts that had media attached but were missing alt text.

```js
const formatTimeline = (timeline) => {
  // no syndicates or replies
  const noSyndicates = timeline.filter(
    (post) =>
      !post.content.includes('declanbyrd.co.uk') && !post.in_reply_to_account_id
  );
  // map to standardised object
  const formatted = noSyndicates.map((post) => {
    return {
      date: new Date(post.created_at).toISOString(),
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
  // only include posts with media if they have ALT text
  const goodPosts = formatted.filter((post) => {
    if (post.media && post.media.alt === null) {
      return false;
    }
    return true;
  });
  return goodPosts;
};
```

Now when I make a call to `fetchMastodonPosts()` I will get back my filtered Mastodon feed.

## Caching Responses

Inspired by [Sia Karamalegos' webmention tutorial](https://sia.codes/posts/webmentions-eleventy-in-depth/) that caches the response from the webmention API between builds, I decided to implement the same functionality for caching my Mastodon posts. The unintended side-effect of doing this was that I was able to construct a feed of posts that persisted even when I switched Mastodon servers.

The [`netlify-plugin-cache`](https://www.npmjs.com/package/netlify-plugin-cache) dependency is important here as it tells Netlify to save or restore specific folders between builds. I installed the dependency by running `npm install netlify-plugin-cache` inside my source folder and then modifying my `netlify.toml` file to include some details about which folders to cache.

```toml
[[plugins]]
package = "netlify-plugin-cache"

  [plugins.inputs]
  paths = [
    ".cache", # Remote Asset Cache
  ]
```

When I fetch my Mastodon posts now, I write the response to a json file with a timestamp of the last build. Whenever there are new posts, I use the `unionBy` method from `lodash` to merge any new posts with the cached feed.

You can view the full source code for getting public Mastodon posts [on my GitHub](https://github.com/declanbyrd/declanbyrd.co.uk/blob/bd232deab131077f99996f23396e5552fac16091/src/data/mastodon.js).

## Wrapping up

I used a Nunjucks template to render my Mastodon feed which you can find in the [notes section of my journal](https://declanbyrd.co.uk/journal/notes/) along with my Twitter posts.

There are some issues with this approach. If I choose to clear the cache and build the site from Netlify, then only the posts from my current Mastodon server are fetched. I could persist the posts to an external database but this could just be duplicating what I get back from the Mastodon status API and would increase my site's build time.

An improvement I would like to make to this approach is to include post engagements in my site's social feed. Ideally this would be achieved using webmentions though I would need to edit each Mastodon post to include the link to the syndicated post on my site - something that feels overcomplicated. Alternatively I could use the Mastodon API to retrieve the engagements for each post, though this would introduce additional problems such as greater build times, a larger cache file to contain the engagements with a post, and could introduce privacy violations.
