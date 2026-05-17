"use client"

import * as React from "react"

export type TimerMode = "focus" | "break"

export function useFocusTimer() {
  const [mode, setMode] = React.useState<TimerMode>("focus")
  const [timeLeft, setTimeLeft] = React.useState(25 * 60)
  const [isActive, setIsActive] = React.useState(false)

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      // Switch modes
      if (mode === "focus") {
        setMode("break")
        setTimeLeft(5 * 60)
      } else {
        setMode("focus")
        setTimeLeft(25 * 60)
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, mode])

  const toggleTimer = () => setIsActive(!isActive)
  
  const resetTimer = () => {
    setIsActive(false)
    setMode("focus")
    setTimeLeft(25 * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = mode === "focus" 
    ? (timeLeft / (25 * 60)) * 100 
    : (timeLeft / (5 * 60)) * 100

  return {
    mode,
    timeLeft,
    isActive,
    toggleTimer,
    resetTimer,
    formatTime,
    progress,
  }
}
