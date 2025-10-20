"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, MessageSquare, Plus, Users, Calendar, Flag, Edit, Share2 } from "lucide-react"
import Link from "next/link"

interface Task {
  id: string
  title: string
  description: string
  assignee: string
  status: "todo" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high"
  dueDate: string
  subtasks: number
  completedSubtasks: number
}

interface Milestone {
  id: string
  title: string
  description: string
  dueDate: string
  status: "upcoming" | "in-progress" | "completed"
  progress: number
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [project] = useState({
    id: params.id,
    title: "AI Analytics Dashboard",
    description: "Build a real-time analytics dashboard with AI-powered insights",
    status: "in-progress",
    progress: 65,
    team: 4,
    dueDate: "2025-03-15",
    priority: "high",
  })

  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "Setup project repository",
      description: "Initialize Git repo and setup CI/CD pipeline",
      assignee: "Alex Johnson",
      status: "done",
      priority: "high",
      dueDate: "2025-01-20",
      subtasks: 3,
      completedSubtasks: 3,
    },
    {
      id: "2",
      title: "Design database schema",
      description: "Create PostgreSQL schema for analytics data",
      assignee: "Emma Rodriguez",
      status: "done",
      priority: "high",
      dueDate: "2025-01-25",
      subtasks: 4,
      completedSubtasks: 4,
    },
    {
      id: "3",
      title: "Build API endpoints",
      description: "Create REST API for data retrieval",
      assignee: "Alex Johnson",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-02-10",
      subtasks: 8,
      completedSubtasks: 5,
    },
    {
      id: "4",
      title: "Design dashboard UI",
      description: "Create responsive dashboard interface",
      assignee: "Sarah Chen",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-02-15",
      subtasks: 6,
      completedSubtasks: 4,
    },
    {
      id: "5",
      title: "Implement AI insights",
      description: "Integrate ML models for predictive analytics",
      assignee: "James Park",
      status: "todo",
      priority: "medium",
      dueDate: "2025-03-01",
      subtasks: 5,
      completedSubtasks: 0,
    },
  ])

  const [milestones] = useState<Milestone[]>([
    {
      id: "1",
      title: "MVP Release",
      description: "Core analytics features ready",
      dueDate: "2025-02-28",
      status: "in-progress",
      progress: 70,
    },
    {
      id: "2",
      title: "AI Features Launch",
      description: "AI-powered insights and recommendations",
      dueDate: "2025-03-15",
      status: "upcoming",
      progress: 0,
    },
    {
      id: "3",
      title: "Beta Release",
      description: "Public beta testing phase",
      dueDate: "2025-04-01",
      status: "upcoming",
      progress: 0,
    },
  ])

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "bg-green-500/20 text-green-400"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400"
      case "review":
        return "bg-yellow-500/20 text-yellow-400"
      case "todo":
        return "bg-gray-500/20 text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/projects" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Edit className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <Card className="p-8 bg-card border-border mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
              <p className="text-lg text-muted-foreground">{project.description}</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">In Progress</span>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Overall Progress</span>
              <span className="text-sm font-bold text-primary">{project.progress}%</span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Team Members</p>
              <p className="text-lg font-semibold flex items-center gap-1">
                <Users className="w-4 h-4" />
                {project.team}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Due Date</p>
              <p className="text-lg font-semibold flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(project.dueDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Priority</p>
              <p className="text-lg font-semibold flex items-center gap-1">
                <Flag className="w-4 h-4 text-red-500" />
                High
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <p className="text-lg font-semibold flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                Active
              </p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="milestones" className="flex items-center gap-2">
              <Flag className="w-4 h-4" />
              Milestones
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Project Tasks</h2>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <Card key={task.id} className="p-4 bg-card border-border hover:border-primary/50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{task.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getTaskStatusColor(task.status)}`}>
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span>Assigned to {task.assignee}</span>
                        <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                        <span>
                          {task.completedSubtasks}/{task.subtasks} subtasks
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Milestones Tab */}
          <TabsContent value="milestones" className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Project Milestones</h2>
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <Card key={milestone.id} className="p-6 bg-card border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
                        milestone.status === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : milestone.status === "in-progress"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-semibold text-primary">{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-background/50 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${milestone.progress}%` }}></div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Due {new Date(milestone.dueDate).toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <h2 className="text-2xl font-bold mb-6">Team Members</h2>
            <Card className="p-6 bg-card border-border">
              <p className="text-muted-foreground">Team collaboration features coming soon</p>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <h2 className="text-2xl font-bold mb-6">Activity Feed</h2>
            <Card className="p-6 bg-card border-border">
              <p className="text-muted-foreground">Activity timeline coming soon</p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
