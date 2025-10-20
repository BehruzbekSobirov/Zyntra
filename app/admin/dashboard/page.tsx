"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated, clearAdminToken } from "@/lib/admin-auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { db } from "@/lib/db"
import { LogOut, Users, MessageSquare, Settings, BarChart3, Shield, Home } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTeams: 0,
    totalMatches: 0,
    activeChats: 0,
  })

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login")
      return
    }
    setIsAuthed(true)

    // Load stats
    const users = db.getAllUsers()
    const teams = db.getAllTeams()
    setStats({
      totalUsers: users.length,
      totalTeams: teams.length,
      totalMatches: Math.floor(users.length * 0.6),
      activeChats: Math.floor(users.length * 0.4),
    })
  }, [router])

  const handleLogout = () => {
    clearAdminToken()
    router.push("/admin/login")
  }

  if (!isAuthed) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Zyntra Platform Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="outline" className="gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-card border-border hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Total Users</p>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Total Teams</p>
                <p className="text-3xl font-bold">{stats.totalTeams}</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">AI Matches</p>
                <p className="text-3xl font-bold">{stats.totalMatches}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Active Chats</p>
                <p className="text-3xl font-bold">{stats.activeChats}</p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <MessageSquare className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Management */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">User Management</h2>
            </div>
            <p className="text-muted-foreground mb-4">Manage platform users and permissions</p>
            <Button className="w-full bg-primary hover:bg-primary/90">Manage Users</Button>
          </Card>

          {/* System Settings */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">System Settings</h2>
            </div>
            <p className="text-muted-foreground mb-4">Configure platform settings and features</p>
            <Button className="w-full bg-primary hover:bg-primary/90">System Settings</Button>
          </Card>

          {/* Analytics */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Analytics</h2>
            </div>
            <p className="text-muted-foreground mb-4">View platform analytics and reports</p>
            <Button className="w-full bg-primary hover:bg-primary/90">View Analytics</Button>
          </Card>

          {/* Security */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Security</h2>
            </div>
            <p className="text-muted-foreground mb-4">Manage security and access control</p>
            <Button className="w-full bg-primary hover:bg-primary/90">Security Settings</Button>
          </Card>
        </div>

        {/* Admin Info */}
        <Card className="mt-8 p-6 bg-card border-border">
          <h3 className="text-lg font-bold mb-4">Admin Panel Information</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Platform:</strong> Zyntra AI Collaboration Platform
            </p>
            <p>
              <strong>Version:</strong> 1.0.0
            </p>
            <p>
              <strong>Status:</strong> <span className="text-green-500">Operational</span>
            </p>
            <p>
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
