import React from 'react';
import MainLayout from '../layouts/Main';
import StyledButton from '../components/Button';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

// const src = ["", "", "", "", ""];

const Landing = () => {
  const navigate = useNavigate();

  const handleJoinNotedClick = () => navigate('/register')

  return (
    <MainLayout>
      <Box 
        sx={{ 
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {/* TODO: Album Covers */}
        <Box sx={{ mb: 15 }}>
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
        <Typography sx={{ fontSize: '1.3rem' }}>Track what you listen to.</Typography>
        <Typography sx={{ fontSize: '1.3rem' }}>Share your thoughts.</Typography>
        <Typography sx={{ fontSize: '1.3rem' }}>Connect.</Typography>
        <StyledButton onClick={handleJoinNotedClick} text={'Join Note-d'}/>
        <Typography variant='subtitle'>The social network for music lovers.</Typography>
      </Box>
    </MainLayout>
  )
};

export default Landing;