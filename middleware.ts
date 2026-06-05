import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/profile'];
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (!isProtected) return NextResponse.next();
  const sessionCookie = request.cookies.get('better-auth.session_token');
  if (!sessionCookie) {
    const signInUrl = new URL('/authentication/signIn', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
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
