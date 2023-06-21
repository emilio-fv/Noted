import { Routes, Route } from 'react-router-dom';
import './App.css';

import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

import PrivateRoutes from './components/PrivateRoutes'
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Music from './pages/Music';
import Artist from './pages/Artist';
import Album from './pages/Album';

let theme = createTheme({
  palette: {
    primary: {
      main: '#1e232c',
    },
    secondary: {
      main: '#6d6e75',
    },
  },
  background: '#272d38',
  text: '#E8EBEB',
  accent: {
    light: '#039408',
    dark: '#017305'
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#E8EBEB'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: '#E8EBEB',
            fontSize: '.8rem',
            '@media (min-width:600px)': {
              fontSize: '1rem'
            }
          },
        },
      },
    },
  }
})

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
          <Route path='/' element={ <Landing /> }/>
          <Route path='/register' element={ <Register /> }/>
          <Route path='/login' element={ <Login /> }/>
          <Route element={<PrivateRoutes />}>
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
