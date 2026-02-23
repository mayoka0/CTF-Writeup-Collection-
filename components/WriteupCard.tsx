import Link from "next/link";
import { Clock, Calendar, Flag } from "lucide-react";
import { WriteupMetadata } from "@/lib/mdx";
import { Badge } from "./ui/Badge";
import { DifficultyBadge } from "./ui/DifficultyBadge";
import { cn } from "@/lib/utils";

export function WriteupCard({ writeup }: { writeup: WriteupMetadata }) {
    return (
        <Link href={`/writeups/${writeup.slug}`} className="block group">
            <article className={cn(
                "p-5 rounded-xl border border-zinc-800/60 bg-zinc-900/50 transition-all duration-300",
                "hover:border-emerald-500/30 hover:bg-zinc-800/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5"
            )}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 mb-2 text-xs text-zinc-400 font-mono">
                            <span className="flex items-center gap-1.5">
                                <Flag className="w-3.5 h-3.5 text-emerald-500" />
                                {writeup.event}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {writeup.date}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                            {writeup.title}
                        </h3>
                    </div>
                    <div className="flex shrink-0">
                        <DifficultyBadge difficulty={writeup.difficulty} />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-zinc-800/50">
                    <Badge variant="secondary" className="px-2">{writeup.category}</Badge>
                    {writeup.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="px-2 text-zinc-400 border-zinc-800">
                            {tag}
                        </Badge>
                    ))}
                    <div className="ml-auto flex items-center gap-1.5 text-xs text-zinc-500 mt-2 sm:mt-0 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {writeup.readingTime} min read
                    </div>
                </div>
            </article>
        </Link>
    );
}
