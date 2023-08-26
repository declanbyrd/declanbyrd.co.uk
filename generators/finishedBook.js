// @ts-check

const fs = require('fs');
const { getBook } = require('../src/utils');
const { DateTime } = require('luxon');

const BOOK_DIR = 'src/content/bookshelf';

const createPageFrontmatter = (isbn, book) => {
  const { title, authors, thumbnail, pageCount, description, summary } = book;

  const date = DateTime.fromJSDate(new Date(), { zone: 'utc' }).toFormat(
    'yyyy-LL-dd'
  );

  return `---\nisbn: ${isbn}\ntitle: "${title}"\nauthors: "${authors}"\ndescription: "Declan's notes for ${title} by ${authors}".\nthumbnail: "${thumbnail}"\npageCount: ${pageCount}\nsummary: "${summary}"\ndescription: "${description}"\ndate: ${date}\n---`;
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
