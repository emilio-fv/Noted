// Imports
import React from 'react';
import formatReviewDate from '../../../utils/formatReviewDate';
import truncateText from '../../../utils/truncateText';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import NotesIcon from '@mui/icons-material/Notes';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';

const LoggedInReviewCard = ({ review }) => {
  // Helpers
  const theme = useTheme();

  // Configure star ratings
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
            bgcolor: '#6d6e75', 
            maxHeight: '25px',
          }}
        >
          <Typography 
            align='center'
            sx={{
              fontSize: { xs: '.4rem', sm: '.6rem', md: '.8rem' }
            }}
          >
            {truncateText(review.album, 18)}
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
          {/* Rating */}
          {rating.map(() => (
            <StarIcon 
              htmlColor={theme.text} 
              sx={{
                fontSize: { xs: 6, sm: 10, md: 15 } 
              }}
            />
          ))}
          {/* Text Icon */}
          {review.text.length === 0 
          ? null
          : <NotesIcon 
            htmlColor={theme.text}
            sx={{ 
              display: { xs: 'none', sm: 'inline' },
              fontSize: { sm: 10, md: 15}
            }}
          />
        }
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

export default LoggedInReviewCard;