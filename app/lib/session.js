// ./lib/session.js
import { decode } from 'next-auth/jwt'; // Adjust the import based on your session handling

export async function getSessionFromCookies(cookies) {
  const sessionToken = cookies['next-auth.session-token'] || cookies['__Secure-next-auth.session-token'];
  if (!sessionToken) {
    return null;
  }

  try {
    const session = await decode({ token: sessionToken });
    return session;
  } catch (error) {
    console.error('Failed to decode session token:', error);
    return null;
  }
}
