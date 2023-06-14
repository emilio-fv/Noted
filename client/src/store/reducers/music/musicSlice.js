import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import musicServices from './musicService';

const initialState = {
  accessToken: null,
  searchResults: null,
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
})

export const musicSlice = createSlice({
  name: 'music',
  initialState: initialState,
  reducers: {
    
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
  }
});

export default musicSlice.reducer;