import type { Streak } from "@/types";

/**
 * Streak rules, kept separate so a server can replace them later.
 * PROTOTYPE: dates come from the browser clock, so this is simulated.
 */

function toDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export function dayDifference(fromIso: string, toIso: string): number {
  return Math.round((toDate(toIso).getTime() - toDate(fromIso).getTime()) / 86_400_000);
}

export function todayIso(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

/** Call when the player does something that counts as activity. */
export function recordActivity(streak: Streak, today: string): Streak {
  const gap = dayDifference(streak.lastActiveDate, today);
  if (gap <= 0) return streak; // already counted today (or clock went backwards)
  if (gap === 1) return { count: streak.count + 1, lastActiveDate: today };
  return { count: 1, lastActiveDate: today }; // missed a day: restart
}

/** What to display right now: a streak that has lapsed shows as 0. */
export function visibleStreak(streak: Streak, today: string): number {
  return dayDifference(streak.lastActiveDate, today) > 1 ? 0 : streak.count;
}
