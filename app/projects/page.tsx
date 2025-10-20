"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Filter, Calendar, Users, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  status: "planning" | "in-progress" | "on-hold" | "completed"
  progress: number
  team: number
  dueDate: string
  priority: "low" | "medium" | "high"
  tasks: number
  completedTasks: number
}

export default function ProjectsPage() {
  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "AI Analytics Dashboard",
      description: "Build a real-time analytics dashboard with AI-powered insights",
      status: "in-progress",
      progress: 65,
      team: 4,
      dueDate: "2025-03-15",
      priority: "high",
      tasks: 24,
      completedTasks: 16,
    },
    {
      id: "2",
      title: "Mobile Fitness App",
      description: "React Native app for personalized fitness tracking",
      status: "in-progress",
      progress: 45,
      team: 3,
      dueDate: "2025-04-01",
      priority: "high",
      tasks: 18,
      completedTasks: 8,
    },
    {
      id: "3",
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      status: "planning",
      progress: 20,
      team: 5,
      dueDate: "2025-05-30",
      priority: "medium",
      tasks: 32,
      completedTasks: 6,
    },
    {
      id: "4",
      title: "API Documentation Site",
      description: "Interactive API documentation and developer portal",
      status: "completed",
      progress: 100,
      team: 2,
      dueDate: "2025-01-20",
      priority: "low",
      tasks: 12,
      completedTasks: 12,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-500/20 text-blue-400"
      case "planning":
        return "bg-yellow-500/20 text-yellow-400"
      case "on-hold":
        return "bg-orange-500/20 text-orange-400"
      case "completed":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "low":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Zyntra</span>
          </Link>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Projects</h1>
            <p className="text-muted-foreground">Manage and collaborate on team projects</p>
          </div>
          <Button variant="outline" className="border-border bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ml-2 ${getStatusColor(project.status)}`}
                  >
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-semibold text-primary">
                      {project.completedTasks}/{project.tasks} tasks
                    </span>
                  </div>
                  <div className="w-full bg-background/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {project.team} members
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.dueDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">{getPriorityIcon(project.priority)}</div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-primary hover:bg-primary/90">View Project</Button>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
