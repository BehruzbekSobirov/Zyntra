"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Sparkles,
  Star,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  Zap,
  Users,
  Target,
  Lightbulb,
  Filter,
} from "lucide-react"

interface MatchInsight {
  category: string
  score: number
  reason: string
  icon: React.ReactNode
}

interface Match {
  id: string
  name: string
  title: string
  avatar: string
  bio: string
  skills: string[]
  matchScore: number
  compatibility: number
  insights: MatchInsight[]
  commonGoals: string[]
  complementarySkills: string[]
}

export default function MatchesPage() {
  const { t } = useLanguage()
  const [matches, setMatches] = useState<Match[]>([])
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filterScore, setFilterScore] = useState(0)

  useEffect(() => {
    // Simulate AI matching algorithm
    const simulateMatching = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockMatches: Match[] = [
        {
          id: "1",
          name: "Sarah Chen",
          title: "UI/UX Designer",
          avatar: "/designer-avatar.jpg",
          bio: "Creating beautiful and intuitive user experiences",
          skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
          matchScore: 98,
          compatibility: 0.98,
          insights: [
            {
              category: "Skill Complementarity",
              score: 99,
              reason: "Your backend skills perfectly complement her design expertise",
              icon: <CheckCircle className="w-5 h-5 text-green-500" />,
            },
            {
              category: "Goal Alignment",
              score: 96,
              reason: "Both focused on building scalable, user-centric products",
              icon: <Target className="w-5 h-5 text-blue-500" />,
            },
            {
              category: "Work Style Match",
              score: 97,
              reason: "Similar communication preferences and collaboration style",
              icon: <Zap className="w-5 h-5 text-yellow-500" />,
            },
            {
              category: "Experience Level",
              score: 95,
              reason: "Both have 5+ years of professional experience",
              icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
            },
          ],
          commonGoals: ["Build innovative products", "Lead a team", "Create impact"],
          complementarySkills: ["Design Systems", "User Research", "Prototyping"],
        },
        {
          id: "2",
          name: "Marcus Williams",
          title: "Product Manager",
          avatar: "/manager-avatar.jpg",
          bio: "Building products that users love",
          skills: ["Strategy", "Analytics", "User Research", "Roadmapping"],
          matchScore: 95,
          compatibility: 0.95,
          insights: [
            {
              category: "Skill Complementarity",
              score: 94,
              reason: "Product strategy complements your technical execution",
              icon: <CheckCircle className="w-5 h-5 text-green-500" />,
            },
            {
              category: "Goal Alignment",
              score: 95,
              reason: "Shared vision for building market-leading products",
              icon: <Target className="w-5 h-5 text-blue-500" />,
            },
            {
              category: "Work Style Match",
              score: 93,
              reason: "Data-driven approach aligns with your methodology",
              icon: <Zap className="w-5 h-5 text-yellow-500" />,
            },
            {
              category: "Experience Level",
              score: 98,
              reason: "Extensive experience in scaling startups",
              icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
            },
          ],
          commonGoals: ["Scale to Series A", "Build great team", "Create market impact"],
          complementarySkills: ["Product Strategy", "Analytics", "User Research"],
        },
        {
          id: "3",
          name: "Emma Rodriguez",
          title: "DevOps Engineer",
          avatar: "/engineer-avatar.jpg",
          bio: "Infrastructure and deployment specialist",
          skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
          matchScore: 92,
          compatibility: 0.92,
          insights: [
            {
              category: "Skill Complementarity",
              score: 91,
              reason: "Infrastructure expertise ensures scalable deployments",
              icon: <CheckCircle className="w-5 h-5 text-green-500" />,
            },
            {
              category: "Goal Alignment",
              score: 90,
              reason: "Both committed to building reliable systems",
              icon: <Target className="w-5 h-5 text-blue-500" />,
            },
            {
              category: "Work Style Match",
              score: 92,
              reason: "Proactive problem-solving approach matches yours",
              icon: <Zap className="w-5 h-5 text-yellow-500" />,
            },
            {
              category: "Experience Level",
              score: 94,
              reason: "4+ years of DevOps experience in startups",
              icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
            },
          ],
          commonGoals: ["Build scalable systems", "Mentor junior engineers", "Innovate"],
          complementarySkills: ["AWS", "Kubernetes", "CI/CD", "Infrastructure"],
        },
        {
          id: "4",
          name: "James Park",
          title: "Data Scientist",
          avatar: "/scientist-avatar.jpg",
          bio: "Turning data into actionable insights",
          skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis"],
          matchScore: 88,
          compatibility: 0.88,
          insights: [
            {
              category: "Skill Complementarity",
              score: 87,
              reason: "ML expertise adds intelligence to your applications",
              icon: <CheckCircle className="w-5 h-5 text-green-500" />,
            },
            {
              category: "Goal Alignment",
              score: 86,
              reason: "Interested in AI-driven product development",
              icon: <Target className="w-5 h-5 text-blue-500" />,
            },
            {
              category: "Work Style Match",
              score: 88,
              reason: "Experimental and iterative approach aligns well",
              icon: <Zap className="w-5 h-5 text-yellow-500" />,
            },
            {
              category: "Experience Level",
              score: 90,
              reason: "3+ years of ML experience in production",
              icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
            },
          ],
          commonGoals: ["Build AI products", "Solve complex problems", "Learn together"],
          complementarySkills: ["Machine Learning", "Python", "Data Analysis"],
        },
      ]

      setMatches(mockMatches)
      setSelectedMatch(mockMatches[0])
      setIsLoading(false)
    }

    simulateMatching()
  }, [])

  const filteredMatches = matches.filter((m) => m.matchScore >= filterScore)

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Section */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              Your AI Matches
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover perfectly matched collaborators based on skills, goals, and work style
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Card className="p-12 bg-card border-border text-center animate-fade-in-up">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Analyzing profiles and finding your perfect matches...</p>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Matches List */}
          <div className="lg:col-span-1 animate-fade-in-up">
            <Card className="bg-card border-border overflow-hidden">
              <div className="p-4 border-b border-border bg-background/50">
                <h2 className="font-semibold flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5" />
                  {filteredMatches.length} Matches Found
                </h2>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filterScore}
                    onChange={(e) => setFilterScore(Number(e.target.value))}
                    className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-primary">{filterScore}%+</span>
                </div>
              </div>
              <div className="divide-y divide-border max-h-96 overflow-y-auto">
                {filteredMatches.map((match, idx) => (
                  <button
                    key={match.id}
                    onClick={() => setSelectedMatch(match)}
                    className={`w-full p-4 text-left transition-smooth hover-lift ${
                      selectedMatch?.id === match.id
                        ? "bg-primary/10 border-l-2 border-l-primary"
                        : "hover:bg-background/50"
                    }`}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={match.avatar || "/placeholder.svg"}
                        alt={match.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{match.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{match.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs font-semibold text-primary">{match.matchScore}%</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Match Details */}
          {selectedMatch && (
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <Card className="p-6 bg-card border-border animate-fade-in-up hover-lift transition-smooth">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedMatch.avatar || "/placeholder.svg"}
                      alt={selectedMatch.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-primary/20"
                    />
                    <div>
                      <h2 className="text-2xl font-bold">{selectedMatch.name}</h2>
                      <p className="text-lg text-primary font-medium">{selectedMatch.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{selectedMatch.bio}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-primary">{selectedMatch.matchScore}%</div>
                    <p className="text-sm text-muted-foreground">Match Score</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedMatch.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full hover-lift transition-smooth"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-primary hover:bg-primary/90 transition-smooth hover-lift">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-border bg-transparent transition-smooth hover-lift"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </Card>

              {/* Compatibility Insights */}
              <Card className="p-6 bg-card border-border animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Compatibility Insights
                </h3>

                <div className="space-y-4">
                  {selectedMatch.insights.map((insight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-smooth hover-lift"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className="mt-1">{insight.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold">{insight.category}</p>
                          <span className="text-sm font-bold text-primary">{insight.score}%</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{insight.reason}</p>
                        <div className="w-full bg-background rounded-full h-1.5 mt-2">
                          <div
                            className="bg-gradient-to-r from-primary to-accent h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${insight.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Common Goals & Complementary Skills */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-card border-border animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    Common Goals
                  </h3>
                  <ul className="space-y-2">
                    {selectedMatch.commonGoals.map((goal, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm hover-lift transition-smooth">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6 bg-card border-border animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Complementary Skills
                  </h3>
                  <ul className="space-y-2">
                    {selectedMatch.complementarySkills.map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm hover-lift transition-smooth">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
