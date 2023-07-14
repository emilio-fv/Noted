// Import
import React, { useEffect } from 'react';
import AlbumCard from './Cards/Album';
import ReviewCard from './Cards/Review';
import { connect } from 'react-redux';
import { getArtistsAlbums } from '../../store/reducers/music/musicService';
import { useParams } from 'react-router-dom';
import { getReviewsByArtist } from '../../store/reducers/review/reviewService';
import calculateAverageRating from '../../utils/calculateAverageRating';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const ArtistProfile = ({ selectedResult, artistReviews, status: reviewStatus, getArtistsAlbums, getReviewsByArtist }) => {
  // Helpers
  const { artistId } = useParams();

  // Get artists albums & reviews
  useEffect(() => {
    getArtistsAlbums({
      artistId: artistId
    });

    getReviewsByArtist({
      artistId: artistId
    });
  }, []);

  if (reviewStatus === 'loading' || !artistReviews || !selectedResult) {
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
          src={selectedResult.artist.images[0].url}
          sx={{
            height: '200px',
            width: '200px',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Typography variant='h4'>{selectedResult.artist.name}</Typography>
          <Box>
            <Typography>Average Rating: {calculateAverageRating(artistReviews)} | # of Reviews {artistReviews.length}</Typography>
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
          <Typography fontSize={14} marginBottom={1}>DISCOGRAPHY</Typography>
          <Divider sx={{ borderColor: 'white', marginBottom: 2 }}/>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              paddingX: 6,
            }}
          >
            {selectedResult.albums.items.map((album) => (
              <AlbumCard album={album}/>
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
            {artistReviews.map((review) => (
              <ReviewCard review={review}/>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  )
};

// Connect to Redux store
const mapStateToProps = (state) => ({
  selectedResult: state.music.selectedResult,
  artistReviews: state.review.artistReviews,
  status: state.review.status
});

const mapDispatchToProps = {
  getArtistsAlbums,
  getReviewsByArtist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistProfile);