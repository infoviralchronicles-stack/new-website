import { NextRequest, NextResponse } from 'next/server';
import { discoverTrendingTopics } from '@/lib/ai/generator';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const niche = searchParams.get('niche') || 'Technology';
    const count = parseInt(searchParams.get('count') || '4', 10);

    const topics = await discoverTrendingTopics(niche, count);
    return NextResponse.json({ success: true, niche, topics });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
