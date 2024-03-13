---
title: How I Eleventy
description: "Documenting a refactor that introduced a folder structure and configuration changes, which summarises how I Eleventy."
tags: ['article', 'Eleventy', 'Changelog']
date: 2024-03-13
---

I first starting using Eleventy to build this site back in 2020 using version 0.10.0 and through a combination of the official documentation and other people's source code on GitHub, I managed to piece together the foundations for this site.

Fast forward four years, and there have been two (almost three) major versions of Eleventy released, there are a lot of starter projects that now exist which are valuable resources to learn from, and I was starting to get lost in my own code base. What seemed like a good structure when I had five posts on my website, now seems like a bad one when I have over one hundred posts.

I noted in my [2024 to-do list post](/journal/2024/room-for-improvement/) that I wanted to re-organise the journal files so that the files were grouped by the year they were published. I achieved that, but I also wanted to use this as an opportunity to refactor the wider codebase. The following documents what I did.

## Folder structure

Prior to the refactor, I didn't really have much of a folder structure. Any page files were scattered amongst other files at the root level of the project, some folders were incorrectly named, and others were used to store files where I wasn't sure where they should go. I needed some form of structure and settled on the following folders:

- `_includes` - this contains Nunjucks partials, and critical CSS that I want to inline in my base template.
- `assets` - fonts, icons, and any JavaScript or CSS that I don't inline in my templates. I also store my robots.njk template here and a web manifest file.
- `config` - any shortcodes, collections, or filters that I want to use in my Eleventy configuration file.
- `content` - all markdown files for the various pages.
- `data` - any global data files.
- `feeds` - RSS feed templates and stylesheets.
- `img` - images that I include in the journal or photos pages.
- `layouts` - page templates.
- `pages` - individual pages, or pages that are generated from data.

## Permalinks

I started to move files around into the folders that I'd created. When the individual pages were at the root level of the project, they were generated as `filename.html` in my output directory. Now that they were in a folder called pages, they were now generated as `pages/filename.html` in my output directory.

I like directory level data files in Eleventy. Rather than adding some data to each individual file, I can add that data to every file in a folder from a single file. I created a directory level data file called `pages.11tydata.js` and added three lines:

```js
module.exports = {
  permalink: {% raw %}'/{{page.fileSlug}}/'{% endraw %},
};
```

This will generate a folder in my output directory at the root level with the name of the page, and each folder contains a single HTML file. The only file that I had to override the permalink property for was my `index.njk` file as this would continue to generate an `index.html` file inside a pages folder and my website would not have a home page.

## Layout aliases

Having moved all the layout files out of `_includes` and into `layouts`, I updated the paths for the layout files in the templates that used them. In order to use a layout alias in my templates I also had to change all of the Nunjucks specific extend statements to use frontmatter data instead. The last step was adding these layout aliases to my Eleventy configuration file.

```js
['base', 'book', 'note', 'photo', 'weekNote', 'now', 'timestampedPage'].forEach(
  (layout) => {
    eleventyConfig.addLayoutAlias(layout, `${layout}.njk`);
  }
);
```

## Shortcodes

Previously, all the shortcodes were separate from the rest of the filters and collection files that are imported into the Eleventy configuration file. I moved all of these shortcodes into a single file and placed it inside my config folder.

I used to add these shortcodes in my Eleventy configuration file by using the `addNunjucksAsyncShortcode` function, but since version 2.0.0 of Eleventy there has been async support for `addShortcode`. This presented the opportunity to remove the only template engine specific configuration I had in my Eleventy configuration which could make it easier to move to a different template engine in the future. Like the filters, collections, and layouts, I now loop over the shortcodes to add them to my Eleventy configuration.

```js
const shortcodes = require('./src/config/shortcodes');  

Object.keys(shortcodes).forEach((shortcode) => {
    eleventyConfig.addShortcode(shortcode, shortcodes[shortcode]);
  });
```

