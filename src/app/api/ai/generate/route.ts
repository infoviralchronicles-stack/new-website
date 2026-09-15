import { NextRequest, NextResponse } from 'next/server';
import { generateArticleForTopic } from '@/lib/ai/generator';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { niche, topic, draft } = await req.json();
    if (!niche || !topic) {
      return NextResponse.json({ error: 'Niche and topic are required' }, { status: 400 });
    }

    const result = await generateArticleForTopic(topic, niche, !draft);

    return NextResponse.json({
      success: true,
      postId: result.postId,
      slug: result.slug,
      title: result.title,
      excerpt: result.excerpt,
      cover_image: result.cover_image
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
