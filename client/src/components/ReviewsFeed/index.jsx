// Imports
import React, { useEffect } from 'react';
import ReviewCard from './ReviewCards/ReviewCard';
import LoggedInUserReviewCard from './ReviewCards/LoggedInUserReviewCard';
import { connect } from 'react-redux';
import { getLoggedInUsersReviews, getReviewsByOtherUsers } from '../../store/reducers/review/reviewService';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ReviewsFeed = ({ loggedInUsersReviews, recentReviews, getLoggedInUsersReviews, getReviewsByOtherUsers }) => {
  // Handle fetching review feed data
  useEffect(() => {
    getLoggedInUsersReviews();
    getReviewsByOtherUsers();
  }, []);

  return (
    <Box padding={2}>
      <Typography marginBottom={1}>RECENT FROM USERS</Typography>
      <Box marginBottom={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {recentReviews ? recentReviews.map((review) => (
          <ReviewCard review={review}/>
          )) : null}
      </Box>
      <Typography marginBottom={1}>YOUR RECENT REVIEWS</Typography>
      <Box marginBottom={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {loggedInUsersReviews ? loggedInUsersReviews.map((review) => (
          <LoggedInUserReviewCard review={review}/>
          )) : null}
      </Box>
    </Box>
  )
};

// Connect to Redux store
const mapStateToProps = (state) => ({
  loggedInUsersReviews: state.review.loggedInUsersReviews,
  recentReviews: state.review.recentReviews
});

const mapDispatchToProps = {
  getLoggedInUsersReviews,
  getReviewsByOtherUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewsFeed);