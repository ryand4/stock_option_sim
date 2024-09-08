import React, { useState } from 'react';
import '../../App.css';
import './Guide.css'; // Assuming you'll add styles in a Guide.css file

export default function Guide() {
  // State to track which guide to display
  const [isPricePredict, setIsPricePredict] = useState(true);

  // Toggle function to switch between guides
  const toggleGuide = () => {
    setIsPricePredict(!isPricePredict);
  };

  return (
    <div className="guide-container">
      <h1 className="guide-title">Guide</h1>
      
      <div className="toggle-section">
        <button className="toggle-button" onClick={toggleGuide}>
          {isPricePredict ? "Switch to TrendChart Guide" : "Switch to PricePredictAI Guide"}
        </button>
      </div>

      {isPricePredict ? (
        <div>
          <h2 className="title-price-predict-ai">PricePredictAI</h2>
      <div className="guide-section">
        <h2>Overview</h2>
        <p>
          PricePredictAI is a machine learning tool designed to forecast stock prices over a 30-day period. Using Long Short-Term Memory (LSTM) neural networks, this tool analyzes historical data to generate predictions that can guide investment decisions. Here’s how it works:
        </p>

        {/* Table Section */}
        <div className="table-container">
          <table className="center-table">
            <tbody> {/* Added <tbody> to wrap the rows */}
              <tr>
                <td>1. Enter a valid stock ticker (e.g., AAPL for Apple) in the input field.</td>
              </tr>
              <tr>
                <td>2. Click the "Predict" button to generate the stock price forecast for the next 30 days.</td>
              </tr>
              <tr>
                <td>3. View the results on the graph showing the predicted prices over time.</td>
              </tr>
              <tr>
                <td>4. Interpret the forecast and apply insights to your investment strategy (for educational purposes only).</td>
              </tr>
            </tbody> {/* Closed <tbody> */}
          </table>
        </div>

        <div className="guide-section">
          <h2>Design Considerations</h2>
          <p>
            <strong>Machine Learning vs. Traditional Models:</strong> Unlike traditional models like linear regression, PricePredictAI employs neural networks, which are better at recognizing patterns in time-series data like stock prices. LSTMs, a type of Recurrent Neural Network (RNN), are specifically designed to capture sequential patterns and long-term dependencies, making them ideal for stock price prediction.
          </p>
        </div>

        <div className="guide-section">
          <h2>Why 3 Epochs?</h2>
          <p>
            In machine learning, an epoch refers to one complete pass through the dataset. PricePredictAI uses three epochs for the following reasons:
          </p>
          <ul>
            <li>
              <strong>Balance Between Overfitting and Generalization:</strong> Too few epochs can cause underfitting, while too many can lead to overfitting. Three epochs provide a balanced approach, ensuring the model doesn’t overfit while making accurate predictions.
            </li>
            <li>
              <strong>Computational Efficiency:</strong> Training the model with more epochs takes longer. Three epochs offer a good tradeoff between performance and training time.
            </li>
          </ul>
        </div>

        <div className="guide-section">
          <h2>Neural Networks and LSTM Architecture</h2>
          <p>
            <strong>Input Layer:</strong> Historical stock price data is scaled between 0 and 1 to improve the learning process. The model uses a rolling window of 60 days of stock prices to predict future prices.
          </p>
          <p>
            <strong>Hidden Layers:</strong> The LSTM layers process the stock data to identify complex relationships over time. The first LSTM layer returns sequences, while the second LSTM layer generates final outputs.
          </p>
          <p>
            <strong>Dense Layers:</strong> Two dense layers aggregate the information and output the predicted stock price for the next day.
          </p>
        </div>

        <div className="guide-section">
          <h2>Data Preprocessing</h2>
          <p>
            The input data is preprocessed to normalize stock prices between 0 and 1 using MinMaxScaler, which helps the model converge faster and improves accuracy. A 60-day window is used to prepare the data for training.
          </p>
        </div>

        <div className="guide-section">
          <h2>Training Process</h2>
          <p>
            The model minimizes the error between predicted and actual prices using Mean Squared Error (MSE) as the loss function. The Adam optimizer adjusts the model’s weights to ensure efficient learning.
          </p>
        </div>

        <div className="guide-section">
          <h2>Handling Stock Fluctuations and Random Noise</h2>
          <p>
            After generating predictions, a small random noise is added to simulate market fluctuations. This step helps create more realistic stock price predictions, reflecting market volatility.
          </p>
        </div>

        <div className="guide-section">
          <h2>Final Output and RMSE</h2>
          <p>
            After training, the model predicts stock prices for the next 30 days. Predictions are averaged across all three epochs for consistency. RMSE (Root Mean Square Error) is calculated to evaluate how accurate the model’s predictions are.
          </p>
        </div>

        <div className="guide-section">
          <h2>Design Choices and Justifications</h2>
          <ul>
            <li>
              <strong>LSTM for Time-Series Data:</strong> LSTMs are chosen due to their ability to handle time-dependent patterns in stock prices.
            </li>
            <li>
              <strong>MinMax Scaling:</strong> Scaling the data ensures smoother convergence and improved accuracy during training.
            </li>
            <li>
              <strong>3 Epochs for Training:</strong> This strikes a balance between preventing overfitting and computational efficiency.
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
<div>
  <h2 className="title-price-predict-ai">TrendChart</h2>
          <div className="guide-section">
            <h2>Overview</h2>
            <p>
              TrendChart allows users to compare moving averages over different periods. The tool provides insights on market trends and helps with technical analysis by plotting moving averages on a stock price chart.
            </p>
            <div className="table-container">
              <table className="center-table">
                <tbody>
                  <tr>
                    <td>1. Enter a valid stock ticker to fetch historical data.</td>
                  </tr>
                  <tr>
                    <td>2. Select the time frame for moving averages (e.g., 20-day, 50-day, 200-day).</td>
                  </tr>
                  <tr>
                    <td>3. View the graph displaying stock prices and moving averages.</td>
                  </tr>
                  <tr>
                    <td>4. Analyze the chart for trend reversals, crossovers, or other technical indicators.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="guide-section">
              <h2>Design Considerations</h2>
              <p>
                <strong>Moving Averages:</strong> This tool compares different types of moving averages, which smooth stock price data over time to help detect market trends.
              </p>
            </div>

            {/* Additional sections for TrendChart */}
          </div>
        </div>
      )}
    </div>
  );
}