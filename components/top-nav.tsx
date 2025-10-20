"use client"

import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Bell, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"

export function TopNav() {
  const { t } = useLanguage()

  return (
    <div className="fixed top-0 right-0 left-64 h-20 bg-background border-b border-border flex items-center justify-between px-6 z-30">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search teams, people..."
            className="pl-10 bg-input border-border transition-smooth focus:border-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <LanguageSwitcher />

        <Button variant="ghost" size="icon" className="relative transition-smooth hover:bg-primary/10">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        </Button>

        <Button variant="ghost" size="icon" className="transition-smooth hover:bg-primary/10">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
