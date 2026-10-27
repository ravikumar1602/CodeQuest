/** Static code card shown beside the hero grid. */
export function HeroCode() {
  const lines = [
    "move_forward()",
    "turn_right()",
    "move_forward()",
    "collect_item()",
    "turn_left()",
    "move_forward()",
  ];
  return (
    <div className="w-full max-w-xs rounded-xl border border-line bg-plum-800 font-mono text-sm shadow-lg">
      <div className="flex items-center justify-between border-b border-line px-4 py-2 text-xs text-muted">
        <span>solution.py</span>
        <span>6 lines</span>
      </div>
      <ol className="space-y-0.5 py-3">
        {lines.map((line, i) => (
          <li key={i} className="flex gap-4 px-4">
            <span className="w-4 select-none text-right text-muted/70">{i + 1}</span>
            <span className="text-cyan-glow">{line}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
