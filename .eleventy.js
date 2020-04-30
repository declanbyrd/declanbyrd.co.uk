const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlighting = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPlugin(syntaxHighlighting, { templateFormats: 'md' });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  eleventyConfig.addFilter('dateDisplay', require('./src/_filters/dates.js'));

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('previewCollection', (array, n) => {
    const preview = n < 0 ? array.slice(n) : array.slice(0, n);
    return preview;
  });

  eleventyConfig.addCollection('tagList', require('./src/_filters/getTagList'));

  eleventyConfig.addCollection('posts', (collection) =>
    collection.getFilteredByGlob('src/blog/*.md').reverse()
  );

  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/fonts');

  return {
    dir: {
      input: 'src',
      output: 'dist',
      data: `_data`,
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
