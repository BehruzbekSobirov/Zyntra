"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { login, oauthLogin } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("alice@zyntra.com")
  const [password, setPassword] = useState("password123")
  const [isLoading, setIsLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setIsLoading(true)
    setError("")
    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: string) => {
    setOauthLoading(provider)
    setError("")
    try {
      await oauthLogin(provider)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : `${provider} login failed`)
    } finally {
      setOauthLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <Card className="p-8 bg-card border-border">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your Zyntra account</p>
          </div>

          {error && <div className="mb-4 p-3 bg-destructive/20 text-destructive rounded-lg text-sm">{error}</div>}

          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
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
            disabled={isLoading || !email || !password}
            className="w-full bg-primary hover:bg-primary/90 mb-4"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => handleOAuthLogin("google")}
              disabled={oauthLoading !== null}
              variant="outline"
              className="w-full border-border hover:bg-blue-500/10 bg-transparent"
            >
              {oauthLoading === "google" ? "Connecting..." : "🔍 Continue with Google"}
            </Button>
            <Button
              onClick={() => handleOAuthLogin("facebook")}
              disabled={oauthLoading !== null}
              variant="outline"
              className="w-full border-border hover:bg-blue-600/10 bg-transparent"
            >
              {oauthLoading === "facebook" ? "Connecting..." : "f Continue with Facebook"}
            </Button>
            <Button
              onClick={() => handleOAuthLogin("meta")}
              disabled={oauthLoading !== null}
              variant="outline"
              className="w-full border-border hover:bg-blue-700/10 bg-transparent"
            >
              {oauthLoading === "meta" ? "Connecting..." : "◆ Continue with Meta"}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
