'use client';

import type { Job } from '../../../types/job';

interface ApplyButtonProps {
  job: Job;
}

export default function ApplyButton({ job }: ApplyButtonProps) {
  const handleClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'job_apply_click',
      job_id: job.id,
      job_title: job.title,
      job_department: job.department,
      job_location: job.location,
      job_type: job.type,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-semibold text-lg hover:bg-green-700 transition-colors"
    >
      Apply Now
    </button>
  );
}
