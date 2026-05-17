import { expect, test, describe } from 'vitest';
import { z } from 'zod';

const WriteupMetadataSchema = z.object({
  title: z.string(),
  date: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  event: z.string().optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
});

describe('Writeup Metadata Schema', () => {
  test('validates correct frontmatter', () => {
    const data = {
      title: "Test Writeup",
      date: "2024-05-16",
      category: "Web",
      tags: ["sql", "injection"],
      event: "CTF 2024",
      difficulty: "Medium"
    };
    expect(WriteupMetadataSchema.parse(data)).toEqual(data);
  });

  test('validates frontmatter without event', () => {
    const data = {
      title: "Test Writeup",
      date: "2024-05-16",
      category: "Web",
      tags: ["sql", "injection"],
      difficulty: "Medium"
    };
    expect(WriteupMetadataSchema.parse(data)).toEqual(data);
  });

  test('fails on invalid difficulty', () => {
    const data = {
      title: "Test Writeup",
      date: "2024-05-16",
      category: "Web",
      tags: ["sql"],
      difficulty: "Impossible"
    };
    expect(() => WriteupMetadataSchema.parse(data)).toThrow();
  });
});
