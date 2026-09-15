export const NICHES = [
  { id: 'tech', name: 'Technology', slug: 'technology' },
  { id: 'biz', name: 'Business', slug: 'business' },
  { id: 'health', name: 'Health', slug: 'health' },
  { id: 'lifestyle', name: 'Lifestyle', slug: 'lifestyle' },
  { id: 'entertainment', name: 'Entertainment', slug: 'entertainment' },
  { id: 'travel', name: 'Travel', slug: 'travel' },
  { id: 'sports', name: 'Sports', slug: 'sports' }
];

export function getTopicsPrompt(niche: string): string {
  return `Generate 4 trending, captivating, highly engaging article headlines/topics for the niche: "${niche}".
Return ONLY a JSON array of strings, for example:
["Topic 1", "Topic 2", "Topic 3", "Topic 4"]`;
}

export function getSystemPromptForArticle(niche: string, topic: string): string {
  return `You are an elite, Pulitzer-grade journalist and subject matter expert in ${niche}. Write an exhaustive, highly engaging, factual, and modern long-form article on the topic: "${topic}".

Format your response strictly as valid JSON with these exact keys:
{
  "title": "Compelling, SEO-friendly headline",
  "excerpt": "A high-impact 2-sentence summary hook",
  "content": "Full detailed article formatted in clean Markdown with multiple ## Subheadings, ### Deep-dive points, bullet points, and insightful commentary (minimum 600 words).",
  "tags": "Comma-separated relevant keywords",
  "reading_time": 5,
  "seo_title": "Optimized meta title under 60 chars",
  "seo_description": "Optimized meta description under 155 chars"
}`;
}
