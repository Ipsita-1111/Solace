"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw, Coffee, Brain, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useFocusTimer } from "@/hooks/use-focus-timer"

export default function FocusRoomPage() {
  const { mode, timeLeft, isActive, toggleTimer, resetTimer, formatTime, progress } = useFocusTimer()

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-12 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none ${
            mode === "focus" ? "bg-[var(--accent)]/10" : "bg-blue-500/10"
          }`}
        />
      </AnimatePresence>

      {/* Header */}
      <div className="text-center space-y-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 px-4 py-1.5 rounded-full bg-[var(--bg-secondary)]/50 border border-[var(--border-color)] backdrop-blur-md"
        >
          {mode === "focus" ? (
            <Brain className="w-4 h-4 text-[var(--accent)]" />
          ) : (
            <Coffee className="w-4 h-4 text-blue-400" />
          )}
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
            {mode === "focus" ? "Deep Work Session" : "Mindful Break"}
          </span>
        </motion.div>
        
        <h1 className="text-5xl font-bold font-primary tracking-tight">
          {mode === "focus" ? "Time to Ascend" : "Breathe & Reset"}
        </h1>
      </div>

      {/* Timer Circle */}
      <div className="relative w-80 h-80 flex items-center justify-center z-10 group">
        {/* Progress Ring */}
        <svg className="absolute w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]">
          <circle
            cx="160"
            cy="160"
            r="150"
            fill="none"
            stroke="var(--border-color)"
            strokeWidth="8"
            className="opacity-20"
          />
          <motion.circle
            cx="160"
            cy="160"
            r="150"
            fill="none"
            stroke={mode === "focus" ? "var(--accent)" : "#60a5fa"}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDasharray: "942.48", strokeDashoffset: "942.48" }}
            animate={{ strokeDashoffset: 942.48 - (942.48 * progress) / 100 }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>

        {/* Time Display */}
        <div className="text-center space-y-2">
          <motion.div
            key={timeLeft}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl font-bold font-mono tracking-tighter tabular-nums"
          >
            {formatTime(timeLeft)}
          </motion.div>
          <div className="flex items-center justify-center gap-1 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Entering Flow State</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 z-10">
        <Button
          variant="outline"
          size="icon"
          className="w-14 h-14 rounded-2xl border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-all active:scale-95"
          onClick={resetTimer}
        >
          <RotateCcw className="w-6 h-6 text-[var(--text-secondary)]" />
        </Button>

        <Button
          size="lg"
          className={`w-24 h-24 rounded-[32px] shadow-2xl transition-all active:scale-95 ${
            isActive 
              ? "bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-primary)]" 
              : "bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 shadow-[var(--accent)]/20"
          }`}
          onClick={toggleTimer}
        >
          {isActive ? (
            <Pause className="w-10 h-10 fill-current" />
          ) : (
            <Play className="w-10 h-10 fill-current ml-1" />
          )}
        </Button>

        <div className="w-14 h-14 flex items-center justify-center">
          {/* Sound toggle or other controls could go here */}
        </div>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm z-10 pt-8">
        <Card className="bg-[var(--bg-secondary)]/30 backdrop-blur-md border-[var(--border-color)]">
          <CardContent className="p-4 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Daily Focus</span>
            <span className="text-xl font-bold font-primary tracking-tight text-[var(--accent)]">2.5 hrs</span>
          </CardContent>
        </Card>
        <Card className="bg-[var(--bg-secondary)]/30 backdrop-blur-md border-[var(--border-color)]">
          <CardContent className="p-4 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Current Session</span>
            <span className="text-xl font-bold font-primary tracking-tight text-[var(--accent)]">#04</span>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
