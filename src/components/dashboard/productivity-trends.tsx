"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ranges = ["7D", "30D", "90D"] as const;
type Range = (typeof ranges)[number];

const dataMap: Record<Range, Array<{ day: string; tasks: number; focus: number }>> = {
  "7D": [
    { day: "Mon", tasks: 12, focus: 5.2 },
    { day: "Tue", tasks: 18, focus: 6.1 },
    { day: "Wed", tasks: 14, focus: 4.8 },
    { day: "Thu", tasks: 22, focus: 7.4 },
    { day: "Fri", tasks: 19, focus: 6.5 },
    { day: "Sat", tasks: 8, focus: 2.1 },
    { day: "Sun", tasks: 5, focus: 1.4 },
  ],
  "30D": Array.from({ length: 30 }, (_, i) => ({
    day: `${i + 1}`,
    tasks: Math.round(8 + Math.sin(i / 3) * 6 + Math.random() * 4),
    focus: +(3 + Math.sin(i / 4) * 2 + Math.random() * 1.5).toFixed(1),
  })),
  "90D": Array.from({ length: 12 }, (_, i) => ({
    day: `W${i + 1}`,
    tasks: Math.round(60 + Math.sin(i / 2) * 25 + Math.random() * 15),
    focus: +(20 + Math.sin(i / 2) * 8 + Math.random() * 5).toFixed(1),
  })),
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; color: string; dataKey: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card/95 backdrop-blur-sm p-3 shadow-lg">
      <p className="text-xs font-medium text-foreground mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-muted-foreground capitalize">
            {entry.dataKey}:
          </span>
          <span className="font-medium text-foreground">
            {entry.dataKey === "focus" ? `${entry.value}h` : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export function ProductivityTrends() {
  const [range, setRange] = useState<Range>("7D");
  const data = dataMap[range];

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold">Productivity Trends</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tasks completed vs. focus time
            </p>
          </div>
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-muted">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-all",
                  range === r
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={range}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-64"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tasksFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="focusFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border)" }} />
              <Area
                type="monotone"
                dataKey="tasks"
                stroke="#818cf8"
                strokeWidth={2}
                fill="url(#tasksFill)"
              />
              <Area
                type="monotone"
                dataKey="focus"
                stroke="#a78bfa"
                strokeWidth={2}
                fill="url(#focusFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="flex items-center gap-5 mt-4 pt-4 border-t border-border">
          {[
            { label: "Tasks", color: "#818cf8" },
            { label: "Focus (hrs)", color: "#a78bfa" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: item.color }}
              />
              <span className="text-xs text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
