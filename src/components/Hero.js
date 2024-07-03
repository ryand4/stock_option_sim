import React from 'react'
import '../App.css';
import { Button } from './Button';
import './Hero.css';


function Hero() {
  return (
    <div className='hero-container'>
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h1>SMARTER INVESTING AWAITS</h1>
      <p>Simulate Stock Options Like A Pro</p>
      <div className="hero-btns">
        <Button className='btns' buttonStyle='btn--outline'
        buttonSize='btn--large'>GET STARTED</Button>
        <Button className='btns' buttonStyle='btn--primary'
        buttonSize='btn--large'>VISUALIZE RETURNS</Button>
      </div>
    </div>
  );
}

export default Hero;
