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
  return `Generate 4 specific, high-intent, modern article topics for the niche: "${niche}".
CRITICAL TITLE RULES:
- DO NOT use generic buzzwords like "Comprehensive Guide", "Ultimate Guide", "Beginner's Guide", "A Guide to", "Explore", "Exploring", "Mastering", or "Demystifying".
- Craft authoritative, direct, and engaging headlines.
Return ONLY a JSON array of strings, for example:
["Topic 1", "Topic 2", "Topic 3", "Topic 4"]`;
}

export function getSystemPromptForArticle(niche: string, topic: string): string {
  return `You are an elite, Pulitzer-grade investigative journalist and subject matter authority in ${niche}. Write an exhaustive, deeply researched, factual, and analytical long-form article on the topic: "${topic}".

STRICT LENGTH REQUIREMENT:
- The article body MUST be strictly between 1,000 words and 1,300 words in length (minimum 1,000 words, maximum 1,300 words).

CRITICAL FORMATTING & STYLE RULES:
1. NO BULLET POINTS OR NUMBERED LISTS:
   - DO NOT use bullet points (- or *) anywhere in the article.
   - DO NOT use numbered lists (1., 2., 3.) anywhere in the article.
   - All comparisons, feature breakdowns, operational parameters, and checklists MUST be written entirely in cohesive, deep, flowing, multi-sentence paragraphs under clear section headings (## and ###).
2. NO HORIZONTAL SEPARATORS / DIVIDERS:
   - DO NOT use horizontal rules or separator lines (such as --- or ***) anywhere in the article.
3. NO CLICHE / GENERIC TITLES:
   - DO NOT use phrases like "Comprehensive Guide", "Ultimate Guide", "Complete Guide", "Explore", "Exploring", "A Guide to", or "Everything You Need to Know".
   - Create direct, professional, high-authority headlines.
3. SEO TITLE & META DESCRIPTION RULES:
   - "seo_title" MUST BE STRICTLY UNDER 60 CHARACTERS (including spaces).
   - "seo_description" MUST BE STRICTLY UNDER 155 CHARACTERS AND MUST INCLUDE THE EXACT TARGET KEYWORD/TOPIC verbatim near the beginning for optimal search ranking (e.g. topic "${topic}").
4. NATURAL CONTEXTUAL IN-TEXT LINK INSERTION (TOPICALLY RELEVANT ONLY):
   - DO NOT insert any links in the 1st paragraph. Keep the opening paragraph completely clean of links.
   - DO NOT link to category pages (e.g. /category/*).
   - ONLY link internally to genuine related articles where the subject matter naturally aligns with the target article.
   - NEVER repeat the same canned anchor phrases across different articles (e.g. DO NOT copy-paste phrases like "high-leverage creative workflows" or "deep recovery biology" into unrelated articles).
   - The anchor words MUST describe the actual subject matter of the linked target story in natural sentence flow (e.g., if linking to cinema/entertainment, link naturally on words like [interactive storytelling and Hollywood CGI](/post/renaissance-interactive-cinema-unreal-engine-5-blurring-movies-games); if linking to lifestyle, link on words like [minimalist living and mental focus](/post/art-of-essentialism-designing-high-leverage-life-cognitive-overload); if linking to tech, link on words like [autonomous software systems](/post/the-agentic-ai-revolution-how-autonomous-systems-transform-software)).
   - NEVER use generic phrases like "click here", "read more", or raw URLs.
   - NEVER repeat the same link target. Each link must point to a distinct article URL.

ARTICLE STRUCTURE:
- Opening analytical perspective and industry shift
- ## Strategic Overview and Primary Market Dynamics
- ## Core Architectural and Empirical Analysis
- ## Real-World Implementation and Workload Demands
- ## Industry Trade-Offs and Critical Limitations
- ## Future Trajectory and Forward Outlook
- ## Final Assessment and Strategic Verdict

Format your response strictly as valid JSON with these exact keys:
{
  "title": "Direct, authoritative headline (NO 'Guide' or 'Explore' words)",
  "excerpt": "A high-impact 2-sentence summary hook",
  "content": "Full detailed article formatted in clean Markdown (strictly 1,000-1,300 words). Uses only ## and ### headings followed by rich, deep, narrative paragraphs. ZERO bullet points and ZERO numbered lists.",
  "tags": "Comma-separated keywords",
  "reading_time": 7,
  "seo_title": "Max 58 chars strict SEO title",
  "seo_description": "Max 155 chars informative meta description containing the EXACT topic keyword verbatim."
}`;
}

