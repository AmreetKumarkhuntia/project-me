// src/components/Buttons.tsx — primary/secondary buttons (design-v2 §7)
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PrimaryButton({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-sm bg-chartreuse px-5 py-3 font-mono text-micro uppercase text-bg transition-all duration-300 hover:scale-[1.02] hover:shadow-accent-glow ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-sm border border-hairline-strong px-5 py-3 font-mono text-micro uppercase text-ink transition-colors duration-300 hover:border-chartreuse ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
