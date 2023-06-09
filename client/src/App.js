import './App.css';
import Landing from './pages/Landing';
import Register from './pages/Register';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: '#273947',
  //     dark: '#403228',
  //     light: '#4d7d7d'
  //   }
  // },
  // custom: {
  //   background: '#403228'
  // },
  // white: '#BEE0C9'
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
          <Route path='/' element={ <Landing /> }/>
          <Route path='/register' element={ <Register /> }/>
        {/* TODO: Login */}
          {/* <Route path='/login' Component={}/> */}
        {/* TODO: Dashboard */}
          {/* <Route path='/home' Component={}/> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
