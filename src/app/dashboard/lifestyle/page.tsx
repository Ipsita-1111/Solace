"use client"

import * as React from "react"
import { motion, Variants } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, Sparkles, Activity, Heart, Brain, Coffee, Zap, Leaf, ShieldCheck, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSolaceStore, ThemeType } from "@/lib/store"
import { useTheme } from "next-themes"

const themes = [
  { 
    id: "cyberpunk", 
    name: "Neon Cyberpunk", 
    icon: Zap, 
    desc: "High-contrast neon accents and deep blacks for intense focus sessions.", 
    gradient: "from-fuchsia-500/20 to-cyan-500/20",
    border: "border-cyan-500/50"
  },
  { 
    id: "dark-academia", 
    name: "Dark Academia", 
    icon: Coffee, 
    desc: "Rich browns, vintage gold, and literary vibes for deep, thoughtful reading.", 
    gradient: "from-amber-900/20 to-stone-800/20",
    border: "border-amber-700/30"
  },
  { 
    id: "zen", 
    name: "Zen Minimalist", 
    icon: Leaf, 
    desc: "Clean lines, soft muted tones, and zero distractions for ultimate peace.", 
    gradient: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/30"
  },
]

const wellnessMetrics = [
  { id: "mentalClarity", name: "Mental Clarity", icon: Brain, color: "text-blue-400", bg: "bg-blue-400" },
  { id: "physicalEnergy", name: "Physical Energy", icon: Activity, color: "text-orange-400", bg: "bg-orange-400" },
  { id: "emotionalBalance", name: "Emotional Balance", icon: Heart, color: "text-rose-400", bg: "bg-rose-400" },
]

export default function LifestylePage() {
  const { activeTheme, setTheme, metrics } = useSolaceStore()
  const { setTheme: setNextTheme } = useTheme()

  const handleThemeApply = (themeId: string) => {
    // 1. Update Zustland store and Prisma Database
    setTheme(themeId as ThemeType)
    // 2. Update next-themes attribute on html tag
    if (themeId === "zen") {
      setNextTheme("light")
    } else {
      setNextTheme(themeId)
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold font-primary mb-2 flex items-center gap-3">
            <Palette className="w-8 h-8 text-[var(--accent)]" />
            Lifestyle Hub
          </h1>
          <p className="text-[var(--text-secondary)] font-secondary text-lg">Curate your environment and track your vital energies.</p>
        </div>
        <Button variant="outline" className="gap-2 bg-[var(--bg-secondary)]/50 backdrop-blur-sm border-[var(--border-color)] hover:border-[var(--accent)] transition-colors">
          <Settings className="w-4 h-4" />
          Hub Settings
        </Button>
      </motion.div>

      {/* Themes Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-primary mb-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--accent)]" />
            Aesthetic Themes
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">Select an environment that aligns with your current mood and goals.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map((theme) => {
            const Icon = theme.icon
            const isActive = activeTheme === theme.id
            return (
              <motion.div key={theme.id} variants={itemVariants}>
                <Card 
                  onClick={() => handleThemeApply(theme.id)}
                  className={cn(
                  "relative h-full overflow-hidden cursor-pointer transition-all duration-300 group hover:-translate-y-1 shadow-lg",
                  isActive ? `border-2 ${theme.border} shadow-[0_0_20px_rgba(var(--accent-rgb),0.15)]` : "border border-[var(--border-color)] hover:border-[var(--text-secondary)]"
                )}>
                  {/* Background Gradient */}
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-100", theme.gradient)} />
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute top-3 right-3">
                      <ShieldCheck className="w-5 h-5 text-[var(--accent)] drop-shadow-md" />
                    </div>
                  )}

                  <CardHeader className="relative z-10 pb-2">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm",
                      isActive ? "bg-[var(--bg-primary)] border border-[var(--accent)]/30" : "bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                    )}>
                      <Icon className={cn("w-6 h-6", isActive ? "text-[var(--accent)]" : "text-[var(--text-secondary)]")} />
                    </div>
                    <CardTitle className="font-primary text-xl">{theme.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-[14px] leading-relaxed mb-6">
                      {theme.desc}
                    </CardDescription>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleThemeApply(theme.id)
                      }}
                      variant={isActive ? "default" : "outline"} 
                      className={cn(
                        "w-full transition-all",
                        isActive ? "bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90" : "hover:bg-[var(--bg-primary)]"
                      )}
                    >
                      {isActive ? "Active Theme" : "Apply Theme"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Wellness & Energy Metrics */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 pt-6">
        <div>
          <h2 className="text-2xl font-bold font-primary mb-1">Vital Metrics</h2>
          <p className="text-sm text-[var(--text-secondary)]">Your holistic energy breakdown derived from your journal entries and habits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wellnessMetrics.map((metric) => {
            const Icon = metric.icon
            const value = metrics[metric.id as keyof typeof metrics]
            return (
              <motion.div key={metric.name} variants={itemVariants}>
                <Card className="border-[var(--border-color)] bg-[var(--bg-secondary)]/30 backdrop-blur-sm hover:border-[var(--accent)]/50 transition-colors duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg bg-[var(--bg-primary)] shadow-sm border border-[var(--border-color)] transition-transform group-hover:scale-110 duration-300", metric.color)}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-bold font-primary text-lg">{metric.name}</span>
                      </div>
                      <span className="text-2xl font-mono font-bold text-[var(--text-primary)]">{value}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-[var(--bg-primary)] rounded-full overflow-hidden border border-[var(--border-color)] shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
                        className={cn("h-full rounded-full shadow-[inset_0_1px_3px_rgba(255,255,255,0.3)]", metric.bg)} 
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
