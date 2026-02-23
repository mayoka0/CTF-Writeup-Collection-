import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const writeupsDirectory = path.join(process.cwd(), 'content', 'writeups');

export interface WriteupMetadata {
  title: string;
  date: string;
  category: string;
  tags: string[];
  event: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  slug: string;
  readingTime: number;
}

export function getWriteupSlugs() {
  if (!fs.existsSync(writeupsDirectory)) {
    return [];
  }
  return fs.readdirSync(writeupsDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getWriteupBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(writeupsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  
  // Calculate reading time roughly (words / 200 words per min)
  const words = content.split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);

  return {
    slug: realSlug,
    metadata: {
      ...(data as Omit<WriteupMetadata, 'slug' | 'readingTime'>),
      slug: realSlug,
      readingTime,
    },
    content,
  };
}

export function getAllWriteups(): WriteupMetadata[] {
  const slugs = getWriteupSlugs();
  const writeups = slugs
    .map((slug) => getWriteupBySlug(slug))
    .map((w) => w.metadata)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return writeups;
}
