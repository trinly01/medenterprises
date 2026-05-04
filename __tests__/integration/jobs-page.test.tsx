import { render, screen } from '@testing-library/react';
import JobsPage from '../../app/jobs/page';
import type { Job } from '../../types/job';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  notFound: jest.fn(),
}));

// Mock lib/jobs
jest.mock('../../lib/jobs', () => ({
  getAllJobs: jest.fn(),
  getJobBySlug: jest.fn(),
}));

const mockJobs: Job[] = [
  {
    id: '1',
    slug: 'paediatric-registrar',
    title: 'Paediatric Registrar',
    location: 'Auckland',
    type: 'Full-time',
    department: 'Paediatrics',
    salary: { min: 120000, max: 150000, currency: 'NZD' },
    postedDate: '2026-05-01',
    closingDate: '2026-06-01',
    description: '<p>Job description</p>',
    requirements: ['MBChB'],
  },
  {
    id: '2',
    slug: 'emergency-medicine-physician',
    title: 'Emergency Medicine Physician',
    location: 'Wellington',
    type: 'Full-time',
    department: 'Emergency Medicine',
    salary: { min: 180000, max: 220000, currency: 'NZD' },
    postedDate: '2026-05-02',
    closingDate: null,
    description: '<p>Job description</p>',
    requirements: ['FRACP'],
  },
  {
    id: '3',
    slug: 'psychiatrist',
    title: 'Psychiatrist',
    location: 'Christchurch',
    type: 'Part-time',
    department: 'Mental Health',
    salary: { min: 140000, max: 170000, currency: 'NZD' },
    postedDate: '2026-05-03',
    closingDate: null,
    description: '<p>Job description</p>',
    requirements: ['FRANZCP'],
  },
  {
    id: '4',
    slug: 'general-practitioner',
    title: 'General Practitioner',
    location: 'Hamilton',
    type: 'Contract',
    department: 'General Practice',
    salary: { min: 150000, max: 180000, currency: 'NZD' },
    postedDate: '2026-05-04',
    closingDate: '2026-07-01',
    description: '<p>Job description</p>',
    requirements: ['FRNZCGP'],
  },
  {
    id: '5',
    slug: 'surgeon',
    title: 'Surgeon',
    location: 'Dunedin',
    type: 'Full-time',
    department: 'Surgery',
    salary: { min: 200000, max: 250000, currency: 'NZD' },
    postedDate: '2026-05-05',
    closingDate: '2026-08-01',
    description: '<p>Job description</p>',
    requirements: ['FRACS'],
  },
];

describe('Jobs Page Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correct number of jobs (5 total)', async () => {
    const { getAllJobs } = require('../../lib/jobs');
    getAllJobs.mockResolvedValue(mockJobs);

    const Page = await JobsPage({ searchParams: Promise.resolve({}) });
    render(Page);

    const jobLinks = screen.getAllByRole('link').filter(link => link.getAttribute('href')?.includes('/jobs/'));
    expect(jobLinks.length).toBe(5);
  });

  it('filters by department: Paediatrics returns 1 job', async () => {
    const { getAllJobs } = require('../../lib/jobs');
    getAllJobs.mockResolvedValue(mockJobs);

    const Page = await JobsPage({ searchParams: Promise.resolve({ department: 'Paediatrics' }) });
    render(Page);

    const jobLinks = screen.getAllByRole('link').filter(link => link.getAttribute('href')?.includes('/jobs/'));
    expect(jobLinks.length).toBe(1);
    expect(jobLinks[0]).toHaveAttribute('href', '/jobs/paediatric-registrar');
  });

  it('filters by type: Full-time returns 3 jobs', async () => {
    const { getAllJobs } = require('../../lib/jobs');
    getAllJobs.mockResolvedValue(mockJobs);

    const Page = await JobsPage({ searchParams: Promise.resolve({ type: 'Full-time' }) });
    render(Page);

    const jobLinks = screen.getAllByRole('link').filter(link => link.getAttribute('href')?.includes('/jobs/'));
    expect(jobLinks.length).toBe(3);
  });

  it('handles multiple filters: department + type', async () => {
    const { getAllJobs } = require('../../lib/jobs');
    getAllJobs.mockResolvedValue(mockJobs);

    const Page = await JobsPage({ searchParams: Promise.resolve({ department: 'Paediatrics', type: 'Full-time' }) });
    render(Page);

    const jobLinks = screen.getAllByRole('link').filter(link => link.getAttribute('href')?.includes('/jobs/'));
    expect(jobLinks.length).toBe(1);
  });
});
