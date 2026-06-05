'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthToggle() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/authentication/signIn');
            router.refresh(); // Ensure server components update
          },
        },
      });
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  if (isPending) return <p>Loading auth state...</p>;

  // 2. If no user session, show the Login/Register buttons
  if (!session?.user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/authentication/signIn"
          className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
        >
          Sign In
        </Link>
        <Link
          href="/authentication/signUp"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          SignUp
        </Link>
      </div>
    );
  }

  // If user exists, show the user info and Logout button
  return (
    <div className="flex items-center gap-4">
      {session?.user && (
        <span className="hidden text-lg font-medium text-gray-700 dark:text-gray-300 sm:block">
          Hello, {session?.user.name || 'User'}
        </span>
      )}
      <button
        onClick={handleSignOut}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
}
