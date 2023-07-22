// Imports
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import formatReleaseDate from '../../utils/formatReleaseDate.js';
import calculateAverageRating from '../../utils/calculateAverageRating.js';
import CreateReviewButton from '../Button/CreateReviewButton';
import CreateReviewForm from '../Forms/CreateReview';
import ReviewCard from '../Cards/Profiles/ReviewCard.jsx';
import { useGetAlbumQuery, useGetAlbumTracksQuery } from '../../store/api/spotifyApi.js';
import { useGetReviewsByAlbumQuery } from '../../store/api/reviewApi.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const AlbumProfile = ({ reviews }) => {
  // Helpers
  const { albumId } = useParams();
  const { data: album, isLoading: albumLoading } = useGetAlbumQuery(albumId);
  const { data: tracks, isLoading: tracksLoading } = useGetAlbumTracksQuery(albumId);
  const { isLoading: reviewsLoading } = useGetReviewsByAlbumQuery(albumId);
  // const [] = useCreateReviewMutation();

  // Review form modal
  const [open, setOpen] = useState(false);
  const handleOpenReviewForm = () => setOpen(true);
  const handleCloseReviewForm = () => setOpen(false);

  // Handle loading state
  if (albumLoading || tracksLoading || reviewsLoading) {
    return null;
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
          src={album.images[0].url}
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
            <Typography variant='h4'>{album.name}</Typography>
            <CreateReviewButton onClick={handleOpenReviewForm}/>
          </Box>
          <Box>
            <Typography>{album.artists[0].name} | Released: {formatReleaseDate(album.release_date)} | Average Rating: {calculateAverageRating(reviews)} | # of Reviews: {reviews.length}</Typography>
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
            {tracks.items.map((track, key) => (
              <Typography key={key}>{track.name}</Typography>
            ))}
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
            {reviews.length > 0
              ? reviews.map((review, key) => (
                  <ReviewCard key={key} review={review}/>
                )) 
              : <Typography>No reviews yet!</Typography>
          }
          </Box>
        </Box>
      </Box>
      <CreateReviewForm open={open} handleCloseReviewForm={handleCloseReviewForm} musicData={album}/>
    </>
  )
};

// Connect to Redux store
const mapStateToProps = (state) => ({
  reviews: state.review.albumReviews,
});

export default connect(
  mapStateToProps,
)(AlbumProfile);