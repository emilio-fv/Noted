import React from 'react';
import { useNavigate } from 'react-router-dom';

import StyledButton from '../Button';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';

const Hero = () => {
  const navigate = useNavigate();
  const handleJoinNotedClick = () => navigate('/register');
  const theme = useTheme();

  return (
    <>
      <Box sx={{ pt: 10, pb: 15, display: 'flex', justifyContent: 'center' }}>
        <Box 
          component='img'
          sx={{
            height: '200px',
            width: '200px',
            border: '2px solid red',
            position: 'relative',
            top: '100px',
            left: '100px'
          }}
        />
        <Box 
          component='img'
          sx={{
            height: '200px',
            width: '200px',
            border: '2px solid red',
            position: 'relative',
            top: '50px',
            left: '50px'
          }}
        />
        <Box 
          component='img'
          sx={{
            height: '200px',
            width: '200px',
            border: '2px solid red'
          }}
        />
        <Box 
          component='img'
          sx={{
            height: '200px',
            width: '200px',
            border: '2px solid red',
            position: 'relative',
            top: '50px',
            right: '50px'
          }}
        />
        <Box 
          component='img'
          sx={{
            height: '200px',
            width: '200px',
            border: '2px solid red',
            position: 'relative',
            top: '100px',
            right: '100px'
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '1.3rem' }}>Track the music you listen to.</Typography>
        <Typography sx={{ fontSize: '1.3rem' }}>Share your thoughts.</Typography>
        <Typography sx={{ fontSize: '1.3rem' }}>Connect.</Typography>
        <StyledButton sx={{ my: 2, backgroundColor: theme.accent.light, '&:hover': { backgroundColor: theme.accent.dark} }} onClick={handleJoinNotedClick} text={'Join Note-d'}/>
        <Typography variant='subtitle'>The social network for music lovers.</Typography>
      </Box>
    </>
  )
};

export default Hero;