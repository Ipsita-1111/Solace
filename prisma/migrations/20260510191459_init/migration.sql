-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "activeTheme" TEXT NOT NULL DEFAULT 'cyberpunk',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "WellnessMetrics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mentalClarity" INTEGER NOT NULL DEFAULT 85,
    "physicalEnergy" INTEGER NOT NULL DEFAULT 60,
    "emotionalBalance" INTEGER NOT NULL DEFAULT 90,
    "userId" TEXT NOT NULL,
    CONSTRAINT "WellnessMetrics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Identity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "iconColor" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Identity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Habit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "identityId" TEXT NOT NULL,
    CONSTRAINT "Habit_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "Identity" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "WellnessMetrics_userId_key" ON "WellnessMetrics"("userId");
