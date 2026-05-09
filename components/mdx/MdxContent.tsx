import { MDXRemote } from "next-mdx-remote/rsc";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";
import { slug } from "github-slugger";
import rehypePrettyCode from "rehype-pretty-code";

const components = {
    pre: CodeBlock,
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="mt-10 mb-4 text-3xl font-bold tracking-tight text-zinc-100 lg:text-4xl" {...props} />,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
        const text = props.children?.toString() || "";
        const id = slug(text);
        return <h2 id={id} className="mt-10 mb-4 pb-2 text-2xl font-semibold tracking-tight text-zinc-100 border-b border-zinc-800/50 scroll-m-20" {...props} />
    },
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
        const text = props.children?.toString() || "";
        const id = slug(text);
        return <h3 id={id} className="mt-8 mb-4 text-xl font-semibold tracking-tight text-zinc-100 scroll-m-20" {...props} />
    },
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="leading-7 [&:not(:first-child)]:mt-6 text-zinc-300" {...props} />,
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-zinc-300" {...props} />,
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-zinc-300" {...props} />,
    li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="text-zinc-300" {...props} />,
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="font-medium text-emerald-400 underline underline-offset-4 hover:text-emerald-300 transition-colors" {...props} />,
    blockquote: (props: React.QuoteHTMLAttributes<HTMLQuoteElement>) => <blockquote className="mt-6 border-l-2 border-emerald-500 pl-6 italic text-zinc-400 bg-emerald-500/5 py-2 pr-4 rounded-r-lg" {...props} />,
    code: (props: React.HTMLAttributes<HTMLElement>) => {
        // Determine if it's inline code or part of a pre block
        const isInline = !props.className;
        if (isInline) {
            return <code className="relative rounded bg-zinc-800/80 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-emerald-400" {...props} />;
        }
        return <code className={cn("font-mono text-sm", props.className)} {...props} />;
    }
};

export function MdxContent({ source }: { source: string }) {
    return (
        <article className="space-y-6 text-zinc-300">
            <MDXRemote
                source={source}
                components={components}
                options={{
                    mdxOptions: {
                        rehypePlugins: [
                            [
                                rehypePrettyCode,
                                {
                                    theme: "one-dark-pro",
                                },
                            ],
                        ],
                    },
                }}
            />
        </article>
    );
}
