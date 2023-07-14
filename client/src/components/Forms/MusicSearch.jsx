// Imports
import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { resetSearchResults } from '../../store/reducers/music/musicSlice';
import { searchSpotify } from '../../store/reducers/music/musicService';
import SearchInput from '../Inputs/SearchInput';

import Box from '@mui/material/Box';

const MusicSearch = ({ searchSpotify, resetSearchResults }) => {
  // Set up form changes and submit functions
  const { handleSubmit, control } = useForm({
    query: ''
  })

  // Handle music search submit
  const onSubmit = (data) => {
    resetSearchResults();
    searchSpotify(data);
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

// Connect to Redux store
const mapDispatchToProps = {
  searchSpotify,
  resetSearchResults
};

export default connect(
  null,
  mapDispatchToProps
)(MusicSearch);