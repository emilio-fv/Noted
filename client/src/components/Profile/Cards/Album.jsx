import React from 'react';
import truncateText from '../../../utils/truncateText';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import img from '../../../assets/Demo_Album_Cover.png';

const AlbumCard = (album) => {
  return (
    <Link to={`/album/${album.album.id}`} component={RouterLink}> 
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
          // src={album.album.images[0].url}
          src={img}
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
            Album Name
            {/* {truncateText(album.album.name, 12)} */}
          </Typography>
          <Typography
            align='center'
            sx={{
              fontSize: { xs: '.4rem', sm: '.65rem', md: '.9rem'},
              marginBottom: 1
            }}
          >
            Year
            {/* {album.album.year} */}
          </Typography>
        </Box>
      </Paper>
    </Link>
  )
};

export default AlbumCard;