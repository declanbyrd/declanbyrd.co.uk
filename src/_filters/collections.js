module.exports.tagList = (collection) => {
  const tagSet = new Set();
  collection.getAllSorted().forEach(function (item) {
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
  return collection.getFilteredByGlob('src/content/journal/**/*.md').reverse();
};

module.exports.photos = (collection) => {
  return collection.getFilteredByGlob('src/content/photos/*.md').reverse();
};

module.exports.books = (collection) => {
  return collection.getFilteredByGlob('src/content/bookshelf/*.md').reverse();
};
