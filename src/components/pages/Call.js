import React, { useState } from 'react';

function Call() {
    const [ticker, setTicker] = useState('AAPL');
    const [predictionDays, setPredictionDays] = useState(30);
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        // Send POST request to backend for stock price predictions
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
                const flatPredictions = data.future_predictions.flat(); // Flatten the predictions array
                setPredictions(flatPredictions); // Set predictions from backend
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };

    return (
        <div>
            <h1>Stock Price Prediction</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Ticker Symbol:
                    <input
                        type="text"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    />
                </label>
                <br />
                <label>
                    Prediction Days:
                    <input
                        type="number"
                        value={predictionDays}
                        onChange={(e) => setPredictionDays(Number(e.target.value))}
                    />
                </label>
                <br />
                <button type="submit">Predict</button>
            </form>

            {loading ? (
                <p>Loading predictions...</p>
            ) : (
                predictions.length > 0 && (
                    <div>
                        <h2>Predicted Stock Prices for {ticker}:</h2>
                        <ul>
                            {predictions.map((price, index) => (
                                <li key={index}>
                                    Day {index + 1}: ${typeof price === 'number' ? price.toFixed(2) : 'Invalid price'}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            )}
        </div>
    );
}

export default Call;
