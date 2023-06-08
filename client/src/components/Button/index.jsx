import React from 'react';
import Button from '@mui/material/Button';

const StyledButton = ({ onClick, text }) => {
  return (
    <Button sx={{ my: 2, bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main' } }} variant='contained' onClick={onClick}>{text}</Button>
  )
};

export default StyledButton;