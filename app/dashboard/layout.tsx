"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { LanguageProvider } from "@/lib/language-context"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <TopNav />
        <main className="ml-64 mt-20 p-6">{children}</main>
      </div>
    </LanguageProvider>
  )
}
