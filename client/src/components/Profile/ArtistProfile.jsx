import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AlbumCard from './Cards/Album';
import ReviewCard from './Cards/Review';

const albums = ["", "", "", "", "", ""];
const reviews = ["", "", ""];

const ArtistProfile = () => {
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
            justifyContent: 'center'
          }}
        >
          <Typography variant='h4'>Artist Name</Typography>
          <Box>
            <Typography>Average Rating | # of Reviews</Typography>
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
            {albums.map((album, key) => (
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
    </>
  )
};

export default ArtistProfile;