import { refreshAccessToken, logout } from '../reducers/auth/authSlice';
// import { useNavigate } from 'react-router-dom';

const tokenExpiration = store => next => action => {
  if (action.type === 'API_REQUEST_FAILURE') {
    const { error } = action;

    if (error && error.status === 401) {
      const { accessToken } = store.getState().auth;

      if (accessToken) {
        store.dispatch(refreshAccessToken())
        .then(response => {
          const { newAccessToken } = response.payload;
          const { originalRequest } = error.config;

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          store.dispatch(originalRequest);
        })
        .catch(error => {
          store.dispatch(logout());
        })
      }
    }
  }
  return next(action);
}

export default tokenExpiration;