const Image = require('@11ty/eleventy-img');
const path = require('path');

module.exports.image = async (
  relativeSrc,
  alt,
  className,
  widths = [null, 320, 720, 1020],
  formats = ['webp', 'jpeg'],
  sizes = '100vw'
) => {
  const { dir: imgDir } = path.parse(relativeSrc);
  const fullSrc = path.join('src', relativeSrc);

  const metadata = await Image(fullSrc, {
    widths,
    formats,
    outputDir: path.join('dist', imgDir),
    urlPath: imgDir,
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);

      return `${name}-${width}w.${format}`;
    },
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
        alt="${alt}"
        class="${className}"
        loading="lazy"
        decoding="async">
    </picture>`;
};

module.exports.cloudImage = async (src, alt, className, sizes = '100vw') => {
  if (alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let metadata = await Image(src, {
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
        alt="${alt}"
        class="${className}"
        loading="lazy"
        decoding="async">
    </picture>`;
};

module.exports.year = () => `${new Date().getFullYear()}`;
