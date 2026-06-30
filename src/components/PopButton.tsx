import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PopButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'secondary';
}

export function PopButton({ className, children = "Learn More", href, target, rel, variant = 'primary', ...props }: PopButtonProps) {
  const isPrimary = variant === 'primary';

  const themeClasses = isPrimary
    ? cn(
        "text-stone-950 dark:text-stone-950",
        "bg-amber-500 border-amber-700",
        "shadow-[0_12px_0_-2px_#fcd34d,0_12px_0_0_#b45309,0_22px_0_0_#fef3c7]",
        "dark:shadow-[0_12px_0_-2px_#fcd34d,0_12px_0_0_#b45309,0_22px_15px_-5px_rgba(0,0,0,0.5)]",
        "hover:bg-amber-400 hover:translate-y-1 hover:shadow-[0_8px_0_-2px_#fcd34d,0_8px_0_0_#b45309,0_16px_0_0_#fef3c7]",
        "dark:hover:shadow-[0_8px_0_-2px_#fcd34d,0_8px_0_0_#b45309,0_16px_10px_-5px_rgba(0,0,0,0.5)]",
        "active:bg-amber-400 active:translate-y-3 active:shadow-[0_0px_0_-2px_#fcd34d,0_0px_0_0_#b45309,0_0px_0_0_#fef3c7]",
        "dark:active:shadow-[0_0px_0_-2px_#fcd34d,0_0px_0_0_#b45309,0_0px_0_0_rgba(0,0,0,0)]"
      )
    : cn(
        "text-stone-200 dark:text-stone-250",
        "bg-stone-900 border-stone-700",
        "shadow-[0_12px_0_-2px_#57534e,0_12px_0_0_#44403c,0_22px_0_0_#0c0a09]",
        "dark:shadow-[0_12px_0_-2px_#57534e,0_12px_0_0_#44403c,0_22px_15px_-5px_rgba(0,0,0,0.6)]",
        "hover:bg-stone-800 hover:translate-y-1 hover:shadow-[0_8px_0_-2px_#57534e,0_8px_0_0_#44403c,0_16px_0_0_#0c0a09]",
        "dark:hover:shadow-[0_8px_0_-2px_#57534e,0_8px_0_0_#44403c,0_16px_10px_-5px_rgba(0,0,0,0.6)]",
        "active:bg-stone-800 active:translate-y-3 active:shadow-[0_0px_0_-2px_#57534e,0_0px_0_0_#44403c,0_0px_0_0_#0c0a09]",
        "dark:active:shadow-[0_0px_0_-2px_#57534e,0_0px_0_0_#44403c,0_0px_0_0_rgba(0,0,0,0)]"
      );

  const commonClasses = cn(
    "group relative inline-flex items-center justify-center font-semibold uppercase rounded-xl border-2",
    "px-8 py-4 transition-all duration-150 ease-[cubic-bezier(0,0,0.58,1)]",
    themeClasses,
    className
  );

  if (href) {
    if (href.startsWith('http')) {
      return (
        <a href={href} className={commonClasses} target={target} rel={rel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={commonClasses} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={commonClasses} {...props}>
      {children}
    </button>
  );
}

export default PopButton;
