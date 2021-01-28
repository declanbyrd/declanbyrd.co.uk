module.exports = {
  layout: 'layouts/post.njk',
  permalink: '/journal/{{page.date | getYear}}/{{page.fileSlug}}/',
};
