import React from 'react';
import ReviewCard from './ReviewCard';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const reviews = [
  "",
  "",
  "",
  "",
  "",
  "",
]

const ReviewsFeed = () => {
  return (
    <Box padding={2}>
      <Typography marginBottom={1}>Recent from friends</Typography>
      <Box marginBottom={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {reviews.map(() => (
          <ReviewCard />
          ))}
      </Box>
      <Typography marginBottom={1}>Popular reviews</Typography>
      <Box marginBottom={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {reviews.map(() => (
          <ReviewCard />
          ))}
      </Box>
      <Typography marginBottom={1}>Your recent reviews</Typography>
      <Box marginBottom={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {reviews.map(() => (
          <ReviewCard />
          ))}
      </Box>
    </Box>
  )
};

export default ReviewsFeed;