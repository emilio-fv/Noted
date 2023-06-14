import { Routes, Route } from 'react-router-dom';
import './App.css';

import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoutes from './components/PrivateRoutes'

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
          </Route>
          <Route path='/dashboard' element={ <Dashboard /> }/>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
