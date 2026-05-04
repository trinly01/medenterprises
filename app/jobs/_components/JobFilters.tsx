'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import type { Job } from '../../../types/job';

export default function JobFilters({ jobs }: { jobs: Job[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const departments = useMemo(
    () => [...new Set(jobs.map((j) => j.department))].sort(),
    [jobs]
  );
  const types = useMemo(
    () => [...new Set(jobs.map((j) => j.type))].sort(),
    [jobs]
  );

  const selectedDept = searchParams.get('department') || '';
  const selectedType = searchParams.get('type') || '';

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/jobs?${params.toString()}`);
  }

  function clearFilters() {
    router.push('/jobs');
  }

  const hasFilters = selectedDept || selectedType;

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="dept-filter" className="block text-sm font-medium text-gray-900 mb-1">
             Department
           </label>
          <select
             id="dept-filter"
             value={selectedDept}
             onChange={(e) => updateParam('department', e.target.value)}
             className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
           >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label htmlFor="type-filter" className="block text-sm font-medium text-gray-900 mb-1">
             Employment Type
           </label>
          <select
             id="type-filter"
             value={selectedType}
             onChange={(e) => updateParam('type', e.target.value)}
             className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
           >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 underline mt-6"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
