"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, Droplets, Battery, BookOpen } from "lucide-react"
import { useSolaceStore } from "@/lib/store"

export default function DashboardPage() {
  const { userName, energyLevel, currentStreak, emotionalState, identities, toggleHabit } = useSolaceStore()
  const router = useRouter()
  const [greeting, setGreeting] = React.useState("Good Morning")

  // Find "The Mindful Learner" and "Read 10 pages of a book" dynamically from store
  const readerIdentity = identities.find(
    (id) => id.name.toLowerCase().includes("mindful") || id.name.toLowerCase().includes("learner")
  )
  const readHabit = readerIdentity?.habits.find((h) => h.title.toLowerCase().includes("read"))
  const isReadCompleted = readHabit?.completed ?? false
  
  React.useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold font-primary mb-2">{greeting}, {userName}</h1>
          <p className="text-[var(--text-secondary)] font-secondary">Ready to align your energy today?</p>
        </div>
        <Button 
          onClick={() => router.push("/dashboard/journal")}
          className="rounded-full shadow-md shadow-[var(--accent)]/20 px-6 font-semibold"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Log Daily Entry
        </Button>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardDescription className="uppercase tracking-wider font-semibold text-xs">Energy Level</CardDescription>
              <CardTitle className="flex items-center gap-2 text-2xl font-primary">
                <Battery className="w-6 h-6 text-green-500" />
                {energyLevel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--text-secondary)]">Perfect time for deep work.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardDescription className="uppercase tracking-wider font-semibold text-xs">Current Streak</CardDescription>
              <CardTitle className="flex items-center gap-2 text-2xl font-primary">
                <Flame className="w-6 h-6 text-orange-500" />
                {currentStreak} Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--text-secondary)]">You&apos;re on fire! Keep it up.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardDescription className="uppercase tracking-wider font-semibold text-xs">Emotional State</CardDescription>
              <CardTitle className="flex items-center gap-2 text-2xl font-primary">
                <Droplets className="w-6 h-6 text-blue-400" />
                {emotionalState}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--text-secondary)]">Based on your last journal entry.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming / Recommended Tasks */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-4"
      >
        <h2 className="text-2xl font-bold font-primary mb-6 flex items-center gap-2">
          Recommended for Now
          <span className="text-xs px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full font-sans tracking-wide">AI Curated</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-[var(--bg-secondary)]/80 to-[var(--bg-primary)]/80 border-[var(--accent)]/30 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Algorithm Assignment</CardTitle>
              <CardDescription className="text-[var(--accent)] font-medium">High Energy Task • Due Tomorrow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">Since your energy is High, this is the optimal time to tackle complex problems.</p>
              <Button onClick={() => router.push("/dashboard/focus")} className="w-full sm:w-auto shadow-md">Start Focus Session</Button>
            </CardContent>
          </Card>

          <Card className="opacity-90 hover:opacity-100 transition-opacity">
            <CardHeader>
              <CardTitle className="text-xl">Read 10 Pages</CardTitle>
              <CardDescription>Identity: The Reader • Daily Habit</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">You can save this for later this evening when you&apos;re winding down.</p>
              <Button 
                onClick={() => {
                  if (readerIdentity && readHabit) {
                    toggleHabit(readerIdentity.id, readHabit.id)
                  }
                }}
                variant={isReadCompleted ? "default" : "outline"} 
                className="w-full sm:w-auto"
              >
                {isReadCompleted ? "Completed! ✅" : "Mark Complete"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
