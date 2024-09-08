import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Hero.css';
import { Link as ScrollLink } from 'react-scroll';

function Hero() {
  return (
    <div className='hero-container'>
      <video className="background-video" src="/videos/video-1.mp4" autoPlay loop muted />
      <img className="background-image" src="/images/img-6.png" alt="Background" />
      <h1>SMARTER INVESTING AWAITS</h1>
      <p>Trade Stocks Like A Pro For Free</p>
      <div className="hero-btns">
        <Button 
          className='btns' 
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          to='/guide'
        >
          LEARN MORE
        </Button>

        <ScrollLink 
          to="cards-section" 
          smooth={true} 
          duration={800} // Customize scroll duration in milliseconds
          offset={-70} // Adjust for any fixed header
        >
          <Button 
            className='btns' 
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            to='#'
          >
            OUR SERVICES
          </Button>
        </ScrollLink>
      </div>
    </div>
  );
}

export default Hero;

