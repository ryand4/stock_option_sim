import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Call from './components/pages/Call';
import Guide from './components/pages/Guide';
import CC from './components/pages/CC';
import CSP from './components/pages/CSP';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/PricePredictAI' element={<Call />} />
          <Route path='/Guide' element={<Guide />} />
          <Route path='/TrendChart' element={<CC />} />
          <Route path='/csp' element={<CSP />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;


