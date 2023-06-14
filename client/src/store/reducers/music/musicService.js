import musicAPI from '../../api/musicApi';

export const requestAccessToken = async () => {
  const response = await musicAPI.get('/requestAccessToken', { withCredentials: true });
  return response.data;
};

const musicServices = {
  requestAccessToken
}

export default musicServices;