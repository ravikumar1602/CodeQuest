"use client";

import { Coins, Flame, Lock, Medal, Star, Target, Bot } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { LEVELS_BY_ID, WORLDS } from "@/data/worlds";
import {
  getCurrentLevel,
  overallProgress,
  playerLevelFromXp,
  worldProgress,
  xpIntoCurrentLevel,
} from "@/game/progression/progression";
import { todayIso, visibleStreak } from "@/game/progression/streak";
import { ACHIEVEMENTS } from "@/features/achievements/rules";
import { QUESTS, currentQuest } from "@/features/quests/rules";

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-line bg-plum-800 p-5 ${className}`}>
      <h2 className="mb-4 text-base font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export function Dashboard() {
  const { progress, reset } = useProgress();
  const level = playerLevelFromXp(progress.xp);
  const xp = xpIntoCurrentLevel(progress.xp);
  const streak = visibleStreak(progress.streak, todayIso());
  const overall = overallProgress(progress);
  const next = getCurrentLevel(progress);
  const quest = currentQuest(progress);
  const recent = [...progress.completedLevelIds].reverse().slice(0, 4).map((id) => LEVELS_BY_ID[id]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-center gap-5 rounded-2xl border border-line bg-plum-800 p-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-plum-600 text-cyan-glow ring-2 ring-violet-glow/60">
          <Bot size={34} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold">{progress.displayName}</h1>
            <DemoBadge />
          </div>
          <p className="mt-1 text-sm text-muted">
            Level {level} · {xp.current} / {xp.needed} XP to level {level + 1}
          </p>
          <ProgressBar value={xp.current / xp.needed} label="XP to next level" className="mt-2 max-w-md" />
        </div>
        <dl className="grid grid-cols-3 gap-4 text-center">
          <div>
            <dt className="flex items-center justify-center gap-1 text-xs text-muted"><Star size={13} aria-hidden="true" />Total XP</dt>
            <dd className="text-xl font-bold">{progress.xp}</dd>
          </div>
          <div>
            <dt className="flex items-center justify-center gap-1 text-xs text-muted"><Coins size={13} aria-hidden="true" />Coins</dt>
            <dd className="text-xl font-bold">{progress.coins}</dd>
          </div>
          <div>
            <dt className="flex items-center justify-center gap-1 text-xs text-muted"><Flame size={13} aria-hidden="true" />Streak</dt>
            <dd className="text-xl font-bold">{streak}d</dd>
          </div>
        </dl>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Recommended next" className="lg:col-span-2">
          {next ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold">{next.title}</p>
                <p className="mt-1 text-sm text-muted">{WORLDS.find((w) => w.id === next.worldId)?.name} · {next.summary}</p>
              </div>
              {/* Phase 2 turns this into a link to the Game Arena. */}
              <button
                type="button"
                disabled
                className="rounded-lg bg-cyan-glow px-5 py-3 text-sm font-semibold text-navy-950 disabled:cursor-not-allowed disabled:opacity-50"
                title="The Game Arena is built in Phase 2"
              >
                Continue Playing
              </button>
            </div>
          ) : (
            <p className="text-muted">You finished every level. Nice work.</p>
          )}
          <p className="mt-4 text-xs text-muted">The Game Arena is not built yet, so playing is switched off for now.</p>
        </Card>

        <Card title="Learning progress">
          <p className="text-3xl font-bold">{overall.done}<span className="text-base font-normal text-muted"> / {overall.total} levels</span></p>
          <ProgressBar value={overall.ratio} label="Overall learning progress" className="mt-3" />
          <ul className="mt-4 space-y-2">
            {WORLDS.slice(0, 3).map((w) => {
              const wp = worldProgress(progress, w);
              return (
                <li key={w.id} className="text-xs text-muted">
                  <div className="mb-1 flex justify-between"><span>{w.name}</span><span>{wp.done}/{wp.total}</span></div>
                  <ProgressBar value={wp.ratio} label={`${w.name} progress`} />
                </li>
              );
            })}
          </ul>
        </Card>

        <Card title="Current quest">
          {quest ? (
            <>
              <p className="flex items-center gap-2 font-semibold"><Target size={16} className="text-cyan-glow" aria-hidden="true" />{quest.name}</p>
              <p className="mt-1 text-sm text-muted">{quest.description}</p>
              <p className="mt-3 text-xs text-warn">Reward: {quest.xpReward} XP</p>
            </>
          ) : (
            <p className="text-muted">All quests complete.</p>
          )}
          <ul className="mt-4 space-y-1.5 text-sm">
            {QUESTS.map((q) => {
              const m = q.measure(progress);
              return (
                <li key={q.id} className="flex justify-between text-muted">
                  <span className={m.current >= m.target ? "text-ok" : ""}>{q.name}</span>
                  <span>{m.current}/{m.target}</span>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card title="Recently completed">
          {recent.length === 0 ? (
            <p className="text-sm text-muted">Nothing yet. Finish a level and it will show up here.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {recent.map((l) => (
                <li key={l.id} className="flex justify-between"><span>{l.title}</span><span className="text-muted">{WORLDS.find((w) => w.id === l.worldId)?.name}</span></li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Achievements">
          <ul className="grid grid-cols-2 gap-2">
            {ACHIEVEMENTS.map((a) => {
              const on = a.isUnlocked(progress);
              return (
                <li key={a.id} title={a.description} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${on ? "border-violet-glow/60 bg-plum-700" : "border-line/60 text-muted opacity-60"}`}>
                  {on ? <Medal size={15} className="text-warn" aria-hidden="true" /> : <Lock size={14} aria-hidden="true" />}
                  <span><span className="sr-only">{on ? "Unlocked: " : "Locked: "}</span>{a.name}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <div className="flex justify-end">
        <button type="button" onClick={reset} className="text-xs text-muted underline underline-offset-4 hover:text-fg">
          Reset demo progress
        </button>
      </div>
    </div>
  );
}

