import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Call from './components/pages/Call';
import Put from './components/pages/Put';
import CC from './components/pages/CC';
import CSP from './components/pages/CSP';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/call' element={<Call />} />
          <Route path='/put' element={<Put />} />
          <Route path='/cc' element={<CC />} />
          <Route path='/csp' element={<CSP />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;


