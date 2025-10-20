import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ToastContainer } from "@/components/toast-notification"
import { AuthProvider } from "@/lib/auth-context"
import { LanguageProvider } from "@/lib/language-context"
import { AISupportChat } from "@/components/ai-support-chat"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZYNTRA - Premium AI Collaboration Platform",
  description:
    "Build extraordinary teams with AI-powered matching, real-time collaboration, and intelligent team management.",
  keywords: ["AI matching", "team collaboration", "startup"],
  authors: [{ name: "ZYNTRA Team" }],
  openGraph: {
    title: "ZYNTRA - AI Team Collaboration",
    description: "Find your perfect team members with advanced AI matching",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#a855f7" />
      </head>
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          <AuthProvider>
            {children}
            <AISupportChat />
            <ToastContainer />
          </AuthProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
