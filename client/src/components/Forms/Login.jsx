import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { login } from '../../store/reducers/auth/authSlice';

import StyledButton from '../Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';

const LoginForm = () => {
  // Helpers
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, errors } = useSelector(state => state.auth);

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

    if (token) {
      navigate('/dashboard');
    }
  }, [token, status])

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
        <Controller
          name='email'
          control={control}
          rules={{ required: 'Email required.'}}
          render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
            <TextField 
              label='Email'
              variant='outlined'
              size='small'
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              FormHelperTextProps={{
                sx: {
                  mb: -1.5
                }
              }}
            />
          )}
        />
        <Controller 
          name={'password'}
          control={control}
          rules={{ required: 'Password required.'}}
          render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
            <FormControl sx={{ }} size='small'>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <OutlinedInput
                id='password'
                size='small'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                error={error}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {
                error ? <FormHelperText sx={{ color: 'red', mb: -1.5, }}>{error.message}</FormHelperText> : null
              }
            </FormControl>
          )}
        />
        {formErrors
          ? <Typography>{formErrors.message}</Typography>
          : null
        }
        <StyledButton type={'submit'} text={'Login'}/>
      </Box>
      <Typography>Don't have an account? <Link to='/register' component={RouterLink} >Register here.</Link></Typography>
    </Box>
  )
};

export default LoginForm;