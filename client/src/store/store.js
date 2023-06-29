import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
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

import authReducer from './reducers/auth/authSlice';
import musicReducer from './reducers/music/musicSlice';
import reviewReducer from './reducers/review/reviewSlice';

// TODO
// import tokenExpiration from './middleware/tokenExpiration';
// import spotifyExpiration from './middleware/spotifyExpiration';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['review']
}

const musicPersistConfig = {
  key: 'music',
  storage,
  whitelist: ['accessToken']
}

const rootReducer = combineReducers({
  auth: authReducer,
  music: persistReducer(musicPersistConfig, musicReducer),
  review: reviewReducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })
});

export const persistor = persistStore(store);