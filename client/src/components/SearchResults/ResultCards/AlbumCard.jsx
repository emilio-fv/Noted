import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../../store/reducers/music/musicSlice';
import truncateText from '../../../utils/truncateText';

import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AlbumCard = ({ album }) => {
  // Helpers
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle click album card
  const handleClick = () => {
    dispatch(setSelected({
      album: album
    }));

    navigate(`/album/${album.id}`);
  }

  return (
    <Link onClick={() => handleClick()}> 
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
            {truncateText(album.name, 12)}
          </Typography>
          <Typography
            align='center'
            sx={{
              fontSize: { xs: '.4rem', sm: '.65rem', md: '.9rem'},
              marginBottom: 1
            }}
          >
            {album.artists[0].name}
          </Typography>
        </Box>
      </Paper>
    </Link>
  )
};

export default AlbumCard;