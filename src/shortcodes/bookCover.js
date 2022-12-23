const Image = require('@11ty/eleventy-img');

const bookCover = async (book, sizes = '100vw') => {
  let metadata = await Image(book.thumbnail, {
    widths: [300, 600],
    formats: ['webp', 'jpeg'],
    outputDir: './dist/img/',
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `<picture>
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `  <source type="${
          imageFormat[0].sourceType
        }" srcset="${imageFormat
          .map((entry) => entry.srcset)
          .join(', ')}" sizes="${sizes}">`;
      })
      .join('\n')}
      <img
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="Book cover for ${book.title}"
        loading="lazy"
        decoding="async">
    </picture>`;
};

module.exports = bookCover;
