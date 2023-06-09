import React from 'react';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

const Logo = ({ sx }) => {
  return (
    <Link
      component={RouterLink}
      variant='h5'
      sx={sx}
      to='/'
    >
      Note-d
    </Link>
  )
};

export default Logo;