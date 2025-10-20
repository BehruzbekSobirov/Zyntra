"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate email send
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link href="/auth/login" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Login
        </Link>

        {/* Card */}
        <Card className="p-8 bg-card border-border">
          {!submitted ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
                <p className="text-muted-foreground">
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </div>

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
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isLoading || !email}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
              <p className="text-muted-foreground mb-6">
                We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                The link will expire in 24 hours. If you don't see the email, check your spam folder.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false)
                  setEmail("")
                }}
                variant="outline"
                className="w-full border-border hover:bg-primary/5 bg-transparent"
              >
                Try Another Email
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
