"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Brain,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OverviewCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  hint: string;
}

const cards: OverviewCard[] = [
  {
    label: "Productivity Score",
    value: "84",
    change: "+6 pts",
    trend: "up",
    icon: TrendingUp,
    hint: "vs. last week",
  },
  {
    label: "Insights Generated",
    value: "342",
    change: "+24%",
    trend: "up",
    icon: Brain,
    hint: "this month",
  },
  {
    label: "Tasks Completed",
    value: "127",
    change: "+12%",
    trend: "up",
    icon: CheckCircle2,
    hint: "of 146 total",
  },
  {
    label: "Focus Time",
    value: "32h",
    change: "-2h",
    trend: "down",
    icon: Clock,
    hint: "this week",
  },
];

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
        >
          <Card className="hover:border-primary/20 transition-colors group h-full">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {card.label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <card.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold tracking-tight">
                  {card.value}
                </span>
                <span
                  className={cn(
                    "flex items-center text-xs font-medium",
                    card.trend === "up" ? "text-green-400" : "text-red-400"
                  )}
                >
                  {card.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {card.change}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">{card.hint}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
