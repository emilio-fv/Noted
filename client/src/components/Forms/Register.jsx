// Imports
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { resetErrors } from '../../store/reducers/auth/authSlice';
import { useRegisterMutation } from '../../store/api/authApi';
import StyledButton from '../Button/StyledButton';
import TextInput from '../Inputs/TextInput';
import PasswordInput from '../Inputs/PasswordInput';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';

const RegisterForm = ({ isLoggedIn, status, errors, resetErrors }) => {
  // Helpers
  const theme = useTheme();
  const navigate = useNavigate();
  const [ register ] = useRegisterMutation();

  // Set up form changes and submit functions
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

  // Form errors
  const [formErrors, setFormErrors] = useState(null);

  // Handle register form status
  useEffect(() => {
    if (status === 'failed') {
      setFormErrors(errors);
    }

    if (isLoggedIn) {
      navigate('/dashboard');
    }

    return () => {
      resetErrors();
    }
  }, [isLoggedIn, status])

  // Handle register form submit
  const onSubmit = data => {
    register(data);
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

// Connect to Redux store
const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  status: state.auth.status,
  errors: state.auth.errors
});

const mapDispatchToProps = {
  resetErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);