'use client';

import { useUser } from "@clerk/nextjs";

export default function UserProfile() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Your Account Details
      </h2>
      <div className="space-y-2">
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">User ID:</span> {user.id}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">Email:</span> {user.primaryEmailAddress?.emailAddress}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">Name:</span> {user.fullName}
        </p>
      </div>
    </div>
  );
} 