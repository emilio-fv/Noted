import React, { useEffect, useState } from 'react';
import formatReleaseDate from '../../utils/formatReleaseDate.js';
import { getAlbumTracks } from '../../store/reducers/music/musicSlice.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ReviewCard from './Cards/Review';
import CreateReviewButton from '../Button/CreateReviewButton';
import CreateReviewForm from '../Forms/CreateReview';
import { useDispatch, useSelector } from 'react-redux';

const reviews = ["", "", ""];

const AlbumProfile = () => {
  // Album Data
  const { selectedResult } = useSelector((state) => state.music);

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
          marginBottom: 2,
          paddingY: 4,
        }}
      >
        <Box 
          component='img'
          src={selectedResult.album.images[0].url}
          sx={{
            height: '200px',
            width: '200px',
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
            <Typography variant='h4'>{selectedResult.album.name}</Typography>
            <CreateReviewButton onClick={handleOpenReviewForm}/>
          </Box>
          <Box>
            <Typography>{selectedResult.album.artists[0].name} | Released: {formatReleaseDate(selectedResult.album.release_date)} | Average Rating | # of Reviews</Typography>
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
        {/* Track List */}
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
              alignItems: 'center'
            }}
          >
            {selectedResult?.tracks ? selectedResult?.tracks.items.map((track, key) => (
              <Typography key={key}>{track.name}</Typography>
            )) : null
            }
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
      <CreateReviewForm open={open} handleCloseReviewForm={handleCloseReviewForm} musicData={selectedResult.album}/>
    </>
  )
};

export default AlbumProfile;