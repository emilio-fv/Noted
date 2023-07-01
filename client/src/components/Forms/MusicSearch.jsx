import React from 'react';
import { useForm } from 'react-hook-form';
import { searchSpotify, resetSearchResults } from '../../store/reducers/music/musicSlice';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from './Inputs/SearchInput';

import Box from '@mui/material/Box';

const MusicSearch = () => {
  // Helpers
  const dispatch = useDispatch();

  // Redux State
  const { accessToken } = useSelector(state => state.music);

  // Form Changes & Submit
  const { handleSubmit, control } = useForm({
    query: ''
  })

  const onSubmit = (data) => {
    dispatch(resetSearchResults());
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