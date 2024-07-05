import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the newsletter to receive our best updates
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button buttonStyle='btn--outline'>Subscribe</Button>
          </form>
        </div>
      </section>
      <div className='footer-contact'>
        <h2>Contact Us</h2>
        <p>Email: <a href='mailto:info@stockoptionsimulator.com'>info@stockoptionsimulator.com</a></p>
      </div>
      <div className='footer-logo'>
        <Link to='/' className='social-logo'>
          <i className='fab fa-typo3' />
        </Link>
        <small className='website-rights'>Stock Option Simulator © 2024</small>
      </div>
    </div>
  );
}

export default Footer;
