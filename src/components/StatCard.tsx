import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  value: string;
  label: string;
  trend?: string;
}

export function StatCard({ icon: Icon, value, label, trend, className }: StatCardProps) {
  return (
    <div className={cn(
      "bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      </div>
    </div>
  );
}
