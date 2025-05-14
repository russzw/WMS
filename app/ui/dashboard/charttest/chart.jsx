"use client";

import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styles from "./chart.module.css";
import * as d3 from "d3-dsv"; // Import d3-dsv for CSV parsing
import React, { useState, useEffect } from 'react';

// Function to read data from a CSV file
const readCSV = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const text = await response.text();
    const data = d3.csvParse(text);
    return data; // Do not slice here, handle slicing in component
  } catch (error) {
    console.error("Error reading CSV file:", error);
    return []; // Return an empty array if there's an error
  }
};

// Function to format large numbers
const formatNumber = (number) => {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  } else if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  } else {
    return number;
  }
};

// Function to determine the Y-axis domain
const calculateDomain = (data, key) => {
  const values = data.map(item => Number(item[key]));
  const maxValue = Math.max(...values);
  return [0, maxValue > 100000 ? 'auto' : maxValue];
};

// Function to generate days of the week
const getDaysOfWeek = (length) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDayIndex = new Date().getDay();
  return Array.from({ length }, (_, i) => days[(currentDayIndex + i) % 7]);
};

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    // Read data from a CSV file (replace 'data.csv' with your actual CSV file path)
    readCSV("./data.csv").then((data) => {
      if (data) {
        // Generate days of the week
        const daysOfWeek = getDaysOfWeek(data.length);
        // Add days of the week to data
        const processedData = data.map((item, index) => ({
          ...item,
          day: daysOfWeek[index]
        }));
        setChartData(processedData);
      }
    });
  }, []);

  const handleNextClick = () => {
    setStartIndex((prevStartIndex) => {
      const newStartIndex = prevStartIndex + 7;
      // Ensure we do not go out of bounds
      if (newStartIndex >= chartData.length) {
        return prevStartIndex; // Do not update if out of bounds
      }
      return newStartIndex;
    });
  };

  const handlePrevClick = () => {
    setStartIndex((prevStartIndex) => Math.max(prevStartIndex - 7, 0));
  };

  const slicedData = chartData.slice(startIndex, startIndex + 7);
  const yDomain = calculateDomain(slicedData, 'lastweek');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Load Analytics</h2>
      <div>
        <button onClick={handlePrevClick} disabled={startIndex === 0}>Previous 7</button>
        <button onClick={handleNextClick} disabled={startIndex + 7 >= chartData.length}>Next 7</button>
      </div>
      <div className={styles["chart-container"]}>
        {slicedData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={slicedData} // Use the fetched data
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="day" />
              <YAxis tickFormatter={formatNumber} domain={yDomain} />
              <Tooltip contentStyle={{ backgroundColor: "#151c2c", border: "none" }} />
              <Legend />
              <Line type="monotone" dataKey="lastweek" stroke="#8884d8" />
              <Line type="monotone" dataKey="predicted" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default Chart;
