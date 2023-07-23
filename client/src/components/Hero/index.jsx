// Imports
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../Button/StyledButton';

import { useTheme } from '@emotion/react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useGetNewReleasesQuery } from '../../store/api/spotifyApi';
import { connect } from 'react-redux';

const Hero = ({ featured }) => {
  // Helpers
  const navigate = useNavigate();
  const theme = useTheme();
  useGetNewReleasesQuery();
  console.log("test")
  return (
    <>
      <Box sx={{ pt: 10, pb: 15, display: 'flex', justifyContent: 'center' }}>
        {/* <Box 
          component='img'
          sx={{
            height: '200px',
            width: '200px',
            position: 'relative',
            top: '100px',
            left: '100px',
            zIndex: -2
          }}
          src={featured[4].images[0].url}
        />
        <Box 
          component='img'
          sx={{
            height: '200px',
            width: '200px',
            position: 'relative',
            top: '50px',
            left: '50px',
            zIndex: -1
          }}
          src={featured[2].images[0].url}
        />
        <Box 
          component='img'
          sx={{
            height: '200px',
            width: '200px',
          }}
          src={featured[0].images[0].url}
        />
        <Box 
          component='img'
          sx={{
            height: '200px',
            width: '200px',
            position: 'relative',
            top: '50px',
            right: '50px',
            zIndex: -1
          }}
          src={featured[1].images[0].url}
        />
        <Box 
          component='img'
          sx={{
            height: '200px',
            width: '200px',
            position: 'relative',
            top: '100px',
            right: '100px',
            zIndex: -2
          }}
          src={featured[3].images[0].url}
        /> */}
      </Box>
      {/* Landing Page Text */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        <Typography sx={{ fontSize: '1.3rem' }}>Track the music you listen to.</Typography>
        <Typography sx={{ fontSize: '1.3rem' }}>Share your thoughts.</Typography>
        <Typography sx={{ fontSize: '1.3rem' }}>Connect.</Typography>
        <StyledButton 
          sx={{ 
            my: 2, 
            backgroundColor: theme.accent.light, 
            '&:hover': { 
              backgroundColor: theme.accent.dark
            } 
          }} 
          onClick={() => navigate('/register')}
          text={'Join Note-d'}
        />
        <Typography variant='subtitle'>The social network for music lovers.</Typography>
      </Box>
    </>
  )
};

// Connect to Redux store
const mapPropsToDispatch = (state) => ({
  featured: state.spotify.featured
});

export default connect(
  mapPropsToDispatch
)(Hero);