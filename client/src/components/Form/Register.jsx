import React from 'react';
import { useForm, Controller } from "react-hook-form";

import StyledButton from '../Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import Input from '@mui/material/Input';

const RegisterForm = () => {
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

  const onSubmit = data => console.log(data);

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{ 
        height: '100%',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 2,
      }}
    >
      <Typography variant='h5' textAlign='center'>Register</Typography>
      <Controller 
        name={'firstName'}
        control={control}
        rules={{ required: 'First name required.'}}
        render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
          <TextField 
            label='First Name'
            variant='outlined'
            size='small'
            value={value} 
            onChange={onChange} 
            error={!!error}
            helperText={error ? error.message : null}
            FormHelperTextProps={{ 
              sx: { 
                mb: -1.5,
              } 
            }}
          />
        )}
      />
      <Controller 
        name={'lastName'}
        control={control}
        rules={{ required: 'Last name required.'}}
        render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
          <TextField 
            label='Last Name'
            variant='outlined'
            size='small'
            value={value} 
            onChange={onChange} 
            error={!!error}
            helperText={error ? error.message : null}
            FormHelperTextProps={{ 
              sx: { 
                mb: -1.5,
              } 
            }}
          />
        )}
      />
      <Controller 
        name={'username'}
        control={control}
        rules={{ required: 'Username required.'}}
        render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
          <TextField 
            label='Username'
            variant='outlined'
            size='small'
            value={value} 
            onChange={onChange} 
            error={!!error}
            helperText={error ? error.message : null}
            FormHelperTextProps={{ 
              sx: { 
                mb: -1.5,
              } 
            }}
          />
        )}
      />
      <Controller 
        name={'email'}
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
                mb: -1.5,
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
          <TextField 
            label='Password'
            variant='outlined'
            size='small'
            value={value} 
            onChange={onChange} 
            error={!!error}
            helperText={error ? error.message : null}
            FormHelperTextProps={{ 
              sx: { 
                mb: -1.5,
              } 
            }}
          />
        )}
      />
      <Controller 
        name={'confirmPassword'}
        control={control}
        rules={{ required: 'Confirm password required.'}}
        render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
          <TextField 
            label='Confirm Password'
            variant='outlined'
            size='small'
            value={value} 
            onChange={onChange} 
            error={!!error}
            helperText={error ? error.message : null}
            FormHelperTextProps={{ 
              sx: { 
                mb: -1.5,
              } 
            }}
          />
        )}
      />
      <StyledButton type={'submit'} text={'Register'}/>
    </Box>
  )
};

export default RegisterForm;