import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    variant?: "default" | "outline" | "secondary";
}

export function Badge({ children, className, variant = "default", ...props }: BadgeProps) {
    const baseStyles = "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    const variants = {
        default: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700/80 border border-zinc-700/50",
        outline: "text-zinc-300 border border-zinc-700 hover:bg-zinc-800",
        secondary: "bg-emerald-900/30 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/50"
    };

    return (
        <span
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </span>
    );
}
