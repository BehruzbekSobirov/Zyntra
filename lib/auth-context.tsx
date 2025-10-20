"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { db, type User } from "./db"
import { handleOAuthLogin } from "./oauth-providers"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signup: (email: string, password: string, name: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  oauthLogin: (provider: string) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = db.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      const newUser = db.signup(email, password, name)
      setUser(newUser)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const loggedInUser = db.login(email, password)
      setUser(loggedInUser)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const oauthLogin = async (provider: string) => {
    setIsLoading(true)
    try {
      const oauthUser = await handleOAuthLogin(provider)
      const newUser = db.oauthSignup(oauthUser.email, oauthUser.name, provider, oauthUser.avatar)
      setUser(newUser)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    db.logout()
    setUser(null)
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error("No user logged in")
    const updated = db.updateUser(user.id, updates)
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signup, login, oauthLogin, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
