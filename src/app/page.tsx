"use client"

import * as React from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Brain, Clock, Target, CalendarDays, Zap } from "lucide-react"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center border border-[var(--accent)]/20 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-[var(--accent)]" />
            </div>
            <span className="text-2xl font-bold font-primary tracking-tight text-[var(--accent)]">Solace</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Features</Link>
            <Link href="/login" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Sign In</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="md:hidden text-sm font-medium text-[var(--text-secondary)]">Sign In</Link>
            <Link 
              href="/register"
              className="inline-flex items-center justify-center h-9 rounded-full px-5 font-bold tracking-wide shadow-lg shadow-[var(--accent)]/10 bg-[var(--accent)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-x-hidden pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 lg:py-32">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 shadow-[0_0_15px_var(--accent)] shadow-[var(--accent)]/10"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Emotionally Adaptive Productivity</span>
          </motion.div>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tight mb-8 font-primary"
          >
            Find your <span className="text-[var(--accent)] relative inline-block">
              Solace
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[var(--accent)]/40 rounded-full" />
            </span> in the chaos.
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-[var(--text-secondary)] mb-12 font-secondary leading-relaxed"
          >
            A premium ecosystem designed for students and young adults. Align your tasks with your energy, track habits intuitively, and curate an aesthetic that fuels your focus.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 h-12 rounded-full shadow-lg shadow-[var(--accent)]/20 w-full sm:w-auto font-bold tracking-wide bg-[var(--accent)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity text-base"
            >
              Start Your Journey
            </Link>
            <Link 
              href="/dashboard/focus"
              className="inline-flex items-center justify-center px-8 h-12 rounded-full w-full sm:w-auto font-medium tracking-wide bg-[var(--bg-secondary)]/30 backdrop-blur-md border border-[var(--border-color)] hover:bg-[var(--bg-secondary)]/50 text-[var(--text-primary)] text-base"
            >
              Explore Features
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
          >
            <FeatureCard
              icon={<Brain className="w-6 h-6 text-[var(--accent)]" />}
              title="Emotionally Aware"
              description="Solace adapts to your mood. Feeling low energy? We'll suggest lighter tasks and a calming theme."
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6 text-[var(--accent)]" />}
              title="Focus Room"
              description="Deep work sessions powered by Pomodoro and immersive ambient soundscapes."
            />
            <FeatureCard
              icon={<Target className="w-6 h-6 text-[var(--accent)]" />}
              title="Identity Habits"
              description="Don't just track actions, build identities. 'I am a reader' instead of 'Read 10 pages'."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-[var(--accent)]" />}
              title="Energy Mapping"
              description="Log your daily energy peaks and troughs to optimize your most demanding work."
            />
            <FeatureCard
              icon={<CalendarDays className="w-6 h-6 text-[var(--accent)]" />}
              title="Life Planner"
              description="A beautiful timeline of your semester, deadlines, and milestones all in one place."
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6 text-[var(--accent)]" />}
              title="Aesthetic Engine"
              description="7 unique, deeply crafted visual themes ranging from Dark Academia to Cyberpunk."
            />
          </motion.div>
        </section>
      </div>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div variants={itemVariants} className="h-full">
      <Card className="h-full hover:border-[var(--accent)] hover:shadow-[0_0_30px_var(--accent)] hover:shadow-[var(--accent)]/20 transition-all duration-500 group overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="p-8 flex flex-col items-start gap-5 relative z-10">
          <div className="p-3.5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
            {icon}
          </div>
          <h3 className="text-xl font-bold tracking-tight font-primary">{title}</h3>
          <p className="text-[var(--text-secondary)] leading-relaxed font-secondary">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
