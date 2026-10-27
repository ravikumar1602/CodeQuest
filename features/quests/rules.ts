import { LEVELS_BY_ID } from "@/data/worlds";
import type { PlayerProgress } from "@/types";

/** Quest definitions. Status comes from progress; nothing is granted by clicking. */
export interface Quest {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  /** Returns how far along the player is. */
  measure: (p: PlayerProgress) => { current: number; target: number };
}

const count = (p: PlayerProgress, kind: string) =>
  p.completedLevelIds.filter((id) => LEVELS_BY_ID[id]?.kind === kind).length;

export const QUESTS: Quest[] = [
  {
    id: "first-level",
    name: "Complete your first level",
    description: "Finish any level in Code Foundations.",
    xpReward: 20,
    measure: (p) => ({ current: Math.min(1, p.completedLevelIds.length), target: 1 }),
  },
  {
    id: "three-puzzles",
    name: "Solve three coding puzzles",
    description: "Complete three puzzle levels.",
    xpReward: 40,
    measure: (p) => ({ current: Math.min(3, count(p, "puzzle")), target: 3 }),
  },
  {
    id: "learn-variables",
    name: "Learn variables",
    description: "Finish the first level of Variable Valley.",
    xpReward: 30,
    measure: (p) => ({ current: p.completedLevelIds.includes("w2-l1") ? 1 : 0, target: 1 }),
  },
  {
    id: "fix-program",
    name: "Fix a broken program",
    description: "Complete a debugging level.",
    xpReward: 50,
    measure: (p) => ({ current: Math.min(1, count(p, "debug")), target: 1 }),
  },
  {
    id: "loop-challenge",
    name: "Complete a loop challenge",
    description: "Finish the loop level in Code Foundations.",
    xpReward: 40,
    measure: (p) => ({ current: p.completedLevelIds.includes("w1-l5") ? 1 : 0, target: 1 }),
  },
];

export function questStatus(q: Quest, p: PlayerProgress): "locked" | "active" | "complete" {
  const { current, target } = q.measure(p);
  if (current >= target) return "complete";
  return current > 0 ? "active" : "locked";
}

/** First quest that is not yet complete. */
export function currentQuest(p: PlayerProgress): Quest | null {
  return QUESTS.find((q) => {
    const m = q.measure(p);
    return m.current < m.target;
  }) ?? null;
}
