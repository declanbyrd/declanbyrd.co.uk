---
title: Auto-fill frontmatter with data from an API
description: Writing Node.js scripts to auto-fill frontmatter with the details about a book from an API.
tags: ['article', 'Eleventy']
date: 2023-07-12
---

I previously wrote about how I used [VS code snippets](/journal/2023/vs-code-snippets-with-variables/) in a markdown file to auto-fill some YAML frontmatter when I wanted to add some notes for a book I had finished reading. This relied on an Eleventy directory level data file to add some additional frontmatter to each file at build time. Reading more books is normally a good thing, but now my site is making nearly 30 API requests on each build for information that is not likely to change between builds.

In addition to the increased number of API requests at build time, there were issues with the data that I was getting back from the API. Some books had `undefined` as the number of pages, or only a subset of authors, or the author's name in all capital letters. I had to find ways to patch the data and the code was becoming increasingly more complex.

## Fetching Book Data

Knowing that the information about each book is not likely to change, I wanted to store the information in the file's frontmatter when the file is created rather than at build time. To do this, I decided to use a Node.js script to auto-fill the frontmatter with the data that I would get from the API.

To get the details for each book, I use `node-isbn` to query the Google Books API with a given ISBN. I was able to re-use the same code that I used in the directory level data file.

```js
module.exports.getBook = async (bookIsbn) => {
  console.log(`>>> Fetching data for ${bookIsbn}`);
  const TIMEOUT = 30000;
  return isbn
    .provider([isbn.PROVIDER_NAMES.GOOGLE])
    .resolve(bookIsbn, { timeout: TIMEOUT })
    .then((book) => {
      const words = book.description.split(' ');
      const start = words.slice(0, 25).join(' ');
      const rest = [' ', ...words.slice(25)].join(' ');
      return {
        title: book.title,
        authors: book.authors.join(', '),
        thumbnail: book.imageLinks.smallThumbnail,
        pageCount: book.pageCount,
        description: rest,
        summary: start,
      };
    });
};
```

## Creating a Markdown file

To create the new markdown file, I used the Node.js `fs` module.

```js
const fs = require('fs');

const BOOK_DIR = 'src/content/bookshelf';

const writeTemplate = () => {
  const isbn = process.argv[2];
  fs.writeFile(`${BOOK_DIR}/${isbn}.md`, "", (err) => {
    if (err) throw err;
    console.log(`Created template for ${BOOK_DIR}/${isbn}.md`);
  });
};

writeTemplate();
```

I can pass the ISBN of the book I finished reading as an argument to the `node` command which will allow me to run this script without changing the code on each run.

This script will generate a new markdown file in the bookshelf directory where I keep the rest of my book notes, with the markdown file having the same file name as the ISBN. At the moment, the markdown is empty since the second parameter in `fs.writeFile` is an empty string.

I created another function in the same script to add the YAML frontmatter. The frontmatter needs to contain the information about the book which I can get from the `getBook` function mentioned above.

```js
const { getBook } = require('../src/utils');
const { DateTime } = require('luxon');

const createPageFrontmatter = (isbn, book) => {
  const { title, authors, thumbnail, pageCount, description, summary } = book;

  const date = DateTime.fromJSDate(new Date(), { zone: 'utc' }).toFormat(
    'yyyy-LL-dd'
  );

  return `---\nisbn: ${isbn}\ntitle: "${title}"\nauthors: "${authors}"\ndescription: "Declan's notes for ${title} by ${authors}.\nthumbnail: "${thumbnail}"\npageCount: ${pageCount}\nsummary: "${summary}"\ndescription: "${description}"\ndate: ${date}\n---`;
};
```

In addition to the information about the book, I also needed the date that the file was generated in the frontmatter. I used `luxon` for this as I was already using it in my site.

`fs.writeFile` requires the file contents to be a string, so the YAML has to be written and formatted as such. It consists of the frontmatter identifiers, the book data that I got back from the API, the date the file was created, and `\n` characters to indicate that there should be new lines after each property.

The frontmatter can now be written to the markdown file using the code below:

```js
const fs = require('fs');
const { getBook } = require('../src/utils');
const { DateTime } = require('luxon');

