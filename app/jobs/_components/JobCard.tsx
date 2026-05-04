import Link from 'next/link';
import type { Job } from '../../../types/job';

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.slug}`} className="block">
      <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <span>📍</span> {job.location}
          </p>
          <p className="flex items-center gap-2">
            <span>💼</span> {job.type}
          </p>
          <p className="flex items-center gap-2">
            <span>🏥</span> {job.department}
          </p>
          <p className="flex items-center gap-2">
            <span>📅</span> Posted: {new Date(job.postedDate).toLocaleDateString('en-NZ')}
          </p>
        </div>
        <div className="mt-4 text-right">
          <span className="text-sm text-blue-600 font-medium">View Details →</span>
        </div>
      </div>
    </Link>
  );
}
