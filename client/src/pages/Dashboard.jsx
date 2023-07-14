// Imports
import React from 'react';
import Layout from '../components/Layout';
import ReviewsFeed from '../components/ReviewsFeed';
import { connect } from 'react-redux';

import Typography from '@mui/material/Typography';

const Dashboard = ({ loggedInUser }) => {
  return (
    <Layout>
      <Typography variant='h5' marginTop={5}>Good morning, {loggedInUser.username}</Typography>
      <ReviewsFeed />
    </Layout>
  )
};

// Connect to Redux store
const mapStateToProps = (state) => ({
  loggedInUser: state.auth.loggedInUser
})

export default connect(
  mapStateToProps
)(Dashboard);