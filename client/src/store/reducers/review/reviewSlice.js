import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import reviewServices from './reviewService';

const initialState = {
  reviews: null,
  status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
  errors: null
}

export const createReview = createAsyncThunk('review/create', async (data, thunkAPI) => {
  try {
    return await reviewServices.createReview(data);
  } catch (error) {
    console.log(error);
  }
})

// TODO: fetch reviews
// TODO: update review
// TODO: delete review

export const reviewSlice = createSlice({
  name: 'review',
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.status = 'success'
      // TODO what do i do with new review
    })
    builder.addCase(createReview.rejected, (state, action) => {
      state.status = 'failed'
      state.errors = action.payload
    })
  }
});

// EXPORT ACTIONS

export default reviewSlice.reducer;