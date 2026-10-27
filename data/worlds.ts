import type { Difficulty, Level, LevelKind, World } from "@/types";

/**
 * World and level definitions (static learning content).
 * Levels are generated from compact tables so the file stays readable.
 * Format: [title, summary, kind, difficulty]
 */
type LevelRow = [string, string, LevelKind, Difficulty];

interface WorldSeed {
  name: string;
  tagline: string;
  accent: string;
  levels: LevelRow[];
}

const SEEDS: WorldSeed[] = [
  {
    name: "Code Foundations",
    tagline: "Give your first commands to a robot.",
    accent: "#22d3ee",
    levels: [
      ["First Steps", "Move the robot forward to the goal.", "puzzle", "easy"],
      ["Around the Wall", "Turn to get past an obstacle.", "puzzle", "easy"],
      ["Key Collector", "Pick up the key, then reach the exit.", "puzzle", "easy"],
      ["Choose a Route", "Use a condition to pick the safe path.", "puzzle", "medium"],
      ["Repeat Yourself", "Use a loop instead of copying lines.", "puzzle", "medium"],
    ],
  },
  {
    name: "Variable Valley",
    tagline: "Store values and give them names.",
    accent: "#a78bfa",
    levels: [
      ["Name It", "Create your first variable.", "lesson", "easy"],
      ["Change of Plans", "Update a variable's value.", "lesson", "easy"],
      ["Mixed Types", "Work with text, numbers and booleans.", "puzzle", "medium"],
      ["Valley Guardian", "Combine variables to defeat the guardian.", "boss", "boss"],
    ],
  },
  {
    name: "Conditional Canyon",
    tagline: "Make programs that decide.",
    accent: "#f472b6",
    levels: [
      ["If This", "Run code only when a test passes.", "lesson", "easy"],
      ["Else That", "Handle the other case.", "puzzle", "medium"],
      ["Elif Bridge", "Chain several choices.", "puzzle", "medium"],
      ["Canyon Warden", "Route a robot with nested conditions.", "boss", "boss"],
    ],
  },
  {
    name: "Loop Forest",
    tagline: "Repeat work without repeating code.",
    accent: "#34d399",
    levels: [
      ["For Real", "Count with a for loop.", "lesson", "easy"],
      ["While It Lasts", "Loop until a condition changes.", "puzzle", "medium"],
      ["Nested Paths", "Loop inside a loop.", "puzzle", "hard"],
      ["Forest Titan", "Collect every item with loops.", "boss", "boss"],
    ],
  },
  {
    name: "Function Fortress",
    tagline: "Build reusable moves.",
    accent: "#fbbf24",
    levels: [
      ["Define It", "Write your first function.", "lesson", "easy"],
      ["Parameters", "Pass information into a function.", "puzzle", "medium"],
      ["Return Value", "Get a result back.", "puzzle", "medium"],
      ["Fortress Gate", "Combine functions to open the gate.", "boss", "boss"],
    ],
  },
  {
    name: "Data Structure Dungeon",
    tagline: "Keep many values in order.",
    accent: "#fb923c",
    levels: [
      ["List Basics", "Store items in a list.", "lesson", "easy"],
      ["Dictionary Keys", "Look things up by key.", "puzzle", "medium"],
      ["Slice and Dice", "Pick out parts of a list.", "puzzle", "hard"],
      ["Dungeon Keeper", "Sort the loot with data structures.", "boss", "boss"],
    ],
  },
  {
    name: "Object-Oriented Kingdom",
    tagline: "Model things with classes.",
    accent: "#c084fc",
    levels: [
      ["Meet a Class", "Define a class and make an object.", "lesson", "medium"],
      ["Methods", "Give objects behavior.", "puzzle", "medium"],
      ["Inheritance", "Reuse a class to build another.", "puzzle", "hard"],
      ["Royal Architect", "Design a small kingdom of objects.", "boss", "boss"],
    ],
  },
  {
    name: "Debugging Lab",
    tagline: "Find the bug. Fix the bug.",
    accent: "#f87171",
    levels: [
      ["Read the Error", "Understand an error message.", "debug", "easy"],
      ["Off by One", "Fix a loop that stops too early.", "debug", "medium"],
      ["Silent Bug", "Find a bug with no error message.", "debug", "hard"],
      ["Bug Queen", "Fix a multi-bug program.", "boss", "boss"],
    ],
  },
  {
    name: "Algorithm Arena",
    tagline: "Solve problems efficiently.",
    accent: "#38bdf8",
    levels: [
      ["Linear Search", "Find an item in a list.", "puzzle", "medium"],
      ["Sorting Duel", "Put values in order.", "puzzle", "hard"],
      ["Recursion Rift", "Solve a problem by calling yourself.", "puzzle", "hard"],
      ["Arena Champion", "Beat the champion with an algorithm.", "boss", "boss"],
    ],
  },
  {
    name: "Final Boss Challenge",
    tagline: "Everything you learned, one last fight.",
    accent: "#e879f9",
    levels: [
      ["Warm-Up", "A mixed review of every world.", "puzzle", "hard"],
      ["The Compiler", "Defeat the final boss.", "boss", "boss"],
    ],
  },
];

function slug(n: number): string {
  return `w${n}`;
}

export const WORLDS: World[] = SEEDS.map((seed, wi) => {
  const worldId = slug(wi + 1);
  const levels: Level[] = seed.levels.map(([title, summary, kind, difficulty], li) => ({
    id: `${worldId}-l${li + 1}`,
    worldId,
    order: li + 1,
    title,
    summary,
    kind,
    difficulty,
  }));
  return {
    id: worldId,
    order: wi + 1,
    name: seed.name,
    tagline: seed.tagline,
    accent: seed.accent,
    levels,
  };
});

/** Flat list in play order. Progression is linear across all worlds. */
export const ALL_LEVELS: Level[] = WORLDS.flatMap((w) => w.levels);

export const LEVELS_BY_ID: Record<string, Level> = Object.fromEntries(
  ALL_LEVELS.map((l) => [l.id, l]),
);
