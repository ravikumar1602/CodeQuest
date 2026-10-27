import { LEVELS_BY_ID, WORLDS } from "@/data/worlds";
import { todayIso, visibleStreak } from "@/game/progression/streak";
import type { PlayerProgress } from "@/types";

/** Achievement definitions with real unlock rules. Pure functions of progress. */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  isUnlocked: (p: PlayerProgress) => boolean;
}

const done = (p: PlayerProgress, id: string) => p.completedLevelIds.includes(id);
const kindCount = (p: PlayerProgress, kind: string) =>
  p.completedLevelIds.filter((id) => LEVELS_BY_ID[id]?.kind === kind).length;

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-steps",
    name: "First Steps",
    description: "Complete your first level.",
    isUnlocked: (p) => p.completedLevelIds.length >= 1,
  },
  {
    id: "bug-hunter",
    name: "Bug Hunter",
    description: "Complete a debugging level.",
    isUnlocked: (p) => kindCount(p, "debug") >= 1,
  },
  {
    id: "loop-master",
    name: "Loop Master",
    description: "Complete the first loop level and every level in Loop Forest.",
    isUnlocked: (p) =>
      done(p, "w1-l5") && WORLDS[3].levels.every((l) => done(p, l.id)),
  },
  {
    id: "logic-legend",
    name: "Logic Legend",
    description: "Complete every level in Conditional Canyon.",
    isUnlocked: (p) => WORLDS[2].levels.every((l) => done(p, l.id)),
  },
  {
    id: "seven-day-streak",
    name: "Seven-Day Streak",
    description: "Play seven days in a row.",
    isUnlocked: (p) => visibleStreak(p.streak, todayIso()) >= 7,
  },
  {
    id: "world-explorer",
    name: "World Explorer",
    description: "Complete at least one level in three different worlds.",
    isUnlocked: (p) =>
      new Set(p.completedLevelIds.map((id) => LEVELS_BY_ID[id]?.worldId)).size >= 3,
  },
];

export function unlockedAchievements(p: PlayerProgress): Achievement[] {
  return ACHIEVEMENTS.filter((a) => a.isUnlocked(p));
}

