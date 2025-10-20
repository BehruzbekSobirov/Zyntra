"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Sparkles, MessageSquare, Plus, Star, CheckCircle, ArrowRight, TrendingUp } from "lucide-react"

export default function Dashboard() {
  const { user } = useAuth()
  const [matches, setMatches] = useState<any[]>([])
  const [teams, setTeams] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("matches")

  useEffect(() => {
    if (user) {
      // Load matches from database
      const calculatedMatches = db.calculateMatches()
      setMatches(calculatedMatches.slice(0, 4))

      // Load teams
      const userTeams = db.getAllTeams().filter((t) => t.members.includes(user.id))
      setTeams(userTeams)

      // Load messages
      const userMessages = db.getAllMessages().filter((m) => m.senderId === user.id || m.recipientId === user.id)
      setMessages(userMessages.slice(0, 5))
    }
  }, [user])

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Welcome Section */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-lg text-muted-foreground">
          Find your perfect team members and start building amazing things
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Active Matches",
            value: matches.length.toString(),
            icon: Sparkles,
            color: "from-primary to-accent",
          },
          { label: "Teams", value: teams.length.toString(), icon: Users, color: "from-accent to-primary" },
          {
            label: "Messages",
            value: messages.length.toString(),
            icon: MessageSquare,
            color: "from-primary to-secondary",
          },
          { label: "Profile Views", value: "48", icon: TrendingUp, color: "from-secondary to-accent" },
        ].map((stat, idx) => (
          <Card
            key={idx}
            className="p-6 bg-card border-border hover:border-primary/50 transition-smooth hover-lift animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="matches" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AI Matches
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            My Teams
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Messages
          </TabsTrigger>
        </TabsList>

        {/* AI Matches Tab */}
        <TabsContent value="matches" className="space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your AI Matches</h2>
            <Button className="bg-primary hover:bg-primary/90 transition-smooth hover-lift">
              <Plus className="w-4 h-4 mr-2" />
              Find More
            </Button>
          </div>

          <div className="grid gap-4">
            {matches.map((match, idx) => {
              const matchedUser = db.getUser(match.userId2)
              if (!matchedUser) return null

              return (
                <Card
                  key={match.id}
                  className="p-6 bg-card border-border hover:border-primary/50 transition-smooth hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={matchedUser.avatar || "/placeholder.svg"}
                        alt={matchedUser.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{matchedUser.name}</h3>
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
                            {match.score}% Match
                          </span>
                        </div>
                        <p className="text-sm text-primary font-medium mb-2">{matchedUser.title}</p>
                        <p className="text-sm text-muted-foreground mb-3">{matchedUser.bio}</p>
                        <div className="flex flex-wrap gap-2">
                          {matchedUser.skills.map((skill: string) => (
                            <span key={skill} className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border bg-transparent transition-smooth hover-lift"
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 transition-smooth hover-lift">
                        Connect
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Teams</h2>
            <Button className="bg-primary hover:bg-primary/90 transition-smooth hover-lift">
              <Plus className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {teams.map((team, idx) => (
              <Card
                key={team.id}
                className="p-6 bg-card border-border hover:border-primary/50 transition-smooth hover-lift animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{team.name}</h3>
                    <p className="text-xs text-muted-foreground">{team.members.length} members</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-500/20 text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {team.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{team.description}</p>
                <Button variant="outline" className="w-full border-border bg-transparent transition-smooth hover-lift">
                  View Team <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4 animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-6">Messages</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-2">
              {messages.map((msg, idx) => {
                const sender = db.getUser(msg.senderId)
                if (!sender) return null

                return (
                  <Card
                    key={msg.id}
                    className="p-4 bg-card border-border hover:border-primary/50 transition-smooth hover-lift cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={sender.avatar || "/placeholder.svg"}
                        alt={sender.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{sender.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{msg.content}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            <div className="md:col-span-2">
              <Card className="p-6 bg-card border-border h-96 flex flex-col animate-fade-in-up">
                <div className="flex-1 mb-4 overflow-y-auto space-y-4">
                  <div className="text-center text-muted-foreground py-8">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Select a conversation to start chatting</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Type your message..." className="bg-input border-border transition-smooth" />
                  <Button className="bg-primary hover:bg-primary/90 transition-smooth hover-lift">Send</Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
