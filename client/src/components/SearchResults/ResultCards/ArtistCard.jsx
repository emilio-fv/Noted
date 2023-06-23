import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../../store/reducers/music/musicSlice';
import { useNavigate } from 'react-router-dom';
import truncateString from '../../../utils/truncateText';
import img from '../../../assets/imgPlaceholder.png';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const ArtistCard = ({ artist }) => {
  // Helpers
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle click artist card
  const handleClick = () => {
    dispatch(setSelected({
      artist: artist
    }));

    navigate(`/artist/${artist.id}`);
  };

  return (
    <Link onClick={() => handleClick()}>
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          bgcolor: '#303745',
          padding: { xs: .5, sm: 1, md: 2 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: '',
          gap: { xs: .5, sm: 2}
        }}
      >
        <Box
          component='img'
          src={artist.images.length > 0 ? artist.images[0].url : img}
          sx={{
            width: '100%',
            maxWidth: '150px',
            borderRadius: '50%'
          }}
        />
        <Typography 
          align='center' 
          sx={{ fontSize: { xs: '.5rem', sm: '.75rem', md: '1rem'}}}
        >
          {truncateString(artist.name, 12)}
        </Typography>
      </Paper>
    </Link>
  )
};

export default ArtistCard;