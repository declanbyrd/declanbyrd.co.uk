// @ts-check

import Image from '@11ty/eleventy-img';
import path from 'path';

export const image = async (
  relativeSrc,
  alt,
  className,
  widths = [320, 640, 720, 1080],
  formats = ['webp', 'jpeg'],
  sizes = '(min-width: 30em) 50vw, 100vw'
) => {
  const { dir: imgDir } = path.parse(relativeSrc);
  const fullSrc = path.join('src', relativeSrc);

  let outDir = path.join('dist', imgDir);

  if (outDir.includes('/content')) {
    outDir = outDir.replace('/content', '');
  }

  const metadata = await Image(fullSrc, {
    widths,
    formats,
    outputDir: outDir,
    urlPath: imgDir.replace('content', ''),
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);

      return `${name}-${width}w.${format}`;
    },
  });

  let lowsrc = metadata.jpeg?.[0];
  let highsrc = metadata.jpeg?.[metadata.jpeg.length - 1];

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
        src="${lowsrc?.url}"
        width="${highsrc?.width}"
        height="${highsrc?.height}"
        alt="${alt}"
        class="${className}"
        loading="lazy"
        decoding="async">
    </picture>`;
};

export const cloudImage = async (src, alt, className, sizes = '100vw') => {
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

export const year = () => `${new Date().getFullYear()}`;
