import matplotlib
matplotlib.use('Agg')  # Use the Agg backend for non-GUI rendering
import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import yfinance as yf
from datetime import datetime, timedelta

def generate_plot(ticker, timeframe, ma_list):
    # Convert timeframe into the appropriate start date
    end = datetime.today().strftime('%Y-%m-%d')
    if timeframe == '1y':
        start = (datetime.today() - timedelta(days=365)).strftime('%Y-%m-%d')
    elif timeframe == '2y':
        start = (datetime.today() - timedelta(days=365*2)).strftime('%Y-%m-%d')
    elif timeframe == '3y':
        start = (datetime.today() - timedelta(days=365*3)).strftime('%Y-%m-%d')
    elif timeframe == '5y':
        start = (datetime.today() - timedelta(days=365*5)).strftime('%Y-%m-%d')
    elif timeframe == '10y':
        start = (datetime.today() - timedelta(days=365*10)).strftime('%Y-%m-%d')
    else:
        start = '1900-01-01'  # All time

    # Fetch data for the given ticker and timeframe
    data = yf.download(ticker, start=start, end=end)

    # Plot the stock price
    plt.figure(figsize=(14, 7))
    plt.plot(data['Close'], label=f'{ticker} Stock Price', color='blue')

    # Add moving averages based on user selection
    if '50' in ma_list:
        data['50MA'] = data['Close'].rolling(window=50).mean()
        plt.plot(data['50MA'], label='50-Day MA', color='red')
    if '100' in ma_list:
        data['100MA'] = data['Close'].rolling(window=100).mean()
        plt.plot(data['100MA'], label='100-Day MA', color='orange')
    if '200' in ma_list:
        data['200MA'] = data['Close'].rolling(window=200).mean()
        plt.plot(data['200MA'], label='200-Day MA', color='green')

    plt.title(f'{ticker} Stock Price with Moving Averages')
    plt.xlabel('Date')
    plt.ylabel('Price')
    plt.legend()

    # Save the plot as an image file
    image_path = os.path.join(os.getcwd(), 'stock_price_with_ma.png')
    plt.savefig(image_path)
    plt.close()

