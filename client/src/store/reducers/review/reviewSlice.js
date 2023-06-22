import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import reviewServices from './reviewService';

const initialState = {
  recentReviews: null,
  loggedInUsersReviews: null,
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

export const getLoggedInUsersReview = createAsyncThunk('review/getLoggedInUsersReview', async (data, thunkAPI) => {
  try {
    const response = await reviewServices.getLoggedInUsersReview(data);
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

// TODO: update review
// TODO: delete review

export const reviewSlice = createSlice({
  name: 'review',
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.status = 'added'
      // state.usersReviews.push()
    })
    builder.addCase(createReview.rejected, (state, action) => {
      state.status = 'failed'
      state.errors = action.payload
    })
    builder.addCase(getLoggedInUsersReview.fulfilled, (state, action) => {
      state.status = 'success'
      state.loggedInUsersReviews = action.payload
    })
    builder.addCase(getLoggedInUsersReview.rejected, (state, action) => {
      state.status = 'failed'
      // state.errors = action.payload
    })
    builder.addCase(getReviewsByOtherUsers.fulfilled, (state, action) => {
      state.status = 'success'
      state.recentReviews = action.payload
    })
  }
});

export default reviewSlice.reducer;