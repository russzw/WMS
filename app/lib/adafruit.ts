/*import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get(`https://io.adafruit.com/api/v2/russzw/feeds/binfill/data?limit=15`, {
      headers: {
        'X-AIO-Key': 'process.env.AIO_KEY',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}; */

export const fetchData = async () => {
  try {
    const response = await fetch('/api/adafruit/data');
    if (!response.ok) {
      console.error('Error fetching data from API route:', response.statusText);
      return [];
    }
    const data = await response.json();
    if (data.error) {
      console.error('API route error:', data.error);
      return [];
    }
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
