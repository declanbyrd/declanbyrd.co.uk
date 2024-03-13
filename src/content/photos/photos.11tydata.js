const pluralise = (string, data) => {
  if (data.length > 1) {
    return `${string}s`;
  }
  return string;
};

module.exports = {
  layout: 'photo',
  permalink: '/photos/{{page.fileSlug}}/',
  eleventyComputed: {
    intro: (data) => `${pluralise('Photo', data.photo)} from`,
    image: '{{ photo[0].url }}',
    title: '{{intro}} {{date| readableDates}}',
    description: "Declan's {{intro}} {{date| readableDates}}",
  },
};
