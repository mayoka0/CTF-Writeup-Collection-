import { slug } from "github-slugger";

export interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function extractHeadings(content: string): TocItem[] {
    // Match headings starting with # to ###### but exclude those inside code blocks
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;

    // A somewhat naive way to ignore code blocks is to just strip them out first
    const noCodeBlocks = content.replace(/```[\s\S]*?```/g, "");

    const headings: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(noCodeBlocks)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        // Use github-slugger to generate matching ids for the MdxContent components
        const id = slug(text);

        // We generally only want H2 and H3 for a ToC to keep it clean
        if (level === 2 || level === 3) {
            headings.push({ id, text, level });
        }
    }

    return headings;
}
