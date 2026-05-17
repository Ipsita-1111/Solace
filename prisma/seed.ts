import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({ log: ['info'] })

async function main() {
  console.log('Seeding database with mock user Alex...')

  const userCount = await prisma.user.count()
  if (userCount > 0) {
    console.log('Database already seeded.')
    return
  }

  const hashedPassword = await bcrypt.hash('password123', 10)

  const user = await prisma.user.create({
    data: {
      name: 'Alex',
      email: 'alex@example.com',
      password: hashedPassword,
      activeTheme: 'cyberpunk',
      metrics: {
        create: {
          mentalClarity: 85,
          physicalEnergy: 60,
          emotionalBalance: 90,
        }
      },
      identities: {
        create: [
          {
            name: "The Focused Developer",
            iconName: "Zap",
            iconColor: "text-yellow-500",
            progress: 50,
            habits: {
              create: [
                { title: "Code for 2 hours", completed: true, streak: 12 },
                { title: "Read 1 technical article", completed: false, streak: 3 },
              ]
            }
          },
          {
            name: "The Athlete",
            iconName: "Flame",
            iconColor: "text-red-500",
            progress: 100,
            habits: {
              create: [
                { title: "Morning run", completed: true, streak: 5 },
                { title: "Drink 2L water", completed: true, streak: 15 },
              ]
            }
          },
          {
            name: "The Mindful Learner",
            iconName: "User",
            iconColor: "text-blue-500",
            progress: 0,
            habits: {
              create: [
                { title: "10 mins meditation", completed: false, streak: 0 },
                { title: "Read 10 pages of a book", completed: false, streak: 2 },
              ]
            }
          }
        ]
      }
    }
  })

  console.log('Successfully seeded user:', user.name)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
