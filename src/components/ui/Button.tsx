import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500/50 shadow-sm hover:shadow": variant === "default",
            "text-gray-600 hover:bg-gray-100/70 hover:text-gray-700": variant === "ghost",
            "border border-gray-200/50 bg-white/90 text-gray-700 hover:bg-white hover:border-gray-300/70 backdrop-blur-sm shadow-sm": variant === "outline",
          },
          {
            "h-11 px-5 py-3 text-sm": size === "default",
            "h-9 px-3 py-2 text-xs": size === "sm",
            "h-12 px-6 py-3 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };