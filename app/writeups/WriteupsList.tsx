"use client";

import { useState } from "react";
import { WriteupMetadata } from "@/lib/mdx";
import { WriteupCard } from "@/components/WriteupCard";
import { Search } from "lucide-react";

export default function WriteupsList({ writeups }: { writeups: WriteupMetadata[] }) {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = Array.from(new Set(writeups.map(w => w.category)));

    const filteredWriteups = writeups.filter((w) => {
        const matchesSearch =
            w.title.toLowerCase().includes(search.toLowerCase()) ||
            w.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

        const matchesCategory = selectedCategory ? w.category === selectedCategory : true;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6">
            <div className="mb-12 flex flex-col gap-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-zinc-100">
                    Write-Ups
                </h1>
                <p className="text-lg text-zinc-400">
                    A collection of cybersecurity challenges, CTF solutions, and technical deep dives.
                </p>
            </div>

            <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search by title or tag..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${selectedCategory === null
                                ? "bg-zinc-800 text-zinc-100"
                                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                            }`}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${selectedCategory === cat
                                    ? "bg-zinc-800 text-zinc-100"
                                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-6">
                {filteredWriteups.length > 0 ? (
                    filteredWriteups.map((writeup) => (
                        <WriteupCard key={writeup.slug} writeup={writeup} />
                    ))
                ) : (
                    <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                        <p className="text-zinc-500">No write-ups found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
