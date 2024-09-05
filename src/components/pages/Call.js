import React, { useState } from 'react';
import '../../App.css';

const StockPricePrediction = () => {
    const [ticker, setTicker] = useState('AAPL');  // Default ticker symbol
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        // Fixed prediction period: 1 month (30 days)
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
                setPredictions(data.future_predictions);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch predictions. ' + error.message);
                setLoading(false);
            });
    };

    return (
        <div className="stock-container">
            <h1>Stock Price Prediction (1 Month Outlook)</h1>
            <div className="stock-form-container">
                <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    placeholder="Enter stock ticker"
                />
                <button onClick={handleSubmit}>Predict</button>
            </div>

            {loading ? (
                <p>Loading predictions...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                predictions.length > 0 && (
                    <div>
                        <h2>Predicted Stock Prices for {ticker} (Next 30 Days):</h2>
                        <ul>
                            {predictions.map((price, index) => (
                                <li key={index}>Day {index + 1}: ${parseFloat(price).toFixed(2)}</li>
                            ))}
                        </ul>
                    </div>
                )
            )}
        </div>
    );
};

export default StockPricePrediction;

