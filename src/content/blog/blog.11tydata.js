module.exports = {
  layout: 'layouts/post.njk',
  permalink: '/blog/{{page.date | year}}/{{page.fileSlug}}/',
};
