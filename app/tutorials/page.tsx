import React from 'react'

const TutorialsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            Tutorials
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Coming soon! We are working on creating amazing tutorials for you.
          </p>
        </div>

        {/* Placeholder content */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Tutorial {i}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                This is a placeholder for an upcoming tutorial. Stay tuned!
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default TutorialsPage 