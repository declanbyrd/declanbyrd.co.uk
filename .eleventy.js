const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlighting = require('@11ty/eleventy-plugin-syntaxhighlight');
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginLocalRespimg = require('eleventy-plugin-local-respimg');

module.exports = (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setWatchJavaScriptDependencies(false);

  eleventyConfig.addPlugin(syntaxHighlighting, { templateFormats: 'md' });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(inclusiveLangPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginLocalRespimg, {
    folders: {
      source: './dist/', // Folder images are stored in
      output: './dist', // Folder images should be output to
    },
    images: {
      resize: {
        min: 320, // Minimum width to resize an image to
        max: 1020, // Maximum width to resize an image to
        step: 320, // Width difference between each resized image
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
  });

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  eleventyConfig.addFilter(
    'dateDisplay',
    require('./src/_filters/readableDates.js')
  );

  eleventyConfig.addFilter(
    'htmlDateTime',
    require('./src/_filters/htmlDateTime.js')
  );

  eleventyConfig.addFilter('year', require('./src/_filters/getYear.js'));

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('previewCollection', (array, n) => {
    const preview = n < 0 ? array.slice(n) : array.slice(0, n);
    return preview;
  });

  eleventyConfig.addCollection('tagList', require('./src/_filters/getTagList'));

  eleventyConfig.addCollection('posts', (collection) =>
    collection.getFilteredByGlob('src/content/journal/*.md').reverse()
  );
  eleventyConfig.addCollection('photos', (collection) =>
    collection.getFilteredByGlob('src/content/photos/*.md').reverse()
  );

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
