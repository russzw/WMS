"use client";

import React, { useState, useEffect } from 'react';

function IotData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the new server-side Adafruit API route
    const url = '/api/adafruit/data';

    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <p>Loading data...</p>;
  }

  // Round the latest value to the nearest integer
  const latestValue = Math.round(data[0].value);
  // Round the previous values to the nearest integer
  const previousValues = data.slice(1, 5).map(entry => ({
    ...entry,
    value: Math.round(entry.value)
  }));

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #f5f7fa 5%, #c3cfe2 100%)',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: '40px auto',
    },
    title: {
      fontSize: '24px',
      color: '#333',
      textAlign: 'center',
      marginBottom: '20px',
    },
    latestContainer: {
      marginBottom: '20px',
    },
    previousContainer: {
      marginBottom: '20px',
    },
    subtitle: {
      fontSize: '20px',
      color: '#555',
      marginBottom: '10px',
    },
    latestValue: {
      fontSize: '28px',
      color: '#1abc9c',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    valueList: {
      listStyle: 'none',
      padding: 0,
    },
    valueItem: {
      fontSize: '18px',
      color: '#333',
      background: '#fff',
      padding: '10px',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    bullet: {
      display: 'inline-block',
      width: '10px',
      height: '10px',
      backgroundColor: '#1abc9c',
      borderRadius: '50%',
      marginRight: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Bin Data</h2>
      <div style={styles.latestContainer}>
        <h3 style={styles.subtitle}>Latest Value:</h3>
        <p style={styles.latestValue}>{latestValue} %</p>
      </div>
      <div style={styles.previousContainer}>
        <h3 style={styles.subtitle}>Last 5 Values:</h3>
        <ul style={styles.valueList}>
          {previousValues.map((entry, index) => (
            <li key={index} style={styles.valueItem}>
              <span style={styles.bullet}></span>{entry.value} %
            </li>
          ))}
        </ul>
      </div>
      {/* Display additional data points or visualizations as needed */}
    </div>
  );
}

export default IotData;



