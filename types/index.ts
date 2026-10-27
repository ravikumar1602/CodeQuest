/** Shared domain types. Keep this file free of React / Phaser imports. */

export type Difficulty = "easy" | "medium" | "hard" | "boss";
export type LevelKind = "puzzle" | "lesson" | "debug" | "boss";
export type LevelStatus = "locked" | "available" | "completed";

export interface Level {
  id: string;
  worldId: string;
  /** Position inside the world, starting at 1. */
  order: number;
  title: string;
  summary: string;
  kind: LevelKind;
  difficulty: Difficulty;
}

export interface World {
  id: string;
  order: number;
  name: string;
  tagline: string;
  /** Tailwind-independent accent color so maps and cards can theme themselves. */
  accent: string;
  levels: Level[];
}

export interface Streak {
  count: number;
  /** ISO date (YYYY-MM-DD) of the last day the player was active. */
  lastActiveDate: string;
}

export interface PlayerSettings {
  sound: boolean;
  reducedMotion: boolean;
}

/** Everything we persist for the (demo) player. */
export interface PlayerProgress {
  displayName: string;
  avatar: string;
  xp: number;
  coins: number;
  completedLevelIds: string[];
  streak: Streak;
  settings: PlayerSettings;
}
