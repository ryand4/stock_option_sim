import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards' id='cards-section'>
      <h1>Visualize Your Options Trading Returns</h1>
      <p>Simulate various option strategies to see potential gains and losses.</p>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-5.png'
              text='Call Option'
              label='Bullish'
              path='/call'
              labelClass='green-label'
            />
            <CardItem
              src='images/img-2.png'
              text='Put Option'
              label='Bearish'
              path='/put'
              labelClass='red-label'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.png'
              text='Covered Call Option'
              label='Bullish'
              path='/cc'
              labelClass='green-label'
            />
            <CardItem
              src='images/img-4.png'
              text='Cash-Secured Put Option'
              label='Bullish'
              path='/csp'
              labelClass='green-label'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;