// Imports
import { Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Music from './pages/Music';
import Artist from './pages/Artist';
import Album from './pages/Album';
import { requestAccessToken } from './store/reducers/music/musicService';
import PrivateRoute from './components/PrivateRoute';
import './assets/App.css';

import theme from './assets/muiTheme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import spotifyAPI from './store/api/spotifyApi';

function App() {
  // Request Spotify access token 
  store.dispatch(requestAccessToken()).then(response => {
    const { accessToken } = response.payload;
    spotifyAPI.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
          <Route path='/' element={ <Landing /> }/>
          <Route path='/register' element={ <Register /> }/>
          <Route path='/login' element={ <Login /> }/>
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={ <Dashboard /> }/>
            <Route path='/music' element={ <Music /> }/>
            <Route path='/artist/:artistId' element={ <Artist />} />
            <Route path='/album/:albumId' element={ <Album />} />
          </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
