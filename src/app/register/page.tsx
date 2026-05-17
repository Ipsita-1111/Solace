"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, Mail, Lock, User, Loader2 } from "lucide-react"
import { registerUser } from "@/app/actions/solace-actions"
import { signIn } from "next-auth/react"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await registerUser({ name, email, password })
      
      if (result.success) {
        // Automatically sign in after registration
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/dashboard",
        })
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong")
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
        className="w-full max-w-md z-10"
      >
        <Card className="border-[var(--border-color)] bg-[var(--bg-secondary)]/30 backdrop-blur-2xl shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent opacity-50" />
          
          <CardHeader className="space-y-2 text-center pb-8">
            <div className="mx-auto w-12 h-12 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-4 border border-[var(--accent)]/20 shadow-lg shadow-[var(--accent)]/5 group-hover:scale-110 transition-transform duration-300">
              <UserPlus className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <CardTitle className="text-3xl font-bold font-primary tracking-tight">Create Identity</CardTitle>
            <CardDescription className="text-[var(--text-secondary)] font-medium">
              Join the Solace ecosystem and start your journey
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl text-center font-medium"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] ml-1">Full Name</Label>
                <div className="relative group/input">
                  <User className="absolute left-3 top-3 w-4 h-4 text-[var(--text-secondary)] group-focus-within/input:text-[var(--accent)] transition-colors" />
                  <Input
                    id="name"
                    placeholder="Alex Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-10 bg-[var(--bg-primary)]/50 border-[var(--border-color)] focus:border-[var(--accent)]/50 focus:ring-2 focus:ring-[var(--accent)]/10 transition-all rounded-xl h-11"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
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

              <div className="space-y-1.5">
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
                className="w-full h-12 rounded-xl font-bold text-base shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/30 active:scale-[0.98] transition-all bg-[var(--accent)] text-[var(--bg-primary)] mt-4 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Create Identity"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                Already have an account?{" "}
                <button 
                  onClick={() => router.push("/login")}
                  className="text-[var(--accent)] font-bold hover:underline underline-offset-4 decoration-2"
                >
                  Access Sanctuary
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
