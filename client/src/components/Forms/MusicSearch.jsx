import React from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';

import SearchInput from './Inputs/SearchInput';

const MusicSearch = () => {
  // Form Changes & Submit
  const { handleSubmit, control } = useForm({
    query: ''
  })

  const onSubmit = (data) => {
    console.log(data);
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