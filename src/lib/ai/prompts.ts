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
  return `You are an elite, Pulitzer-grade journalist and subject matter expert in ${niche}. Write an exhaustive, highly engaging, deeply researched, factual, and modern long-form article on the topic: "${topic}".

STRICT LENGTH REQUIREMENT:
- The article body MUST be strictly between 1,000 words and 1,300 words in length (minimum 1,000 words, maximum 1,300 words). Do not write fewer than 1,000 words and do not exceed 1,300 words.

ARTICLE STRUCTURE:
- Captivating opening hook with industry background
- ## Comprehensive Overview & The Core Shift
- ## Deep Empirical Analysis (Data, Metrics, Case Examples)
- ## Key Strategic Pillars & Operational Frameworks (with ### subheadings and bullet points)
- ## Industry Challenges, Counter-Perspectives & Risk Factors
- ## The 5-Year Horizon & Forward-Looking Predictions
- ## Conclusion & Strategic Takeaways

Format your response strictly as valid JSON with these exact keys:
{
  "title": "Compelling, SEO-friendly headline",
  "excerpt": "A high-impact 2-sentence summary hook",
  "content": "Full detailed article formatted in clean Markdown (strictly between 1,000 and 1,300 words) with multiple ## Subheadings, ### Deep-dive points, bullet lists, and analytical breakdown.",
  "tags": "Comma-separated relevant keywords",
  "reading_time": 7,
  "seo_title": "Optimized meta title under 60 chars",
  "seo_description": "Optimized meta description under 155 chars"
}`;
}

