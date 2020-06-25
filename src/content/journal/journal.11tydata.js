module.exports = {
  layout: 'layouts/post.njk',
  permalink: '/journal/{{page.date | year}}/{{page.fileSlug}}/',
};
