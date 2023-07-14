// Imports
import { refreshAccessToken } from '../reducers/auth/authService.js';

const handleExpiredAccessToken = store => next => action => {
  // Extract token expiration
  const { tokenExpiration } = store.getState().auth;

  if (action.type !== 'auth/refreshAccessToken/pending' && tokenExpiration) {
    const now = Date.now();
    const expiration = Number(tokenExpiration);

    // Check if access token is expired
    if (expiration < now) {
      console.log("expired");
      // Refresh access token
      store.dispatch(refreshAccessToken());
    }
  }

  return next(action);
}

export default handleExpiredAccessToken;