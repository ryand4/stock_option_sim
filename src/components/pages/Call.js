import React, { useState } from 'react';
import './Call.css';

const Call = () => {
  const [formData, setFormData] = useState({
    numContracts: '',
    contractCost: '',
    expirationDate: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);  // Set the form as submitted
  };

  return (
    <div className="container">
      <video autoPlay loop muted className="background-video">
        <source src="/videos/video-3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        {!isSubmitted ? (
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
        ) : (
          <div className="result-container">
            <h1>Contracts: {formData.numContracts}</h1>
            <h1>Premium: {formData.contractCost}</h1>
            <h1>Exp Date: {formData.expirationDate}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Call;


