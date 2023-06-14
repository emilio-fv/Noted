import { musicAPI, spotifyAPI } from '../../api/musicApi';

export const requestAccessToken = async () => {
  const response = await musicAPI.get('/requestAccessToken', { withCredentials: true });
  return response.data;
};

export const searchSpotify = async (accessToken, data) => {
  const response = await spotifyAPI.get('/search', {
    params: {
      'q': data
    },
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  console.log(response.data);
  return response.data;
}

const musicServices = {
  requestAccessToken,
  searchSpotify
}

export default musicServices;