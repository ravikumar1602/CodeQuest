import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label="CodeQuest home">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="2" y="2" width="28" height="28" rx="8" fill="#251a4d" stroke="#8b5cf6" strokeWidth="1.5" />
        <path d="M13 11 8 16l5 5M19 11l5 5-5 5" fill="none" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-lg">
        Code<span className="text-cyan-glow">Quest</span>
      </span>
    </Link>
  );
}
