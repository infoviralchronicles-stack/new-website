import { NextRequest, NextResponse } from 'next/server';
import { getAllPostsAdmin, createPost, updatePost, deletePost } from '@/lib/blog-service';

export async function GET() {
  try {
    const posts = getAllPostsAdmin();
    return NextResponse.json({ success: true, posts });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const id = createPost(data);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }
    updatePost(id, data);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }
    deletePost(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
