import EleventyFetch from '@11ty/eleventy-fetch';
import 'dotenv/config';

export const getBook = async (isbn) => {
  const GOOGLE_BOOKS_API = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

  const res = await fetch(GOOGLE_BOOKS_API);

  if (!res.ok) {
    throw new Error('Request to get book data failed');
  }

  const data = await res.json();

  if (!data.totalItems) {
    throw new Error(`No books found with isbn: ${isbn}`);
  }

  const book = data.items[0].volumeInfo;

  return {
    title: book.title,
    authors: book.authors.join(', '),
    thumbnail: book.imageLinks.smallThumbnail.replace('&edge=curl', ''),
    pageCount: book.pageCount,
  };
};

export const getGames = async () => {
  const url = `https://api.raindrop.io/rest/v1/raindrops/${process.env.RAINDROPP_GAMES_COLLECTION_ID}`;
  const games = await EleventyFetch(url, {
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${process.env.RAINDROP_TOKEN}`,
      },
    },
    duration: '12h',
    type: 'json',
  });
  return games.items;
};
