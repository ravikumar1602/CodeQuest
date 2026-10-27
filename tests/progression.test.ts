import { describe, expect, it } from "vitest";
import { ALL_LEVELS } from "@/data/worlds";
import type { PlayerProgress } from "@/types";
import { createDemoPlayer } from "@/data/demo-player";
import {
  completeLevel,
  getCurrentLevel,
  getLevelStatus,
  playerLevelFromXp,
} from "@/game/progression/progression";
import { XP_REWARDS } from "@/game/progression/config";
import { recordActivity, visibleStreak } from "@/game/progression/streak";

const fresh = (): PlayerProgress => ({ ...createDemoPlayer("2026-10-27"), xp: 0, coins: 0, completedLevelIds: [] });

describe("level unlocking", () => {
  it("only the first level is available on a fresh account", () => {
    const p = fresh();
    expect(getLevelStatus(p, ALL_LEVELS[0].id)).toBe("available");
    expect(getLevelStatus(p, ALL_LEVELS[1].id)).toBe("locked");
  });

  it("completing a level unlocks the next one", () => {
    const r = completeLevel(fresh(), "w1-l1");
    expect(r.unlockedLevel?.id).toBe("w1-l2");
    expect(getLevelStatus(r.progress, "w1-l2")).toBe("available");
    expect(getCurrentLevel(r.progress)?.id).toBe("w1-l2");
  });

  it("cannot complete a locked level", () => {
    const r = completeLevel(fresh(), "w1-l3");
    expect(r.firstCompletion).toBe(false);
    expect(r.progress.completedLevelIds).toEqual([]);
  });

  it("unlocks the next world after the last level of a world", () => {
    let p = fresh();
    for (const id of ["w1-l1", "w1-l2", "w1-l3", "w1-l4", "w1-l5"]) p = completeLevel(p, id).progress;
    expect(getLevelStatus(p, "w2-l1")).toBe("available");
  });
});

describe("XP awards", () => {
  it("awards the configured XP for the level difficulty", () => {
    const r = completeLevel(fresh(), "w1-l1");
    expect(r.xpAwarded).toBe(XP_REWARDS.easy);
    expect(r.progress.xp).toBe(XP_REWARDS.easy);
  });

  it("does not award XP twice for the same level", () => {
    const once = completeLevel(fresh(), "w1-l1").progress;
    const twice = completeLevel(once, "w1-l1");
    expect(twice.xpAwarded).toBe(0);
    expect(twice.progress.xp).toBe(once.xp);
    expect(twice.progress.completedLevelIds).toHaveLength(1);
  });

  it("derives the player level from XP", () => {
    expect(playerLevelFromXp(0)).toBe(1);
    expect(playerLevelFromXp(99)).toBe(1);
    expect(playerLevelFromXp(100)).toBe(2);
  });
});

describe("streaks", () => {
  const s = { count: 3, lastActiveDate: "2026-10-26" };
  it("extends on consecutive days", () => {
    expect(recordActivity(s, "2026-10-27").count).toBe(4);
  });
  it("does not double count within a day", () => {
    expect(recordActivity({ ...s, lastActiveDate: "2026-10-27" }, "2026-10-27").count).toBe(3);
  });
  it("restarts after a missed day", () => {
    expect(recordActivity(s, "2026-10-29").count).toBe(1);
    expect(visibleStreak(s, "2026-10-29")).toBe(0);
  });
});
