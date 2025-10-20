"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Zap, MessageSquare, Settings, LogOut } from "lucide-react"

export function Sidebar() {
  const { t } = useLanguage()
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Zap, label: "AI Matches", href: "/matches" },
    { icon: Users, label: "Teams", href: "/teams" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } pt-20 flex flex-col z-40`}
    >
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/20 transition-smooth"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="px-4 py-6 border-t border-sidebar-border space-y-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/20 transition-smooth"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">Settings</span>}
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:bg-destructive/10 transition-smooth"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  )
}
