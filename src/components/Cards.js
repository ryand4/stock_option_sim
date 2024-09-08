import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards' id='cards-section'>
      <h1>Enhance Your Trading Strategies with Advanced Tools</h1>
      <p>Leverage predictive models to forecast stock prices and technical analysis tools, helping refine your investment decisions.</p>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-12.png'
              text='PricePredictAI: Forecast Future Stock Prices'
              label='AI Prediction'
              path='/PricePredictAI'
              labelClass='green-label'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.png'
              text='TrendChart: Compare Moving Averages'
              label='TA Tool'
              path='/TrendChart'
              labelClass='green-label'
            />
            
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;