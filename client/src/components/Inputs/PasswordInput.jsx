// Imports
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import { useTheme } from '@emotion/react';

const PasswordInput = ({ name, control, rules, label}) => {
  // Helpers
  const theme = useTheme();

  // Handle Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Controller 
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value}, fieldState: { error }, formState }) => (
        <FormControl
          size='small'
          sx={{
            '& .MuiInputLabel-root': {
              '&.Mui-focused': {
                color: theme.text
              }
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.text,
                color: theme.text
              },
              '&:hover fieldset': {
                borderColor: theme.text,
                color: theme.text
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.text,
                color: theme.text
              },
              '&.Mui-focused': {
                borderColor: theme.text,
                color: theme.text
              },
            }
          }}
        >
          <InputLabel htmlFor={name} sx={{ color: theme.text }}>{label}</InputLabel>
          <OutlinedInput 
            id={name}
            size='small'
            label={label}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            error={error}
            inputProps={{
              style: {
                color: theme.text,
              },
            }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                  sx={{ color: theme.text }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {
            error ? <FormHelperText sx={{ color: '#D32F2F', mb: -1.5, }}>{error.message}</FormHelperText> : null
          }
        </FormControl>
      )}
    />
  )
};

export default PasswordInput;