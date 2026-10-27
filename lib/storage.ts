import type { PlayerProgress } from "@/types";
import { createDemoPlayer } from "@/data/demo-player";

/**
 * Tiny external store backed by localStorage.
 * This is the single place that knows progress is stored locally; swap
 * these functions for API calls when accounts exist.
 */
const KEY = "codequest:demo-progress:v1";

type Listener = () => void;
const listeners = new Set<Listener>();
let cache: PlayerProgress | null = null;
const SERVER_SNAPSHOT: PlayerProgress = createDemoPlayer("2000-01-01");

function load(): PlayerProgress {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as PlayerProgress;
  } catch {
    // Corrupt or blocked storage: fall back to demo data.
  }
  return createDemoPlayer();
}

export function getSnapshot(): PlayerProgress {
  if (cache === null) cache = load();
  return cache;
}

export function getServerSnapshot(): PlayerProgress {
  return SERVER_SNAPSHOT;
}

export function setProgress(next: PlayerProgress): void {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage full or blocked: keep working in memory.
  }
  listeners.forEach((l) => l());
}

export function resetProgress(): void {
  setProgress(createDemoPlayer());
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
