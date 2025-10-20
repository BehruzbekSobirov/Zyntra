"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"

export type ToastType = "success" | "error" | "info"

interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

let toastId = 0
const toasts: Toast[] = []
const listeners: ((toasts: Toast[]) => void)[] = []

export function useToast() {
  const [toastList, setToastList] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (newToasts: Toast[]) => {
      setToastList(newToasts)
    }
    listeners.push(listener)
    return () => {
      listeners.splice(listeners.indexOf(listener), 1)
    }
  }, [])

  const addToast = (message: string, type: ToastType = "info", duration = 3000) => {
    const id = String(toastId++)
    const toast: Toast = { id, message, type, duration }
    toasts.push(toast)
    listeners.forEach((l) => l([...toasts]))

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }

  const removeToast = (id: string) => {
    const index = toasts.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.splice(index, 1)
      listeners.forEach((l) => l([...toasts]))
    }
  }

  return { addToast, removeToast, toasts: toastList }
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-fade-in-up pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-card shadow-lg"
        >
          {toast.type === "success" && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
          {toast.type === "error" && <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />}
          {toast.type === "info" && <Info className="w-5 h-5 text-primary flex-shrink-0" />}

          <p className="text-sm font-medium">{toast.message}</p>

          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
