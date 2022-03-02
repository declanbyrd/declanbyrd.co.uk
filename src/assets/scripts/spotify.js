const getTracks = async () => {
  const res = await fetch('/api/latestTracks');
  const data = await res.json();
  console.log('🚀 ~ file: spotify.js ~ line 4 ~ getTracks ~ data', data);
  const recentlyPlayed =
    data.GetLatestTracksData.me.spotify.recentlyPlayed.nodes[0];
  const artistName = recentlyPlayed.track.artists;
  const artists = artistName.map((artist) => artist.name).join(', ');
  const trackName = recentlyPlayed.track.name;
  const date = new Date(recentlyPlayed.playedAt).toLocaleDateString();
  const time = new Date(recentlyPlayed.playedAt).toLocaleTimeString();
  const timestamp = `${date} at ${time}`;
  const link = recentlyPlayed.track.externalUrls.spotify;
  console.log(`I listened to ${trackName} by ${artists} on ${timestamp}`);
  return { trackName, artists, timestamp, link };
};

const createNowPlaying = async () => {
  const { trackName, artists, timestamp, link } = await getTracks();

  const template = document.getElementById('nowPlaying');
  const clone = template.content.cloneNode(true);
  const track = clone.getElementById('trackName');
  track.textContent = trackName;
  track.href = link;
  const trackArtists = clone.getElementById('artists');
  trackArtists.textContent = artists;
  const listenedTo = clone.getElementById('timestamp');
  listenedTo.textContent = timestamp;

  const container = document.getElementById('nowPlayingContainer');
  container.appendChild(clone);
};

window.addEventListener('load', () => createNowPlaying());
