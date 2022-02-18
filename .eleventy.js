const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlighting = require('@11ty/eleventy-plugin-syntaxhighlight');
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const imageShortcode = require('./src/shortcodes/image');
const bookShortcode = require('./src/shortcodes/book');
const filters = require('./src/_filters/filters');
const collections = require('./src/_filters/collections');

module.exports = (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setWatchJavaScriptDependencies(false);

  eleventyConfig.ignores.add('src/content/**/template.md');

  // Shortcodes

  eleventyConfig.addNunjucksAsyncShortcode('book', bookShortcode);
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

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

  return {
    dir: {
      input: 'src',
      output: 'dist',
      data: 'data',
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
