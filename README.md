# CTF Write-Up Collection

A dark, professional, and secure platform for publishing Capture The Flag (CTF) write-ups. Built with modern web technologies and designed for the cybersecurity community. 

This is a standalone project requiring no backend or external database. Content is entirely managed via the filesystem using MDX.

## Features
- **Next.js 14 App Router:** Fast, statically generated pages for maximum performance.
- **MDX Support:** Write content in Markdown with the power of React components.
- **File-based System:** No database required. Just add `.mdx` files into the `content` folder.
- **Code Syntax Highlighting:** Beautiful code blocks built for technical documentation, complete with "Copy to Clipboard".
- **Advanced Filtering/Search:** Instantly search through write-ups with client-side text and category filtering.
- **Custom UI:** Professionally tailored, responsive dark UI using Tailwind CSS. 

## Project Architecture
The project follows a modular structure:
- `/app`: The Next.js 14 App Router pages (`/`, `/writeups`, `/writeups/[slug]`).
- `/components`: Reusable UI elements (`WriteupCard`, `Badge`, `DifficultyBadge`, etc.).
- `/components/mdx`: Specialized components injected into the Markdown content (e.g., custom `CodeBlock`).
- `/content/writeups`: The source of truth for all write-up data.
- `/lib/mdx.ts`: Logic to parse the filesystem, calculate reading time, and read metadata.

## How to Add Write-ups

Adding new content is simple:
1. Navigate to `/content/writeups/`
2. Create a new file ending in `.mdx` (e.g., `my-new-writeup.mdx`). The filename becomes the URL slug (`/writeups/my-new-writeup`).
3. Add the required frontmatter metadata at the top of the file:
```yaml
---
title: "Your Title Here"
date: "YYYY-MM-DD"
category: "Web Exploitation" # Or Crypto, Forensics, OSINT, Reverse, etc.
tags: ["SQLi", "RCE"]
event: "Event Name" 
difficulty: "Easy" # Must be exactly Easy, Medium, or Hard
---
```
4. Write your content below the frontmatter using Markdown syntax. Your existing styling configuration will take care of formatting headings, lists, quotes, and links perfectly.

## Getting Started

To run the project locally:

```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000` to view the platform. 

To build for production:

```bash
npm run build
npm start
```
