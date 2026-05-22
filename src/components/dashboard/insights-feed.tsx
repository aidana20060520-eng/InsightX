"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Inbox,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Insight {
  id: string;
  type: "trend" | "warning" | "success" | "tip";
  title: string;
  description: string;
  time: string;
}

const initial: Insight[] = [
  {
    id: "1",
    type: "trend",
    title: "Productivity peaks on Thursdays",
    description: "You complete 38% more tasks on Thursdays than other weekdays.",
    time: "2m ago",
  },
  {
    id: "2",
    type: "warning",
    title: "Project Aurora is at risk",
    description: "3 tasks overdue and no recent activity in the past 5 days.",
    time: "1h ago",
  },
  {
    id: "3",
    type: "success",
    title: "Q4 goals tracking on time",
    description: "8 of 10 OKRs are on or ahead of schedule. Strong quarter.",
    time: "3h ago",
  },
  {
    id: "4",
    type: "tip",
    title: "Try time-blocking mornings",
    description: "Your deep-work productivity is 2.3x higher before 11 AM.",
    time: "5h ago",
  },
];

const config = {
  trend: { icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-400/10" },
  warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-400/10" },
  success: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10" },
  tip: { icon: Zap, color: "text-violet-400", bg: "bg-violet-400/10" },
};

export function InsightsFeed() {
  const [insights, setInsights] = useState<Insight[]>(initial);

  const dismiss = (id: string) => {
    // Optimistic update
    setInsights((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">AI Insights Feed</h3>
          </div>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
            Live
          </span>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto -mx-2 px-2 max-h-[420px]">
          <AnimatePresence mode="popLayout">
            {insights.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-3">
                  <Inbox className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">All caught up</p>
                <p className="text-xs text-muted-foreground mt-1">
                  New insights will appear here as they&apos;re generated.
                </p>
              </motion.div>
            ) : (
              insights.map((insight) => {
                const c = config[insight.type];
                const Icon = c.icon;
                return (
                  <motion.div
                    key={insight.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 30, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", c.bg)}>
                      <Icon className={cn("w-4 h-4", c.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[13px] font-medium leading-snug">
                          {insight.title}
                        </p>
                        <span className="text-[10px] text-muted-foreground shrink-0">
                          {insight.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                        {insight.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-6 text-[11px] px-2">
                          View
                        </Button>
                        <button
                          onClick={() => dismiss(insight.id)}
                          className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
