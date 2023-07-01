import { updateAccessToken } from '../reducers/auth/authSlice';
import { useHistory } from 'react-router-dom';
import store from '../store';
import { privateAuthAPI } from '../api/authApi';


export const refreshAccessToken = async (error) => {
  // Extract original request
  const originalRequest = error.config;
  
  // Check for expired token errors
  if (error.response.status === 401) {
    // Refresh access token
    await privateAuthAPI.get('/refresh', { withCredentials: true })
    .then(response => {
      // Extract new access token
      const { accessToken } = response.cookies;

      // Update access token in store
      store.dispatch(updateAccessToken(accessToken));

      // Retry original request
      return privateAuthAPI(originalRequest);
    }).catch(error => {
      const history = useHistory();

      // Check for expired refresh token errors and redirect to login
      if (error.response.status === 401 && error.response.data.message === 'ExpiredRefreshToken') {
        history.push('/login');
      }
    })
  }
};