const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlighting = require('@11ty/eleventy-plugin-syntaxhighlight');
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const filters = require('./src/config/filters');
const shortcodes = require('./src/config/shortcodes');
const collections = require('./src/config/collections');
const mastoArchive = require('eleventy-plugin-mastoarchive');

module.exports = (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setWatchJavaScriptDependencies(false);

  eleventyConfig.addPlugin(mastoArchive, {
    host: 'https://indieweb.social',
    userId: '108153453598932887',
    removeSyndicates: ['declanbyrd.co.uk'],
  });

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

  eleventyConfig.addPlugin(syntaxHighlighting, { templateFormats: 'md' });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(inclusiveLangPlugin);
  eleventyConfig.addPlugin(pluginRss);

  // Collections

  Object.keys(collections).forEach((collection) => {
    eleventyConfig.addCollection(collection, collections[collection]);
  });

  eleventyConfig.addPassthroughCopy('src/img');
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
