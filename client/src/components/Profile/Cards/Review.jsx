import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ReviewCard = (review) => {
  const rating = Array.from({ length: 5 }, (_, index) => (
    <StarIcon key={index} htmlColor='white' fontSize={'.5px'}/>
  ))

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
            <Typography marginRight={2} fontSize={12}>Review by USERNAME</Typography>
            <FavoriteIcon htmlColor='white' fontSize={'.5px'} sx={{ marginRight: .5, fontSize: '14px' }}/>
            {rating}
          </Box>
          <Typography fontSize={10}>May 23 2023</Typography>
        </Box>
        {/* Bottom */}
        <Box>
          <Typography fontSize={14}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et atque velit nobis ratione incidunt. Libero ducimus numquam perferendis quam? Tempora cupiditate distinctio suscipit quo quibusdam ipsum minima adipisci similique esse.</Typography>
        </Box>
      </Box>
    </Box>
  )
};

export default ReviewCard;