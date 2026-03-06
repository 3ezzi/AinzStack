import { NextResponse } from 'next/server';
import { getIntegrationSummary } from '@/lib/integrations/status';

export async function GET() {
  return NextResponse.json(getIntegrationSummary());
}
