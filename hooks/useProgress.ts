"use client";

import { useCallback, useSyncExternalStore } from "react";
import { completeLevel, type CompletionResult } from "@/game/progression/progression";
import { recordActivity, todayIso } from "@/game/progression/streak";
import {
  getServerSnapshot,
  getSnapshot,
  resetProgress,
  setProgress,
  subscribe,
} from "@/lib/storage";
import type { PlayerProgress } from "@/types";

/** React access to the player's progress. UI calls actions; rules live in game/progression. */
export function useProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const finishLevel = useCallback((levelId: string): CompletionResult => {
    const result = completeLevel(getSnapshot(), levelId);
    if (result.firstCompletion) {
      setProgress({
        ...result.progress,
        streak: recordActivity(result.progress.streak, todayIso()),
      });
    }
    return result;
  }, []);

  const update = useCallback((fn: (p: PlayerProgress) => PlayerProgress) => {
    setProgress(fn(getSnapshot()));
  }, []);

  return { progress, finishLevel, update, reset: resetProgress };
}
