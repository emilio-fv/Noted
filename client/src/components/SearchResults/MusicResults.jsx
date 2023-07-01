import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSearchResults } from '../../store/reducers/music/musicSlice.js';
import ArtistCard from './ResultCards/ArtistCard';
import AlbumCard from './ResultCards/AlbumCard';

import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


const MusicResults = () => {
  // Helpers
  const theme = useTheme();
  const dispatch = useDispatch();

  // Redux State
  const { searchResults, status } = useSelector(state => state.music);
  const { albums, artists } = searchResults;

  // Reset Results 
  useEffect(() => {
    return () => {
      dispatch(resetSearchResults());
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
      {/* {tracks 
        ? <>
            <Typography variant='h5'>Tracks</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: { xs: 2, md: 4 }
              }}
            >
              {tracks.items.slice(0,6).map((track, key) => (
                <TrackCard key={key} track={track}/>
              ))}
            </Box>
          </>
        : null
      } */}
    </Box>
  )
};

export default MusicResults;