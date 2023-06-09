import React from 'react';
import Navbar from '../components/Navbar';

import Box from '@mui/material/Box';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ }}>
      <Navbar />
      <Box sx={{ height: '90vh' }}>
        { 
          children 
        }
      </Box>
    </Box>
  )
};

export default MainLayout;

// bgcolor: '#1c1816', color: '#cbf1d7'