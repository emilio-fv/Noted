import { createAsyncThunk } from '@reduxjs/toolkit';
import backendAPI from '../../api/backendApi';
import spotifyAPI from '../../api/spotifyApi';

export const requestAccessToken = createAsyncThunk('music/requestAccessToken', async () => {
  try {
    const response = await backendAPI.get('/music/requestAccessToken');
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const searchSpotify = createAsyncThunk('music/searchSpotify', async (data, thunkAPI) => {
  try {
    const response = await spotifyAPI.get('/search', {
      params: {
        q: data.query,
        type: 'album,artist,track',
        limit: 10,
        offset: 0
      }
    })
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getAlbumTracks = createAsyncThunk('music/getAlbumTracks', async (data) => {
  try {
    const response = await spotifyAPI.get(`/albums/${data.albumId}/tracks`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getArtistsAlbums = createAsyncThunk('music/getArtistsAlbums', async (data) => {
  try {
    const response = await spotifyAPI.get(`/artists/${data.artistId}/albums`, {
      params: {
        include_groups: 'album'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});