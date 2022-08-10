const getTracks = async () => {
  const res = await fetch('/api/latestTracks');
  if (res.ok) {
    const data = await res.json();
    const recentlyPlayed =
      data?.GetLatestTracksData?.me?.spotify?.recentlyPlayed?.nodes[0];
    if (!recentlyPlayed) {
      return undefined;
    }
    const artistName = recentlyPlayed.track.artists;
    const artists = artistName.map((artist) => artist.name).join(', ');
    const trackName = recentlyPlayed.track.name;
    const date = new Date(recentlyPlayed.playedAt).toLocaleDateString();
    const time = new Date(recentlyPlayed.playedAt).toLocaleTimeString();
    const timestamp = `${date} at ${time}`;
    const link = recentlyPlayed.track.externalUrls.spotify;
    return { trackName, artists, timestamp, link };
  }
};

const createNowPlaying = async () => {
  const lastTrack = await getTracks();
  if (lastTrack) {
    const { trackName, artists, timestamp, link } = lastTrack;
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
  }
};

window.addEventListener('load', () => createNowPlaying());
