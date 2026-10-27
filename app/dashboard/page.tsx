import type { Metadata } from "next";
import { Suspense } from "react";
import { Dashboard } from "@/features/dashboard/Dashboard";
import { DashboardSkeleton } from "@/features/dashboard/DashboardSkeleton";

export const metadata: Metadata = { title: "Dashboard · CodeQuest" };

export default function DashboardPage() {
  // Dashboard reads the current date (streaks), so it streams in behind a skeleton.
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}
