import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  // The address where your NestJS Better Auth controller is listening
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
});

export const { signIn, signUp, signOut, useSession } = authClient;
