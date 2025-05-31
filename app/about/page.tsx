import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BlogFooter } from "@/components/home/blog-footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl mb-8">
            About Our Blog
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Welcome to our tech blog, where we share insights, tutorials, and
              the latest developments in web development, AI, and modern
              technology.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              We aim to provide high-quality, accessible content that helps
              developers stay up-to-date with the rapidly evolving tech
              landscape. Our articles cover everything from practical tutorials
              to in-depth analysis of emerging trends.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              What We Cover
            </h2>
            <ul className="list-disc pl-6 text-lg text-gray-600 dark:text-gray-300 mb-6">
              <li>Web Development Best Practices</li>
              <li>Modern JavaScript and TypeScript</li>
              <li>React and Next.js Tutorials</li>
              <li>AI and Machine Learning</li>
              <li>Performance Optimization</li>
              <li>Developer Tools and Resources</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Join Our Community
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              We encourage active participation from our readers. Feel free to
              comment on articles, share your experiences, and engage with other
              developers in our community.
            </p>
          </div>

          {/* Social Links Section */}
          <div className="flex gap-6 mt-10">
            <a
              href="https://github.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white" />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-blue-700" />
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-sky-500" />
            </a>
          </div>
        </div>
      </main>
      <BlogFooter />
    </div>
  );
};

export default AboutPage;
