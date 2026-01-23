const SUBSTACK_RSS_URL = 'https://horizonomega.substack.com/feed';

export interface BlogPost {
  title: string;
  url: string;
  date: Date;
  description: string;
}

export async function fetchSubstackPosts(limit = 3): Promise<BlogPost[]> {
  const response = await fetch(SUBSTACK_RSS_URL);
  const xml = await response.text();

  const posts: BlogPost[] = [];
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);

  for (const match of itemMatches) {
    if (posts.length >= limit) break;

    const itemXml = match[1];

    const title = extractCDATA(itemXml, 'title') ?? '';
    const url = extractTag(itemXml, 'link') ?? '';
    const pubDate = extractTag(itemXml, 'pubDate');
    const description = extractCDATA(itemXml, 'description') ?? '';

    posts.push({
      title,
      url,
      date: pubDate ? new Date(pubDate) : new Date(),
      description,
    });
  }

  return posts;
}

function extractCDATA(xml: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`);
  const match = xml.match(regex);
  return match?.[1] ?? null;
}

function extractTag(xml: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}>([^<]*)</${tag}>`);
  const match = xml.match(regex);
  return match?.[1] ?? null;
}

export function formatDate(date: Date, locale = 'en'): string {
  return date.toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-US', {
    month: 'short',
    year: 'numeric',
  });
}


