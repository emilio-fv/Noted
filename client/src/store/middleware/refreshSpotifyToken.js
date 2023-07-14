// Imports
import spotifyAPI from "../api/spotifyApi";
import { requestAccessToken } from "../reducers/music/musicService";
import { store } from "../store";

export const refreshSpotifyToken = (req) => {
  // Extract expiration date of token
  const { expiration } = store.getState().music.accessToken;

  // If so, dispatch get access token action
  if (Date.now() > expiration) {
    store.dispatch(requestAccessToken()).then((response) => {
      const { accessToken } = response.payload;
      spotifyAPI.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    });
  }

  return req;
};
