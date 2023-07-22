// Import
import React from 'react';
import { useParams } from 'react-router-dom';
import calculateAverageRating from '../../utils/calculateAverageRating';
import AlbumCard from '../Cards/Profiles/AlbumCard';
import ReviewCard from '../Cards/Profiles/ReviewCard';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useGetArtistQuery, useGetArtistsAlbumsQuery } from '../../store/api/spotifyApi';
import { useGetReviewsByArtistQuery } from '../../store/api/reviewApi';

const ArtistProfile = () => {
  // Helpers
  const { artistId } = useParams();
  const { data: artist, isLoading: artistLoading } = useGetArtistQuery(artistId);
  const { data: albums, isLoading: albumsLoading } = useGetArtistsAlbumsQuery(artistId);
  const { data: reviews, isLoading: reviewsLoading } = useGetReviewsByArtistQuery(artistId);

  // Handle loading state
  if (artistLoading || albumsLoading || reviewsLoading) {
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
          src={artist.images[0].url}
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
          <Typography variant='h4'>{artist.name}</Typography>
          <Box>
            <Typography>Average Rating: {calculateAverageRating(reviews)} | # of Reviews {reviews.length}</Typography>
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
            {albums.items.map((album) => (
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
            {reviews.length > 0
              ? reviews.map((review) => (
                  <ReviewCard review={review}/>
                ))
              : <Typography>No reviews yet!</Typography>
            }
          </Box>
        </Box>
      </Box>
    </>
  )
};

export default ArtistProfile;