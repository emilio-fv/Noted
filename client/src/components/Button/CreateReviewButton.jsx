import React from 'react';
// import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@emotion/react';

const CreateReviewButton = ({ onClick }) => {
  const theme = useTheme();

  return (
    <IconButton sx={{ paddingX: 1, color: theme.text, bgcolor: theme.accent.light, borderRadius: 2, fontSize: 15, '&:hover': { bgcolor: theme.accent.dark} }} variant='contained' size='small' onClick={onClick}>
      <AddIcon sx={{ marginRight: 1 }}/> Review
    </IconButton>
  )
};

export default CreateReviewButton;