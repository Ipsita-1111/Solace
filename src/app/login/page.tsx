"use client"

import * as React from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Mail, Lock, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--accent)]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-[100]"
      >
        <Card className="border-[var(--border-color)] bg-[var(--bg-secondary)]/30 backdrop-blur-2xl shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent opacity-50" />
          
          <CardHeader className="space-y-2 text-center pb-8">
            <div className="mx-auto w-12 h-12 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-4 border border-[var(--accent)]/20 shadow-lg shadow-[var(--accent)]/5 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <CardTitle className="text-3xl font-bold font-primary tracking-tight">Welcome Back</CardTitle>
            <CardDescription className="text-[var(--text-secondary)] font-medium">
              Enter your credentials to access your sanctuary
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl text-center font-medium"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] ml-1">Email Address</Label>
                <div className="relative group/input">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-[var(--text-secondary)] group-focus-within/input:text-[var(--accent)] transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-[var(--bg-primary)]/50 border-[var(--border-color)] focus:border-[var(--accent)]/50 focus:ring-2 focus:ring-[var(--accent)]/10 transition-all rounded-xl h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] ml-1">Password</Label>
                <div className="relative group/input">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-[var(--text-secondary)] group-focus-within/input:text-[var(--accent)] transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-[var(--bg-primary)]/50 border-[var(--border-color)] focus:border-[var(--accent)]/50 focus:ring-2 focus:ring-[var(--accent)]/10 transition-all rounded-xl h-11"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full h-12 rounded-xl font-bold text-base shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/30 active:scale-[0.98] transition-all bg-[var(--accent)] text-[var(--bg-primary)] flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Access Sanctuary"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                Don't have an account?{" "}
                <button 
                  onClick={() => router.push("/register")}
                  className="text-[var(--accent)] font-bold hover:underline underline-offset-4 decoration-2"
                >
                  Create Identity
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
