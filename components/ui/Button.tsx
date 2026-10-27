import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";
const variants: Record<Variant, string> = {
  primary: "bg-cyan-glow text-navy-950 hover:bg-cyan-300",
  secondary: "border border-line bg-plum-800 text-fg hover:border-violet-glow hover:bg-plum-700",
};

interface LinkProps {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function ButtonLink({ href, variant = "primary", children, className = "" }: LinkProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
