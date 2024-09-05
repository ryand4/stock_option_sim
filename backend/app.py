from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import yfinance as yf
import os
from bullbear import generate_plot  # Existing import
from stock_predictor import train_and_predict  # New import for stock prediction
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up basic logging
logging.basicConfig(level=logging.DEBUG)

# Existing route for plotting moving averages
@app.route('/plot', methods=['GET'])
def get_plot():
    ticker = request.args.get('ticker', default='AAPL').upper()  # Default to AAPL if no ticker is provided
    timeframe = request.args.get('timeframe', default='5y')  # Default to 5 years if no timeframe is provided
    ma_list = request.args.get('ma', default='50,100,200').split(',')  # Default to 50, 100, 200 MA
    
    try:
        generate_plot(ticker, timeframe, ma_list)  # Pass the ticker, timeframe, and MA list
        file_path = os.path.join(os.getcwd(), 'stock_price_with_ma.png')
        if os.path.exists(file_path):
            return send_file(file_path, mimetype='image/png')
        else:
            return "File not found", 404
    except Exception as e:
        app.logger.error(f"Error generating plot: {str(e)}")
        return f"An error occurred: {str(e)}", 500

# New route for stock price prediction
@app.route('/train-predict', methods=['POST'])
def stock_prediction():
    try:
        # Get the stock ticker and prediction days from the request
        data = request.json
        ticker = data.get('ticker', 'AAPL')
        prediction_days = data.get('prediction_days', 30)

        app.logger.info(f"Fetching data for {ticker} with {prediction_days} prediction days.")
        
        # Call the train_and_predict function from stock_prediction.py
        prediction_result = train_and_predict(ticker, prediction_days)
        
        app.logger.info(f"Prediction result: {prediction_result}")

        return jsonify(prediction_result)
    except Exception as e:
        app.logger.error(f"Error during stock prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

# New route to fetch option data
@app.route('/api/aapl-option', methods=['GET'])
def get_option_data():
    try:
        ticker = 'AAPL'
        stock = yf.Ticker(ticker)
        option_dates = stock.options

        # Fetch options chain for the nearest expiration date
        options_chain = stock.option_chain(option_dates[0])
        call_options = options_chain.calls

        # Extract only necessary fields
        options_data = call_options[['strike', 'lastPrice', 'volume']].to_dict(orient='records')

        return jsonify(options_data)
    except Exception as e:
        app.logger.error(f"Error fetching option data: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, host='0.0.0.0')











# import numpy as np
# import pandas as pd
# import matplotlib.pyplot as plt
# import yfinance as yf
# from keras.models import Sequential
# from keras.layers import Dense, LSTM
# from sklearn.preprocessing import MinMaxScaler
# from datetime import datetime, timedelta

# # Fetch data
# end = datetime.today().strftime('%Y-%m-%d')
# start = (datetime.today() - timedelta(days=365*10)).strftime('%Y-%m-%d')
# ticker = 'AAPL'
# data = yf.download(ticker, start=start, end=end)

# # Prepare data
# data = data[['Close']]
# scaler = MinMaxScaler(feature_range=(0, 1))
# scaled_data = scaler.fit_transform(data)

# # Build Model
# model = Sequential([
#     LSTM(units=50, activation='relu', return_sequences=True, input_shape=(100, 1)),
#     LSTM(units=50, activation='relu'),
#     Dense(1)
# ])
# model.compile(optimizer='adam', loss='mean_squared_error')

# # Training data preparation
# x_train = []
# y_train = []
# for i in range(100, len(scaled_data)):
#     x_train.append(scaled_data[i-100:i, 0])
#     y_train.append(scaled_data[i, 0])
# x_train, y_train = np.array(x_train), np.array(y_train)
# x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

# # Train the model
# model.fit(x_train, y_train, epochs=50, batch_size=32)

# # Predicting future 100 days
# last_100_days = scaled_data[-100:]  # Last 100 days data
# list_of_predictions = last_100_days.reshape(1, -1, 1)
# predicted_stock_prices = []
# for _ in range(100):  # Predict 100 days into the future
#     predicted_price = model.predict(list_of_predictions[:, -100:, :])
#     predicted_stock_prices.append(predicted_price[0, 0])
#     list_of_predictions = np.append(list_of_predictions, predicted_price)
#     list_of_predictions = list_of_predictions.reshape(1, -1, 1)

# # Reverse scaling
# predicted_stock_prices = np.array(predicted_stock_prices).reshape(-1, 1)
# predicted_stock_prices = scaler.inverse_transform(predicted_stock_prices)

# # Scenario Analysis
# bear_case = predicted_stock_prices * 0.95  # 5% lower
# bull_case = predicted_stock_prices * 1.05  # 5% higher
# average_case = predicted_stock_prices  # as predicted

# # Plotting the predictions
# plt.figure(figsize=(14, 7))

# plt.plot(range(1, 101), bear_case, label='Bear Case (5% Lower)', color='red')
# plt.plot(range(1, 101), bull_case, label='Bull Case (5% Higher)', color='green')
# plt.plot(range(1, 101), average_case, label='Average Case (Predicted)', color='blue')

# plt.title('Predicted Stock Prices for the Next 100 Days')
# plt.xlabel('Days into the Future')
# plt.ylabel('Stock Price')
# plt.legend()

# plt.show()

# # Print predictions
# print("Bear Case Predictions:")
# print(bear_case.flatten())
# print("\nBull Case Predictions:")
# print(bull_case.flatten())
# print("\nAverage Case Predictions:")
# print(average_case.flatten())




# # from flask import Flask, jsonify
# # from flask_cors import CORS
# # import yfinance as yf
# from yahoo_fin import options

# # Get options data for Apple
# aapl_options = options.get_options_chain("TSLA", 'August 9, 2024')

# print(aapl_options['calls'])  # Print call options data
# print(aapl_options['puts'])   # Print put options data












# app = Flask(__name__)
# CORS(app)  # Enable CORS for all domains on all routes

# @app.route('/api/aapl-option')
# def get_aapl_option():
#     aapl = yf.Ticker("AAPL")
#     try:
#         first_exp = aapl.options[0]
#         opt = aapl.option_chain(first_exp)
#         first_call = opt.calls.iloc[0].to_dict()
#     except Exception as e:
#         return jsonify({'error': str(e)})

#     return jsonify(first_call)

# if __name__ == '__main__':
#     app.run(debug=True)


