import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { login } from '../../store/reducers/auth/authSlice';

import StyledButton from '../Button';
import TextInput from './Inputs/TextInput';
import PasswordInput from './Inputs/PasswordInput';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTheme } from '@emotion/react';

const LoginForm = () => {
  // Helpers
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, status, errors } = useSelector(state => state.auth);

  // Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Form Changes & Submit
  const { handleSubmit, control } = useForm({
    email: '',
    password: ''
  })

  // Form Errors
  const [formErrors, setFormErrors] = useState(null);

  useEffect(() => {
    if (status === 'failed') {
      setFormErrors(errors);
    }

    if (accessToken) {
      navigate('/dashboard');
    }
  }, [accessToken, status])

  const onSubmit = data => {
    dispatch(login(data))
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column'
      }}
    >
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{ 
          width: '20%',
          minWidth: '200px',
          display: 'flex', 
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant='h5' textAlign='center'>Login</Typography>
        <TextInput 
          name={'email'}
          control={control}
          label={'Email'}
          rules={{ 
            required: 'Email required.', 
            pattern: { 
              value: /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, 
              message: "Invalid email."}
          }}
        />
        <PasswordInput 
          name={'password'}
          control={control}
          rules={{ required: 'Password required.'}}
          label={'Password'}
        />
        {formErrors
          ? <Typography>{formErrors.message}</Typography>
          : null
        }
        <StyledButton type={'submit'} text={'Login'} sx={{ backgroundColor: theme.accent.light, '&:hover': { backgroundColor: theme.accent.dark} }}/>
      </Box>
      <Typography mt={2}>Don't have an account? <Link to='/register' component={RouterLink} sx={{ color: 'inherit'}}>Register here.</Link></Typography>
    </Box>
  )
};

export default LoginForm;