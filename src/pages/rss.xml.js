import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = (await getCollection('articles', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Le Levier',
    description: 'Piloter sa boîte avec de la data, sans coder.',
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: `/articles/${article.slug}`,
    })),
    customData: `<language>fr-fr</language>`,
  });
}
