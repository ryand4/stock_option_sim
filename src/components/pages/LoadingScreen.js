import React, { useEffect, useState } from 'react';
import './LoadingScreen.css'; // Import CSS for loading styles

const LoadingScreen = () => {
    const messages = [
        "Initializing model...",
        "Loading historical data...",
        "Optimizing hyperparameters...",
        "Training the neural network...",
        "Running backpropagation...",
        "Simulating future stock prices...",
        "Calibrating predictions...",
        "Finalizing the model..."
    ];

    const [currentMessage, setCurrentMessage] = useState(messages[0]);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
            setCurrentMessage(messages[messageIndex]);
        }, 16000); // Change message every 3 seconds

        return () => clearInterval(interval);
    }, [messageIndex]);

    return (
        <div className="loading-screen">
            <div className="spinner"></div> {/* Spinner Animation */}
            <h1>Simulating...</h1>
            <p>{currentMessage}</p>
            <p className="loading-info">This usually takes about 2 minutes to complete.</p>
        </div>
    );
};

export default LoadingScreen;
