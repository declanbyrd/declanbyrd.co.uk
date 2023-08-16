module.exports = {
  layout: 'layouts/note.njk',
  permalink: '/journal/{{page.date | getYear}}/{{page.fileSlug}}/',
  tags: ['Week Notes'],
};
