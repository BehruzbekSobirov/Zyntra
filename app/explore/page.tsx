"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Star, MessageSquare, Users, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Profile {
  id: string
  name: string
  title: string
  skills: string[]
  avatar: string
  bio: string
  location: string
  matchScore?: number
}

interface Project {
  id: string
  title: string
  description: string
  skills: string[]
  teamSize: number
  status: "recruiting" | "in-progress" | "completed"
  avatar: string
  founder: string
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("people")

  const [profiles] = useState<Profile[]>([
    {
      id: "1",
      name: "Sarah Chen",
      title: "UI/UX Designer",
      skills: ["Figma", "Design Systems", "Prototyping"],
      avatar: "/designer-avatar.jpg",
      bio: "Creating beautiful and intuitive user experiences",
      location: "New York, NY",
      matchScore: 98,
    },
    {
      id: "2",
      name: "Marcus Williams",
      title: "Product Manager",
      skills: ["Strategy", "Analytics", "User Research"],
      avatar: "/manager-avatar.jpg",
      bio: "Building products that users love",
      location: "San Francisco, CA",
      matchScore: 95,
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      title: "DevOps Engineer",
      skills: ["AWS", "Docker", "Kubernetes"],
      avatar: "/engineer-avatar.jpg",
      bio: "Infrastructure and deployment specialist",
      location: "Austin, TX",
      matchScore: 92,
    },
    {
      id: "4",
      name: "James Park",
      title: "Data Scientist",
      skills: ["Python", "Machine Learning", "TensorFlow"],
      avatar: "/scientist-avatar.jpg",
      bio: "Turning data into actionable insights",
      location: "Seattle, WA",
      matchScore: 88,
    },
  ])

  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "AI-Powered Analytics Platform",
      description: "Building a next-generation analytics platform with AI-driven insights",
      skills: ["React", "Node.js", "Machine Learning"],
      teamSize: 5,
      status: "recruiting",
      avatar: "/startup-team.jpg",
      founder: "Alex Johnson",
    },
    {
      id: "2",
      title: "Mobile Fitness App",
      description: "React Native app for personalized fitness tracking and coaching",
      skills: ["React Native", "Firebase", "UI/UX"],
      teamSize: 3,
      status: "recruiting",
      avatar: "/mobile-team.jpg",
      founder: "Sarah Chen",
    },
    {
      id: "3",
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      skills: ["Next.js", "PostgreSQL", "Stripe"],
      teamSize: 4,
      status: "in-progress",
      avatar: "/ecommerce-team.jpg",
      founder: "Marcus Williams",
    },
  ])

  const filteredProfiles = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Zyntra</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search people, projects, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border h-12 text-base"
            />
            <Button variant="ghost" className="absolute right-2 top-2">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="people" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              People
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Projects
            </TabsTrigger>
          </TabsList>

          {/* People Tab */}
          <TabsContent value="people" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredProfiles.map((profile) => (
                <Card key={profile.id} className="p-6 bg-card border-border hover:border-primary/50 transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={profile.avatar || "/placeholder.svg"}
                        alt={profile.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{profile.name}</h3>
                          {profile.matchScore && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                              {profile.matchScore}% Match
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-primary font-medium mb-1">{profile.title}</p>
                        <p className="text-xs text-muted-foreground mb-2">📍 {profile.location}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Star className="w-5 h-5" />
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{profile.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile.skills.map((skill) => (
                      <span key={skill} className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="grid gap-4">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="p-6 bg-card border-border hover:border-primary/50 transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={project.avatar || "/placeholder.svg"}
                        alt={project.title}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">by {project.founder}</p>
                        <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
                        project.status === "recruiting"
                          ? "bg-green-500/20 text-green-400"
                          : project.status === "in-progress"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {project.status === "recruiting"
                        ? "Recruiting"
                        : project.status === "in-progress"
                          ? "In Progress"
                          : "Completed"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span key={skill} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      Join <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
