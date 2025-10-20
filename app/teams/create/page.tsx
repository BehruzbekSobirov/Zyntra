"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

export default function CreateTeamPage() {
  const [teamData, setTeamData] = useState({
    name: "",
    description: "",
    mission: "",
    skills: [] as string[],
    maxMembers: 5,
  })
  const [skillInput, setSkillInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const addSkill = () => {
    if (skillInput.trim() && !teamData.skills.includes(skillInput.trim())) {
      setTeamData({
        ...teamData,
        skills: [...teamData.skills, skillInput.trim()],
      })
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setTeamData({
      ...teamData,
      skills: teamData.skills.filter((s) => s !== skill),
    })
  }

  const handleCreate = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    window.location.href = "/dashboard"
  }

  const isFormValid = teamData.name && teamData.description && teamData.mission && teamData.skills.length > 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create a New Team</h1>
          <p className="text-muted-foreground">Build an amazing team and start collaborating on projects</p>
        </div>

        <Card className="p-8 bg-card border-border">
          <div className="space-y-6">
            {/* Team Name */}
            <div>
              <Label htmlFor="name">Team Name</Label>
              <Input
                id="name"
                placeholder="e.g., AI Startup MVP"
                value={teamData.name}
                onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
                className="mt-2 bg-input border-border"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Team Description</Label>
              <Textarea
                id="description"
                placeholder="What is your team about? What makes it unique?"
                value={teamData.description}
                onChange={(e) => setTeamData({ ...teamData, description: e.target.value })}
                className="mt-2 bg-input border-border"
                rows={3}
              />
            </div>

            {/* Mission */}
            <div>
              <Label htmlFor="mission">Team Mission</Label>
              <Textarea
                id="mission"
                placeholder="What is your team's mission? What do you want to achieve?"
                value={teamData.mission}
                onChange={(e) => setTeamData({ ...teamData, mission: e.target.value })}
                className="mt-2 bg-input border-border"
                rows={3}
              />
            </div>

            {/* Required Skills */}
            <div>
              <Label htmlFor="skills">Required Skills</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="skills"
                  placeholder="e.g., React, Node.js"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  className="bg-input border-border"
                />
                <Button onClick={addSkill} className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {teamData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {teamData.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full"
                    >
                      <span className="text-sm">{skill}</span>
                      <button onClick={() => removeSkill(skill)} className="hover:text-primary/80">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Max Members */}
            <div>
              <Label htmlFor="maxMembers">Maximum Team Size</Label>
              <Input
                id="maxMembers"
                type="number"
                min="2"
                max="20"
                value={teamData.maxMembers}
                onChange={(e) => setTeamData({ ...teamData, maxMembers: Number.parseInt(e.target.value) })}
                className="mt-2 bg-input border-border"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleCreate}
                disabled={!isFormValid || isLoading}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {isLoading ? "Creating..." : "Create Team"}
              </Button>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="flex-1 border-border bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
