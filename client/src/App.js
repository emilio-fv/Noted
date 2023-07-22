// Imports
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Music from './pages/Music';
import Artist from './pages/Artist';
import Album from './pages/Album';
import PrivateRoute from './components/PrivateRoute';
import './assets/App.css';

import theme from './assets/muiTheme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useRequestSpotifyTokenQuery } from './store/api/musicApi';

function App() {
  useRequestSpotifyTokenQuery();

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