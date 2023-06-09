import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import StyledButton from '../Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';

const LoginForm = () => {
  // Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Form Changes & Submit
  const { handleSubmit, control } = useForm({
    email: '',
    password: ''
  })
  const onSubmit = data => console.log(data);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
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
        <StyledButton type={'submit'} text={'Login'}/>
      </Box>
    </Box>
  )
};

export default LoginForm;