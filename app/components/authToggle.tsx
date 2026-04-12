import { getUserProfile } from '@/api/profile';
import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from './logoutButton';

export default async function AuthToggle() {
  // 1. Check if the token exists in the browser's request
  const cookieStore = await cookies();
  const hasToken = cookieStore.has('access_token');

  // 2. If no token, show the Login/Register buttons
  if (!hasToken) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
        >
          Sign In
        </Link>
        <Link
          href="/registration"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Register
        </Link>
      </div>
    );
  }

  // 3. (Optional) If they have a token, fetch their profile to show their name
  const user = await getUserProfile();

  // 4. If token exists, show the user info and Logout button
  return (
    <div className="flex items-center gap-4">
      {user && (
        <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-300 sm:block">
          Hello, {user.username || 'User'}
        </span>
      )}
      <LogoutButton />
    </div>
  );
}
