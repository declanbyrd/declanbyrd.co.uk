// @ts-check
const { DateTime } = require('luxon');

module.exports.tagList = (collection) => {
  const tagSet = new Set();
  collection
    .getFilteredByGlob([
      'src/content/weekNotes/**/*.md',
      'src/content/journal/*.md',
    ])
    .forEach(function (item) {
      if ('tags' in item.data) {
        let tags = item.data.tags;
        if (typeof tags === 'string') {
          tags = [tags];
        }

        tags = tags.filter((item) => {
          switch (item) {
            case 'all':
            case 'nav':
            case 'post':
            case 'posts':
            case 'tagList':
            case 'article':
            case 'note':
            case 'summary':
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

  return [...tagSet].sort();
};

module.exports.posts = (collection) => {
  return collection.getFilteredByGlob('src/content/journal/*.md').reverse();
};

module.exports.headerNavigationItems = (collection) => {
  return collection.getFilteredByGlob([
    'src/journal/journal.njk',
    'src/photos.njk',
  ]);
};

const getNoteYearFromStartWeek = (date) => {
  return DateTime.fromJSDate(date).minus({ days: 7 }).toJSDate().getFullYear();
};

module.exports.weeknotesByYear = (collection) => {
  const weekNotes = collection.getFilteredByGlob(
    'src/content/weekNotes/**/*.md'
  );
  const yearReviews = collection.getFilteredByTag('summary');
  const notes = [...weekNotes, ...yearReviews];
  const sortedNotes = notes.sort(
    (a, b) => Date.parse(a.date) - Date.parse(b.date)
  );
  const years = sortedNotes.map((note) => getNoteYearFromStartWeek(note.date));
  const uniqueYears = [...new Set(years)];
  //@ts-ignore: below works without needing changes
  const notesByYear = uniqueYears.reduce((prev, year) => {
    const filtered = notes.filter(
      (note) => getNoteYearFromStartWeek(note.date) === year
    );

    return [...prev, [year, filtered]].reverse();
  }, []);

  return notesByYear;
};

module.exports.weeknotes = (collection) => {
  const weekNotes = collection.getFilteredByGlob(
    'src/content/weekNotes/**/*.md'
  );
  const yearReviews = collection.getFilteredByTag('summary');
  const allSummaries = [...weekNotes, ...yearReviews];
  return allSummaries
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    .reverse();
};

module.exports.allSocial = (collection) => {
  const mastodon = collection.getAll()[0].data.mastodon.children;
  const allPosts = [...mastodon];
  return allPosts
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    .reverse();
};

module.exports.allPosts = (collection) => {
  const mastodon = collection.getAll()[0].data.mastodon.children;
  const social = [...mastodon];
  const localPosts = collection
    .getFilteredByGlob([
      'src/content/weekNotes/**/*.md',
      'src/content/journal/*.md',
    ])
    .reverse();
  const allPosts = [...social, ...localPosts];
  return allPosts
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    .reverse();
};

module.exports.photos = (collection) => {
  return collection.getFilteredByGlob('src/content/photos/*.md').reverse();
};

module.exports.books = (collection) => {
  const books = collection
    .getFilteredByGlob('src/content/bookshelf/*.md')
    .reverse();
  const years = books.map((book) => book.date.getFullYear());
  const uniqueYears = [...new Set(years)];

  const booksByYear = uniqueYears.reduce((prev, year) => {
    const filtered = books.filter((book) => book.date.getFullYear() === year);

    return [...prev, [year, filtered]];
  }, []);

  return booksByYear;
};

module.exports.articles = (collection) => {
  return collection.getFilteredByTag('article').reverse();
};

module.exports.localPosts = (collection) => {
  return collection
    .getFilteredByGlob([
      'src/content/weekNotes/**/*.md',
      'src/content/journal/*.md',
    ])
    .reverse();
};
