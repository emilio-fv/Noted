import React from 'react';
import { useForm } from 'react-hook-form';
import SearchInput from './Inputs/SearchInput';
import { requestAccessToken, searchSpotify, resetSearchResults } from '../../store/reducers/music/musicSlice';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';


const MusicSearch = () => {
  // Helpers
  const dispatch = useDispatch();
  const { accessToken, expiration } = useSelector(state => state.music);

  // Form Changes & Submit
  const { handleSubmit, control } = useForm({
    query: ''
  })

  const onSubmit = (data) => {
    dispatch(resetSearchResults());

    const currentTime = new Date();

    if (currentTime > expiration) {
      dispatch(requestAccessToken());
    }

    dispatch(searchSpotify({ accessToken: accessToken, ...data }));
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        paddingY: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <SearchInput
        name={'query'}
        control={control}
        placeholder={'Search by artist, album, or track'}
      />
    </Box>
  )
};

export default MusicSearch;