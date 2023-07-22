// Imports
import { createSlice } from '@reduxjs/toolkit';
import { reviewApi } from '../../api/reviewApi';

// Configure initial state
const initialState = {
  loggedInUsersReviews: null,
  recentReviews: null,
  albumReviews: null,
  artistReviews: null,
  status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
  errors: null
};

// Review slice
export const reviewSlice = createSlice({
  name: 'review',
  initialState: initialState,
  reducers: {
    resetReviewStatus: (state) => {
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(reviewApi.endpoints.createReview.matchRejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload
      })
      .addMatcher(reviewApi.endpoints.createReview.matchFulfilled, (state, action) => {
        state.status = 'success'
        if (state.albumReviews === null) {
          state.albumReviews = [...action.payload]
        } else {
          state.albumReviews.unshift(action.payload);
        }
      })
      .addMatcher(reviewApi.endpoints.getLoggedInUsersReviews.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(reviewApi.endpoints.getLoggedInUsersReviews.matchFulfilled, (state, action) => {
        state.status = 'success'
        state.loggedInUsersReviews = action.payload
      })
      .addMatcher(reviewApi.endpoints.getReviewsByOtherUsers.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(reviewApi.endpoints.getReviewsByOtherUsers.matchFulfilled, (state, action) => {        
        state.status = 'success'
        state.recentReviews = action.payload
      })
      .addMatcher(reviewApi.endpoints.getReviewsByAlbum.matchPending, (state,) => {
        state.status = 'loading'
      })
      .addMatcher(reviewApi.endpoints.getReviewsByAlbum.matchFulfilled, (state, action) => {
        state.status = 'success'
        state.albumReviews = action.payload
      })
      .addMatcher(reviewApi.endpoints.getReviewsByArtist.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(reviewApi.endpoints.getReviewsByArtist.matchFulfilled, (state, action) => {
        state.status = 'success'
        state.artistReviews = action.payload
      })
  }
});

// Actions
export const { resetReviewStatus } = reviewSlice.actions;

// Reducer
export default reviewSlice.reducer;