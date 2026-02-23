import { notFound } from "next/navigation";
import { getWriteupBySlug, getWriteupSlugs } from "@/lib/mdx";
import { MdxContent } from "@/components/mdx/MdxContent";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock, Flag, ChevronLeft } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
    const slugs = getWriteupSlugs();
    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx$/, ""),
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    try {
        const { metadata } = getWriteupBySlug(params.slug);
        return {
            title: `${metadata.title} | CTF Journal`,
            description: `Writeup for ${metadata.event} - ${metadata.title}`,
        };
    } catch {
        return { title: 'Writeup Not Found' };
    }
}

export default function WriteupPage({ params }: { params: { slug: string } }) {
    let writeup;
    try {
        writeup = getWriteupBySlug(params.slug);
    } catch {
        notFound();
    }

    const { metadata, content } = writeup;

    return (
        <article className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
            <Link href="/writeups" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors mb-8">
                <ChevronLeft className="w-4 h-4" />
                Back to write-ups
            </Link>

            <div className="mb-12 border-b border-zinc-800/80 pb-8">
                <div className="flex items-center gap-3 mb-6">
                    <Badge variant="secondary">{metadata.category}</Badge>
                    <DifficultyBadge difficulty={metadata.difficulty} />
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-zinc-50 mb-6">
                    {metadata.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-400 font-mono">
                    <span className="flex items-center gap-2">
                        <Flag className="w-4 h-4 text-emerald-500" />
                        {metadata.event}
                    </span>
                    <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {metadata.date}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {metadata.readingTime} min read
                    </span>
                </div>

                {metadata.tags && metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-6">
                        {metadata.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="px-2 text-zinc-500 border-zinc-800">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            <div className="prose prose-zinc prose-invert max-w-none">
                <MdxContent source={content} />
            </div>
        </article>
    );
}
