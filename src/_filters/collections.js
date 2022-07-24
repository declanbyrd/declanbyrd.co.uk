// @ts-check

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

module.exports.weeknotesByYear = (collection) => {
  const notes = collection
    .getFilteredByGlob('src/content/weekNotes/**/*.md')
    .reverse();
  const years = notes.map((note) => note.date.getFullYear());
  const uniqueYears = [...new Set(years)];

  const notesByYear = uniqueYears.reduce((prev, year) => {
    const filtered = notes.filter((note) => note.date.getFullYear() === year);

    return [...prev, [year, filtered]];
  }, []);

  return notesByYear;
};

module.exports.weeknotes = (collection) => {
  return collection
    .getFilteredByGlob('src/content/weekNotes/**/*.md')
    .reverse();
};

module.exports.allSocial = (collection) => {
  const twitter = collection.getAll()[0].data.tweets.children;
  const mastodon = collection.getAll()[0].data.mastodon.children;
  const allPosts = [...twitter, ...mastodon];
  return allPosts
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    .reverse();
};

module.exports.allPosts = (collection) => {
  const twitter = collection.getAll()[0].data.tweets.children;
  const mastodon = collection.getAll()[0].data.mastodon.children;
  const social = [...twitter, ...mastodon];
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
