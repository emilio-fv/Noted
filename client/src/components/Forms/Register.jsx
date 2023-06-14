import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { register } from '../../store/reducers/auth/authSlice';

import StyledButton from '../Button';
import TextInput from './Inputs/TextInput';
import PasswordInput from './Inputs/PasswordInput';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';

const RegisterForm = () => {
  // Helpers
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, status, errors } = useSelector(state => state.auth);

  // Form Changes & Submit
  const { handleSubmit, control } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  // Form Errors
  const [formErrors, setFormErrors] = useState(null);

  // Check if user logged in
  useEffect(() => {
    if (status === 'failed') {
      setFormErrors(errors);
    }

    if (accessToken) {
      navigate('/dashboard')
    }
  }, [accessToken, status])

  // Handle Submit
  const onSubmit = data => {
    dispatch(register(data));
  };

  return (
    <Box
      sx={{
        height: '90vh',
        width: '100%',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
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
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Typography variant='h5' textAlign='center'>Register</Typography>
        <TextInput 
          name={'firstName'}
          control={control}
          rules={{ required: 'First name required.'}}
          label={'First Name'}
        />
        <TextInput 
          name={'lastName'}
          control={control}
          rules={{ required: 'Last name required.'}}
          label={'Last Name'}
        />
        <TextInput 
          name={'username'}
          control={control}
          rules={{ required: 'Username required.'}}
          label={'Username'}
        />
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
          label={"Password"}
        />
        <PasswordInput 
          name={'confirmPassword'}
          control={control}
          rules={{ required: 'Confirm Password required.'}}
          label={"Confirm Password"}
        />
        {formErrors 
          ? Object.values(formErrors).map((error, key) => <Typography sx={{ color: '#D32F2F' }} key={key}>{error.message}</Typography>)
          : null
        }
        <StyledButton type={'submit'} text={'Register'} sx={{ backgroundColor: theme.accent.light, '&:hover': { backgroundColor: theme.accent.dark} }}/>
      </Box>
      <Typography mt={2}>Already have an account? <Link to='/login' component={RouterLink} sx={{ color: 'inherit'}}>Login here.</Link></Typography>
    </Box>
  )
};

export default RegisterForm;