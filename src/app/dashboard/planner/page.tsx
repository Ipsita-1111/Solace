"use client"

import * as React from "react"
import { motion, Variants } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Plus, Target, CheckCircle2, Circle, MoreHorizontal, Briefcase, HeartPulse } from "lucide-react"
import { cn } from "@/lib/utils"

const timelineEvents = [
  {
    id: 1,
    time: "08:00 AM",
    title: "Morning Routine & Meditation",
    description: "Start the day with mindfulness and a healthy breakfast to set the tone for productivity.",
    status: "completed",
    category: "Wellness",
    icon: HeartPulse,
  },
  {
    id: 2,
    time: "09:30 AM",
    title: "Deep Work Session",
    description: "Focus on the core project algorithms. Ensure no distractions for the next 90 minutes.",
    status: "current",
    category: "Work",
    icon: Target,
  },
  {
    id: 3,
    time: "01:00 PM",
    title: "Lunch Break & Walk",
    description: "Recharge energy levels with a nutritious meal and a 20-minute walk outside.",
    status: "upcoming",
    category: "Health",
    icon: Clock,
  },
  {
    id: 4,
    time: "03:00 PM",
    title: "Team Sync & Code Review",
    description: "Discuss project blockers, review pull requests, and plan next steps with the team.",
    status: "upcoming",
    category: "Meetings",
    icon: Briefcase,
  },
  {
    id: 5,
    time: "06:00 PM",
    title: "Gym & Fitness",
    description: "Weight training and cardio session to maintain physical health.",
    status: "upcoming",
    category: "Health",
    icon: HeartPulse,
  }
]

export default function PlannerPage() {
  const [events, setEvents] = React.useState(timelineEvents)
  const [newTaskTitle, setNewTaskTitle] = React.useState("")

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return
    
    // Get current time formatted beautifully
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    const newEvent = {
      id: events.length + 1,
      time: timeString,
      title: newTaskTitle,
      description: "Added via Quick Add. Stay focused and complete this task!",
      status: "upcoming",
      category: "Tasks",
      icon: Target,
    }
    
    setEvents([...events, newEvent])
    setNewTaskTitle("")
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold font-primary mb-2 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-[var(--accent)]" />
            Life Planner
          </h1>
          <p className="text-[var(--text-secondary)] font-secondary text-lg">Map out your day and visualize your progress.</p>
        </div>
        <div className="flex w-full md:w-auto gap-3">
          <Input 
            placeholder="Quick add task..." 
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            className="w-full md:w-64 border-[var(--border-color)] bg-[var(--bg-secondary)]/50 focus:border-[var(--accent)] shadow-sm"
          />
          <Button 
            onClick={handleAddTask}
            className="shrink-0 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white shadow-md shadow-[var(--accent)]/20 transition-all"
          >
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
      </motion.div>

      {/* Timeline */}
      <Card className="border-[var(--border-color)] bg-[var(--bg-secondary)]/20 backdrop-blur-md shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent"></div>
        <CardHeader className="pb-8">
          <CardTitle className="text-2xl font-primary">Today&apos;s Timeline</CardTitle>
          <CardDescription className="text-base">Your chronological schedule and active priorities.</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative pl-4 md:pl-10 border-l-2 border-[var(--border-color)]/60 ml-4 md:ml-6 space-y-10 pb-4"
          >
            {events.map((event) => {
              const isCompleted = event.status === "completed"
              const isCurrent = event.status === "current"
              
              return (
                <motion.div 
                  key={event.id} 
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div className={cn(
                    "absolute -left-[25px] md:-left-[49px] top-1.5 w-4 h-4 rounded-full border-2 bg-[var(--bg-primary)] transition-all duration-500 z-10",
                    isCompleted ? "border-emerald-500 bg-emerald-500/20" : 
                    isCurrent ? "border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_15px_var(--accent)] scale-125" : 
                    "border-[var(--text-secondary)]/40 group-hover:border-[var(--accent)]/50 group-hover:scale-110"
                  )}>
                    {isCompleted && (
                      <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 absolute -top-[3px] -left-[3px] bg-[var(--bg-primary)] rounded-full" />
                    )}
                  </div>

                  {/* Connecting Line Glow (Active State) */}
                  {isCurrent && (
                    <div className="absolute -left-[24px] md:-left-[48px] top-6 bottom-[-40px] w-0.5 bg-gradient-to-b from-[var(--accent)] to-transparent z-0 hidden md:block"></div>
                  )}

                  {/* Content */}
                  <div className={cn(
                    "flex flex-col md:flex-row gap-3 md:gap-8 items-start rounded-2xl p-5 transition-all duration-300",
                    isCurrent ? "bg-gradient-to-br from-[var(--accent)]/10 to-transparent border border-[var(--accent)]/30 shadow-lg shadow-[var(--accent)]/5" : "hover:bg-[var(--bg-secondary)]/40 border border-transparent hover:border-[var(--border-color)]/50"
                  )}>
                    {/* Time */}
                    <div className="flex-shrink-0 md:w-28 mt-0.5 flex items-center md:items-start gap-2">
                      <Clock className={cn("w-4 h-4 hidden md:block", isCurrent ? "text-[var(--accent)]" : "text-[var(--text-secondary)]/70")} />
                      <span className={cn(
                        "text-sm font-bold tracking-wider",
                        isCurrent ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"
                      )}>
                        {event.time}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 w-full">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={cn(
                          "text-xl font-bold font-primary transition-colors flex items-center gap-2",
                          isCompleted ? "text-[var(--text-secondary)] line-through decoration-[var(--text-secondary)]/50" : "text-[var(--text-primary)]"
                        )}>
                          {event.title}
                        </h3>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </div>
                      <p className={cn(
                        "text-[15px] mb-4 leading-relaxed",
                        isCompleted ? "text-[var(--text-secondary)]/70" : "text-[var(--text-secondary)]"
                      )}>
                        {event.description}
                      </p>
                      
                      {/* Badge / Metadata */}
                      <div className="flex flex-wrap items-center gap-3">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border",
                          isCurrent ? "bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--accent)]" : "bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)]"
                        )}>
                          <event.icon className="w-3.5 h-3.5" />
                          {event.category}
                        </div>
                        {isCurrent && (
                          <span className="text-xs font-medium text-[var(--accent)] animate-pulse flex items-center gap-1">
                            <Circle className="w-2 h-2 fill-current" /> In Progress
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
