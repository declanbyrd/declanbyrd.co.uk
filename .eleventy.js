const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlighting = require('@11ty/eleventy-plugin-syntaxhighlight');
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language');

module.exports = (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPlugin(syntaxHighlighting, { templateFormats: 'md' });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(inclusiveLangPlugin);

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
    collection.getFilteredByGlob('src/content/blog/*.md').reverse()
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
      data: `data`,
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
