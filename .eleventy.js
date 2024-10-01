// @ts-check

import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';
import rssPlugin from '@11ty/eleventy-plugin-rss';
import mastoArchivePlugin from 'eleventy-plugin-mastoarchive';

import * as collections from './src/config/collections.js';
import * as filters from './src/config/filters.js';
import * as shortcodes from './src/config/shortcodes.js';

export default (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setWatchJavaScriptDependencies(false);

  // Layouts
  [
    'base',
    'book',
    'note',
    'photo',
    'weekNote',
    'now',
    'timestampedPage',
  ].forEach((layout) => {
    eleventyConfig.addLayoutAlias(layout, `${layout}.njk`);
  });

  // Shortcodes

  Object.keys(shortcodes).forEach((shortcode) => {
    eleventyConfig.addShortcode(shortcode, shortcodes[shortcode]);
  });

  // Filters

  Object.keys(filters).forEach((filter) => {
    eleventyConfig.addFilter(filter, filters[filter]);
  });

  // Plugins

  eleventyConfig.addPlugin(syntaxHighlightPlugin, { templateFormats: 'md' });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(mastoArchivePlugin, {
    host: 'https://indieweb.social',
    userId: '108153453598932887',
    removeSyndicates: ['declanbyrd.co.uk'],
    stripHashtags: true,
  });

  // Collections

  Object.keys(collections).forEach((collection) => {
    eleventyConfig.addCollection(collection, collections[collection]);
  });

  eleventyConfig.addPassthroughCopy({
    'src/content/img': 'img',
  });
  eleventyConfig.addPassthroughCopy('src/assets/fonts');
  eleventyConfig.addPassthroughCopy('src/assets/icons');
  eleventyConfig.addPassthroughCopy('src/assets/scripts');
  eleventyConfig.addPassthroughCopy('src/assets/site.webmanifest');
  eleventyConfig.addPassthroughCopy('src/assets/styles');

  return {
    dir: {
      input: 'src',
      output: 'dist',
      data: 'data',
      layouts: 'layouts',
      includes: '_includes',
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
