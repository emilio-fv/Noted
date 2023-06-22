import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const CreateReviewForm = ({ open, handleCloseReviewForm, musicData }) => {
  // Helpers
  const { accessToken } = useSelector(state => state.auth);
  const { status } = useSelector(state => state.review);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form Changes & Submit 
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      artist: musicData.artists[0].name,
      album: musicData.name,
      rating: null,
      text: '',
    }
  });

  const onSubmit = data => {
    const reviewData = {
      ...data,
      artistId: musicData.artists[0].id,
      albumId: musicData.id,
      src: musicData.images[0].url,
    }
    
    const requestData = {
      accessToken: accessToken,
      reviewData: {
        ...reviewData
      }
    }
    dispatch(createReview(requestData));
  };

  // Close modal upon successful addition
  useEffect(() => {
    if (status === 'added') {
      handleCloseReviewForm();
      reset();
    }
  }, [status]);

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
          disabled={true}
        />
        <TextInput
          name={'album'}
          control={control}
          label={'Album'}
          disabled={true}
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