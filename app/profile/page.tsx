"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Save, X, Plus } from "lucide-react"

export default function ProfilePage() {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    title: "Full Stack Developer",
    bio: "Passionate about building scalable web applications and leading innovative teams.",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    email: "alex@example.com",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    experience: "5+ years",
    availability: "Open to opportunities",
    portfolio: [
      { title: "AI Analytics Platform", description: "Built a real-time analytics dashboard", link: "#" },
      { title: "Mobile App", description: "React Native fitness tracking app", link: "#" },
    ],
  })

  const [formData, setFormData] = useState(profile)
  const [newSkill, setNewSkill] = useState("")

  const handleSave = () => {
    setProfile(formData)
    setIsEditing(false)
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skillToRemove),
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Section */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-lg text-muted-foreground">Manage your professional information and portfolio</p>
          </div>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-primary hover:bg-primary/90 transition-smooth hover-lift"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="border-border transition-smooth hover-lift"
              >
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 transition-smooth hover-lift">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <Card className="p-8 bg-card border-border mb-8 animate-fade-in-up">
        <div className="flex items-start gap-6 mb-6">
          <div className="relative">
            <img
              src="/professional-avatar.jpg"
              alt={profile.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-smooth hover-lift">
                <Upload className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex-1">
            {!isEditing ? (
              <>
                <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                <p className="text-lg text-primary font-medium mb-2">{profile.title}</p>
                <p className="text-muted-foreground mb-4 max-w-2xl">{profile.bio}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-muted-foreground">📍 {profile.location}</span>
                  <span className="text-muted-foreground">🌐 {profile.website}</span>
                  <span className="text-muted-foreground">✉️ {profile.email}</span>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 bg-input border-border transition-smooth"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-2 bg-input border-border transition-smooth"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="mt-2 bg-input border-border transition-smooth"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Skills Section */}
      <Card className="p-6 bg-card border-border mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-2xl font-bold mb-6">Skills & Experience</h2>

        {!isEditing ? (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium hover-lift transition-smooth"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Experience</h3>
              <p className="text-muted-foreground">{profile.experience}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label>Skills</Label>
              <div className="mt-2 space-y-3">
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skills.map((skill) => (
                    <div
                      key={skill}
                      className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-primary/70 transition-smooth">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill"
                    className="bg-input border-border transition-smooth"
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button onClick={addSkill} className="bg-primary hover:bg-primary/90 transition-smooth">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="mt-2 bg-input border-border transition-smooth"
              />
            </div>
          </div>
        )}
      </Card>

      {/* Portfolio Section */}
      <Card className="p-6 bg-card border-border mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-2xl font-bold mb-6">Portfolio</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {profile.portfolio.map((project, idx) => (
            <Card
              key={idx}
              className="p-4 bg-background border-border hover:border-primary/50 transition-smooth hover-lift"
            >
              <h3 className="font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
              <a href={project.link} className="text-sm text-primary hover:underline">
                View Project →
              </a>
            </Card>
          ))}
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-6 bg-card border-border animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

        {!isEditing ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="font-medium">{profile.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <a href={`mailto:${profile.email}`} className="font-medium text-primary hover:underline">
                {profile.email}
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Website</p>
              <a href={`https://${profile.website}`} className="font-medium text-primary hover:underline">
                {profile.website}
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Availability</p>
              <p className="font-medium">{profile.availability}</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-2 bg-input border-border transition-smooth"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 bg-input border-border transition-smooth"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="mt-2 bg-input border-border transition-smooth"
              />
            </div>
            <div>
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="mt-2 bg-input border-border transition-smooth"
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
