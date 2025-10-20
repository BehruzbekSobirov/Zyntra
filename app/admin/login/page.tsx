"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { validateAdminCredentials, setAdminToken } from "@/lib/admin-auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setIsLoading(true)
    setError("")
    try {
      if (validateAdminCredentials(username, password)) {
        const token = btoa(`${username}:${Date.now()}`)
        setAdminToken(token)
        router.push("/admin/dashboard")
      } else {
        setError("Invalid admin credentials")
      }
    } catch (err) {
      setError("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          ← Back to Home
        </Link>

        <Card className="p-8 bg-card border-border">
          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Restricted Access - Admin Only</p>
          </div>

          {error && <div className="mb-4 p-3 bg-destructive/20 text-destructive rounded-lg text-sm">{error}</div>}

          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="username">Admin Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="password">Admin Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 bg-input border-border pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoading || !username || !password}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isLoading ? "Authenticating..." : "Access Admin Panel"}
          </Button>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">
              <strong>Demo Credentials:</strong>
              <br />
              Username: cobratatef
              <br />
              Password: behruzbek@38A
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
