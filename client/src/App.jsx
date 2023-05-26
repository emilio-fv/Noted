import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Landing /> }/>
      {/* <Route path='/dashboard' element={ } /> */}
      {/* <Route path='/music' element={ } /> */}
      {/* <Route path='/connect' element={ } /> */}
      {/* <Route path='/reviews' element={ } /> */}
      {/* <Route path='/profile' element={ } /> */}
    </Routes>
  );
}

export default App;
