import type { Difficulty } from "@/types";

/** Configurable rewards. Change numbers here, not in components. */
export const XP_REWARDS: Record<Difficulty, number> = {
  easy: 20,
  medium: 40,
  hard: 75,
  boss: 150,
};

export const COIN_REWARDS: Record<Difficulty, number> = {
  easy: 5,
  medium: 10,
  hard: 20,
  boss: 50,
};

/** Replaying a completed level gives nothing unless you change this. */
export const REPLAY_XP = 0;
export const REPLAY_COINS = 0;

/** XP needed for each player level (flat curve keeps the maths easy to follow). */
export const XP_PER_PLAYER_LEVEL = 100;
