import math
import numpy as np
import pandas as pd
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, LSTM
import random

def train_and_predict(ticker, prediction_days=30):
    # Fetch historical stock data
    print(f"Fetching data for {ticker} with {prediction_days} prediction days.")
    stock_data = yf.download(ticker, start='2012-01-01')

    # Filter to use only the 'Close' column
    data = stock_data.filter(['Close'])
    dataset = data.values
    training_data_len = math.ceil(len(dataset) * 0.8)

    # Scale the data
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(dataset)

    # Create training data
    train_data = scaled_data[0:training_data_len, :]
    x_train = []
    y_train = []

    for i in range(60, len(train_data)):
        x_train.append(train_data[i-60:i, 0])
        y_train.append(train_data[i, 0])

    x_train, y_train = np.array(x_train), np.array(y_train)

    # Reshape the data for LSTM layer
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

    # Build LSTM model
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(x_train.shape[1], 1)))
    model.add(LSTM(50, return_sequences=False))
    model.add(Dense(25))
    model.add(Dense(1))

    # Compile the model
    model.compile(optimizer='adam', loss='mean_squared_error')

    # Train the model (3 epochs, average results)
    epochs = 3
    all_predictions = []
    for epoch in range(epochs):
        model.fit(x_train, y_train, batch_size=1, epochs=1)

        # Create test data
        test_data = scaled_data[training_data_len - 60:, :]
        x_test = []
        y_test = dataset[training_data_len:, :]

        for i in range(60, len(test_data)):
            x_test.append(test_data[i-60:i, 0])

        x_test = np.array(x_test)
        x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

        # Generate predictions
        predictions = model.predict(x_test)
        predictions = scaler.inverse_transform(predictions)
        all_predictions.append(predictions)

    # Average the predictions from all epochs
    averaged_predictions = np.mean(all_predictions, axis=0)

    # Add noise to simulate realistic fluctuations
    random_noise = np.random.normal(0, 0.01 * np.std(averaged_predictions), averaged_predictions.shape)
    fluctuating_predictions = averaged_predictions + random_noise

    # Calculate RMSE
    rmse = np.sqrt(np.mean((fluctuating_predictions - y_test) ** 2))

    # Create a list of future predictions
    future_predictions = fluctuating_predictions[-prediction_days:].tolist()

    return {
        'predictions': fluctuating_predictions.flatten().tolist(),
        'future_predictions': future_predictions,
        'rmse': rmse
    }
