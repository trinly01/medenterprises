import { render, screen } from '@testing-library/react';
import JobCard from '../../app/jobs/_components/JobCard';
import type { Job } from '../../types/job';

const mockJob: Job = {
  id: '1',
  slug: 'test-job',
  title: 'Test Job Title',
  location: 'Auckland',
  type: 'Full-time',
  department: 'Paediatrics',
  salary: { min: 120000, max: 150000, currency: 'NZD' },
  postedDate: '2026-05-01',
  closingDate: '2026-06-01',
  description: '<p>Test description</p>',
  requirements: ['Requirement 1'],
};

describe('JobCard', () => {
  it('renders job title correctly', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText('Test Job Title')).toBeInTheDocument();
  });

  it('renders job location correctly', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText(/Auckland/)).toBeInTheDocument();
  });

  it('renders job type correctly', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText(/Full-time/)).toBeInTheDocument();
  });

  it('renders job department correctly', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText(/Paediatrics/)).toBeInTheDocument();
  });

  it('links to correct job URL', () => {
    render(<JobCard job={mockJob} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/jobs/test-job');
  });

  it('displays posted date', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText(/Posted:/)).toBeInTheDocument();
  });

  it('renders View Details link', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText('View Details →')).toBeInTheDocument();
  });
});
