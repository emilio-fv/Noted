import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth/authSlice';
import musicReducer from './reducers/music/musicSlice';
import reviewReducer from './reducers/review/reviewSlice';

// import tokenExpiration from './middleware/tokenExpiration';
// import spotifyExpiration from './middleware/spotifyExpiration';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    music: musicReducer,
    review: reviewReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});