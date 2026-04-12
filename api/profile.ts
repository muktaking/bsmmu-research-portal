// api/profile.ts
import { cookies } from 'next/headers';

export async function getUserProfile() {
  // 1. Extract the cookie securely on the server
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  // If there's no token in the browser's request, fail early
  if (!token) {
    return null;
  }

  try {
    // 2. Make the request to your NestJS backend
    // You MUST manually attach the cookie to the headers here
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
      {
        method: 'GET',
        headers: {
          // Forwarding the HttpOnly cookie to NestJS
          Cookie: `access_token=${token}`,
        },
        cache: 'no-store', // Ensures we don't cache stale user data
      },
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}
