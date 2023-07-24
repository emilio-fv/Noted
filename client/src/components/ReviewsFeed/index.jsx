// Imports
import React from 'react';
import ReviewCard from '../Cards/Dashboard/ReviewCard';
import LoggedInUserReviewCard from '../Cards/Dashboard/LoggedInReviewCard';
import { useGetLoggedInUsersReviewsQuery, useGetReviewsByOtherUsersQuery } from '../../store/api/reviewApi';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ReviewsFeed = ({ loggedInUsersReviews, recentReviews }) => {
  // Helpers
  const { isLoading: loggedLoading, isSuccess: loggedSuccess } = useGetLoggedInUsersReviewsQuery(null, {
    refetchOnMountOrArgChange: true
  });

  const { isLoading: othersLoading, isSuccess: othersSuccess } = useGetReviewsByOtherUsersQuery(null, {
    refetchOnMountOrArgChange: true
  });

  // Handle loading state
  if (loggedLoading || othersLoading) {
    return null;
  }

  return (
    <Box padding={2}>
      <Typography marginBottom={1}>RECENT FROM USERS</Typography>
      <Box marginBottom={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* {othersSuccess && recentReviews.length > 0
          ? recentReviews.map((review) => (
              <ReviewCard review={review}/>
            )) 
          : <Typography>No reviews yet!</Typography>
        } */}
      </Box>
      <Typography marginBottom={1}>YOUR RECENT REVIEWS</Typography>
      <Box marginBottom={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* {loggedSuccess && loggedInUsersReviews.length > 0
          ? loggedInUsersReviews.map((review) => (
              <LoggedInUserReviewCard review={review}/>
            )) 
          : <Typography>No reviews yet!</Typography>
        } */}
      </Box>
    </Box>
  )
};

// Connect to Redux store
const mapStateToProps = (state) => ({
  loggedInUsersReviews: state.review.loggedInUsersReviews,
  recentReviews: state.review.recentReviews,
});

export default connect(
  mapStateToProps,
)(ReviewsFeed);