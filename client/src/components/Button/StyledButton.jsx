import React from 'react';
import Button from '@mui/material/Button';

const StyledButton = ({ type, sx, onClick, text }) => {
  return (
    <Button type={type} sx={sx} variant='contained' onClick={onClick}>{text}</Button>
  )
};

export default StyledButton;
// bgcolor: 'primary.light', '&:hover': { border: '1px solid white', bgcolor: 'primary.light' }