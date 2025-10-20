"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Plus, Star, ExternalLink } from "lucide-react"
import Link from "next/link"

interface PortfolioItem {
  id: string
  title: string
  description: string
  image: string
  skills: string[]
  link: string
  featured: boolean
}

export default function PortfolioPage() {
  const [portfolio] = useState<PortfolioItem[]>([
    {
      id: "1",
      title: "AI Analytics Dashboard",
      description: "Built a real-time analytics dashboard with AI-powered insights for startups",
      image: "/startup-team.jpg",
      skills: ["React", "Node.js", "Machine Learning"],
      link: "https://example.com",
      featured: true,
    },
    {
      id: "2",
      title: "Mobile Fitness App",
      description: "React Native app with personalized fitness tracking and AI coaching",
      image: "/mobile-team.jpg",
      skills: ["React Native", "Firebase", "UI/UX"],
      link: "https://example.com",
      featured: true,
    },
    {
      id: "3",
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and analytics",
      image: "/ecommerce-team.jpg",
      skills: ["Next.js", "PostgreSQL", "Stripe"],
      link: "https://example.com",
      featured: false,
    },
  ])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="w-5 h-5" />
            Back to Profile
          </Link>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Portfolio</h1>
          <p className="text-muted-foreground">Showcase your best work and projects</p>
        </div>

        {/* Featured Projects */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {portfolio
              .filter((item) => item.featured)
              .map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden bg-card border-border hover:border-primary/50 transition"
                >
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.skills.map((skill) => (
                        <span key={skill} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      View Project <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* All Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Projects</h2>
          <div className="space-y-4">
            {portfolio.map((item) => (
              <Card key={item.id} className="p-6 bg-card border-border hover:border-primary/50 transition">
                <div className="flex items-start gap-6">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      {item.featured && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span key={skill} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost">
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
