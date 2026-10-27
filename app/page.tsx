import { Bug, Coins, Medal, Swords, Code2, Play, Eye, TrendingUp, Trophy } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { HeroGrid } from "@/features/dashboard/HeroGrid";
import { HeroCode } from "@/features/dashboard/HeroCode";
import { WORLDS } from "@/data/worlds";

const STEPS = [
  { icon: Code2, title: "Write", text: "Read the mission and type a few lines of Python-style commands." },
  { icon: Play, title: "Run", text: "Press Run. Your program is checked and played out step by step." },
  { icon: Eye, title: "Watch", text: "See exactly what your robot does, and where it went wrong if it fails." },
  { icon: TrendingUp, title: "Level up", text: "Win to earn XP, coins and the next level. Stuck? Hints come in stages." },
];

const FEATURES = [
  { icon: Swords, title: "Coding missions", text: "Short puzzles that each teach one idea: sequences, conditions, loops." },
  { icon: Trophy, title: "XP and levels", text: "Every first win earns XP. Replaying a level never farms rewards." },
  { icon: Medal, title: "Achievements", text: "Badges unlock only when you really meet the condition." },
  { icon: Bug, title: "Debugging challenges", text: "Fix broken programs and learn to read error messages." },
  { icon: Coins, title: "Coins", text: "Earned through missions, not by clicking a button again and again." },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-20">
        <div>
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Learn to Code.
            <br />
            Play to Level Up.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            CodeQuest teaches programming through a robot puzzle adventure. You write the code, the robot follows it,
            and every mistake shows you something real about how programs work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/dashboard">Start Your Adventure</ButtonLink>
            <ButtonLink href="#preview" variant="secondary">
              Explore the Game
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-muted">No account needed. Python first, Java, C and C++ later.</p>
        </div>
        <div id="preview" className="flex scroll-mt-24 flex-col items-center gap-5 sm:flex-row lg:justify-end">
          <HeroGrid />
          <HeroCode />
        </div>
      </section>

      <section aria-labelledby="how" className="border-y border-line/60 bg-navy-900/50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="how" className="text-2xl font-bold sm:text-3xl">How learning works</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="rounded-xl border border-line bg-plum-800 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-plum-600 text-cyan-glow">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <h3 className="font-semibold">
                    {i + 1}. {title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="worlds" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 id="worlds" className="text-2xl font-bold sm:text-3xl">Ten worlds, one path</h2>
        <p className="mt-2 max-w-2xl text-muted">Each world teaches one big idea. Finish a world to open the next.</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {WORLDS.map((w) => (
            <li key={w.id} className="rounded-xl border border-line bg-plum-800 p-4" style={{ borderTopColor: w.accent, borderTopWidth: 3 }}>
              <p className="text-sm font-semibold">{w.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{w.tagline}</p>
              <p className="mt-3 text-xs text-muted">{w.levels.length} levels</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="features" className="border-y border-line/60 bg-navy-900/50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="features" className="text-2xl font-bold sm:text-3xl">Built so progress means something</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 rounded-xl border border-line bg-plum-800 p-5">
                <Icon className="mt-0.5 shrink-0 text-violet-glow" size={22} aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-3xl font-bold">Your robot is waiting.</h2>
        <p className="mt-3 text-muted">Your first level takes about two minutes.</p>
        <div className="mt-6 flex justify-center">
          <ButtonLink href="/dashboard">Start Your Adventure</ButtonLink>
        </div>
      </section>
    </>
  );
}
