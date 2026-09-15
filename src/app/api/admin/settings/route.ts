import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSetting } from '@/lib/blog-service';

export async function GET() {
  try {
    const settings = getSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const settings = await req.json();
    for (const [key, value] of Object.entries(settings)) {
      updateSetting(key, String(value));
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
