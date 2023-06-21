import React from 'react';
import truncateText from '../../../utils/truncateText';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AlbumCard = (album) => {
  const handleClick = (event) => {
    
  }

  return (
    <Link to={`/album/${album.album.id}`} component={RouterLink} onClick={handleClick}> 
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          bgcolor: '#303745',
          // padding: { xs: .5, sm: 1, md: 2 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          component='img'
          src={album.album.images[0].url}
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
              fontSize: { xs: '.5rem', sm: '.75rem', md: '1rem'},
              color: 'white'
            }}
          >
            {truncateText(album.album.name, 12)}
          </Typography>
          <Typography
            align='center'
            sx={{
              fontSize: { xs: '.4rem', sm: '.65rem', md: '.9rem'},
              marginBottom: 1
            }}
          >
            {album.album.artists[0].name}
          </Typography>
        </Box>
      </Paper>
    </Link>
  )
};

export default AlbumCard;