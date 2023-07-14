// Imports
import { createSlice } from '@reduxjs/toolkit';
import { requestAccessToken, searchSpotify, getAlbumTracks, getArtistsAlbums } from './musicService';

const initialState = {
  accessToken: null,
  searchResults: {
    albums: null,
    artists: null,
    tracks: null
  },
  selectedResult: null,
  status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
  error: null
};

// Music slice
export const musicSlice = createSlice({
  name: 'music',
  initialState: initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = {
        albums: null,
        artists: null,
        tracks: null
      }
    },
    setSelected: (state, action) => {
      state.selectedResult = action.payload
    },
    resetSelected: (state) => {
      state.selectedResult = null
    },
    resetMusicSlice: (state) => {
      state.searchResults = {
        albums: null,
        artists: null,
        tracks: null
      }
      state.selectedResult = null
      state.status = 'idle'
      state.error = null
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload
        state.status = 'success'
      })
      .addCase(requestAccessToken.rejected, (state, action) => {
        state.error = action.payload
        state.status = 'failed'
      })
      .addCase(searchSpotify.fulfilled, (state, action) => {
        state.status = 'success'
        state.searchResults = action.payload
      })
      .addCase(searchSpotify.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(searchSpotify.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getAlbumTracks.fulfilled, (state, action) => {
        state.selectedResult = {
          ...state.selectedResult,
          tracks: {
            ...action.payload
          }
        }
      })
      .addCase(getAlbumTracks.rejected, (state, action) => {
        state.error = action.payload
        state.status = 'failed'
      })
      .addCase(getArtistsAlbums.fulfilled, (state, action) => {
        state.selectedResult = {
          ...state.selectedResult,
          albums: {
            ...action.payload
          }
        }
      })
  }
});


// Actions
export const { resetSearchResults, setSelected, resetSelected, resetMusicSlice, updateAccessToken } = musicSlice.actions;

// Reducer
export default musicSlice.reducer;