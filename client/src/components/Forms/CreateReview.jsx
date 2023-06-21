import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createReview } from '../../store/reducers/review/reviewSlice';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextInput from './Inputs/TextInput';
import StyledButton from '../Button/StyledButton';
import Modal from '@mui/material/Modal';
import MultilineInput from './Inputs/MultilineInput';
import RatingInput from './Inputs/RatingInput';

const CreateReviewForm = ({ open, handleCloseReviewForm }) => {
  // Helpers
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form Changes & Submit 
  const { handleSubmit, control } = useForm({
    artist: '',
    album: '',
    rating: 0,
    text: '',
  });

  const onSubmit = data => {
    const reviewData = {
      ...data,
      artistId: null,
      albumId: null,
      src: null
    }

    console.log(reviewData);
    // dispatch(createReview())
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseReviewForm}
    >
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 2,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
          bgcolor: '#3d4759',
          border: '2px solid white',
          boxShadow: 24,
          padding: 4
        }}
      >
        <Typography align='center'>Create Review</Typography>
        <TextInput
          name={'artist'}
          control={control}
          label={'Artist'}
        />
        <TextInput
          name={'album'}
          control={control}
          label={'Album'}
        />
        <MultilineInput
          name={'text'}
          control={control}
          placeholder={'Add review here...'}
        />
        <RatingInput 
          name={'rating'}
          control={control}
          // rules={}
        />
        <StyledButton type={'submit'} text={'Submit'} />
      </Box>
    </Modal>
  )
};

export default CreateReviewForm;