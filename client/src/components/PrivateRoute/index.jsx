// Imports
import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ path, element: Element, isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
};

// Connect to Redux state
const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(
  mapStateToProps
)(PrivateRoute);