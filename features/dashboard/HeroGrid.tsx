import { Flag, Key, Bot } from "lucide-react";

/**
 * Decorative preview of the Game Arena. The real, playable Phaser game
 * arrives in Phase 2; this is a looping illustration and is labeled as one.
 */
const SIZE = 4;
const WALLS = new Set(["2,0", "3,1", "0,2", "1,3"]);

export function HeroGrid() {
  const cells = Array.from({ length: SIZE * SIZE }, (_, i) => ({ x: i % SIZE, y: Math.floor(i / SIZE) }));
  return (
    <figure className="w-full max-w-md">
      <div
        role="img"
        aria-label="Illustration: a robot walks a path across a four by four grid, picks up a key and reaches a flag."
        className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-navy-900 p-2 shadow-[0_0_60px_-20px_rgb(139_92_246/0.6)]"
      >
        <div className="grid h-full w-full grid-cols-4 grid-rows-4">
          {cells.map(({ x, y }) => {
            const wall = WALLS.has(`${x},${y}`);
            return (
              <div key={`${x}-${y}`} className="p-[3px]">
                <div
                  className={`relative flex h-full w-full items-center justify-center rounded-lg ${
                    wall ? "bg-plum-600 ring-1 ring-violet-glow/40" : "bg-plum-800 ring-1 ring-line/60"
                  }`}
                >
                  {x === 2 && y === 2 && <Key className="text-warn" size={24} aria-hidden="true" />}
                  {x === 3 && y === 2 && (
                    <>
                      <span className="goal-pulse absolute inset-3 rounded-full border-2 border-ok" aria-hidden="true" />
                      <Flag className="text-ok" size={24} aria-hidden="true" />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* The robot is exactly one cell wide, and the animation is applied to that cell-sized wrapper, so translating by 100% moves it exactly one cell. */}
        <div className="robot-run pointer-events-none absolute left-2 top-2 h-[calc((100%-1rem)/4)] w-[calc((100%-1rem)/4)] p-[3px]">
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-cyan-glow text-navy-950">
            <Bot size={26} aria-hidden="true" />
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-xs text-muted">Preview animation. Play the real game in the Game Arena.</figcaption>
    </figure>
  );
}
