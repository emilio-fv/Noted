// Imports
import Rating from '@mui/material/Rating';
import { Controller } from 'react-hook-form';

const RatingInput = ({ name, control, rules }) => {
  return (
    <Controller 
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <Rating 
          value={value}
          onChange={onChange}
          defaultValue={0}
          // precision={0.5} // TODO: Add 1/2 star input
          size='large'
          emptyLabelText='Rating required.'
        />
      )}
    />
  )
};

export default RatingInput;