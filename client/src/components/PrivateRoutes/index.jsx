import React from 'react';
import { selectToken } from '../../store/reducers/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ path, element: Element }) => {
  const token = useSelector(selectToken);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return token ? <Outlet /> : <Navigate to='/login' />
};

export default PrivateRoutes;