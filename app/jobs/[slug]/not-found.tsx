import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Not Found | MedEnterprises',
  description: 'The job you are looking for does not exist or has been filled.',
};

export default function JobNotFound() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white shadow rounded-lg p-12">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Not Found</h1>

          <p className="text-lg text-gray-600 mb-8">
            The job you are looking for does not exist or has been filled.
          </p>

          <Link
            href="/jobs"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            View All Available Jobs
          </Link>
        </div>
      </div>
    </main>
  );
}
