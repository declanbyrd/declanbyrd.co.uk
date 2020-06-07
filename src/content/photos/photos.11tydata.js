module.exports = {
  layout: 'layouts/photo.njk',
  permalink: '/photos/{{page.fileSlug}}/',
  eleventyComputed: {
    image: '{{ photo[0].url }}',
  },
};
