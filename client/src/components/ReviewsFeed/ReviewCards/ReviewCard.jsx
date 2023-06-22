import React from 'react';
import formatReviewDate from '../../../utils/formatReviewDate';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotesIcon from '@mui/icons-material/Notes';
import StarIcon from '@mui/icons-material/Star';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';

const ReviewCard = ({ review }) => {
  const theme = useTheme();

  let rating = [];
  for (let i = 0; i < review.rating; i++) {
    rating.push(0);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'transparent'
      }}
    >
      <Paper
        sx={{ 
          width: { xs: 45, sm: 90, md: 160 },
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'transparent'
        }}
      >
        <Box 
          sx={{ 
            width: '100%',
          }}
          component='img'
          src={review.src}
          alt='Album cover'
        />
        <Box 
          sx={{
            paddingLeft: { xs: .5, sm: 1, md: 2},
            gap: .5,
            paddingY: { xs: .5, sm: .75, md: 1 },
            bgcolor: '#6d6e75', 
            maxHeight: '25px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          <AccountCircleIcon 
            htmlColor={theme.text} 
            sx={{ 
              fontSize: { xs: 8, sm: 15, md: 20 } 
            }}
          />
          <Typography 
            sx={{
              fontSize: { xs: '.4rem', sm: '.6rem', md: '.8rem' }
            }}
          >
            {review.user.username}
          </Typography>
        </Box>
      </Paper>
      <Box 
        sx={{
          p: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <Box>
          {rating.map(() => (
            <StarIcon 
              htmlColor={theme.text} 
              sx={{
                fontSize: { xs: 6, sm: 10, md: 15 } 
              }}
            />
          ))}
          {/* Text Icon */}
          <NotesIcon 
            htmlColor={theme.text}
            sx={{ 
              display: { xs: 'none', sm: 'inline' },
              fontSize: { sm: 10, md: 15}
            }}
          />
        </Box>
        <Typography
          sx={{ 
            fontSize: { sm: '.6rem', md: '.8rem' },
            display: { xs: 'none', md: 'flex'}
          }}
        >
          {formatReviewDate(review.createdAt)}
        </Typography>
      </Box>
    </Box>
  )
};

export default ReviewCard;