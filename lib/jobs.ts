import { Job } from '../types/job';
import { jobs } from './data/jobs';

/**
 * Fetch all jobs from the data source.
 * Currently uses local fixture data.
 * For external API with ISR: uncomment the fetch implementation below.
 */
export async function getAllJobs(): Promise<Job[]> {
  // For local fixture data (current implementation):
  return jobs;

  // For external API with ISR (uncomment to use):
  // const res = await fetch('https://external-feed.com/api/jobs', {
  //   next: { revalidate: 3600 } // Revalidate every hour
  // });
  // if (!res.ok) throw new Error('Failed to fetch jobs');
  // return res.json();
}

/**
 * Fetch a single job by its slug.
 * Currently uses local fixture data.
 * For external API with ISR: uncomment the fetch implementation below.
 */
export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  // For local fixture data (current implementation):
  return jobs.find((job) => job.slug === slug);

  // For external API with ISR (uncomment to use):
  // const allJobs = await getAllJobs();
  // return allJobs.find((job) => job.slug === slug);
}
