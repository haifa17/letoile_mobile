import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  variant?: "default" | "primary";
}

export function QuickActionCard({
  title,
  description,
  icon,
  onClick,
  variant = "default",
}: QuickActionCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all duration-200 hover:scale-[1.02] group",
        variant === "primary"
          ? "bg-blue-500/20 border-primary/30  hover:border-primary/50"
          : "bg-card border-border hover:border-primary/50",
      )}
    >
      <CardContent className="p-5 flex items-center gap-4">
        <div
          className={cn(
            "p-3 rounded-lg transition-colors duration-300",
            variant === "primary"
              ? "bg-linear-to-r from-red-500 to-red-700 text-white"
              : "bg-secondary text-red-700 group-hover:bg-linear-to-r from-red-500 to-red-700 group-hover:text-white",
          )}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-red-900">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
