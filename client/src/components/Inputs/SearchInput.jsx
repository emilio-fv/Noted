// Imports
import React from 'react';
import { Controller } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@emotion/react';

const SearchInput = ({ name, control, rules, placeholder}) => {
  // Helpers
  const theme = useTheme();

  return (
    <Controller 
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value}, fieldState: { error }, formState }) => (
        <FormControl 
          variant='outlined'
          sx={{
            width: '75%',
            maxWidth: '300px',
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
              }
            }
          }}
        >
          <OutlinedInput 
            placeholder={placeholder}
            size='small'
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            endAdornment={
              <InputAdornment >
                <SearchIcon htmlColor='white'/>
              </InputAdornment>
            }
            InputProps={{
              style: {
                color: theme.text
              }}
            }
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
        </FormControl>
      )}
    />
  )
};

export default SearchInput;