// Imports
import React from 'react';
import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import { useTheme } from '@emotion/react';

const TextInput = ({ name, control, rules, label, disabled }) => {
  // Helpers
  const theme = useTheme();

  return (
    <Controller 
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <TextField 
          disabled={disabled}
          label={label}
          variant='outlined'
          size='small'
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.text
              },
              '&:hover fieldset': {
                borderColor: theme.text
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.text
              }
            }
          }}
          InputProps={{
            style: {
              color: theme.text,
            },
          }}
          InputLabelProps={{
            style: {
              color: theme.text,
            }
          }}
          FormHelperTextProps={{ 
            sx: { 
              mb: -1.5,
            } 
          }}
        />
      )}
    />
  )
};

export default TextInput;