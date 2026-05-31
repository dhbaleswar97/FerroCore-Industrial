import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand-ember text-white shadow-brand hover:bg-brand-ember/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-brand-cobalt text-white shadow-cobalt hover:bg-brand-cobalt/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border-2 border-black/20 bg-transparent text-foreground hover:border-brand-ember hover:text-brand-ember hover:bg-brand-ember/5 transition-colors",
        ghost: "bg-transparent text-foreground hover:bg-black/8 hover:text-foreground border border-transparent hover:border-black/10",
        link: "text-brand-ember underline-offset-4 hover:underline p-0 h-auto",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        subtle:
          "bg-primary-muted text-brand-ember hover:bg-brand-ember/20",
        primary:
          "bg-[#3D55FD] text-white hover:bg-[#2B45F0] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] shadow-sm",
        accent:
          "bg-[#E9E778] text-black hover:bg-[#d9d760] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] font-bold",
        success:
          "bg-[#22C55E] text-white hover:bg-[#16a34a] hover:scale-[1.02] active:scale-[0.98]",
        warning:
          "bg-[#F59E0B] text-white hover:bg-[#d97706] hover:scale-[1.02] active:scale-[0.98]",
        danger:
          "bg-[#EF4444] text-white hover:bg-[#dc2626] hover:scale-[1.02] active:scale-[0.98]",
        info:
          "bg-[#3D55FD] text-white hover:bg-[#2B45F0] hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-9 px-5",
        lg: "h-11 px-7 text-base",
        xl: "h-14 px-9 text-base",
        icon: "h-9 w-9 rounded-full",
        "icon-sm": "h-7 w-7 rounded-full",
        "icon-lg": "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
