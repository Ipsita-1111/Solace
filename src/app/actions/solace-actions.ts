'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Fetch the currently authenticated user
export async function getUserData() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return null

  const user = await (prisma.user as any).findUnique({
    where: { email: session.user.email },
    include: {
      metrics: true,
      identities: {
        include: {
          habits: true
        }
      }
    }
  })
  return user
}

// Update the user's aesthetic theme
export async function updateTheme(newTheme: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return

  await (prisma.user as any).update({
    where: { email: session.user.email },
    data: { activeTheme: newTheme }
  })
  
  revalidatePath('/dashboard/lifestyle')
}

// Toggle habit completion and update its streak
export async function toggleHabit(habitId: string, completed: boolean, streak: number) {
  await prisma.habit.update({
    where: { id: habitId },
    data: { 
      completed,
      streak
    }
  })

  // We also need to update the Identity progress
  const habit = await prisma.habit.findUnique({
    where: { id: habitId },
    include: { identity: { include: { habits: true } } }
  })

  if (habit) {
    const allHabits = habit.identity.habits
    const completedCount = allHabits.filter((h: any) => h.completed).length
    const progress = Math.round((completedCount / allHabits.length) * 100) || 0

    await prisma.identity.update({
      where: { id: habit.identityId },
      data: { progress }
    })
  }

  revalidatePath('/dashboard/habits')
}

// Update wellness metrics (mental clarity, physical energy, emotional balance)
export async function updateWellnessMetrics(metrics: {
  mentalClarity?: number;
  physicalEnergy?: number;
  emotionalBalance?: number;
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return

  await prisma.wellnessMetrics.update({
    where: { userId: (await (prisma.user as any).findUnique({ where: { email: session.user.email } }))?.id },
    data: metrics
  })
  
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/lifestyle')
}

// Save a journal entry and dynamically boost the user's wellness metrics
export async function saveJournalEntry(content: string, mood: string, insight: string, tags: string[]) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error('Not authenticated')

  const user = await (prisma.user as any).findUnique({
    where: { email: session.user.email },
    include: { metrics: true }
  })
  if (!user) throw new Error('User not found')

  const entry = await (prisma as any).journalEntry.create({
    data: {
      content,
      mood,
      insight,
      tags: tags.join(','),
      userId: user.id
    }
  })

  // Dynamic emotional response: Improve user metrics upon writing a journal entry
  if (user.metrics) {
    const currentClarity = user.metrics.mentalClarity
    const currentBalance = user.metrics.emotionalBalance
    await prisma.wellnessMetrics.update({
      where: { userId: user.id },
      data: {
        mentalClarity: Math.min(100, currentClarity + 5),
        emotionalBalance: Math.min(100, currentBalance + 5)
      }
    })
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/journal')
  return entry
}

// Get journal history for the logged-in user
export async function getJournalEntries() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return []

  const user = await (prisma.user as any).findUnique({
    where: { email: session.user.email }
  })
  if (!user) return []

  const entries = await (prisma as any).journalEntry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })

  return entries.map((entry: any) => ({
    id: entry.id,
    content: entry.content,
    mood: entry.mood,
    insight: entry.insight,
    tags: entry.tags ? entry.tags.split(',') : [],
    createdAt: entry.createdAt
  }))
}

// Register a new user
export async function registerUser(formData: any) {
  const { name, email, password } = formData
  
  const existingUser = await (prisma as any).user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error('User already exists')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await (prisma as any).user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      metrics: {
        create: {
          mentalClarity: 100,
          physicalEnergy: 100,
          emotionalBalance: 100,
        }
      },
      identities: {
        create: [
          {
            name: "The Mindful Learner",
            iconName: "Brain",
            iconColor: "cyan",
            progress: 0,
            habits: {
              create: [
                { title: "Read 10 pages of a book", completed: false, streak: 0 },
                { title: "Review lecture notes", completed: false, streak: 0 }
              ]
            }
          }
        ]
      }
    }
  })

  return { success: true, userId: user.id }
}
