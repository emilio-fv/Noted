// Imports
import { createSlice } from '@reduxjs/toolkit';
import { createReview, getLoggedInUsersReviews, getReviewsByAlbum, getReviewsByArtist, getReviewsByOtherUsers } from './reviewService';

const initialState = {
  recentReviews: null,
  loggedInUsersReviews: null,
  albumReviews: null,
  artistReviews: null,
  status: 'idle', // 'idle' | 'loading' | 'success' | 'added' | 'failed'
  errors: null
};

// Review slice
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
    builder
      .addCase(createReview.fulfilled, (state, action) => {
        state.status = 'added'
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload
      })
      .addCase(getLoggedInUsersReviews.fulfilled, (state, action) => {
        state.status = 'success'
        state.loggedInUsersReviews = action.payload
      })
      .addCase(getLoggedInUsersReviews.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload
      })
      .addCase(getReviewsByOtherUsers.fulfilled, (state, action) => {
        state.status = 'success'
        state.recentReviews = action.payload
      })
      .addCase(getReviewsByOtherUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload
      })
      .addCase(getReviewsByAlbum.fulfilled, (state, action) => {
        state.status = 'success'
        state.albumReviews = action.payload
      })
      .addCase(getReviewsByAlbum.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getReviewsByArtist.fulfilled, (state, action) => {
        state.status = 'success'
        state.artistReviews = action.payload
      })
      .addCase(getReviewsByArtist.pending, (state) => {
        state.status = 'loading'
      })
  }
});

// Actions
export const { resetReviewSlice } = reviewSlice.actions;

// Reducer
export default reviewSlice.reducer;