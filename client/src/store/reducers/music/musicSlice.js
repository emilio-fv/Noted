// Imports
import { createSlice } from '@reduxjs/toolkit';
import { musicApi } from '../../api/musicApi';

// Configure initial state
const initialState = {
  accessToken: null,
  status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
  error: null
};

// Music slice
export const musicSlice = createSlice({
  name: 'music',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(musicApi.endpoints.requestSpotifyToken.matchFulfilled, (state, action) => {
        state.status = 'success'
        state.accessToken = action.payload
      })
  }
});

// Actions
// export const { } = musicSlice.actions;

// Reducer
export default musicSlice.reducer;