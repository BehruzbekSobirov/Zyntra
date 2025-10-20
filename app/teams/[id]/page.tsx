"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Settings, Users, MessageSquare, Plus, Crown, Trash2 } from "lucide-react"
import Link from "next/link"

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  joinedDate: string
  isLeader: boolean
}

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  const [team] = useState({
    id: params.id,
    name: "AI Startup MVP",
    description: "Building an AI-powered analytics platform",
    mission: "Create the most intuitive AI analytics tool for startups",
    status: "active",
    createdDate: "2024-01-15",
    members: 4,
    maxMembers: 8,
  })

  const [members] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Alex Johnson",
      role: "Team Lead & Full Stack Developer",
      avatar: "/professional-avatar.jpg",
      joinedDate: "2024-01-15",
      isLeader: true,
    },
    {
      id: "2",
      name: "Sarah Chen",
      role: "UI/UX Designer",
      avatar: "/designer-avatar.jpg",
      joinedDate: "2024-01-20",
      isLeader: false,
    },
    {
      id: "3",
      name: "Marcus Williams",
      role: "Product Manager",
      avatar: "/manager-avatar.jpg",
      joinedDate: "2024-02-01",
      isLeader: false,
    },
    {
      id: "4",
      name: "Emma Rodriguez",
      role: "DevOps Engineer",
      avatar: "/engineer-avatar.jpg",
      joinedDate: "2024-02-10",
      isLeader: false,
    },
  ])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Team Header */}
        <Card className="p-8 bg-card border-border mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{team.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{team.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{team.members}</span>/{team.maxMembers} Members
                </span>
                <span className="text-muted-foreground">
                  Created <span className="font-semibold text-foreground">{team.createdDate}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="bg-background/50 p-4 rounded-lg border border-border">
            <h3 className="font-semibold mb-2">Team Mission</h3>
            <p className="text-muted-foreground">{team.mission}</p>
          </div>
        </Card>

        {/* Team Members */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Team Members
                </h2>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Invite
                </Button>
              </div>

              <div className="space-y-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{member.name}</h3>
                          {member.isLeader && <Crown className="w-4 h-4 text-yellow-500" title="Team Leader" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <p className="text-xs text-muted-foreground mt-1">Joined {member.joinedDate}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4">Team Stats</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Members</p>
                  <p className="text-2xl font-bold">{team.members}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <p className="text-lg font-semibold text-green-400">Active</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Capacity</p>
                  <div className="w-full bg-background/50 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(team.members / team.maxMembers) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{team.maxMembers - team.members} slots available</p>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4">Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full border-border bg-transparent justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Team Chat
                </Button>
                <Button variant="outline" className="w-full border-border bg-transparent justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-destructive/50 bg-transparent justify-start text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Leave Team
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
