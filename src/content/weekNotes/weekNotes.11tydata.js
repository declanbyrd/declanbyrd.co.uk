module.exports = {
  layout: 'layouts/weekNote.njk',
  permalink: '/journal/{{page.date | getYear}}/{{page.fileSlug}}/',
  tags: ['Week Notes'],
};
