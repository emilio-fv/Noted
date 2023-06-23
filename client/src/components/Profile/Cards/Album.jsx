import React from 'react';
import truncateText from '../../../utils/truncateText';
import formatReleaseDate from '../../../utils/formatReleaseDate';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AlbumCard = ({ album }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        width: '100%',
        bgcolor: '#303745',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        component='img'
        src={album.images[0].url}
        sx={{
          width: '100%',
          marginBottom: 1
        }}
      />
      <Box
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Typography
          align='center'
          sx={{
            fontSize: { xs: '.5rem', sm: '.75rem', md: '1rem'},
            color: 'white'
          }}
        >
          {truncateText(album.name, 12)}
        </Typography>
        <Typography
          align='center'
          sx={{
            fontSize: { xs: '.4rem', sm: '.65rem', md: '.9rem'},
            marginBottom: 1
          }}
        >
          {formatReleaseDate(album.release_date)}
        </Typography>
      </Box>
    </Paper>
  )
};

export default AlbumCard;