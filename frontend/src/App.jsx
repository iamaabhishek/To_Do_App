import React from 'react'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PageNotFound from './components/PageNotFound';
import { Route,Routes } from 'react-router-dom';

const App = () => {
  return (
    
    <>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="*" element={<PageNotFound/>} />

      </Routes>
        
    
    </>
  );
}

  
export default App