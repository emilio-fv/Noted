import React from 'react';
import Navbar from '../components/Navbar';

import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';

const MainLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: theme.background }}>
      <Navbar />
      <Box sx={{ height: '91vh', width: '100vw' }}>
        { 
          children 
        }
      </Box>
    </Box>
  )
};

export default MainLayout;

// bgcolor: '#1c1816', color: '#cbf1d7'