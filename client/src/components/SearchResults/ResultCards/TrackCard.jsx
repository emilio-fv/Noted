import React from 'react';
import img from '../../../assets/Demo_Album_Cover.png';
import truncateText from '../../../utils/truncateText';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TrackCard = (track) => {
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
        src={track.track.album.images[0].url}
        sx={{
          width: '100%',
          marginBottom: 1
        }}
      />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          paddingY: 2
        }}
      >
        <Typography
          align='center'
          sx={{
            fontSize: { xs: '.5rem', sm: '.75rem', md: '1rem'}
          }}
        >
          {truncateText(track.track.name, 12)}
        </Typography>
        <Typography
          align='center'
          sx={{
            fontSize: { xs: '.4rem', sm: '.65rem', md: '.9rem'},
            marginBottom: 1
          }}
        >
          {track.track.artists[0].name}
        </Typography>
      </Box>
    </Paper>
  )
};

export default TrackCard;