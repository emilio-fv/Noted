import React from 'react';
import ReviewCard from './ReviewCards/ReviewCard';
import LoggedInUserReviewCard from './ReviewCards/LoggedInUserReviewCard';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

const ReviewsFeed = () => {
  // Redux State
  const { loggedInUsersReviews, recentReviews } = useSelector(state => state.review);

  return (
    <Box padding={2}>
      <Typography marginBottom={1}>RECENT FROM USERS</Typography>
      <Box marginBottom={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {recentReviews ? recentReviews.slice(0,5).map((review) => (
          <ReviewCard review={review}/>
          )) : null}
      </Box>
      <Typography marginBottom={1}>YOUR RECENT REVIEWS</Typography>
      <Box marginBottom={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {loggedInUsersReviews ? loggedInUsersReviews.slice(0,5).map((review) => (
          <LoggedInUserReviewCard review={review}/>
          )) : null}
      </Box>
    </Box>
  )
};

export default ReviewsFeed;