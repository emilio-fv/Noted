import { createAsyncThunk } from '@reduxjs/toolkit';
import backendAPI from '../../api/backendApi';

export const createReview = createAsyncThunk('review/create', async (data, thunkAPI) => {
  try {
    const response = await backendAPI.post('/review/create', data);
    return response.data;
  } catch (error) {
    console.log(error);
    const errors = error.response.data;
    return thunkAPI.rejectWithValue(errors);
  }
});

export const getLoggedInUsersReviews = createAsyncThunk('review/getLoggedInUsersReviews', async (_, thunkAPI) => {
  try {
    const response = await backendAPI.get('/review/loggedInUser');
    return response.data;
  } catch (error) {
    console.log(error);
    const errors = error.response.data;
    return thunkAPI.rejectWithValue(errors);
  }
});

export const getReviewsByOtherUsers = createAsyncThunk('review/getReviewsByOtherUsers', async (_, thunkAPI) => {
  try {
    const response = await backendAPI.get('/review/allOthers');
    return response.data;
  } catch (error) {
    const errors = error.response.data;
    return thunkAPI.rejectWithValue(errors);
  }
});

export const getReviewsByAlbum = createAsyncThunk('review/getReviewsByAlbum', async (data, thunkAPI) => {
  try {
    const response = await backendAPI.get(`/review/${data.albumId}/album`);
    return response.data;
  } catch (error) {
    const errors = error.response.data;
    return thunkAPI.rejectWithValue(errors);
  }
});

export const getReviewsByArtist = createAsyncThunk('review/getReviewsByArtist', async (data, thunkAPI) => {
  try {
    const response = await backendAPI.get(`/review/${data.artistId}/artist`);
    return response.data;
  } catch (error) {
    const errors = error.response.data;
    return thunkAPI.rejectWithValue(errors);
  }
});