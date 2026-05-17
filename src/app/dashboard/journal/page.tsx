"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Save, Brain, Hash, Calendar as CalendarIcon, Check, BookOpen } from "lucide-react"
import { saveJournalEntry, getJournalEntries } from "@/app/actions/solace-actions"

export default function JournalPage() {
  const [entry, setEntry] = React.useState("")
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [isPublishing, setIsPublishing] = React.useState(false)
  const [analysis, setAnalysis] = React.useState<{ mood: string, tags: string[], insight: string } | null>(null)
  const [previousEntries, setPreviousEntries] = React.useState<any[]>([])
  const [alertMessage, setAlertMessage] = React.useState<{ text: string, type: "success" | "info" | "error" } | null>(null)

  const fetchEntries = React.useCallback(() => {
    getJournalEntries().then((entries) => {
      setPreviousEntries(entries)
    }).catch(console.error)
  }, [])

  // Recover draft & load previous entries on mount
  React.useEffect(() => {
    const savedDraft = localStorage.getItem("solace_journal_draft")
    if (savedDraft) {
      setEntry(savedDraft)
    }
    fetchEntries()
  }, [fetchEntries])

  // Save draft to localStorage
  const handleSaveDraft = () => {
    localStorage.setItem("solace_journal_draft", entry)
    setAlertMessage({ text: "Draft saved to browser storage! 💾", type: "success" })
    setTimeout(() => setAlertMessage(null), 3000)
  }

  // Mock AI Analysis of Emotion
  const handleAnalyze = () => {
    if (!entry) return
    setIsAnalyzing(true)
    setTimeout(() => {
      // Intelligently generate customized reflections based on key entries
      const lower = entry.toLowerCase()
      let mood = "Thoughtful and reflective"
      let tags = ["#mindfulness", "#reflection"]
      let insight = "Writing down your thoughts is a great way to clear your head. Consider starting a Focus Session to block out distractions and ground yourself."

      if (lower.includes("exam") || lower.includes("assignment") || lower.includes("study") || lower.includes("code")) {
        mood = "Ambitious but slightly overwhelmed"
        tags = ["#productivity", "#academics", "#growth"]
        insight = "You're taking on challenging technical work right now. Your ambition is a great strength, but your energy is finite. Try scheduling a structured timer in the Focus Room to tackle the work in bite-sized blocks."
      } else if (lower.includes("tired") || lower.includes("sleep") || lower.includes("exhaust")) {
        mood = "Fatigued and physically drained"
        tags = ["#wellness", "#rest", "#selfcare"]
        insight = "Your body is asking you to slow down. High-quality recovery is essential for high-quality work. Give yourself permission to rest this evening and log off early."
      } else if (lower.includes("happy") || lower.includes("great") || lower.includes("excited") || lower.includes("fun")) {
        mood = "Joyful and fully energized"
        tags = ["#positivity", "#gratitude", "#alignment"]
        insight = "You are in a superb frame of mind! Capture this positive momentum to tackle challenging creative tasks, and share some of your positive vibe with someone around you."
      }

      setAnalysis({ mood, tags, insight })
      setIsAnalyzing(false)
      setAlertMessage({ text: "AI Emotion analysis completed! 🧠", type: "info" })
      setTimeout(() => setAlertMessage(null), 3000)
    }, 1500)
  }

  // Publish to database & update wellness metrics
  const handlePublish = async () => {
    if (!entry || !analysis) return
    setIsPublishing(true)
    try {
      await saveJournalEntry(
        entry,
        analysis.mood,
        analysis.insight,
        analysis.tags
      )
      localStorage.removeItem("solace_journal_draft")
      setEntry("")
      setAnalysis(null)
      setAlertMessage({ text: "Entry successfully published! Wellness metrics boosted! 🌟", type: "success" })
      fetchEntries()
      setTimeout(() => setAlertMessage(null), 4000)
    } catch (err) {
      console.error(err)
      setAlertMessage({ text: "Failed to publish journal. Please try again.", type: "error" })
      setTimeout(() => setAlertMessage(null), 4000)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleLoadEntry = (historical: any) => {
    setEntry(historical.content)
    setAnalysis({
      mood: historical.mood,
      insight: historical.insight,
      tags: historical.tags
    })
    setAlertMessage({ text: "Historical journal entry loaded into workspace! 📖", type: "info" })
    setTimeout(() => setAlertMessage(null), 3000)
  }

  const currentDate = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  }).format(new Date())

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Alert Banner */}
      {alertMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl border text-sm font-semibold flex items-center justify-between shadow-md transition-colors ${
            alertMessage.type === "success" 
              ? "bg-green-500/10 border-green-500/30 text-green-500"
              : alertMessage.type === "info"
              ? "bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--accent)]"
              : "bg-red-500/10 border-red-500/30 text-red-500"
          }`}
        >
          <span>{alertMessage.text}</span>
          <button onClick={() => setAlertMessage(null)} className="opacity-60 hover:opacity-100 font-bold ml-2">×</button>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold font-primary mb-2">Daily Journal</h1>
        <p className="text-[var(--text-secondary)] font-secondary flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" /> {currentDate}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor */}
        <motion.div 
          className="lg:col-span-2 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <textarea
              className="w-full h-[500px] rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/30 backdrop-blur-md p-6 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] resize-none font-secondary text-lg leading-relaxed shadow-inner"
              placeholder="How are you feeling today? What's on your mind?..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
            <div className="absolute bottom-4 right-4 text-xs text-[var(--text-secondary)]">
              {entry.length} characters
            </div>
          </div>
          
          <div className="flex gap-4 justify-end">
            <Button onClick={handleSaveDraft} variant="outline" className="gap-2">
              <Save className="w-4 h-4" /> Save Draft
            </Button>
            <Button onClick={handleAnalyze} disabled={isAnalyzing || !entry} className="gap-2 shadow-md">
              {isAnalyzing ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              Analyze Emotion
            </Button>
            
            {analysis && (
              <Button 
                onClick={handlePublish} 
                disabled={isPublishing} 
                className="gap-2 bg-green-600 hover:bg-green-700 text-white shadow-md"
              >
                {isPublishing ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                Publish Entry
              </Button>
            )}
          </div>
        </motion.div>

        {/* AI Analysis Sidebar */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {analysis ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
            >
              <Card className="border-[var(--accent)]/50 shadow-[0_0_20px_var(--accent)] shadow-[var(--accent)]/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-primary">
                    <Brain className="w-5 h-5 text-[var(--accent)]" /> AI Insight
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Detected Mood</h4>
                    <p className="font-medium text-lg text-[var(--accent)]">{analysis.mood}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Themes</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium flex items-center gap-1">
                          <Hash className="w-3 h-3" /> {tag.replace('#', '')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Guidance</h4>
                    <p className="text-sm leading-relaxed text-[var(--text-primary)] font-secondary bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-color)]">
                      {analysis.insight}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="opacity-50 border-dashed">
              <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                <Brain className="w-12 h-12 text-[var(--text-secondary)] mb-4 opacity-50" />
                <p className="text-sm text-[var(--text-secondary)]">Write an entry and click "Analyze Emotion" to generate personalized AI insights.</p>
              </CardContent>
            </Card>
          )}

          {/* Real historical entries logged in SQLite */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-primary flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[var(--accent)]" /> Previous Entries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
              {previousEntries.length > 0 ? (
                previousEntries.map((entryItem) => (
                  <div 
                    key={entryItem.id} 
                    onClick={() => handleLoadEntry(entryItem)}
                    className="group cursor-pointer p-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors border border-transparent hover:border-[var(--border-color)]"
                  >
                    <p className="text-sm font-semibold mb-1 group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                      {entryItem.content}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] flex justify-between">
                      <span>{new Date(entryItem.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity font-bold">Read &rarr;</span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[var(--text-secondary)] text-center py-4">No previous reflections logged yet.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
