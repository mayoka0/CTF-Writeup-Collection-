"use client";

import { useEffect, useState } from "react";
import { TocItem } from "@/lib/toc";
import { cn } from "@/lib/utils";

export function TableOfContents({ toc }: { toc: TocItem[] }) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        toc.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [toc]);

    if (toc.length === 0) return null;

    return (
        <div className="space-y-4">
            <h4 className="font-semibold text-zinc-100 tracking-tight">On this page</h4>
            <nav>
                <ul className="space-y-2.5 text-sm">
                    {toc.map((item) => (
                        <li
                            key={item.id}
                            className={cn(
                                "transition-colors hover:text-emerald-400 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap",
                                item.level === 3 ? "ml-4" : "",
                                activeId === item.id ? "text-emerald-400 font-medium" : "text-zinc-500"
                            )}
                        >
                            <a href={`#${item.id}`} onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                // update URL hash without triggering full reload
                                history.pushState(null, '', `#${item.id}`);
                            }}>
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
