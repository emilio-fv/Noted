// Imports
import { createSlice } from '@reduxjs/toolkit';
import { spotifyApi } from '../../api/spotifyApi';

// Configure initial state
const initialState = {
  searchResults: null,
  featured: null,
  status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
  errors: null
}

// Spotify Slice
export const spotifySlice = createSlice({
  name: 'spotify',
  initialState: initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = null
      state.status = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(spotifyApi.endpoints.searchSpotify.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(spotifyApi.endpoints.searchSpotify.matchFulfilled, (state, action) => {
        state.status = 'success'
        state.searchResults = action.payload
      })
      .addMatcher(spotifyApi.endpoints.getNewReleases.matchFulfilled, (state, action) => {
        const { items } = action.payload.albums
        state.featured = items
      })
  }
});

// Actions
export const { resetSearchResults } = spotifySlice.actions;

// Reducer
export default spotifySlice.reducer;