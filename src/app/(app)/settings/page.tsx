"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageTransition } from "@/components/layout/page-transition";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const settingsSections = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
    description: "Manage your personal information",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    description: "Configure alert preferences",
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    description: "Password and two-factor authentication",
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    description: "Customize look and feel",
  },
  {
    id: "language",
    label: "Language & Region",
    icon: Globe,
    description: "Set your language and timezone",
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    description: "Manage subscription and payment",
  },
];

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <PageTransition className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account and preferences.
        </p>
      </div>

      {/* Profile section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card>
          <CardContent className="p-6">
            <h2 className="text-base font-semibold mb-4">Profile</h2>
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xl font-bold text-primary">
                AK
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Full Name
                    </label>
                    <Input defaultValue="Aidana" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Email
                    </label>
                    <Input defaultValue="aidana@insightx.com" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Role
                  </label>
                  <Input defaultValue="Product Manager" />
                </div>
                <div className="flex justify-end">
                  <Button size="sm">Save Changes</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Card>
          <CardContent className="p-6">
            <h2 className="text-base font-semibold mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Theme</p>
                <p className="text-xs text-muted-foreground">
                  Switch between dark and light mode
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={cn(
                  "relative w-14 h-7 rounded-full transition-colors",
                  theme === "dark" ? "bg-primary" : "bg-muted"
                )}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={cn(
                    "absolute top-0.5 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm",
                    theme === "dark" ? "left-7.5" : "left-0.5"
                  )}
                >
                  {theme === "dark" ? (
                    <Moon className="w-3.5 h-3.5 text-primary" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-yellow-500" />
                  )}
                </motion.div>
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Other Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Card>
          <CardContent className="p-0">
            {settingsSections
              .filter((s) => s.id !== "profile" && s.id !== "appearance")
              .map((section, i, arr) => (
                <motion.button
                  key={section.id}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left",
                    i < arr.length - 1 && "border-b border-border"
                  )}
                >
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                    <section.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{section.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-semibold">Pro Plan</h2>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
                    Active
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  $49/month &middot; Renews on Jan 15, 2026
                </p>
              </div>
              <Button variant="outline" size="sm">
                Manage Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </PageTransition>
  );
}
