# Sentinel | CTF Chronicler Agent Instructions

## Overview
Sentinel is the elite repository for Capture The Flag (CTF) writeups and offensive security operations. It features an interactive writeup generator and specialized MDX components for tactical reporting.

## Core Components
- `app/writeups/[slug]`: The dynamic routing for rendering mission reports.
- `components/CyberInfo.tsx`: Specialized UI components for highlighting exploits and lessons.
- `content`: Directory containing MDX-based mission reports.
- `scripts/generate.js`: Interactive CLI tool for generating new writeup templates.

## Coding Standards
- **Tactical Reporting**: Use the `CyberInfo` component to clearly categorize critical findings (e.g., `type="exploit"`, `type="lesson"`).
- **Security First**: Maintain robust CSP policies and security headers in `next.config.mjs`.
- **Metadata**: Every writeup must have a valid frontmatter (title, date, difficulty, category).

## MDX Components
- `CyberInfo`: For exploits, lessons, and critical notes.
- `CodeBlocks`: Use rehype-pretty-code for high-fidelity syntax highlighting of payloads and scripts.

## Future Improvements
- [ ] Add a "Tactical Search" feature for indexing exploits across all writeups.
- [ ] Implement automated link checking for external security resources.
- [ ] Add support for embedding interactive terminal replays (e.g., asciinema).
- [ ] Add unit tests for MDX component rendering.
