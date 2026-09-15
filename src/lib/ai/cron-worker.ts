import { getSettings, logAiAction } from '../blog-service';
import { NICHES } from './prompts';
import { discoverTrendingTopics, generateArticleForTopic } from './generator';

export async function runScheduledAutomation() {
  const settings = getSettings();

  if (settings.auto_generate_enabled !== '1' && settings.auto_generate_enabled !== 'true') {
    return { status: 'skipped', reason: 'Automation is disabled in settings' };
  }

  try {
    // Pick a random niche to generate for
    const randomNiche = NICHES[Math.floor(Math.random() * NICHES.length)];
    const topics = await discoverTrendingTopics(randomNiche.slug);

    if (topics.length === 0) {
      return { status: 'failed', reason: 'No topics discovered' };
    }

    const topicToGenerate = topics[Math.floor(Math.random() * topics.length)];
    const autoPublish = settings.auto_publish === '1' || settings.auto_publish === 'true';

    const result = await generateArticleForTopic(topicToGenerate, randomNiche.slug, autoPublish);

    logAiAction('cron_auto_generation', topicToGenerate, randomNiche.name, 'success', `Cron generated post: ${result.postId}`);

    return {
      status: 'success',
      niche: randomNiche.name,
      topic: topicToGenerate,
      result
    };
  } catch (err: any) {
    logAiAction('cron_auto_generation', 'Batch', 'Unknown', 'error', err.message);
    return { status: 'error', error: err.message };
  }
}
