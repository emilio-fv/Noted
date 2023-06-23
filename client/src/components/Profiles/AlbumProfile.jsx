import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import formatReleaseDate from '../../utils/formatReleaseDate.js';
import calculateAverageRating from '../../utils/calculateAverageRating.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ReviewCard from './Cards/Review';
import CreateReviewButton from '../Button/CreateReviewButton';
import CreateReviewForm from '../Forms/CreateReview';
import { getAlbumTracks } from '../../store/reducers/music/musicSlice.js';
import { useParams } from 'react-router-dom';
import { getReviewsByAlbum } from '../../store/reducers/review/reviewSlice.js';

const AlbumProfile = () => {
  // Helpers
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const { accessToken: spotifyToken } = useSelector(state => state.music);
  const { accessToken: jwt } = useSelector(state => state.auth);

  // Album Data
  const { selectedResult } = useSelector((state) => state.music);

  // Review Data
  const { albumReviews } = useSelector((state) => state.review);

  // Review Form modal
  const [open, setOpen] = useState(false);
  const handleOpenReviewForm = () => setOpen(true);
  const handleCloseReviewForm = () => setOpen(false);

  // Get album tracks & reviews
  useEffect(() => {
    dispatch(getAlbumTracks({
      accessToken: spotifyToken,
      albumId: albumId
    }));

    dispatch(getReviewsByAlbum({
      accessToken: jwt,
      albumId: albumId
    }));
  }, []);

  if (!selectedResult || !selectedResult.album || !selectedResult.tracks || !albumReviews) {
    return null
  }

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
            <Typography variant='h4'>{selectedResult.album?.name}</Typography>
            <CreateReviewButton onClick={handleOpenReviewForm}/>
          </Box>
          <Box>
            <Typography>{selectedResult.album?.artists[0].name} | Released: {formatReleaseDate(selectedResult.album?.release_date)} | Average Rating: {calculateAverageRating(albumReviews)} | # of Reviews: {albumReviews.length}</Typography>
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
            {selectedResult.tracks ? selectedResult?.tracks.items.map((track, key) => (
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
            {albumReviews ? albumReviews.map((review, key) => (
              <ReviewCard key={key} review={review}/>
            )) : "No reviews yet"
          }
          </Box>
        </Box>
      </Box>
      <CreateReviewForm open={open} handleCloseReviewForm={handleCloseReviewForm} musicData={selectedResult.album}/>
    </>
  )
};

export default AlbumProfile;