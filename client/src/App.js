import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3F5769',
      dark: '#403228',
      light: '#66A9A9'
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
          {/* <Route path='/register' Component={}/> */}
        {/* TODO: Login */}
          {/* <Route path='/login' Component={}/> */}
        {/* TODO: Dashboard */}
          {/* <Route path='/home' Component={}/> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
