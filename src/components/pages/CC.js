import React, { useEffect, useState } from 'react';
import '../../App.css';

const StockPriceChart = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState('');
  const [ticker, setTicker] = useState('');  // Default to empty string
  const [timeframe, setTimeframe] = useState('5y');  // Default to 5 years
  const [movingAverages, setMovingAverages] = useState({
    '50': true,
    '100': true,
    '200': true
  });  // Default to all MAs selected

  // Function to fetch the stock chart image
  const fetchImage = () => {
    // Clear previous error and image
    setError('');
    setImageSrc('');

    if (!ticker) {
      setError('Please enter a stock ticker.');
      return;
    }

    const selectedMAs = Object.keys(movingAverages).filter(ma => movingAverages[ma]);
    const maString = selectedMAs.join(',');

    fetch(`https://gray-coast-af03e54380c84bf6904e905d921c75fc.azurewebsites.net/plot?ticker=${ticker}&timeframe=${timeframe}&ma=${maString}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.blob();
      })
      .then(imageBlob => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImageSrc(imageObjectURL);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setError('Failed to fetch image. ' + error.message);
      });
  };

  // Trigger fetchImage when user changes the timeframe or a moving average checkbox
  useEffect(() => {
    if (ticker) {
      fetchImage();
    }
  }, [timeframe, movingAverages]);

  const handleCheckboxChange = (ma) => {
    setMovingAverages(prevState => ({
      ...prevState,
      [ma]: !prevState[ma]
    }));
  };

  return (
    <div className="stock-container">
      <h1>Stock Price Chart with Moving Averages</h1>

      <div className="stock-form-container">
        <input 
          type="text" 
          value={ticker} 
          onChange={e => setTicker(e.target.value.toUpperCase())} 
          placeholder="Enter stock ticker"
        />

        <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
          <option value="1y">Last 1 Year</option>
          <option value="2y">Last 2 Years</option>
          <option value="3y">Last 3 Years</option>
          <option value="5y">Last 5 Years</option>
          <option value="10y">Last 10 Years</option>
          <option value="all">All Time</option>
        </select>

        <div className="stock-checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={movingAverages['50']}
              onChange={() => handleCheckboxChange('50')}
            />
            50-Day MA
          </label>

          <label>
            <input
              type="checkbox"
              checked={movingAverages['100']}
              onChange={() => handleCheckboxChange('100')}
            />
            100-Day MA
          </label>

          <label>
            <input
              type="checkbox"
              checked={movingAverages['200']}
              onChange={() => handleCheckboxChange('200')}
            />
            200-Day MA
          </label>
        </div>

        <button onClick={fetchImage}>Get Stock Data</button>
      </div>

      {error && <p>{error}</p>}
      {imageSrc && <img src={imageSrc} alt="Stock Price Chart" className="stock-image" />}
    </div>
  );
};

export default StockPriceChart;
