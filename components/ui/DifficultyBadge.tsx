import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface DifficultyBadgeProps {
    difficulty: "Easy" | "Medium" | "Hard";
    className?: string;
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
    const variants = {
        Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        Hard: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    };

    return (
        <Badge className={cn("border font-mono uppercase tracking-wider", variants[difficulty], className)}>
            {difficulty}
        </Badge>
    );
}
