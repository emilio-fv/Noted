import Rating from '@mui/material/Rating';
import { Controller } from 'react-hook-form';

const RatingInput = ({ name, control, rules }) => {
  return (
    <Controller 
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error}, formState }) => (
        <Rating 
          value={value}
          onChange={onChange}
          // precision={0.5} // Add 1/2 star input
          size='large'
        />
      )}
    />
  )
};

export default RatingInput;