// app/dashboard/page.tsx
import { getUserProfile } from '@/api/profile';
import UserProfile from '@/app/components/userProfile';

export default async function DashboardPage() {
  const user = await getUserProfile();

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-8">
      <div className="mx-auto mb-6 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your profile and settings.
        </p>
      </div>

      {/* Render the new Profile Component */}
      {user ? (
        <UserProfile user={user} />
      ) : (
        <div className="rounded bg-red-100 p-4 text-red-500">
          Unable to load user profile.
        </div>
      )}
    </div>
  );
}
