module.exports = {
  layout: 'layouts/note.njk',
  tags: ['Note'],
  source: 'declanbyrd.dev',
  permalink: '/journal/notes/{{ page.date | noteTimestamp }}/',
};
