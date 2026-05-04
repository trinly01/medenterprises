import { getAllJobs } from '../../lib/jobs';
import JobCard from './_components/JobCard';

export default async function JobsPage() {
  const jobs = await getAllJobs();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
          <p className="mt-2 text-lg text-gray-600">
            Find your next medical career opportunity in New Zealand
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
          <p className="text-sm text-gray-500">Filters will be added in Commit 3</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </main>
  );
}
