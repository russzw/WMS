// getAuth.js
import { authConfig } from './authConfig';
import { getSession } from 'next-auth/client'; // Adjust this based on your auth library

export async function getAuth(request) {
  const session = await getSession({ req: request });
  return { user: session?.user };
}