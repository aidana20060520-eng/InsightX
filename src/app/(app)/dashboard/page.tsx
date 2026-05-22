"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/page-transition";
import { DashboardSkeleton } from "@/components/shared/loading-skeleton";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { ProductivityTrends } from "@/components/dashboard/productivity-trends";
import { FocusScore } from "@/components/dashboard/focus-score";
import { InsightsFeed } from "@/components/dashboard/insights-feed";
import { ProjectHealth } from "@/components/dashboard/project-health";
import { AiRecommendations } from "@/components/dashboard/ai-recommendations";
import { WeeklySummary } from "@/components/dashboard/weekly-summary";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <PageTransition className="p-6 space-y-6 max-w-[1600px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back, Aidana. Here&apos;s what&apos;s happening this week.
        </p>
      </motion.div>

      {/* Overview cards */}
      <OverviewCards />

      {/* Weekly summary spans full width */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <WeeklySummary />
      </motion.div>

      {/* Trends + Focus score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="lg:col-span-2"
        >
          <ProductivityTrends />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <FocusScore />
        </motion.div>
      </div>

      {/* Project health + Insights feed + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <ProjectHealth />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <InsightsFeed />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          <AiRecommendations />
        </motion.div>
      </div>
    </PageTransition>
  );
}
