"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, Check, Plus, Target, User, Zap, LucideIcon } from "lucide-react"
import { useSolaceStore } from "@/lib/store"

const IconMap: Record<string, LucideIcon> = {
  Zap,
  Flame,
  User,
}

export default function HabitsPage() {
  const { identities, toggleHabit } = useSolaceStore()

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold font-primary mb-2">Identity Builder</h1>
          <p className="text-[var(--text-secondary)] font-secondary">Don&apos;t just build habits. Build who you are.</p>
        </div>
        <Button className="rounded-full shadow-md shadow-[var(--accent)]/20 px-6 gap-2 font-semibold">
          <Plus className="w-4 h-4" />
          New Identity
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {identities.map((identity, idx) => {
          const Icon = IconMap[identity.iconName] || Target
          return (
          <motion.div
            key={identity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full hover:border-[var(--accent)] transition-all duration-500 shadow-lg hover:shadow-[0_0_25px_var(--accent)] hover:shadow-[var(--accent)]/15 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
                    <Icon className={`w-5 h-5 ${identity.iconColor}`} />
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold font-mono text-[var(--accent)]">{identity.progress}%</span>
                    <p className="text-[0.65rem] text-[var(--text-secondary)] uppercase tracking-widest font-bold">Today</p>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold tracking-tight font-primary">{identity.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="w-full h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden border border-[var(--border-color)] shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${identity.progress}%` }}
                    transition={{ duration: 1, delay: 0.5, type: "spring" }}
                    className="h-full bg-[var(--accent)]" 
                  />
                </div>
                
                <div className="space-y-3 mt-8">
                  {identity.habits.map((habit) => (
                    <div onClick={() => toggleHabit(identity.id, habit.id)} key={habit.id} className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-primary)]/80 backdrop-blur-sm border border-[var(--border-color)] hover:border-[var(--accent)] transition-colors cursor-pointer group/habit shadow-sm hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 ${habit.completed ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--bg-primary)] scale-110" : "border-[var(--text-secondary)]/40 text-transparent group-hover/habit:border-[var(--accent)]/50"}`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className={`text-sm font-medium transition-colors ${habit.completed ? "text-[var(--text-secondary)] line-through" : "text-[var(--text-primary)]"}`}>
                          {habit.title}
                        </span>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono font-bold transition-colors ${habit.streak > 0 ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]"}`}>
                        <Flame className="w-3.5 h-3.5" />
                        {habit.streak}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="ghost" className="w-full text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] mt-4 border border-dashed border-[var(--border-color)] bg-[var(--bg-primary)]/50">
                  <Target className="w-3.5 h-3.5 mr-2" /> Add Habit
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )})}
      </div>
    </div>
  )
}
