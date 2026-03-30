// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export enum RolePermitted {
  guest = 0,
  member = 1,
  researcher = 2,
  moderator = 3,
  coordinator = 4,
  admin = 5,
}

const roleRequirements: Record<string, RolePermitted> = {
  '/dashboard': RolePermitted.member,
  '/profile': RolePermitted.member,
  '/manupulation/researcher': RolePermitted.researcher,
  '/manupulation/article': RolePermitted.moderator,
  '/manupulation/scale': RolePermitted.moderator,
};

export function middleware(request: NextRequest) {
  // 1. Check if the 'access_token' cookie exists
  const token = request.cookies.get('access_token')?.value;

  // 2. If no token is found, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Role-based access control
  try {
    // Decode the token payload (this does not verify signature, which should be done by the API)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    const payload = JSON.parse(jsonPayload);
    const userRole = payload.role ?? RolePermitted.guest;

    const { pathname } = request.nextUrl;
    const matchedPath = Object.keys(roleRequirements).find((path) =>
      pathname.startsWith(path),
    );

    if (matchedPath) {
      const requiredRole = roleRequirements[matchedPath];
      if (userRole < requiredRole) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
  } catch (error) {
    // If token parsing fails, treat as invalid token
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. If the token exists and role is sufficient, allow the request to proceed
  return NextResponse.next();
}

// 5. Specify which routes this middleware should protect
export const config = {
  matcher: [
    '/dashboard/:path*', // Protects /dashboard and any sub-routes
    '/profile/:path*',
    '/manupulation/:path*',
    // Add other protected routes here
  ],
};
