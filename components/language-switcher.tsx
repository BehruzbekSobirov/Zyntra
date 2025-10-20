"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="h-8 px-2 text-xs"
      >
        EN
      </Button>
      <Button
        variant={language === "uz" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("uz")}
        className="h-8 px-2 text-xs"
      >
        UZ
      </Button>
    </div>
  )
}
