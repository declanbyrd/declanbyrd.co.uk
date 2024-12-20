// @ts-check

import fs from 'fs';
import { DateTime } from 'luxon';
import { getBook } from '../src/utils.js';

const BOOK_DIR = 'src/content/bookshelf';

const createPageFrontmatter = (isbn, book) => {
  const { title, authors, thumbnail, pageCount } = book;

  const date = DateTime.fromJSDate(new Date(), { zone: 'utc' }).toFormat(
    'yyyy-LL-dd'
  );

  return `---\nisbn: ${isbn}\ntitle: "${title}"\nauthors: "${authors}"\ndescription: "Declan's notes for ${title} by ${authors}."\nthumbnail: "${thumbnail}"\npageCount: ${pageCount}\ndate: ${date}\n---`;
};

const writeTemplate = async () => {
  const isbn = process.argv[2];
  const book = await getBook(isbn);
  const template = createPageFrontmatter(isbn, book);
  fs.writeFile(`${BOOK_DIR}/${isbn}.md`, template, (err) => {
    if (err) throw err;
    console.log(`Created template for ${BOOK_DIR}/${isbn}.md`);
  });
};

writeTemplate();
