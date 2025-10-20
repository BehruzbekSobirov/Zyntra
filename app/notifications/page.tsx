"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, MessageSquare, Users, CheckCircle, AlertCircle, Heart, X, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Notification {
  id: string
  type: "message" | "mention" | "task" | "team" | "match"
  title: string
  description: string
  avatar: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      title: "Sarah Chen sent you a message",
      description: "Looks great! Let's discuss the design system tomorrow",
      avatar: "/designer-avatar.jpg",
      timestamp: "5 minutes ago",
      read: false,
      actionUrl: "/chat",
    },
    {
      id: "2",
      type: "mention",
      title: "You were mentioned in AI Analytics Team",
      description: "Marcus mentioned you in a discussion about API endpoints",
      avatar: "/manager-avatar.jpg",
      timestamp: "15 minutes ago",
      read: false,
      actionUrl: "/chat",
    },
    {
      id: "3",
      type: "task",
      title: "Task assigned to you",
      description: "Build API endpoints - Due Feb 10, 2025",
      avatar: "/startup-team.jpg",
      timestamp: "1 hour ago",
      read: false,
      actionUrl: "/projects/1",
    },
    {
      id: "4",
      type: "match",
      title: "New match found!",
      description: "Emma Rodriguez is a 92% match for your team",
      avatar: "/engineer-avatar.jpg",
      timestamp: "2 hours ago",
      read: true,
      actionUrl: "/matches",
    },
    {
      id: "5",
      type: "team",
      title: "You were added to a team",
      description: "Alex Johnson added you to Mobile Fitness App team",
      avatar: "/mobile-team.jpg",
      timestamp: "3 hours ago",
      read: true,
      actionUrl: "/teams/2",
    },
    {
      id: "6",
      type: "message",
      title: "Emma Rodriguez sent you a message",
      description: "Infrastructure is ready for deployment",
      avatar: "/engineer-avatar.jpg",
      timestamp: "4 hours ago",
      read: true,
      actionUrl: "/chat",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="w-5 h-5 text-blue-500" />
      case "mention":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "task":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "team":
        return <Users className="w-5 h-5 text-purple-500" />
      case "match":
        return <Heart className="w-5 h-5 text-red-500" />
      default:
        return <Bell className="w-5 h-5 text-primary" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))}
            >
              Mark all as read
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Bell className="w-8 h-8 text-primary" />
            Notifications
          </h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          {/* All Notifications */}
          <TabsContent value="all" className="space-y-3">
            {notifications.length === 0 ? (
              <Card className="p-12 bg-card border-border text-center">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No notifications</p>
              </Card>
            ) : (
              notifications.map((notif) => (
                <Card
                  key={notif.id}
                  className={`p-4 bg-card border-border hover:border-primary/50 transition cursor-pointer ${
                    !notif.read ? "border-primary/50 bg-primary/5" : ""
                  }`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getNotificationIcon(notif.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold">{notif.title}</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            dismissNotification(notif.id)
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notif.description}</p>
                      <p className="text-xs text-muted-foreground">{notif.timestamp}</p>
                    </div>
                    {!notif.read && <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>}
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Unread Notifications */}
          <TabsContent value="unread" className="space-y-3">
            {notifications.filter((n) => !n.read).length === 0 ? (
              <Card className="p-12 bg-card border-border text-center">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50 text-green-500" />
                <p className="text-muted-foreground">All notifications read!</p>
              </Card>
            ) : (
              notifications
                .filter((n) => !n.read)
                .map((notif) => (
                  <Card
                    key={notif.id}
                    className="p-4 bg-card border-border hover:border-primary/50 transition cursor-pointer border-primary/50 bg-primary/5"
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">{getNotificationIcon(notif.type)}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">{notif.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{notif.description}</p>
                        <p className="text-xs text-muted-foreground">{notif.timestamp}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    </div>
                  </Card>
                ))
            )}
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages" className="space-y-3">
            {notifications
              .filter((n) => n.type === "message" || n.type === "mention")
              .map((notif) => (
                <Card
                  key={notif.id}
                  className={`p-4 bg-card border-border hover:border-primary/50 transition cursor-pointer ${
                    !notif.read ? "border-primary/50 bg-primary/5" : ""
                  }`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getNotificationIcon(notif.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{notif.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{notif.description}</p>
                      <p className="text-xs text-muted-foreground">{notif.timestamp}</p>
                    </div>
                  </div>
                </Card>
              ))}
          </TabsContent>

          {/* Tasks */}
          <TabsContent value="tasks" className="space-y-3">
            {notifications
              .filter((n) => n.type === "task")
              .map((notif) => (
                <Card
                  key={notif.id}
                  className={`p-4 bg-card border-border hover:border-primary/50 transition cursor-pointer ${
                    !notif.read ? "border-primary/50 bg-primary/5" : ""
                  }`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getNotificationIcon(notif.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{notif.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{notif.description}</p>
                      <p className="text-xs text-muted-foreground">{notif.timestamp}</p>
                    </div>
                  </div>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
