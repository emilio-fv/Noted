import { refreshAccessToken, updateAccessToken, logout } from '../reducers/auth/authSlice';

const tokenExpiration = store => next => action => {
  // Check error type & status

  if (action.type === 'API_REQUEST_FAILURE') {
    const { error } = action;

    if (error && error.status === 401) {
      const { refreshToken } = store.getState().auth;

      if (refreshToken) {
        store.dispatch(refreshAccessToken())
        .then(response => {
          const { newAccessToken } = response.payload;
          store.dispatch(updateAccessToken(newAccessToken));

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