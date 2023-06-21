import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import musicServices from './musicService';

const initialState = {
  accessToken: null,
  expiration: null,
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
      state.selectedResult = null
    },
    setSelected: (state, action) => {
      state.selectedResult = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAccessToken.fulfilled, (state, action) => {
        const { access_token } = action.payload
        const currentTime = new Date();
        state.accessToken = access_token
        state.expiration = new Date(currentTime.getTime() + (60 * 60 * 1000));
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
  }
});


export const { resetSearchResults, setSelected } = musicSlice.actions;
export default musicSlice.reducer;