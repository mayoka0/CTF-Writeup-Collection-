"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLPreElement>) {
    const [copied, setCopied] = useState(false);

    // Extract the raw code text from children to copy
    const extractText = (node: React.ReactNode): string => {
        if (typeof node === "string") return node;
        if (typeof node === "number") return node.toString();
        if (Array.isArray(node)) return node.map(extractText).join("");
        if (typeof node === "object" && node !== null && "props" in node && (node as React.ReactElement).props) {
            return extractText((node as React.ReactElement).props.children);
        }
        return "";
    };

    const rawCode = extractText(children);

    const onCopy = () => {
        if (!rawCode) return;
        navigator.clipboard.writeText(rawCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-6 overflow-hidden rounded-lg bg-[#1e1e1e] border border-zinc-800/80">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/80 border-b border-zinc-800/80">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                    <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                    <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                </div>
                <button
                    onClick={onCopy}
                    className="p-1.5 transition-colors text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-md"
                    aria-label="Copy code"
                >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
            <pre
                className={cn(
                    "p-4 overflow-x-auto text-[13px] leading-relaxed font-mono",
                    className
                )}
                {...props}
            >
                {children}
            </pre>
        </div>
    );
}
