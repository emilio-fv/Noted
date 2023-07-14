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
import authReducer from './reducers/auth/authSlice';
import musicReducer from './reducers/music/musicSlice';
import reviewReducer from './reducers/review/reviewSlice';
import handleExpiredAccessToken from './middleware/handleExpiredAccessToken';

const rootPersistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  auth: authReducer,
  music: musicReducer,
  review: reviewReducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }).concat(handleExpiredAccessToken)
});

export const persistor = persistStore(store);