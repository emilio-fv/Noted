// Imports
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { resetSearchResults } from '../../store/reducers/music/musicSlice.js';
import ArtistCard from './ResultCards/ArtistCard';
import AlbumCard from './ResultCards/AlbumCard';

import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const MusicResults = ({ albums, artists, status, resetSearchResults }) => {
  // Helpers
  const theme = useTheme();

  // Reset Results 
  useEffect(() => {
    return () => {
      resetSearchResults();
    }
  }, []);

  if (status === 'loading') {
    return (
      <Box 
        sx={{
          width: '100%',
          height: '65vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress size={70} sx={{ color: theme.accent.light }}/>
      </Box>
    )
  }

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
      {artists 
        ? <>
        <Typography variant='h5'>Artists</Typography>
        <Box
        sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: { xs: 2, md: 4 }
              }}
            >
              {artists.items.slice(0,6).map((artist, key) => (
                  <ArtistCard key={key} artist={artist} />
              ))}
            </Box> 
          </>
        : null
      }
      {albums
        ? <>
            <Typography variant='h5'>Albums</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: { xs: 2, md: 4 }
              }}
            >
              {albums.items.slice(0,6).map((album, key) => (
                  <AlbumCard key={key} album={album}/>
              ))}
            </Box>
          </>
        : null
      }
    </Box>
  )
};

// Connect to Redux store
const mapStateToProps = (state) => ({
  albums: state.music.searchResults.albums,
  artists: state.music.searchResults.artists,
  status: state.music.status
});

const mapDispatchToProps = {
  resetSearchResults
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicResults);