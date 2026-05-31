import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-brand-ember/15 text-brand-ember border border-brand-ember/20",
        secondary: "bg-brand-cobalt/15 text-brand-cobalt border border-brand-cobalt/20",
        outline: "border border-border text-foreground bg-transparent",
        success: "bg-success/15 text-success border border-success/20",
        warning: "bg-warning/15 text-warning border border-warning/20",
        destructive: "bg-destructive/15 text-destructive border border-destructive/20",
        muted: "bg-muted text-muted-foreground",
        sand: "bg-brand-sand/20 text-foreground border border-brand-sand/30",
        steel: "bg-brand-steel/20 text-brand-steel border border-brand-steel/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
