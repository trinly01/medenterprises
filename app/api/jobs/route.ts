import { NextResponse } from 'next/server';
import jobsData from '../../../data/jobs.json';

export async function GET() {
  return NextResponse.json(jobsData);
}
