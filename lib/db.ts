// Mock database with localStorage persistence
import { v4 as uuidv4 } from "uuid"

export interface User {
  id: string
  email: string
  password?: string
  name: string
  title: string
  bio: string
  skills: string[]
  experience: number
  goals: string[]
  workStyle: string
  avatar: string
  createdAt: Date
  provider?: string
}

export interface Team {
  id: string
  name: string
  description: string
  members: string[]
  createdBy: string
  createdAt: Date
  status: "active" | "archived"
}

export interface Match {
  id: string
  userId1: string
  userId2: string
  score: number
  compatibility: {
    skills: number
    goals: number
    workStyle: number
    experience: number
  }
  createdAt: Date
}

export interface Message {
  id: string
  senderId: string
  recipientId: string
  content: string
  timestamp: Date
  read: boolean
}

export interface Project {
  id: string
  name: string
  description: string
  teamId: string
  status: "planning" | "active" | "completed"
  tasks: Task[]
  createdAt: Date
}

export interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
  status: "todo" | "in-progress" | "completed"
  dueDate: Date
}

class MockDatabase {
  private users: Map<string, User> = new Map()
  private teams: Map<string, Team> = new Map()
  private matches: Map<string, Match> = new Map()
  private messages: Map<string, Message> = new Map()
  private projects: Map<string, Project> = new Map()
  private currentUserId: string | null = null

  constructor() {
    this.loadFromStorage()
    this.initializeSampleData()
  }

  private loadFromStorage() {
    if (typeof window === "undefined") return
    try {
      const stored = localStorage.getItem("zyntra_db")
      if (stored) {
        const data = JSON.parse(stored)
        this.users = new Map(data.users || [])
        this.teams = new Map(data.teams || [])
        this.matches = new Map(data.matches || [])
        this.messages = new Map(data.messages || [])
        this.projects = new Map(data.projects || [])
        this.currentUserId = data.currentUserId
      }
    } catch (error) {
      console.error("Failed to load from storage:", error)
    }
  }

  private saveToStorage() {
    if (typeof window === "undefined") return
    try {
      const data = {
        users: Array.from(this.users.entries()),
        teams: Array.from(this.teams.entries()),
        matches: Array.from(this.matches.entries()),
        messages: Array.from(this.messages.entries()),
        projects: Array.from(this.projects.entries()),
        currentUserId: this.currentUserId,
      }
      localStorage.setItem("zyntra_db", JSON.stringify(data))
    } catch (error) {
      console.error("Failed to save to storage:", error)
    }
  }

  private initializeSampleData() {
    if (this.users.size === 0) {
      const sampleUsers: User[] = [
        {
          id: uuidv4(),
          email: "alice@zyntra.com",
          password: "password123",
          name: "Alice Johnson",
          title: "Full Stack Developer",
          bio: "Passionate about building scalable web applications",
          skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
          experience: 5,
          goals: ["Build AI products", "Lead a team"],
          workStyle: "Collaborative",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          email: "bob@zyntra.com",
          password: "password123",
          name: "Bob Smith",
          title: "Product Designer",
          bio: "Creating beautiful and intuitive user experiences",
          skills: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
          experience: 4,
          goals: ["Create innovative products", "Mentor designers"],
          workStyle: "Creative",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          email: "carol@zyntra.com",
          password: "password123",
          name: "Carol Davis",
          title: "Business Strategist",
          bio: "Helping startups scale and grow",
          skills: ["Business Strategy", "Marketing", "Sales", "Analytics"],
          experience: 6,
          goals: ["Build successful startups", "Invest in tech"],
          workStyle: "Strategic",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
          createdAt: new Date(),
        },
      ]

      sampleUsers.forEach((user) => this.users.set(user.id, user))
      this.currentUserId = sampleUsers[0].id
      this.saveToStorage()
    }
  }

  // User methods
  signup(email: string, password: string, name: string): User {
    const existingUser = Array.from(this.users.values()).find((u) => u.email === email)
    if (existingUser) throw new Error("User already exists")

    const user: User = {
      id: uuidv4(),
      email,
      password,
      name,
      title: "",
      bio: "",
      skills: [],
      experience: 0,
      goals: [],
      workStyle: "",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      createdAt: new Date(),
    }

    this.users.set(user.id, user)
    this.currentUserId = user.id
    this.saveToStorage()
    return user
  }

  oauthSignup(email: string, name: string, provider: string, avatar: string): User {
    const existingUser = Array.from(this.users.values()).find((u) => u.email === email)
    if (existingUser) {
      this.currentUserId = existingUser.id
      this.saveToStorage()
      return existingUser
    }

    const user: User = {
      id: uuidv4(),
      email,
      name,
      title: "",
      bio: "",
      skills: [],
      experience: 0,
      goals: [],
      workStyle: "",
      avatar,
      createdAt: new Date(),
      provider,
    }

    this.users.set(user.id, user)
    this.currentUserId = user.id
    this.saveToStorage()
    return user
  }

