// Imports
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import formatReviewDate from '../../../utils/formatReviewDate';
import { useTheme } from '@emotion/react';

const ReviewCard = ({ review }) => {
  // Helpers
  const theme = useTheme();

  // Configure star rating
  let rating = [];
  for (let i = 0; i < review.rating; i++) {
    rating.push(0);
  };

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      {/* Left Side */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AccountCircleIcon htmlColor='white' fontSize='large'/>
      </Box>
      {/* Right Side */}
      <Box
        sx={{
          paddingTop: .75,
          flex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        {/* Top */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography marginRight={2} fontSize={12}>Review by {review.user.username}</Typography>
            {rating.map(() => (
              <StarIcon 
                htmlColor={theme.text} 
                sx={{
                  fontSize: { xs: 6, sm: 10, md: 15 } 
                }}
              />
            ))}
          </Box>
          <Typography fontSize={10}>{formatReviewDate(review.createdAt)}</Typography>
        </Box>
        {/* Bottom */}
        <Box>
          <Typography fontSize={14}>{review.text}</Typography>
        </Box>
      </Box>
    </Box>
  )
};

export default ReviewCard;