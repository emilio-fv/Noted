// Imports
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { musicApi } from './api/musicApi';
import musicReducer from './reducers/music/musicSlice';
import { authApi } from './api/authApi';
import authReducer from './reducers/auth/authSlice';
import { reviewApi } from './api/reviewApi';
import reviewReducer from './reducers/review/reviewSlice';
import { spotifyApi } from './api/spotifyApi';
import spotifyReducer from './reducers/spotify/spotifySlice';

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'music', 'review', 'spotify']
};

// Configure root reducer
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  [musicApi.reducerPath]: musicApi.reducer,
  music: musicReducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  review: reviewReducer,
  [spotifyApi.reducerPath]: spotifyApi.reducer,
  spotify: spotifyReducer,
})

// Configure persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Redux store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }).concat(authApi.middleware, musicApi.middleware, spotifyApi.middleware, reviewApi.middleware)
});

export const persistor = persistStore(store);