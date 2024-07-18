import React, { useState } from 'react';
import './Call.css';
import { useEffect } from 'react';

const Call = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [formData, setFormData] = useState({
    numContracts: '',
    contractCost: '',
    expirationDate: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stockPrice, setStockPrice] = useState(100); // Initial stock price
  const [intervalId, setIntervalId] = useState(null);  // State to hold interval ID

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  const handleMouseUp = () => {
    // Clear the interval when mouse is released
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleMouseDown = (change) => {
    // Start the interval when mouse is pressed down
    const id = setInterval(() => {
      setStockPrice(prevPrice => prevPrice + change);
    }, 100); // Change the price every 100 milliseconds
    setIntervalId(id);
  };

  return (
    <div className="container">
      <video autoPlay loop muted className="background-video">
        <source src="/videos/video-3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        {isSubmitted ? (
          <div className="price-adjuster">
            <button onMouseDown={() => handleMouseDown(-1)} onMouseUp={handleMouseUp}>&#9664;</button> {/* Left arrow */}
            <span>Stock Price: ${stockPrice}</span>
            <button onMouseDown={() => handleMouseDown(1)} onMouseUp={handleMouseUp}>&#9654;</button> {/* Right arrow */}
          </div>
        ) : (
          <div className="form-container">
            <h1 className="title">Call Option</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Number of Contracts:
                <input
                  type="number"
                  name="numContracts"
                  value={formData.numContracts}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Average Contract Cost/Premium:
                <input
                  type="number"
                  name="contractCost"
                  step="0.01"
                  value={formData.contractCost}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Expiration Date:
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Call;

