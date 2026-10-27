import { ALL_LEVELS, LEVELS_BY_ID } from "@/data/worlds";
import type { Level, LevelStatus, PlayerProgress, World } from "@/types";
import {
  COIN_REWARDS,
  REPLAY_COINS,
  REPLAY_XP,
  XP_PER_PLAYER_LEVEL,
  XP_REWARDS,
} from "./config";

/**
 * Pure progression rules. No React, no storage, no Phaser.
 * Every function returns new data and never mutates its input.
 */

export function playerLevelFromXp(xp: number): number {
  return Math.floor(Math.max(0, xp) / XP_PER_PLAYER_LEVEL) + 1;
}

export function xpIntoCurrentLevel(xp: number): { current: number; needed: number } {
  return { current: Math.max(0, xp) % XP_PER_PLAYER_LEVEL, needed: XP_PER_PLAYER_LEVEL };
}

export function isCompleted(progress: PlayerProgress, levelId: string): boolean {
  return progress.completedLevelIds.includes(levelId);
}

/**
 * A level is unlocked when it is the very first level, or the level
 * before it (in global play order) is completed.
 */
export function isUnlocked(progress: PlayerProgress, levelId: string): boolean {
  const index = ALL_LEVELS.findIndex((l) => l.id === levelId);
  if (index === -1) return false;
  if (index === 0) return true;
  return isCompleted(progress, ALL_LEVELS[index - 1].id);
}

export function getLevelStatus(progress: PlayerProgress, levelId: string): LevelStatus {
  if (isCompleted(progress, levelId)) return "completed";
  return isUnlocked(progress, levelId) ? "available" : "locked";
}

/** The first level the player has not completed, or null when everything is done. */
export function getCurrentLevel(progress: PlayerProgress): Level | null {
  return ALL_LEVELS.find((l) => !isCompleted(progress, l.id)) ?? null;
}

export function isWorldUnlocked(progress: PlayerProgress, world: World): boolean {
  return isUnlocked(progress, world.levels[0].id);
}

export function worldProgress(progress: PlayerProgress, world: World) {
  const done = world.levels.filter((l) => isCompleted(progress, l.id)).length;
  return { done, total: world.levels.length, ratio: done / world.levels.length };
}

export function overallProgress(progress: PlayerProgress) {
  const done = ALL_LEVELS.filter((l) => isCompleted(progress, l.id)).length;
  return { done, total: ALL_LEVELS.length, ratio: done / ALL_LEVELS.length };
}

export interface CompletionResult {
  progress: PlayerProgress;
  /** XP/coins actually granted by this call (0 on a replay). */
  xpAwarded: number;
  coinsAwarded: number;
  firstCompletion: boolean;
  /** The level that became available because of this completion, if any. */
  unlockedLevel: Level | null;
}

/**
 * Mark a level complete and award rewards exactly once.
 * Rejects (returns the same progress) if the level is unknown or still locked,
 * so a UI bug can never skip ahead.
 */
export function completeLevel(progress: PlayerProgress, levelId: string): CompletionResult {
  const level = LEVELS_BY_ID[levelId];
  const unchanged: CompletionResult = {
    progress,
    xpAwarded: 0,
    coinsAwarded: 0,
    firstCompletion: false,
    unlockedLevel: null,
  };
  if (!level || !isUnlocked(progress, levelId)) return unchanged;

  if (isCompleted(progress, levelId)) {
    // Replay: only configured replay rewards apply.
    if (REPLAY_XP === 0 && REPLAY_COINS === 0) return unchanged;
    return {
      ...unchanged,
      progress: {
        ...progress,
        xp: progress.xp + REPLAY_XP,
        coins: progress.coins + REPLAY_COINS,
      },
      xpAwarded: REPLAY_XP,
      coinsAwarded: REPLAY_COINS,
    };
  }

  const xpAwarded = XP_REWARDS[level.difficulty];
  const coinsAwarded = COIN_REWARDS[level.difficulty];
  const next: PlayerProgress = {
    ...progress,
    xp: progress.xp + xpAwarded,
    coins: progress.coins + coinsAwarded,
    completedLevelIds: [...progress.completedLevelIds, levelId],
  };
  const index = ALL_LEVELS.findIndex((l) => l.id === levelId);
  return {
    progress: next,
    xpAwarded,
    coinsAwarded,
    firstCompletion: true,
    unlockedLevel: ALL_LEVELS[index + 1] ?? null,
  };
}

