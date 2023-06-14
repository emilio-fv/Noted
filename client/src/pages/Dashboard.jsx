import React from 'react';
import MainLayout from '../layouts/Main';
import ReviewsFeed from '../components/ReviewsFeed';

// import { selectLoggedInUser } from '../store/reducers/auth/authSlice';
// import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';

const Dashboard = () => {
  // const { username } = useSelector(selectLoggedInUser);

  return (
    <MainLayout>
      <Typography variant='h5' marginTop={5}>Welcome, username</Typography>
      <ReviewsFeed />
    </MainLayout>
  )
};

export default Dashboard;
