import { DateTime } from 'luxon';
import EleventyFetch from '@11ty/eleventy-fetch';
import { config } from 'dotenv';
config();

export const nowWatching = async () => {
  const endAt = encodeURIComponent(new Date().toISOString());
  const startAt = encodeURIComponent(DateTime.now().minus({ days: 7 }).toISO());
  const url = `https://api.trakt.tv/users/${process.env.TRACKT_USER}/history?start_at=${startAt}&end_at=${endAt}`;

  const generateTvUrl = (showId, episodeInfo) => {
    return `https://www.themoviedb.org/tv/${showId}/season/${episodeInfo.season}/episode/${episodeInfo.number}`;
  };

  const generateMovieUrl = (movieId) => {
    return `https://www.themoviedb.org/movie/${movieId}`;
  };

  const history = await EleventyFetch(url, {
    fetchOptions: {
      headers: {
        'trakt-api-version': 2,
        'trakt-api-key': process.env.TRACKT_CLIENT_ID,
        'Content-type': 'application/json',
      },
    },
    duration: '1d',
    type: 'json',
  });

  if (history.length === 0) {
    return undefined;
  }

  return history.map((item) => {
    if (item.type === 'episode') {
      return {
        showTitle: item.show.title,
        nowString: `Episode ${item.episode.number} in season ${item.episode.season} of ${item.show.title}`,
        tmdbUrl: generateTvUrl(item.show.ids.tmdb, item.episode),
      };
    }
    if (item.type === 'movie') {
      return {
        title: `${item.movie.title} (${item.movie.year})`,
        nowString: `${item.movie.title} (${item.movie.year})`,
        tmdbUrl: generateMovieUrl(item.movie.ids.tmdb),
      };
    }
  });
};
