// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// 1. Define your strict numeric hierarchy mapping
const ROLE_LEVELS: Record<string, number> = {
  guest: 0,
  member: 1,
  researcher: 2,
  moderator: 3,
  coordinator: 4,
  admin: 5,
};

// 2. Define routes and the MINIMUM role required to access them
const protectedRoutes = [
  { path: '/dashboard/admin', minRole: 'admin' },
  { path: '/manupulation', minRole: 'moderator' },
  { path: '/dashboard/research', minRole: 'researcher' },
  { path: '/dashboard', minRole: 'member' }, // General dashboard
  { path: '/profile', minRole: 'guest' }, // Anyone logged in can see profile
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Find if the current route matches any of our rules
  const matchedRoute = protectedRoutes.find((route) =>
    pathname.startsWith(route.path),
  );

  // If the route isn't listed in our rules, let them pass
  if (!matchedRoute) return NextResponse.next();

  const sessionCookie = request.cookies.get('better-auth.session_token');

  // If no session token cookie is found, redirect to login page
  if (!sessionCookie) {
    const signInUrl = new URL('/authentication/signIn', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  try {
    // 3. Talk to Better Auth's session endpoint to get the live user profile/role
    // Use the actual API URL instead of the Next.js origin
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const res = await fetch(`${apiUrl}/api/auth/get-session`, {
      headers: {
        Cookie: `better-auth.session_token=${sessionCookie.value}`,
      },
    });

    const session = await res.json();

    // If the session is invalid or expired, clear it and redirect
    if (!session || !session.user) {
      const signInUrl = new URL('/authentication/signIn', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    // 4. Hierarchical Role Verification
    const userRole = session.user.role || 'guest';
    const userClearance = ROLE_LEVELS[userRole] ?? 0;
    const requiredClearance = ROLE_LEVELS[matchedRoute.minRole];

    // If their level is below the required clearance, send them to an unauthorized error page
    if (userClearance < requiredClearance) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Everything looks good, proceed to the page!
    return NextResponse.next();
  } catch (error) {
    // If your backend auth server is down or returns an error, safely block access
    return NextResponse.redirect(
      new URL('/authentication/signIn', request.url),
    );
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
