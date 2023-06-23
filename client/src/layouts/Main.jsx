import React from 'react';
import Navbar from '../components/Navbar';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@emotion/react';

const MainLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: theme.background }}>
      <Navbar />
      <Container sx={{ minHeight: '100vh' }}>
        { 
          children 
        }
      </Container>
    </Box>
  )
};

export default MainLayout;

// bgcolor: '#1c1816', color: '#cbf1d7'