import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import './App.css';

function App() {
  return (
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
  );
}

export default App;
