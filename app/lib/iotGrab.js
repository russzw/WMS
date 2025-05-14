// lib/iotGrab.js

import axios from 'axios';

const AIO_USERNAME = process.env.ADAFRUIT_IO_USERNAME;
const AIO_KEY = process.env.ADAFRUIT_IO_KEY;
const FEED_KEY = 'binfill';

export const fetchData = async () => {
  try {
    const response = await axios.get(`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_KEY}/data?limit=15`, {
      headers: {
        'X-AIO-Key': AIO_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