  login(email: string, password: string): User {
    const user = Array.from(this.users.values()).find((u) => u.email === email && u.password === password)
    if (!user) throw new Error("Invalid credentials")

    this.currentUserId = user.id
    this.saveToStorage()
    return user
  }

  logout() {
    this.currentUserId = null
    this.saveToStorage()
  }

  getCurrentUser(): User | null {
    if (!this.currentUserId) return null
    return this.users.get(this.currentUserId) || null
  }

  getUser(id: string): User | null {
    return this.users.get(id) || null
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values())
  }

  updateUser(id: string, updates: Partial<User>): User {
    const user = this.users.get(id)
    if (!user) throw new Error("User not found")

    const updated = { ...user, ...updates }
    this.users.set(id, updated)
    this.saveToStorage()
    return updated
  }

  // Team methods
  createTeam(name: string, description: string): Team {
    const team: Team = {
      id: uuidv4(),
      name,
      description,
      members: [this.currentUserId!],
      createdBy: this.currentUserId!,
      createdAt: new Date(),
      status: "active",
    }

    this.teams.set(team.id, team)
    this.saveToStorage()
    return team
  }

  getTeam(id: string): Team | null {
    return this.teams.get(id) || null
  }

  getAllTeams(): Team[] {
    return Array.from(this.teams.values())
  }

  addTeamMember(teamId: string, userId: string): Team {
    const team = this.teams.get(teamId)
    if (!team) throw new Error("Team not found")

    if (!team.members.includes(userId)) {
      team.members.push(userId)
      this.saveToStorage()
    }

    return team
  }

  // Message methods
  sendMessage(recipientId: string, content: string): Message {
    const message: Message = {
      id: uuidv4(),
      senderId: this.currentUserId!,
      recipientId,
      content,
      timestamp: new Date(),
      read: false,
    }

    this.messages.set(message.id, message)
    this.saveToStorage()
    return message
  }

  getConversation(userId: string): Message[] {
    return Array.from(this.messages.values())
      .filter(
        (m) =>
          (m.senderId === this.currentUserId && m.recipientId === userId) ||
          (m.senderId === userId && m.recipientId === this.currentUserId),
      )
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
  }

  getAllMessages(): Message[] {
    return Array.from(this.messages.values())
  }

  // Project methods
  createProject(name: string, description: string, teamId: string): Project {
    const project: Project = {
      id: uuidv4(),
      name,
      description,
      teamId,
      status: "planning",
      tasks: [],
      createdAt: new Date(),
    }

    this.projects.set(project.id, project)
    this.saveToStorage()
    return project
  }

  getProject(id: string): Project | null {
    return this.projects.get(id) || null
  }

  getAllProjects(): Project[] {
    return Array.from(this.projects.values())
  }

  addTask(projectId: string, task: Omit<Task, "id">): Project {
    const project = this.projects.get(projectId)
    if (!project) throw new Error("Project not found")

    const newTask: Task = {
      ...task,
      id: uuidv4(),
    }

    project.tasks.push(newTask)
    this.saveToStorage()
    return project
  }

  // Match methods
  calculateMatches(): Match[] {
    const currentUser = this.getCurrentUser()
    if (!currentUser) return []

    const otherUsers = Array.from(this.users.values()).filter((u) => u.id !== currentUser.id)
    const matches: Match[] = []

    otherUsers.forEach((user) => {
      const skillsMatch = this.calculateSkillsMatch(currentUser.skills, user.skills)
      const goalsMatch = this.calculateGoalsMatch(currentUser.goals, user.goals)
      const workStyleMatch = currentUser.workStyle === user.workStyle ? 100 : 60
      const experienceMatch = Math.abs(currentUser.experience - user.experience) <= 2 ? 100 : 70

      const score = Math.round((skillsMatch + goalsMatch + workStyleMatch + experienceMatch) / 4)

      const match: Match = {
        id: uuidv4(),
        userId1: currentUser.id,
        userId2: user.id,
        score,
        compatibility: {
          skills: skillsMatch,
          goals: goalsMatch,
          workStyle: workStyleMatch,
          experience: experienceMatch,
        },
        createdAt: new Date(),
      }

      matches.push(match)
    })

    return matches.sort((a, b) => b.score - a.score)
  }

  private calculateSkillsMatch(skills1: string[], skills2: string[]): number {
    if (skills1.length === 0 || skills2.length === 0) return 50
    const common = skills1.filter((s) => skills2.includes(s)).length
    return Math.round((common / Math.max(skills1.length, skills2.length)) * 100)
  }

  private calculateGoalsMatch(goals1: string[], goals2: string[]): number {
    if (goals1.length === 0 || goals2.length === 0) return 50
    const common = goals1.filter((g) => goals2.includes(g)).length
    return Math.round((common / Math.max(goals1.length, goals2.length)) * 100)
  }
}

export const db = new MockDatabase()
