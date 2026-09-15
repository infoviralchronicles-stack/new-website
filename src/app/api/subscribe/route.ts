import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/blog-service';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
    }

    const res = addSubscriber(email);
    if (!res.success) {
      if (res.error === 'Already subscribed') {
        return NextResponse.json({ message: 'You are already subscribed to our newsletter!' }, { status: 200 });
      }
      return NextResponse.json({ error: res.error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Subscribed successfully!' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
