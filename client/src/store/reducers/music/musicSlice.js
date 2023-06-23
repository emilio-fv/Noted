import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import musicServices from './musicService';

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

export const requestAccessToken = createAsyncThunk('music/requestAccessToken', async () => {
  try {
    const response = await musicServices.requestAccessToken();
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const searchSpotify = createAsyncThunk('music/searchSpotify', async (data, thunkAPI) => {
  try {
    const response = await musicServices.searchSpotify(data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getAlbumTracks = createAsyncThunk('music/getAlbumTracks', async (data) => {
  try {
    const response = await musicServices.getAlbumTracks(data);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getArtistsAlbums = createAsyncThunk('music/getArtistsAlbums', async (data) => {
  try {
    const response = await musicServices.getArtistsAlbums(data);
    return response
  } catch (error) {
    console.log(error);
  }
})
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAccessToken.fulfilled, (state, action) => {
        const { access_token } = action.payload
        state.accessToken = access_token
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

export const { resetSearchResults, setSelected, resetSelected, resetMusicSlice } = musicSlice.actions;

export default musicSlice.reducer;