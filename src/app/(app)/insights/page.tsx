"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/page-transition";
import { InsightsSkeleton } from "@/components/shared/loading-skeleton";
import { cn } from "@/lib/utils";

type InsightType = "all" | "opportunity" | "warning" | "success";

const insightsData = [
  {
    id: 1,
    type: "opportunity" as const,
    title: "Enterprise segment growth potential",
    description:
      "Enterprise accounts show 3.2x higher LTV than SMB. Increasing enterprise sales team by 2 reps could yield $480K ARR.",
    confidence: 94,
    impact: "high",
    timestamp: "1 hour ago",
    metric: "+$480K potential ARR",
  },
  {
    id: 2,
    type: "warning" as const,
    title: "Churn risk in mid-market segment",
    description:
      "12 mid-market accounts showing decreased engagement over the past 30 days. Feature adoption is 40% below average.",
    confidence: 87,
    impact: "high",
    timestamp: "3 hours ago",
    metric: "$96K ARR at risk",
  },
  {
    id: 3,
    type: "success" as const,
    title: "Onboarding completion rate improved",
    description:
      "New onboarding flow increased completion rate from 62% to 84%. Time-to-value decreased by 3.2 days.",
    confidence: 96,
    impact: "medium",
    timestamp: "5 hours ago",
    metric: "+22% completion",
  },
  {
    id: 4,
    type: "opportunity" as const,
    title: "API integration upsell opportunity",
    description:
      "38 accounts on the Pro plan are hitting API rate limits regularly. They may benefit from an Enterprise upgrade.",
    confidence: 82,
    impact: "medium",
    timestamp: "8 hours ago",
    metric: "38 upgrade candidates",
  },
  {
    id: 5,
    type: "warning" as const,
    title: "Support ticket volume increasing",
    description:
      "Support tickets increased 28% week-over-week, primarily around billing and invoice questions.",
    confidence: 91,
    impact: "medium",
    timestamp: "12 hours ago",
    metric: "+28% tickets",
  },
  {
    id: 6,
    type: "success" as const,
    title: "NPS score at all-time high",
    description:
      "Net Promoter Score reached 72, up from 64 last quarter. Promoters increased by 15% across all segments.",
    confidence: 98,
    impact: "low",
    timestamp: "1 day ago",
    metric: "NPS 72",
  },
];

const typeConfig = {
  opportunity: {
    icon: TrendingUp,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    label: "Opportunity",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    label: "Warning",
  },
  success: {
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-400/10",
    label: "Success",
  },
};

export default function InsightsPage() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<InsightType>("all");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <InsightsSkeleton />;

  const filtered =
    filter === "all"
      ? insightsData
      : insightsData.filter((i) => i.type === filter);

  return (
    <PageTransition className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">AI Insights</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Actionable intelligence generated from your data.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {(["all", "opportunity", "warning", "success"] as InsightType[]).map(
            (type) => (
              <Button
                key={type}
                variant={filter === type ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(type)}
                className="text-xs capitalize"
              >
                {type}
              </Button>
            )
          )}
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((insight, i) => {
          const config = typeConfig[insight.type];
          const Icon = config.icon;
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full hover:border-primary/20 transition-all cursor-pointer">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={cn(
                        "flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide",
                        config.bg,
                        config.color
                      )}
                    >
                      <Icon className="w-3 h-3" />
                      {config.label}
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {insight.timestamp}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold leading-snug">
                    {insight.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs font-medium text-primary">
                      {insight.metric}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${insight.confidence}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {insight.confidence}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </PageTransition>
  );
}
