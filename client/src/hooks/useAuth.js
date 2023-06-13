import { useEffect, useState } from 'react';
// import { selectToken } from '../store/reducers/auth/authSlice';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const { token } = useSelector(state => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, []);

  return !!isLoggedIn;
};

export default useAuth;