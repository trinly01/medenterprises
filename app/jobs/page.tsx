import { getAllJobs } from '../../lib/jobs';
import JobCard from './_components/JobCard';
import JobFilters from './_components/JobFilters';
import type { Metadata } from 'next';
import type { Job } from '../../types/job';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Medical Jobs | MedEnterprises',
    description: 'Find your next medical career opportunity in New Zealand',
    openGraph: {
      title: 'Medical Jobs | MedEnterprises',
      description: 'Find your next medical career opportunity in New Zealand',
      url: 'https://medenterprises.com/jobs',
    },
    alternates: {
      canonical: 'https://medenterprises.com/jobs',
    },
  };
}

interface JobsPageProps {
  searchParams: Promise<{ department?: string; type?: string }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const jobs = await getAllJobs();
  const params = await searchParams;
  const department = params.department;
  const type = params.type;

  const filteredJobs = jobs.filter((job: Job) => {
    if (department && job.department !== department) return false;
    if (type && job.type !== type) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
          <p className="mt-2 text-lg text-gray-600">
            Find your next medical career opportunity in New Zealand
          </p>
        </div>

        <JobFilters jobs={jobs} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {filteredJobs.map((job: Job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </main>
  );
}
