import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';
import { ac, roles } from '@/lib/access';

export const authClient = createAuthClient({
  // The address where your NestJS Better Auth controller is listening
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  plugins: [
    adminClient({
      ac,
      roles,
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
