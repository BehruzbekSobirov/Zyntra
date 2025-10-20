"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Search, Plus, Phone, Video, Settings, Smile, Paperclip } from "lucide-react"

interface ChatMessage {
  id: string
  sender: string
  avatar: string
  content: string
  timestamp: string
  isOwn: boolean
  reactions?: string[]
}

interface Conversation {
  id: string
  name: string
  avatar: string
  type: "direct" | "channel"
  lastMessage: string
  unread: number
  isOnline?: boolean
  isTyping?: boolean
}

export default function ChatPage() {
  const { t } = useLanguage()
  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "/designer-avatar.jpg",
      type: "direct",
      lastMessage: "Looks great! Let's discuss the design system tomorrow",
      unread: 2,
      isOnline: true,
    },
    {
      id: "2",
      name: "AI Analytics Team",
      avatar: "/startup-team.jpg",
      type: "channel",
      lastMessage: "Marcus: API endpoints are ready for testing",
      unread: 0,
      isOnline: undefined,
    },
    {
      id: "3",
      name: "Marcus Williams",
      avatar: "/manager-avatar.jpg",
      type: "direct",
      lastMessage: "Great work on the sprint planning!",
      unread: 0,
      isOnline: true,
    },
    {
      id: "4",
      name: "Emma Rodriguez",
      avatar: "/engineer-avatar.jpg",
      type: "direct",
      lastMessage: "Infrastructure is ready for deployment",
      unread: 1,
      isOnline: false,
    },
  ])

  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0])
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "Sarah Chen",
      avatar: "/designer-avatar.jpg",
      content: "Hey! How's the dashboard coming along?",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: "2",
      sender: "You",
      avatar: "/professional-avatar.jpg",
      content: "Pretty good! Just finished the main layout. Want to review it?",
      timestamp: "10:32 AM",
      isOwn: true,
    },
    {
      id: "3",
      sender: "Sarah Chen",
      avatar: "/designer-avatar.jpg",
      content: "Let me check it out. Can you share the link?",
      timestamp: "10:33 AM",
      isOwn: false,
    },
    {
      id: "4",
      sender: "You",
      avatar: "/professional-avatar.jpg",
      content: "https://dashboard-preview.dev - Let me know what you think",
      timestamp: "10:34 AM",
      isOwn: true,
    },
    {
      id: "5",
      sender: "Sarah Chen",
      avatar: "/designer-avatar.jpg",
      content: "Looks great! Let's discuss the design system tomorrow",
      timestamp: "10:45 AM",
      isOwn: false,
    },
  ])

  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: ChatMessage = {
        id: String(messages.length + 1),
        sender: "You",
        avatar: "/professional-avatar.jpg",
        content: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      }
      setMessages([...messages, newMessage])
      setMessageInput("")

      // Simulate typing indicator
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const response: ChatMessage = {
          id: String(messages.length + 2),
          sender: selectedConversation.name,
          avatar: selectedConversation.avatar,
          content: "That sounds great! Let's sync up soon.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isOwn: false,
        }
        setMessages((prev) => [...prev, response])
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-card/50 flex flex-col animate-fade-in-left">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Send className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Zyntra</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 bg-input border-border h-9 transition-smooth focus:border-primary"
            />
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-b border-border">
          <Button className="w-full bg-primary hover:bg-primary/90 transition-smooth hover-lift">
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv, idx) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`w-full p-4 text-left border-b border-border transition-smooth hover-lift ${
                selectedConversation.id === conv.id
                  ? "bg-primary/10 border-l-2 border-l-primary"
                  : "hover:bg-background/50"
              }`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={conv.avatar || "/placeholder.svg"}
                    alt={conv.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {conv.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card animate-pulse"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm">{conv.name}</p>
                    {conv.unread > 0 && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col animate-fade-in-right">
        {/* Chat Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={selectedConversation.avatar || "/placeholder.svg"}
                alt={selectedConversation.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {selectedConversation.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold">{selectedConversation.name}</h2>
              <p className="text-xs text-muted-foreground">
                {selectedConversation.type === "channel"
                  ? "Channel"
                  : selectedConversation.isOnline
                    ? "Online"
                    : "Offline"}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="transition-smooth hover:bg-primary/10">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="transition-smooth hover:bg-primary/10">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="transition-smooth hover:bg-primary/10">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"} animate-fade-in-up`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className={`flex gap-3 max-w-xs ${msg.isOwn ? "flex-row-reverse" : ""}`}>
                <img
                  src={msg.avatar || "/placeholder.svg"}
                  alt={msg.sender}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className={msg.isOwn ? "text-right" : ""}>
                  <p className="text-xs text-muted-foreground mb-1">{msg.sender}</p>
                  <div
                    className={`px-4 py-2 rounded-lg transition-smooth hover-lift ${
                      msg.isOwn
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border text-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="flex gap-3 max-w-xs">
                <img
                  src={selectedConversation.avatar || "/placeholder.svg"}
                  alt={selectedConversation.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{selectedConversation.name}</p>
                  <div className="px-4 py-2 rounded-lg bg-background border border-border">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-border bg-card/50 p-4">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="transition-smooth hover:bg-primary/10">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="bg-input border-border transition-smooth focus:border-primary"
            />
            <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90 transition-smooth hover-lift">
              <Send className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="transition-smooth hover:bg-primary/10">
              <Smile className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
