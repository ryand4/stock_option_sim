import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import '../../App.css'; // Assuming App.css holds global styles
import LoadingScreen from './LoadingScreen'; // Import the LoadingScreen component

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const StockPricePrediction = () => {
    const [ticker, setTicker] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        const predictionDays = 30;

        fetch('http://127.0.0.1:5000/train-predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticker, prediction_days: predictionDays }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const numericPredictions = data.future_predictions.map(Number);
                setPredictions(numericPredictions);
                setLoading(false); // Hide loading screen when data is fetched
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch predictions. Invalid ticker or ' + error.message);
                setLoading(false);
            });
    };

    const chartData = {
        labels: predictions.map((_, index) => `Day ${index + 1}`),
        datasets: [
            {
                label: `Predicted Stock Prices for ${ticker}`,
                data: predictions,
                fill: false,
                borderColor: 'rgba(0,0,255,10)',
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Price (USD)'
                }
            }
        }
    };

    return (
        <div className="stock-container">
            <h1 className="title">PricePredictAI (1 Month Outlook)</h1>
            <p className="description">
                PricePredictAI uses advanced machine learning algorithms to forecast the next 30 days of a stock's closing prices.
                To use this tool, enter a valid stock ticker (e.g., AAPL for Apple), and PricePredictAI will generate a chart of the 
                predicted prices. This simulation provides an estimate based on historical data and machine learning models. 
            </p>
            <div className="stock-form-container">
                <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    placeholder="Enter stock ticker"
                    className="ticker-input"
                />
                <button onClick={handleSubmit} className="predict-btn">Predict</button>
                <p className="disclaimer">
                    Disclaimer: This tool is for educational purposes only and should not be used as financial advice. Stock market predictions are speculative, and results may vary. Always consult a professional financial advisor.
                </p>
            </div>

            {loading ? (
                <LoadingScreen /> // Use the loading screen with rotating messages
            ) : error ? (
                <p>{error}</p>
            ) : (
                predictions.length > 0 && (
                    <div className="stock-chart-container">
                        <h2>Predicted Stock Prices for {ticker} (Next 30 Days):</h2>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                )
            )}
        </div>
    );
};

export default StockPricePrediction;
