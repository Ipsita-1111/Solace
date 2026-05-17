"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookHeart, Timer, Target, Calendar, UserIcon, Settings, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { getUserData } from "@/app/actions/solace-actions"
import { useSolaceStore } from "@/lib/store"
import { useTheme } from "next-themes"

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Journal", href: "/dashboard/journal", icon: BookHeart },
  { name: "Focus Room", href: "/dashboard/focus", icon: Timer },
  { name: "Habits", href: "/dashboard/habits", icon: Target },
  { name: "Planner", href: "/dashboard/planner", icon: Calendar },
  { name: "Lifestyle", href: "/dashboard/lifestyle", icon: UserIcon },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { hydrate } = useSolaceStore()
  const { setTheme: setNextTheme } = useTheme()

  React.useEffect(() => {
    getUserData().then((user) => {
      if (user) {
        hydrate({
          userName: user.name,
          activeTheme: user.activeTheme as any,
          metrics: user.metrics ? {
            mentalClarity: user.metrics.mentalClarity,
            physicalEnergy: user.metrics.physicalEnergy,
            emotionalBalance: user.metrics.emotionalBalance,
          } : undefined,
          identities: user.identities.map((id: any) => ({
            id: id.id,
            name: id.name,
            iconName: id.iconName,
            iconColor: id.iconColor,
            progress: id.progress,
            habits: id.habits.map((h: any) => ({
              id: h.id,
              title: h.title,
              completed: h.completed,
              streak: h.streak
            }))
          }))
        })

        // Apply theme from DB to next-themes
        if (user.activeTheme === "zen") {
          setNextTheme("light")
        } else {
          setNextTheme(user.activeTheme)
        }
      }
    })
  }, [hydrate, setNextTheme])

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--border-color)] bg-[var(--bg-secondary)]/30 backdrop-blur-xl hidden md:flex flex-col">
        <div className="p-6 mb-4">
          <Link href="/">
            <h2 className="text-3xl font-bold tracking-tight font-primary text-[var(--accent)] hover:opacity-80 transition-opacity">Solace</h2>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm group",
                  isActive
                    ? "bg-[var(--accent)]/15 text-[var(--accent)] font-bold shadow-sm shadow-[var(--accent)]/5"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
                )}
              >
                <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-[var(--accent)]" : "")} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-[var(--border-color)] mt-auto space-y-1">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-left text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-all group">
            <Settings className="w-5 h-5 transition-transform group-hover:rotate-45" />
            Settings
          </button>
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-left text-sm font-medium text-red-500/70 hover:bg-red-500/10 hover:text-red-500 transition-all group"
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <div className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
