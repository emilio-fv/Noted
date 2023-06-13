import { Routes, Route } from 'react-router-dom';
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoutes from './components/PrivateRoutes'

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
          <Route path='/login' element={ <Login /> }/>
          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={ <Dashboard /> }/>
          </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
