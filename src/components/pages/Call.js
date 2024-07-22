import React, { useState, useEffect } from 'react';

function Call() {
    const [optionData, setOptionData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/aapl-option')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setOptionData(data);
                setLoading(false);  // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);  // Also set loading to false in case of error
            });
    }, []);

    return (
        <div>
            <h1>Apple Call Option Data:</h1>
            {!loading ? (
                optionData ? (
                    <ul>
                        <li>Strike Price: ${optionData.strike}</li>
                        <li>Last Price: ${optionData.lastPrice}</li>
                        <li>Volume: {optionData.volume}</li>
                    </ul>
                ) : (
                    <p>No data available.</p>
                )
            ) : (
                <p>Loading option data...</p>
            )}
        </div>
    );
}

export default Call;
