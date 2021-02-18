const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlighting = require('@11ty/eleventy-plugin-syntaxhighlight');
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginLocalRespimg = require('eleventy-plugin-local-respimg');
const filters = require('./src/_filters/filters');
const collections = require('./src/_filters/collections');

const respImgOptions = {
  folders: {
    source: './dist/', // Folder images are stored in
    output: './dist', // Folder images should be output to
  },
  images: {
    resize: {
      min: 320, // Minimum width to resize an image to
      max: 1020, // Maximum width to resize an image to
      step: 100, // Width difference between each resized image
    },
    watch: {
      src: 'img/**/*', // Glob of images that Eleventy should watch for changes to
    },
    lazy: true,
    additional: [
      // Globs of additional images to optimize (won't be resized)
      'img/**/*.svg',
    ],
    gifToVideo: false,
    sizes: '(min-width: 450px) 33.3vw, 100vw',
    pngquant: {
      speed: 10,
      quality: [0.5, 0.75],
    },
    mozjpeg: {
      quality: 75,
    },
    webp: {
      quality: 75,
    },
  },
};

module.exports = (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setWatchJavaScriptDependencies(false);

  // Filters

  Object.keys(filters).forEach((filter) => {
    eleventyConfig.addFilter(filter, filters[filter]);
  });

  // Plugins

  eleventyConfig.addPlugin(syntaxHighlighting, { templateFormats: 'md' });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(inclusiveLangPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginLocalRespimg, respImgOptions);

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
