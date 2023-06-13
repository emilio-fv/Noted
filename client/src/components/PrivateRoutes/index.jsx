import React from 'react';
import { selectAccessToken } from '../../store/reducers/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ path, element: Element }) => {
  const accessToken = useSelector(selectAccessToken);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return accessToken ? <Outlet /> : <Navigate to='/login' />
};

export default PrivateRoutes;