const BOOK_DIR = 'src/content/bookshelf';

const createPageFrontmatter = (isbn, book) => {
  const { title, authors, thumbnail, pageCount, description, summary } = book;

  const date = DateTime.fromJSDate(new Date(), { zone: 'utc' }).toFormat(
    'yyyy-LL-dd'
  );

  return `---\nisbn: ${isbn}\ntitle: "${title}"\nauthors: "${authors}"\ndescription: "Declan's notes for ${title} by ${authors}.\nthumbnail: "${thumbnail}"\npageCount: ${pageCount}\nsummary: "${summary}"\ndescription: "${description}"\ndate: ${date}\n---`;
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
```

To run this script, I can run `node generators/finishedBook 9781846536892` at the root level of my site's codebase. It produces a markdown file that looks like:

```md
---
isbn: 9781846536892
title: 'Secret Wars'
authors: 'Jonathan Hickman, Esad Ribic'
description: "Declan's notes for Secret Wars by Jonathan Hickman, Esad Ribic."
thumbnail: 'http://books.google.com/books/content?id=QDEmswEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'
pageCount: 312
summary: 'The Marvel multiverse is collapsing! Universes are colliding and realities are being wiped out! Earth 616 is destroyed as it merges with numerous other alternative'
details: '  Earths, creating... Battleworld! Who will survive?!! What will survive?!! Collecting Secret Wars #1-9 and material from Free comic Book Day 2015: Secret Wars.'
date: 2023-07-09
---

```

If there are incorrect details that are returned from the API, I can now edit them in the markdown file. No more `pageCount: undefined`!

## Updating Now Reading

I realised that the script I used to create a markdown file for a finished book, could also be re-purposed to write a JSON file with data about the book that I'm currently reading.

Using the same idea of passing the ISBN as an argument, I ended up with the following code:

```js
const fs = require('fs');
const { getBook } = require('../src/utils');

const NOW_READING = 'src/data/now/reading.json';

const updateNowReading = async () => {
  const isbn = process.argv[2];
  const book = await getBook(isbn);
  const bookDetails = JSON.stringify(
    { isbn, ...book, started: new Date() },
    null,
    2
  );
  fs.writeFile(NOW_READING, bookDetails, (err) => {
    if (err) throw err;
    console.log(`Added book details for ${book.title} to ${NOW_READING}`);
  });
};

updateNowReading();
```

Running this script with `node generators/nowReading 9781444775815` at the root level of my site's codebase produces a JSON file with the following:

```json
{
  "isbn": "9781444775815",
  "title": "A Man Called Ove",
  "authors": "Fredrik Backman",
  "thumbnail": "http://books.google.com/books/content?id=_Ii2oQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
  "pageCount": 320,
  "description": "  in your step. Perfect for fans of Rachel Joyce's The Unlikely Pilgrimage of Harold Fry, Graeme Simsion's The Rosie Project and David Nicholl's US. New York Times bestseller 'Warm, funny, and almost unbearably moving' Daily Mail 'Rescued all those men who constantly mean to read novels but never get round to it' Spectator Books of the Year At first sight, Ove is almost certainly the grumpiest man you will ever meet. He thinks himself surrounded by idiots - neighbours who can't reverse a trailer properly, joggers, shop assistants who talk in code, and the perpetrators of the vicious coup d'etat that ousted him as Chairman of the Residents' Association. He will persist in making his daily inspection rounds of the local streets. But isn't it rare, these days, to find such old-fashioned clarity of belief and deed? Such unswerving conviction about what the world should be, and a lifelong dedication to making it just so? In the end, you will see, there is something about Ove that is quite irresistible...",
  "summary": "The million-copy bestselling phenomenon, Fredrik Backman's heartwarming debut is a funny, moving, uplifting tale of love and community that will leave you with a spring",
  "started": "2023-07-10T18:49:50.056Z"
}
```

Using these two scripts I reduced the number of book related API requests I make at build time from 30 to 0. I also removed a dependency that I had used to cache the book data between builds.

