import React, { useEffect } from 'react';
import { requestAccessToken } from '../store/reducers/music/musicSlice';
import MainLayout from '../layouts/Main';
import ReviewsFeed from '../components/ReviewsFeed';

// import { selectLoggedInUser } from '../store/reducers/auth/authSlice';
// import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
  // const { username } = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());
  })

  return (
    <MainLayout>
      <Typography variant='h5' marginTop={5}>Welcome, username</Typography>
      <ReviewsFeed />
    </MainLayout>
  )
};

export default Dashboard;
