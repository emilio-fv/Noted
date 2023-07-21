// Imports
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { resetSearchResults } from '../../store/reducers/spotify/spotifySlice.js';
import AlbumCard from '../Cards/SearchResults/AlbumCard.jsx';
import ArtistCard from '../Cards/SearchResults/ArtistCard.jsx';

import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchSpotifyQuery } from '../../store/api/spotifyApi.js';

const MusicResults = ({ searchQuery, searchResults, resetSearchResults }) => {
  // Helpers
  const theme = useTheme();

  // Handle search spotify
  const { isLoading } = useSearchSpotifyQuery(searchQuery, { 
    refetchOnMountOrArgChange: true,
    skip: searchQuery === '' ? true : false
  });

  // Handle resetting search results 
  useEffect(() => {
    return () => {
      resetSearchResults();
    }
  }, [])

  if (isLoading && searchQuery !== '') {
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

  if (!searchResults || searchQuery === '') {
    return null;
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
        <Typography variant='h5'>Artists</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: { xs: 2, md: 4 }
          }}
        >
          {searchResults.artists?.items.map((artist, key) => (
            <ArtistCard key={key} artist={artist} />
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
          {searchResults.albums?.items.map((album, key) => (
              <AlbumCard key={key} album={album}/>
          ))}
        </Box>
    </Box>
  )
};

// Connect to Redux store
const mapStateToProps = (state) => ({
  searchResults: state.spotify.searchResults,
  status: state.spotify.status
});

const mapDispatchToProps = {
  resetSearchResults
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicResults);