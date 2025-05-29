import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import UserProfile from "@/components/UserProfile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            Your Profile
          </h1>
          
          <div className="flex justify-center items-center gap-4">
            <SignedIn>
              <div className="flex flex-col items-center gap-4">
                <UserButton afterSignOutUrl="/"/>
                <UserProfile />
              </div>
            </SignedIn>
            
            <SignedOut>
              <div className="flex flex-col items-center gap-4">
                <SignInButton />
                <p className="text-gray-600 dark:text-gray-300">
                  Please sign in to continue
                </p>
              </div>
            </SignedOut>
          </div>
        </div>
      </main>
    </div>
  );
} 