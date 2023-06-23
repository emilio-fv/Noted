import React, { useEffect } from 'react';
import MainLayout from '../layouts/Main';
import ReviewsFeed from '../components/ReviewsFeed';

import { selectLoggedInUser } from '../store/reducers/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import { getLoggedInUsersReviews, getReviewsByOtherUsers } from '../store/reducers/review/reviewSlice';

const Dashboard = () => {
  const { username } = useSelector(selectLoggedInUser);
  const { accessToken } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUsersReviews({
      accessToken: accessToken
    }));

    dispatch(getReviewsByOtherUsers({
      accessToken: accessToken
    }));
  }, []);

  return (
    <MainLayout>
      <Typography variant='h5' marginTop={5}>Welcome, {username}</Typography>
      <ReviewsFeed />
    </MainLayout>
  )
};

export default Dashboard;
