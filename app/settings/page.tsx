"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Bell, Lock, Eye, Globe, Shield, LogOut } from "lucide-react"

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    matchNotifications: true,
    messageNotifications: true,
    twoFactorAuth: false,
    profileVisibility: "public",
    theme: "dark",
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: typeof settings[key] === "boolean" ? !settings[key] : settings[key],
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Section */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-lg text-muted-foreground">Manage your account preferences and security</p>
      </div>

      {/* Notification Settings */}
      <Card className="p-6 bg-card border-border mb-8 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Notifications</h2>
        </div>

        <div className="space-y-4">
          {[
            { key: "emailNotifications", label: "Email Notifications", description: "Receive updates via email" },
            { key: "pushNotifications", label: "Push Notifications", description: "Get browser notifications" },
            { key: "matchNotifications", label: "Match Notifications", description: "Alerts for new AI matches" },
            { key: "messageNotifications", label: "Message Notifications", description: "Alerts for new messages" },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-smooth"
            >
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <button
                onClick={() => handleToggle(item.key as keyof typeof settings)}
                className={`relative w-12 h-6 rounded-full transition-smooth ${
                  settings[item.key as keyof typeof settings] ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings[item.key as keyof typeof settings] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card className="p-6 bg-card border-border mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Privacy</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-background rounded-lg border border-border">
            <Label htmlFor="visibility" className="font-medium">
              Profile Visibility
            </Label>
            <select
              id="visibility"
              value={settings.profileVisibility}
              onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
              className="mt-2 w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground transition-smooth focus:border-primary"
            >
              <option value="public">Public - Visible to everyone</option>
              <option value="private">Private - Only visible to matches</option>
              <option value="hidden">Hidden - Not searchable</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6 bg-card border-border mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Security</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-smooth">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <button
              onClick={() => handleToggle("twoFactorAuth")}
              className={`relative w-12 h-6 rounded-full transition-smooth ${
                settings.twoFactorAuth ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.twoFactorAuth ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <Button variant="outline" className="w-full border-border bg-transparent transition-smooth hover-lift">
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>
        </div>
      </Card>

      {/* Language & Theme */}
      <Card className="p-6 bg-card border-border mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-background rounded-lg border border-border">
            <Label className="font-medium">Language</Label>
            <div className="mt-3 flex gap-2">
              <Button
                variant={language === "en" ? "default" : "outline"}
                onClick={() => setLanguage("en")}
                className="transition-smooth hover-lift"
              >
                English
              </Button>
              <Button
                variant={language === "uz" ? "default" : "outline"}
                onClick={() => setLanguage("uz")}
                className="transition-smooth hover-lift"
              >
                O'zbekcha
              </Button>
            </div>
          </div>

          <div className="p-4 bg-background rounded-lg border border-border">
            <Label htmlFor="theme" className="font-medium">
              Theme
            </Label>
            <select
              id="theme"
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className="mt-2 w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground transition-smooth focus:border-primary"
            >
              <option value="dark">Dark Mode</option>
              <option value="light">Light Mode</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 bg-card border-destructive/50 mb-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-bold mb-6 text-destructive">Danger Zone</h2>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full border-destructive/50 text-destructive hover:bg-destructive/10 transition-smooth bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout from All Devices
          </Button>
          <Button
            variant="outline"
            className="w-full border-destructive/50 text-destructive hover:bg-destructive/10 transition-smooth bg-transparent"
          >
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  )
}
