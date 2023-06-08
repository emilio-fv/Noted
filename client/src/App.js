import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#273947',
      dark: '#403228',
      light: '#4d7d7d'
    }
  },
  custom: {
    background: '#403228'
  },
  white: '#BEE0C9'
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* TODO: Landing Page */}
          <Route path='/' element={ <Landing /> }/>
        {/* TODO: Register */}
          {/* <Route path='/register' element={}/> */}
        {/* TODO: Login */}
          {/* <Route path='/login' Component={}/> */}
        {/* TODO: Dashboard */}
          {/* <Route path='/home' Component={}/> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
