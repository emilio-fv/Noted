// Imports
import React from 'react';
import { useForm } from 'react-hook-form';
import SearchInput from '../Inputs/SearchInput';

import Box from '@mui/material/Box';

const MusicSearch = ({ setSearchQuery }) => {
  // Set up form changes and submit functions
  const { handleSubmit, control } = useForm({
    query: ''
  })

  // Handle music search submit
  const onSubmit = (data) => {
    setSearchQuery(data.query);
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