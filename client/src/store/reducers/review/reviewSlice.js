import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import reviewServices from './reviewService';

const initialState = {
  recentReviews: null,
  loggedInUsersReviews: null,
  albumReviews: null,
  artistReviews: null,
  status: 'idle', // 'idle' | 'loading' | 'success' | 'added' | 'failed'
  errors: null
};

export const createReview = createAsyncThunk('review/create', async (data, thunkAPI) => {
  try {
    return await reviewServices.createReview(data);
  } catch (error) {
    console.log(error);
  }
});

export const getLoggedInUsersReviews = createAsyncThunk('review/getLoggedInUsersReviews', async (data, thunkAPI) => {
  try {
    const response = await reviewServices.getLoggedInUsersReviews(data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getReviewsByOtherUsers = createAsyncThunk('review/getReviewsByOtherUsers', async (data, thunkAPI) => {
  try {
    const response = await reviewServices.getReviewsByOtherUsers(data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getReviewsByAlbum = createAsyncThunk('review/getReviewsByAlbum', async (data, thunkAPI) => {
  try {
    const response = await reviewServices.getReviewsByAlbum(data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
})

export const getReviewsByArtist = createAsyncThunk('review/getReviewsByArtist', async (data, thunkAPI) => {
  try {
    const response = await reviewServices.getReviewsByArtist(data);
    return response.data;
  } catch (error) {
    
  }
})
export const reviewSlice = createSlice({
  name: 'review',
  initialState: initialState,
  reducers: {
    resetReviewSlice: (state) => {
      state.recentReviews = null
      state.loggedInUsersReviews = null
      state.albumReviews = null 
      state.artistReviews = null 
      state.status = 'idle'
      state.errors = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.status = 'added'
    })
    builder.addCase(createReview.rejected, (state, action) => {
      state.status = 'failed'
      state.errors = action.payload
    })
    builder.addCase(getLoggedInUsersReviews.fulfilled, (state, action) => {
      state.status = 'success'
      state.loggedInUsersReviews = action.payload
    })
    builder.addCase(getReviewsByOtherUsers.fulfilled, (state, action) => {
      state.status = 'success'
      state.recentReviews = action.payload
    })
    builder.addCase(getReviewsByAlbum.fulfilled, (state, action) => {
      state.status = 'success'
      state.albumReviews = action.payload
    })
    builder.addCase(getReviewsByArtist.fulfilled, (state, action) => {
      state.status = 'success'
      state.artistReviews = action.payload
    })
  }
});

export const { resetReviewSlice } = reviewSlice.actions;

export default reviewSlice.reducer;