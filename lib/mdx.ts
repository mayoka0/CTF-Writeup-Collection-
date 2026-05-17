import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const writeupsDirectory = path.join(process.cwd(), 'content', 'writeups');

const WriteupMetadataSchema = z.object({
  title: z.string(),
  date: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  event: z.string().optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
});

export type WriteupMetadata = z.infer<typeof WriteupMetadataSchema> & {
  slug: string;
  readingTime: number;
};

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
  
  // Validate frontmatter
  const validatedData = WriteupMetadataSchema.parse(data);
  
  // Calculate reading time roughly (words / 200 words per min)
  const words = content.split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);

  return {
    slug: realSlug,
    metadata: {
      ...validatedData,
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
