---
title: Syndicating blog posts from an 11ty site to Dev.to using RSS
description: How I syndicate the blog posts from my website to Dev.to by providing an RSS feed for my journal page.
tags: ['RSS', '11ty', 'article']
date: 2021-04-02
---

While hosting content on my website allows me to own the content I post, it does not generate the exposure that community based blogging websites would. One such website that is popular within the developer community is [Dev.to](https://dev.to/).

Dev.to includes an option to publish posts by monitoring an [RSS feed](https://aboutfeeds.com/). Each time the feed is updated with new content, Dev.to will then store the new content as a draft post ready to be published with canonical URLs that link to the source of the original content. This ensures that the posts can be checked for formatting issues before being posted on the Dev.to website.

## 11ty RSS

One of the great things about using [11ty](https://www.11ty.dev/) as a static site generator is that it can be extended using plugins such as the [11ty RSS plugin](https://www.11ty.dev/docs/plugins/rss/). This plugin will allow 11ty to generate an RSS/Atom feed using the Nunjucks templating engine. To use this plugin in a project, it first needs to be installed using a JavaScript package manager such as npm.

```shell
npm install @11ty/eleventy-plugin-rss --save-dev
```

Once installed, the plugin should be added to the eleventy config inside the project's `.eleventy.js` file.

```javascript
const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginRss);
};
```

The last step for the 11ty site is to add a template file that will output an RSS feed when the site is built. My website uses the template shown below which is also found in the [11ty documentation](https://www.11ty.dev/docs/plugins/rss/#sample-atom-feed-template).

{% raw %}

```html
---
permalink: 'feed.xml'
eleventyExcludeFromCollections: true
metadata:
  title: My blog
  subtitle: Writing about things I do
  url: 'https://example.com'
  feedUrl: 'https://example.com/feed.xml'
  author:
    name: 'Joe Blogs'
    email: 'me@example.com'
---

<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>{{ metadata.title }}</title>
  <subtitle>{{ metadata.subtitle }}</subtitle>
  <link href="{{ metadata.feedUrl }}" rel="self" />
  <link href="{{ metadata.url }}" />
  <updated>
    {{ collections.posts | getNewestCollectionItemDate | dateToRfc3339 }}
  </updated>
  <id>{{ metadata.url }}</id>
  <author>
    <name>{{ metadata.author.name }}</name>
    <email>{{ metadata.author.email }}</email>
  </author>
  {%- for post in collections.posts %} {% set absolutePostUrl %} {{ post.url |
  url | absoluteUrl(metadata.url) }} {% endset %}
  <entry>
    <title>{{ post.data.title }}</title>
    <link href="{{ absolutePostUrl }}" />
    <updated>{{ post.date | dateToRfc3339 }}</updated>
    <id>{{ absolutePostUrl }}</id>
    <content type="html">
      {{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) }}
    </content>
  </entry>
  {%- endfor %}
</feed>
```

{% endraw %}

This template will add each blog post within the post collection to the RSS feed with the most recent post shown first. Each time the 11ty site is built a new feed is generated showing the most up-to-date content from the site.

## RSS on Dev.to

With the 11ty site now outputting an RSS feed, Dev.to can now monitor the feed. To connect the RSS feed to Dev.to visit the [extensions settings](https://dev.to/settings/extensions). Inside the extensions settings, there is a section titled "Publishing to DEV Community from RSS" which contains an input box for the URL of the RSS feed.

<figure>
  {% image "/img/journal/dev-rss-syndication-settings.jpg", "Screenshot of RSS Feed settings from the Dev.to extension settings" %}
  <figcaption>Dev.to RSS Settings.</figcaption>
</figure>

Once entered, click the "Save Feed Settings" button and Dev.to will now be able to subscribe to all blog posts made on the 11ty site. To check it works, click the "Fetch Feed Now" button at the top of the section and head to the [Dev.to dashboard page](https://dev.to/dashboard). There should now be all blog posts from the 11ty site saved as drafts ready to be published.

## Wrapping up

With this workflow I can now publish my content to my website and publish to Dev.to while providing canonical URLs that point to my website. You don't need to use 11ty for this workflow, it can be any website as long as an up-to-date RSS feed is generated when a change is made.
