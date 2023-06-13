import React from 'react';
import MainLayout from '../layouts/Main';
import { Typography } from '@mui/material';
import { selectLoggedInUser } from '../store/reducers/auth/authSlice';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { username } = useSelector(selectLoggedInUser);

  return (
    <MainLayout>
      <Typography>Welcome, {username}</Typography>
    </MainLayout>
  )
};

export default Dashboard;
