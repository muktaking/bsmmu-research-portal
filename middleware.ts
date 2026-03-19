// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Check if the 'access_token' cookie exists
  const token = request.cookies.get('access_token')?.value;

  // 2. If no token is found, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. If the token exists, allow the request to proceed
  return NextResponse.next();
}

// 4. Specify which routes this middleware should protect
export const config = {
  matcher: [
    '/dashboard/:path*', // Protects /dashboard and any sub-routes
    '/profile/:path*',
    '/scale/:path*',
    // Add other protected routes here
  ],
};
