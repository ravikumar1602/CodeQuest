import type { PlayerProgress } from "@/types";
import { todayIso } from "@/game/progression/streak";

/**
 * DEMO DATA. A fresh player who has finished the first level.
 * Replace this module (and lib/storage.ts) when a real backend exists.
 */
export function createDemoPlayer(today: string = todayIso()): PlayerProgress {
  return {
    displayName: "Player One",
    avatar: "robot",
    xp: 20,
    coins: 5,
    completedLevelIds: ["w1-l1"],
    streak: { count: 1, lastActiveDate: today },
    settings: { sound: true, reducedMotion: false },
  };
}
