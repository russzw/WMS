import { NextResponse } from 'next/server';
import { parse } from 'csv-parse';
import clientPromise from '@/app/lib/mongodb';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ message: 'File not provided' }, { status: 400 });
    }

    const fileContent = await file.text();

    try {
      const records = await parseCsv(fileContent);

      try {
        const client = await clientPromise;
        const db = client.db('dashboard');
        const collection = db.collection('your_collection_name');
        await collection.insertMany(records);

        return NextResponse.json({ message: 'File uploaded successfully' });
      } catch (error) {
        return NextResponse.json({ message: 'Error inserting data into MongoDB' }, { status: 500 });
      }
    } catch (error) {
      return NextResponse.json({ message: 'Error processing file' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

async function parseCsv(fileContent) {
  return new Promise((resolve, reject) => {
    const records = [];
    parse(fileContent, { columns: true }, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
