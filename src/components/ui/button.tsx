import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "glass"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[var(--accent)] text-[var(--bg-primary)] hover:bg-[var(--accent-hover)]": variant === "default",
            "border border-[var(--border-color)] bg-transparent hover:bg-[var(--bg-secondary)] text-[var(--text-primary)]": variant === "outline",
            "hover:bg-[var(--bg-secondary)] text-[var(--text-primary)]": variant === "ghost",
            "text-[var(--accent)] underline-offset-4 hover:underline": variant === "link",
            "bg-[var(--bg-secondary)]/30 backdrop-blur-md border border-[var(--border-color)] hover:bg-[var(--bg-secondary)]/50 text-[var(--text-primary)]": variant === "glass",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-lg px-3 text-sm": size === "sm",
            "h-12 rounded-2xl px-8 text-lg": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
