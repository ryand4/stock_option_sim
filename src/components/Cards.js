import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Simulate your Returns</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-5.png'
              text='Call Option'
              label='Bullish'
              path='/services'
              labelClass='green-label'
            />
            <CardItem
              src='images/img-2.png'
              text='Put Option'
              label='Bearish'
              path='/services'
              labelClass='red-label'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.png'
              text='Covered Call Option'
              label='Bullish'
              path='/services'
              labelClass='green-label'
            />
            <CardItem
              src='images/img-4.png'
              text='Cash-Secured Put Option'
              label='Bullish'
              path='/products'
              labelClass='green-label'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;