// Imports
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { connect } from 'react-redux';
import StyledButton from '../Button/StyledButton';
// import { selectIsLoggedIn } from '../../store/reducers/auth/authSlice';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Hero = ({ isLoggedIn }) => {
  // Helpers
  const navigate = useNavigate();
  const theme = useTheme();

  // Logged in user check
  // const { isLoggedIn } = useSelector(selectIsLoggedIn);

  // Handle register button
  const handleJoinNotedClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
    navigate('/register')
  };

  return (
    <>
      <Box sx={{ pt: 10, pb: 15, display: 'flex', justifyContent: 'center' }}>
        {/* TODO: Populate with popular releases */}
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
          onClick={handleJoinNotedClick} 
          text={'Join Note-d'}
        />
        <Typography variant='subtitle'>The social network for music lovers.</Typography>
      </Box>
    </>
  )
};

// Connect to Redux store
const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn
});

// const mapDispatchToProps = {}

export default connect(
  mapStateToProps
)(Hero);