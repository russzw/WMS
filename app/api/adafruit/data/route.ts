import { NextResponse } from 'next/server';
import axios from 'axios';

const AIO_USERNAME = process.env.AIO_USERNAME || '';
const AIO_KEY = process.env.AIO_KEY || '';
const FEED_KEY = process.env.FEED_KEY || '';

if (!AIO_USERNAME || !AIO_KEY || !FEED_KEY) {
  console.warn('Warning: One or more Adafruit environment variables are missing. Please check your .env.local file.');
}

export async function GET() {
  if (!AIO_USERNAME || !AIO_KEY || !FEED_KEY) {
    return NextResponse.json({ error: 'Missing Adafruit environment variables' }, { status: 500 });
  }
  try {
    const response = await axios.get(
      `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_KEY}/data?limit=15`,
      {
        headers: {
          'X-AIO-Key': AIO_KEY,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Adafruit:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Adafruit' }, { status: 500 });
  }
}
