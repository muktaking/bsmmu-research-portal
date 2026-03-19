'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Tell NestJS to clear the HttpOnly cookie
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authentication/logout`, {
        method: 'POST',
        credentials: 'include', // Crucial: allows the browser to process the Set-Cookie deletion
      });

      // FIRE AND FORGET: Force a hard browser navigation.
      // This immediately unmounts the current page and wipes the Next.js cache.
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 hover:text-red-700 disabled:opacity-50 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
    >
      {isLoggingOut ? 'Logging out...' : 'Log Out'}
    </button>
  );
}
