// Imports
import React from 'react';
import Navbar from '../Navbar';

import Container from '@mui/material/Container';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>
        {children}
      </Container>
    </>
  )
};

export default Layout;