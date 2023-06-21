import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ReviewCard from './Cards/Review';
import CreateReviewButton from '../Button/CreateReviewButton';
import CreateReviewForm from '../Forms/CreateReview';

const reviews = ["", "", ""];

const AlbumProfile = () => {
  // Review Form modal
  const [open, setOpen] = useState(false);
  const handleOpenReviewForm = () => setOpen(true);
  const handleCloseReviewForm = () => setOpen(false);

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          marginBottom: 2
        }}
      >
        <Box 
          component='img'
          sx={{
            height: '200px',
            width: '200px',
            border: '2px solid red'
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='h4'>Album Name</Typography>
            <CreateReviewButton onClick={handleOpenReviewForm}/>
          </Box>
          <Box>
            <Typography>Artist Name | Year | Average Rating | # of Reviews</Typography>
          </Box>
        </Box>
      </Box>
      {/* Body */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: 4
        }}
      >
        {/* Discography */}
        <Box
          sx={{
            flex: 2,
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#3d4759',
            borderRadius: '8px'
          }}
        >
          <Typography fontSize={14} marginBottom={1}>TRACK LIST</Typography>
          <Divider sx={{ borderColor: 'white', marginBottom: 2 }}/>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              paddingX: 6,
            }}
          >
            {/* TODO */}
          </Box>
        </Box>
        {/* Reviews */}
        <Box
          sx={{
            flex: 5,
            padding: 3,
            bgcolor: '#3d4759',
            borderRadius: '8px'
          }}
        >
          {/* <Typography fontSize={14} marginBottom={1}>POPULAR REVIEWS</Typography>
          <Divider sx={{ borderColor: 'white', marginBottom: 2 }}/>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              marginBottom: 2,
            }}
          >
            {reviews.map((review, key) => (
              <ReviewCard key={key} review={review}/>
            ))}
          </Box> */}
          <Typography fontSize={14} marginBottom={1}>RECENT REVIEWS</Typography>
          <Divider sx={{ borderColor: 'white', marginBottom: 2 }}/>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              marginBottom: 2,
            }}
          >
            {reviews.map((review, key) => (
              <ReviewCard key={key} review={review}/>
            ))}
          </Box>
        </Box>
      </Box>
      <CreateReviewForm open={open} handleCloseReviewForm={handleCloseReviewForm}/>
    </>
  )
};

export default AlbumProfile;