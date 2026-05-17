"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Palette } from "lucide-react"
import { useSolaceStore } from "@/lib/store"

const themes = [
  { name: "Light", value: "light" },
  { name: "Dark", value: "dark" },
  { name: "Dark Academia", value: "dark-academia" },
  { name: "Soft Pastel", value: "pastel" },
  { name: "Cyberpunk", value: "cyberpunk" },
  { name: "Cottagecore", value: "cottagecore" },
  { name: "Y2K Pop", value: "y2k" },
  { name: "Ocean Calm", value: "ocean" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const { setTheme: setStoreTheme } = useSolaceStore()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative group inline-block">
      <button className="flex items-center gap-2 p-2 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent)] transition-colors">
        <Palette className="w-5 h-5" />
        <span className="text-sm font-medium capitalize">{theme?.replace('-', ' ') || 'Theme'}</span>
      </button>
      <div className="absolute top-full mt-2 right-0 w-48 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {themes.map((t) => (
          <button
            key={t.value}
            onClick={() => {
              setTheme(t.value)
              if (t.value === "light") {
                setStoreTheme("zen")
              } else if (t.value === "cyberpunk" || t.value === "dark-academia") {
                setStoreTheme(t.value as any)
              }
            }}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-primary)] transition-colors ${
              theme === t.value ? "text-[var(--accent)] font-bold" : "text-[var(--text-secondary)]"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  )
}
