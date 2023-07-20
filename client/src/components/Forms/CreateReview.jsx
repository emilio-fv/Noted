// Imports
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import StyledButton from '../Button/StyledButton';
import TextInput from '../Inputs/TextInput';
import MultilineInput from '../Inputs/MultilineInput';
import RatingInput from '../Inputs/RatingInput';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useCreateReviewMutation } from '../../store/api/reviewApi';

const CreateReviewForm = ({ open, handleCloseReviewForm, musicData }) => {
  // Helpers
  const [createReview, { isSuccess }] = useCreateReviewMutation();

  // Set up form changes, submit, and reset functions
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      artist: musicData.artists[0].name,
      album: musicData.name,
      rating: null,
      text: '',
    }
  });

  // Handle create review form submit
  const onSubmit = (data) => {
    createReview({
      artistId: musicData.artists[0].id,
      albumId: musicData.id,
      src: musicData.images[0].url,
      ...data
    });
  };

  // Handle closing & resetting form
  useEffect(() => {
    if (isSuccess) {
      handleCloseReviewForm();
    }

    return () => {
      reset();
    }
  }, [isSuccess]);

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
          rules={{ required: 'Review required.' }}
        />
        <RatingInput 
          name={'rating'}
          control={control}
        />
        <StyledButton type={'submit'} text={'Submit'} />
      </Box>
    </Modal>
  )
};

// Connect to Redux store
const mapStateToProps = (state) => ({
  // errors: state.review.errors
});

export default connect(
  mapStateToProps,
)(CreateReviewForm);