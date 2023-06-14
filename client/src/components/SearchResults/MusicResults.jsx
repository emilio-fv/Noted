import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArtistCard from './ResultCards/ArtistCard';
import AlbumCard from './ResultCards/AlbumCard';
import TrackCard from './ResultCards/TrackCard';

const artists = ["", "", "", "", ""];
const albums = ["", "", "", "", ""];
const tracks = ["", "", "", "", ""];

const MusicResults = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
        paddingBottom: 6
      }}
    >
      <Typography variant='h5'>Artists</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: { xs: 2, md: 4 }
        }}
      >
        {artists.map(() => (
          <ArtistCard />
        ))}
      </Box>
      <Typography variant='h5'>Albums</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: { xs: 2, md: 4 }
        }}
      >
          {albums.map(() => (
            <AlbumCard />
          ))}
      </Box>
      <Typography variant='h5'>Tracks</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: { xs: 2, md: 4 }
        }}
      >
        {tracks.map(() => (
          <TrackCard />
        ))}
      </Box>
    </Box>
  )
};

export default MusicResults;