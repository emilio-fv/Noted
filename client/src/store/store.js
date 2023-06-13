import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth/authSlice';
import tokenExpiration from './middleware/tokenExpiration';

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenExpiration)
});