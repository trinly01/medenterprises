import { MetadataRoute } from 'next';
import { getAllJobs } from './lib/jobs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jobs = await getAllJobs();

  const jobUrls = jobs.map((job) => ({
    url: `https://medenterprises.com/jobs/${job.slug}`,
    lastModified: new Date(job.postedDate),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://medenterprises.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://medenterprises.com/jobs',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...jobUrls,
  ];
}
