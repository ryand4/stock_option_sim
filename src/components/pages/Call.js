import React, { useState, useEffect } from 'react';
import './Call.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Cumulative Normal Distribution Function approximation
function cumulativeNormalDistribution(x) {
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;
  const p = 0.2316419;
  const c = 0.39894228;

  const t = 1.0 / (1.0 + p * Math.abs(x));
  const tSquared = t * t;
  const tCubed = tSquared * t;
  const tFourth = tCubed * t;
  const tFifth = tFourth * t;
  const term = (c * Math.exp(-x * x / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1));
  return x < 0 ? (1.0 - term) : term;
}


const Call = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  const [formData, setFormData] = useState({
    numContracts: '',
    contractCost: '',
    strikePrice: '',
    expirationDate: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stockPrice, setStockPrice] = useState(100.00); // Initial stock price
  const [intervalId, setIntervalId] = useState(null);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    updateChartData(); // Update chart data when stock price changes
  }, [stockPrice]);

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
    updateChartData();
  };

  const handleMouseUp = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleMouseDown = (change) => {
    let count = 0;
    const id = setInterval(() => {
      const increment = count < 50 ? 0.1 : 0.01;
      setStockPrice(prevPrice => parseFloat((prevPrice + (change * increment)).toFixed(2)));
      count++;
    }, 10);
    setIntervalId(id);
  };

  const handleClick = (change) => {
    setStockPrice(prevPrice => parseFloat((prevPrice + change).toFixed(2)));
  };

  const calculateBlackScholes = (S, K, T, r, sigma, q) => {
    const Phi = cumulativeNormalDistribution;
    const d1 = (Math.log(S / K) + (r - q + 0.5 * sigma ** 2) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);
    return S * Math.exp(-q * T) * Phi(d1) - K * Math.exp(-r * T) * Phi(d2);
};

const updateChartData = () => {
    const { numContracts, strikePrice, contractCost, expirationDate, volatility, riskFreeRate, dividendYield } = formData;
    const currentDate = new Date();
    const expirationDateObj = new Date(expirationDate);
    const T = Math.max((expirationDateObj - currentDate) / (1000 * 3600 * 24 * 365), 0); // in years

    const labels = Array.from({ length: Math.ceil(T * 365) }, (_, i) => `Day ${i + 1}`);
    const data = labels.map((_, i) => {
        const estimatedStockPrice = stockPrice; // Assuming constant stock price for simplicity
        const callPremium = calculateBlackScholes(estimatedStockPrice, strikePrice, T, riskFreeRate / 100, volatility / 100, dividendYield / 100);
        const profitPerContract = (estimatedStockPrice - strikePrice - callPremium) * 100;
        return profitPerContract * numContracts;
    });

    setChartData({
        labels,
        datasets: [{
            label: 'Projected Profit/Loss',
            data,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }],
    });
};

  return (
    <div className="container">
      <video autoPlay loop muted className="background-video">
        <source src="/videos/video-3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        {isSubmitted ? (
          <>
            <div className="price-adjuster">
              <button onClick={() => handleClick(-0.01)} onMouseDown={() => handleMouseDown(-1)} onMouseUp={handleMouseUp}>&#9664;</button>
              <span>Stock Price: ${stockPrice.toFixed(2)}</span>
              <button onClick={() => handleClick(0.01)} onMouseDown={() => handleMouseDown(1)} onMouseUp={handleMouseUp}>&#9654;</button>
            </div>
            <Line data={chartData} options={{
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Days Until Expiration'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Profit/Loss ($)'
                  }
                }
              }
            }} />
          </>
        ) : (
          <div className="form-container">
            <h1 className="title">Call Option</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Number of Contracts:
                <input type="number" name="numContracts" value={formData.numContracts} onChange={handleInputChange} />
              </label>
              <label>
                Strike Price:
                <input type="number" name="strikePrice" value={formData.strikePrice} onChange={handleInputChange} />
              </label>
              <label>
                Average Contract Cost/Premium:
                <input type="number" name="contractCost" step="0.01" value={formData.contractCost} onChange={handleInputChange} />
              </label>
              <label>
                Expiration Date:
                <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleInputChange} />
              </label>
              <label>
                                Volatility (%):
                                <input type="number" name="volatility" step="0.1" value={formData.volatility} onChange={handleInputChange} />
                            </label>
                            <label>
                                Risk-Free Rate (%):
                                <input type="number" name="riskFreeRate" step="0.01" value={formData.riskFreeRate} onChange={handleInputChange} />
                            </label>
                            <label>
                                Dividend Yield (%):
                                <input type="number" name="dividendYield" step="0.01" value={formData.dividendYield} onChange={handleInputChange} />
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
