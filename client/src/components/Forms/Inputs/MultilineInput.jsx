import React from 'react';
import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import { useTheme } from '@emotion/react';

const MultilineInput = ({ name, control, placeholder, rules }) => {
  const theme = useTheme();

  return (
    <Controller 
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value}, fieldState: { error }, formState }) => (
        <TextField 
          variant='outlined'
          size='small'
          multiline
          value={value}
          rows={4}
          onChange={onChange}
          placeholder={placeholder}
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

export default MultilineInput;