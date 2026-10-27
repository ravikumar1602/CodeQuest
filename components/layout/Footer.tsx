import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { NAV_ITEMS } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-navy-900/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="space-y-2">
          <Logo />
          <p className="max-w-xs text-sm text-muted">Learn coding by playing. Python first, more languages later.</p>
        </div>
        <ul className="flex gap-5 text-sm text-muted">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-fg">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t border-line/50 px-4 py-4 text-center text-xs text-muted">
        CodeQuest prototype. Progress is stored in your browser and leaderboards are sample data.
      </p>
    </footer>
  );
}
