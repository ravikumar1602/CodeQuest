/** Shown while the dashboard loads. Also keeps the page layout stable. */
export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading your dashboard</span>
      <div className="h-28 animate-pulse rounded-2xl border border-line bg-plum-800" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-40 animate-pulse rounded-2xl border border-line bg-plum-800 lg:col-span-2" />
        <div className="h-40 animate-pulse rounded-2xl border border-line bg-plum-800" />
        <div className="h-48 animate-pulse rounded-2xl border border-line bg-plum-800" />
        <div className="h-48 animate-pulse rounded-2xl border border-line bg-plum-800" />
        <div className="h-48 animate-pulse rounded-2xl border border-line bg-plum-800" />
      </div>
    </div>
  );
}
