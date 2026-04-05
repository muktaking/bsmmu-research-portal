import { Institute } from '@/types/researcher';
import React from 'react';

// 1. Define the TypeScript interface matching your clean data
export interface UserData {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  avatar: string;
  email: string;
  gender: string;
  phone: string;
  degree: string;
  designation: string | null;
  institute: number;
  address: string;
  role: number;
  createdAt: string;
  // Note: password and reset tokens are intentionally omitted here!
}

export default function UserProfile({ user }: { user: UserData }) {
  // Helper to format the date safely
  const formattedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Helper to get a display name since firstname is empty in your data
  const displayName =
    user.firstname || user.lastname
      ? `${user.firstname} ${user.lastname}`.trim()
      : user.username;

  // Helper to get an initial for the avatar
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header Banner */}
      <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>

      {/* Main Profile Header */}
      <div className="px-6 sm:px-8">
        <div className="-mt-12 mb-6 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end">
          {/* Avatar (Handles the "neutral" string by rendering an initial) */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white bg-white text-4xl font-bold text-blue-600 shadow-md dark:border-gray-800 dark:bg-gray-100 sm:h-32 sm:w-32">
            {initial}
          </div>

          <div className="pb-2">
            <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-white sm:text-3xl">
              {displayName}
            </h1>
            <p className="mt-1 font-medium text-blue-600 dark:text-blue-400">
              {user.degree || 'Degree not specified'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{user.username}
            </p>
          </div>
        </div>
      </div>

      {/* Information Grid */}
      <div className="px-6 pb-8 sm:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Contact Information Card */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-700/30">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-400">
              Contact Details
            </h3>
            <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Email Address
                </span>
                <span className="font-medium">{user.email}</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Phone Number
                </span>
                <span className="font-medium">{user.phone}</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Location
                </span>
                <span className="font-medium capitalize">{user.address}</span>
              </li>
            </ul>
          </div>

          {/* Professional Details Card */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-700/30">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-400">
              Account & Professional Info
            </h3>
            <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Designation
                </span>
                <span className="font-medium capitalize">
                  {user.designation || (
                    <span className="italic text-gray-400">Not provided</span>
                  )}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Institute
                </span>
                <span className="font-medium">
                  {Institute[user.institute].toUpperCase()}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Member Since
                </span>
                <span className="font-medium">{formattedDate}</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Gender
                </span>
                <span className="font-medium capitalize">{user.gender}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
