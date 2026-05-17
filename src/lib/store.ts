import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toggleHabit as toggleHabitAction, updateTheme as updateThemeAction, updateWellnessMetrics as updateMetricsAction } from '@/app/actions/solace-actions'

export type ThemeType = 'cyberpunk' | 'dark-academia' | 'zen'

export interface Habit {
  id: string | number
  title: string
  completed: boolean
  streak: number
}

export interface Identity {
  id: string | number
  name: string
  iconName: string
  iconColor: string
  habits: Habit[]
  progress: number
}

export interface WellnessMetrics {
  mentalClarity: number
  physicalEnergy: number
  emotionalBalance: number
}

interface SolaceState {
  // User Preferences
  userName: string
  activeTheme: ThemeType
  setTheme: (theme: ThemeType) => void

  // Wellness Metrics
  metrics: WellnessMetrics
  updateMetrics: (metrics: Partial<WellnessMetrics>) => void

  // Dashboard Stats
  energyLevel: string
  currentStreak: number
  emotionalState: string

  // Identities & Habits
  identities: Identity[]
  toggleHabit: (identityId: string | number, habitId: string | number) => void
  addIdentity: (name: string, iconName: string, iconColor: string) => void
  hydrate: (data: Partial<SolaceState>) => void
}

export const useSolaceStore = create<SolaceState>()(
  persist(
    (set) => ({
      // Initial User Preferences
      userName: 'Alex',
      activeTheme: 'cyberpunk',
      setTheme: (theme) => {
        set({ activeTheme: theme })
        updateThemeAction(theme).catch(console.error)
      },

      // Initial Wellness Metrics
      metrics: {
        mentalClarity: 85,
        physicalEnergy: 60,
        emotionalBalance: 90,
      },
      updateMetrics: (newMetrics) => {
        set((state) => ({ metrics: { ...state.metrics, ...newMetrics } }))
        updateMetricsAction(newMetrics).catch(console.error)
      },

      // Initial Dashboard Stats
      energyLevel: 'High (80%)',
      currentStreak: 12,
      emotionalState: 'Calm',

      // Initial Identities
      identities: [
        {
          id: 1,
          name: "The Focused Developer",
          iconName: "Zap",
          iconColor: "text-yellow-500",
          habits: [
            { id: 101, title: "Code for 2 hours", completed: true, streak: 12 },
            { id: 102, title: "Read 1 technical article", completed: false, streak: 3 },
          ],
          progress: 50
        },
        {
          id: 2,
          name: "The Athlete",
          iconName: "Flame",
          iconColor: "text-red-500",
          habits: [
            { id: 201, title: "Morning run", completed: true, streak: 5 },
            { id: 202, title: "Drink 2L water", completed: true, streak: 15 },
          ],
          progress: 100
        },
        {
          id: 3,
          name: "The Mindful Learner",
          iconName: "User",
          iconColor: "text-blue-500",
          habits: [
            { id: 301, title: "10 mins meditation", completed: false, streak: 0 },
            { id: 302, title: "Read 10 pages of a book", completed: false, streak: 2 },
          ],
          progress: 0
        }
      ],

      toggleHabit: (identityId, habitId) => {
        let newCompleted = false
        let newStreak = 0

        set((state) => ({
          identities: state.identities.map((identity) => {
            if (identity.id === identityId) {
              const updatedHabits = identity.habits.map((habit) => {
                if (habit.id === habitId) {
                  newCompleted = !habit.completed
                  newStreak = newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1)
                  return {
                    ...habit,
                    completed: newCompleted,
                    streak: newStreak,
                  }
                }
                return habit
              })

              const completedCount = updatedHabits.filter(h => h.completed).length
              const progress = Math.round((completedCount / updatedHabits.length) * 100) || 0

              return { ...identity, habits: updatedHabits, progress }
            }
            return identity
          }),
        }))

        toggleHabitAction(String(habitId), newCompleted, newStreak).catch(console.error)
      },

      addIdentity: (name, iconName, iconColor) =>
        set((state) => ({
          identities: [
            ...state.identities,
            { id: Date.now(), name, iconName, iconColor, habits: [], progress: 0 },
          ],
        })),

      hydrate: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'solace-storage', // Key in localStorage
    }
  )
)
