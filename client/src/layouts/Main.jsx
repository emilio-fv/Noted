import React from 'react';
import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

import Box from '@mui/material/Box';

const MainLayout = ({ children }) => {
  return (
    <Box
      sx={{
        bgcolor: '#1c1816',
        color: '#cbf1d7',
      }}
    >
      <Navbar />
        { 
          children 
        }
      {/* <Footer /> */}
    </Box>
  )
};

export default MainLayout;