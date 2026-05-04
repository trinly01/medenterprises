import { Job } from '../types/job';
import jobs from '../data/jobs.json';

const getBaseUrl = () => {
  // For Vercel deployment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // For local development
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
};

/**
 * Fetch all jobs from the Next.js API route (/api/jobs).
 * Uses ISR with revalidation every hour.
 */
export async function getAllJobs(): Promise<Job[]> {

  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/jobs`, {
    next: { revalidate: 3600 } // ISR: revalidate every hour
  });
  if (!res.ok) return jobs.jobs;
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
