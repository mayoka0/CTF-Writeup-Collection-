import { ShieldAlert, Lightbulb, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface CyberInfoProps {
  children: React.ReactNode;
  title?: string;
  type?: 'exploit' | 'lesson' | 'tip';
}

export function CyberInfo({ children, title, type = 'tip' }: CyberInfoProps) {
  const configs = {
    exploit: {
      icon: ShieldAlert,
      color: "text-red-400",
      border: "border-red-500/50",
      bg: "bg-red-500/5",
      defaultTitle: "Critical Exploit"
    },
    lesson: {
      icon: Lightbulb,
      color: "text-amber-400",
      border: "border-amber-500/50",
      bg: "bg-amber-500/5",
      defaultTitle: "Lesson Learned"
    },
    tip: {
      icon: Terminal,
      color: "text-emerald-400",
      border: "border-emerald-500/50",
      bg: "bg-emerald-500/5",
      defaultTitle: "Analyst Tip"
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={cn(
      "my-8 rounded-lg border-l-4 p-6 transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]",
      config.border,
      config.bg
    )}>
      <div className="flex items-center gap-3 mb-3">
        <Icon className={cn("w-5 h-5", config.color)} />
        <span className={cn("font-bold tracking-wider uppercase text-sm", config.color)}>
          {title || config.defaultTitle}
        </span>
      </div>
      <div className="text-zinc-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
