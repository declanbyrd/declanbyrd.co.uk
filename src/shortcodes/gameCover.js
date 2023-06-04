const Image = require('@11ty/eleventy-img');

const gameCover = async (game, sizes = '100vw') => {
  let metadata = await Image(game.cover, {
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
        alt="Game cover art for ${game.title} on the ${game.tags[0]}"
        loading="lazy"
        decoding="async">
    </picture>`;
};

module.exports = gameCover;
