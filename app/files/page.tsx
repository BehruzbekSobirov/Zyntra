"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  File,
  ImageIcon,
  Video,
  Music,
  Archive,
  MoreVertical,
  Download,
  Share2,
  FolderOpen,
  Grid,
  List,
} from "lucide-react"
import Link from "next/link"

interface StorageFile {
  id: string
  name: string
  type: "document" | "image" | "video" | "audio" | "archive"
  size: string
  uploadedDate: string
  uploadedBy: string
  shared: boolean
  thumbnail?: string
}

export default function FilesPage() {
  const [files] = useState<StorageFile[]>([
    {
      id: "1",
      name: "Dashboard Mockup.figma",
      type: "document",
      size: "2.4 MB",
      uploadedDate: "2025-02-10",
      uploadedBy: "Sarah Chen",
      shared: true,
    },
    {
      id: "2",
      name: "Project Presentation.pdf",
      type: "document",
      size: "5.1 MB",
      uploadedDate: "2025-02-08",
      uploadedBy: "Marcus Williams",
      shared: true,
    },
    {
      id: "3",
      name: "Team Photo.jpg",
      type: "image",
      size: "3.2 MB",
      uploadedDate: "2025-02-05",
      uploadedBy: "Alex Johnson",
      shared: false,
      thumbnail: "/startup-team.jpg",
    },
    {
      id: "4",
      name: "Demo Video.mp4",
      type: "video",
      size: "125 MB",
      uploadedDate: "2025-02-01",
      uploadedBy: "Sarah Chen",
      shared: true,
    },
    {
      id: "5",
      name: "Database Backup.zip",
      type: "archive",
      size: "450 MB",
      uploadedDate: "2025-01-28",
      uploadedBy: "Emma Rodriguez",
      shared: false,
    },
    {
      id: "6",
      name: "Brand Guidelines.pdf",
      type: "document",
      size: "8.7 MB",
      uploadedDate: "2025-01-25",
      uploadedBy: "Sarah Chen",
      shared: true,
    },
  ])

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedType, setSelectedType] = useState<string>("all")

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-6 h-6 text-blue-500" />
      case "video":
        return <Video className="w-6 h-6 text-red-500" />
      case "audio":
        return <Music className="w-6 h-6 text-purple-500" />
      case "archive":
        return <Archive className="w-6 h-6 text-yellow-500" />
      default:
        return <File className="w-6 h-6 text-gray-500" />
    }
  }

  const filteredFiles = selectedType === "all" ? files : files.filter((f) => f.type === selectedType)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Zyntra</span>
          </Link>
          <Button className="bg-primary hover:bg-primary/90">
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Files & Storage</h1>
          <p className="text-muted-foreground">Manage and share your team files</p>
        </div>

        {/* Storage Stats */}
        <Card className="p-6 bg-card border-border mb-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Storage Used</p>
              <p className="text-2xl font-bold">2.4 GB</p>
              <p className="text-xs text-muted-foreground mt-1">of 10 GB</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Files</p>
              <p className="text-2xl font-bold">{files.length}</p>
              <p className="text-xs text-muted-foreground mt-1">across all types</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Shared Files</p>
              <p className="text-2xl font-bold">{files.filter((f) => f.shared).length}</p>
              <p className="text-xs text-muted-foreground mt-1">with team members</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Storage Progress</p>
              <div className="w-full bg-background/50 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                  style={{ width: "24%" }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">24% used</p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="all" onClick={() => setSelectedType("all")}>
                All Files
              </TabsTrigger>
              <TabsTrigger value="image" onClick={() => setSelectedType("image")}>
                <ImageIcon className="w-4 h-4 mr-2" />
                Images
              </TabsTrigger>
              <TabsTrigger value="video" onClick={() => setSelectedType("video")}>
                <Video className="w-4 h-4 mr-2" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="document" onClick={() => setSelectedType("document")}>
                <File className="w-4 h-4 mr-2" />
                Documents
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-primary hover:bg-primary/90" : "border-border bg-transparent"}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-primary hover:bg-primary/90" : "border-border bg-transparent"}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <TabsContent value={selectedType} className="space-y-4">
            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFiles.map((file) => (
                  <Card
                    key={file.id}
                    className="p-4 bg-card border-border hover:border-primary/50 transition group cursor-pointer"
                  >
                    <div className="mb-4">
                      {file.thumbnail ? (
                        <img
                          src={file.thumbnail || "/placeholder.svg"}
                          alt={file.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-32 bg-background/50 rounded-lg flex items-center justify-center">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm mb-1 truncate">{file.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{file.size}</p>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <Button size="sm" variant="outline" className="flex-1 border-border bg-transparent">
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-border bg-transparent">
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFiles.map((file) => (
                  <Card
                    key={file.id}
                    className="p-4 bg-card border-border hover:border-primary/50 transition group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm">{file.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {file.size} • Uploaded by {file.uploadedBy} on{" "}
                            {new Date(file.uploadedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.shared && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Shared</span>
                        )}
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
