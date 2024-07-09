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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Call = () => {
  const [inputData, setInputData] = useState({
    stockPrice: '',
    strikePrice: '',
    volatility: '',
    expiration: ''
  });
  const [chartData, setChartData] = useState({
    labels: [], // This will be your dates or time until expiration
    datasets: [
      {
        label: 'Simulated Returns',
        data: [], // This will be calculated based on the input
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  });

  const handleInputChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const daysToExpiration = (new Date(inputData.expiration) - new Date()) / (1000 * 60 * 60 * 24);
    let simulatedReturns = [];
    let labels = [];
    
    for (let day = 0; day <= daysToExpiration; day++) {
      const priceAtDay = parseFloat(inputData.stockPrice) + (day * (parseFloat(inputData.strikePrice) - parseFloat(inputData.stockPrice)) / daysToExpiration);
      const profit = Math.max(0, priceAtDay - parseFloat(inputData.strikePrice));
      simulatedReturns.push(profit);
      labels.push(`Day ${day}`);
    }

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Simulated Returns',
          data: simulatedReturns,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="stockPrice"
          placeholder="Stock Price"
          value={inputData.stockPrice}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="strikePrice"
          placeholder="Strike Price"
          value={inputData.strikePrice}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="volatility"
          placeholder="Volatility (%)"
          value={inputData.volatility}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="expiration"
          placeholder="Expiration Date"
          value={inputData.expiration}
          onChange={handleInputChange}
        />
        <button type="submit">Calculate</button>
      </form>
      <Line data={chartData} />
    </div>
  );
};

export default Call;
