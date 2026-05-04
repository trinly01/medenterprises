import { Job } from '../types/job';

/**
 * Fetch all jobs from the Next.js API route (/api/jobs).
 * Uses ISR with revalidation every hour.
 */
export async function getAllJobs(): Promise<Job[]> {
  const res = await fetch('http://localhost:3000/api/jobs', {
    next: { revalidate: 3600 } // ISR: revalidate every hour
  });
  if (!res.ok) throw new Error('Failed to fetch jobs');
  const data = await res.json();
  return data.jobs; // API returns { jobs: [...] }
}

/**
 * Fetch a single job by its slug.
 * Fetches all jobs and finds the matching one.
 */
export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  const allJobs = await getAllJobs();
  return allJobs.find((job) => job.slug === slug);
}
