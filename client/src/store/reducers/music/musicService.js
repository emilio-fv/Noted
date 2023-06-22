import { musicAPI, spotifyAPI } from '../../api/musicApi';

export const requestAccessToken = async () => {
  const response = await musicAPI.get('/requestAccessToken', { withCredentials: true });
  return response.data;
};

export const searchSpotify = async (data) => {
  const response = await spotifyAPI.get('/search', {
    params: {
      q: data.query,
      type: 'album,artist,track',
      limit: 10,
      offset: 0
    },
    headers: {
      'Authorization': `Bearer ${data.accessToken}`,
    }
  })
  return response.data;
}

export const getAlbumTracks = async (data) => {
  const response = await spotifyAPI.get(`/albums/${data.albumId}/tracks`, {
    headers: {
      'Authorization': `Bearer ${data.accessToken}`
    }
  })
  return response.data;
}

const musicServices = {
  requestAccessToken,
  searchSpotify,
  getAlbumTracks
}

export default musicServices;