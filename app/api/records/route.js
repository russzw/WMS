import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db('dashboard');
    const collection = db.collection('your_collection_name');
    const records = await collection.find({}).skip(skip).limit(limit).toArray();
    
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching data from MongoDB' }, { status: 500 });
  }
}
