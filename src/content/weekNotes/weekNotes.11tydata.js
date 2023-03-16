module.exports = {
  layout: 'layouts/note.njk',
  permalink: '/week-notes/{{page.date | getYear}}/{{page.fileSlug}}/',
  tags: ['Week Notes'],
};
