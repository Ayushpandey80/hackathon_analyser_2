"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Loader2, Globe, Sparkles, CheckCircle2, AlertCircle } from "lucide-react"
import type { AnalysisStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

interface AnalysisLoaderProps {
  sessionId: string
  onComplete: () => void
  onError: (message: string, isRefunded: boolean) => void
}

const statusConfig: Record<AnalysisStatus, { icon: React.ReactNode; label: string; estimate: string }> = {
  pending: {
    icon: <Loader2 className="w-5 h-5 animate-spin" />,
    label: "Initializing analysis...",
    estimate: "Starting up",
  },
  scraping: {
    icon: <Globe className="w-5 h-5 animate-pulse" />,
    label: "Scraping hackathon data from the source...",
    estimate: "Est. wait: 60-120 seconds",
  },
  generating: {
    icon: <Sparkles className="w-5 h-5 animate-pulse" />,
    label: "Generating unique project ideas...",
    estimate: "Est. wait: 30-60 seconds",
  },
  completed: {
    icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    label: "Analysis complete!",
    estimate: "",
  },
  failed: {
    icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
    label: "Analysis failed",
    estimate: "",
  },
}

export function AnalysisLoader({ sessionId, onComplete, onError }: AnalysisLoaderProps) {
  const [status, setStatus] = useState<AnalysisStatus>("pending")
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("")
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    if (!sessionId) return

    // Reset on new session
    hasCompletedRef.current = false
    console.log("[v0] AnalysisLoader started polling for sessionId:", sessionId)

    const pollStatus = async () => {
      try {
        const apiUrl = `/api/analysis/${sessionId}/status`
        console.log("[v0] Polling status from:", apiUrl)
        const res = await fetch(apiUrl)

        console.log("[v0] Status response:", res.status, res.statusText)

        if (!res.ok) {
          const text = await res.text()
          console.error("[v0] Status error response:", text.substring(0, 200))
          throw new Error(`Failed to fetch status: ${res.status}`)
        }

        const contentType = res.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text()
          console.error("[v0] Status invalid content-type:", contentType, "body:", text.substring(0, 200))
          throw new Error("Invalid response format from server")
        }

        const data = await res.json()
        console.log("[v0] Status data:", data)

        setStatus(data.status)
        setProgress(data.progress || 0)
        setMessage(data.message || "")

        if (data.status === "completed" && !hasCompletedRef.current) {
          hasCompletedRef.current = true
          console.log("[v0] Status is completed, calling onComplete")
          onComplete()
        } else if (data.status === "failed") {
          console.log("[v0] Status is failed, calling onError")
          onError(data.error || "Analysis failed", data.isRefunded || false)
        }
      } catch (error) {
        console.error("[v0] Polling error:", error)
        // Continue polling even on error - might be temporary
      }
    }

    // Poll immediately
    pollStatus()

    // Then poll every 2 seconds
    const interval = setInterval(() => {
      if (status !== "completed" && status !== "failed") {
        pollStatus()
      }
    }, 2000)

    return () => {
      console.log("[v0] Cleaning up polling interval")
      clearInterval(interval)
    }
  }, [sessionId, onComplete, onError]) // removed status from deps to prevent infinite loop

  const config = statusConfig[status]

  return (
    <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 lg:mb-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        {/* Animated Icon */}
        <div className="w-16 h-16 rounded-full bg-[#FDF9F3] flex items-center justify-center mb-4 text-[#E85D3B]">
          {config.icon}
        </div>

        {/* Status Label */}
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{config.label}</h3>

        {/* Estimate */}
        {config.estimate && <p className="text-sm text-[#9B9B9B] mb-6">{config.estimate}</p>}

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-4">
          <div className="h-2 bg-[#E8E4DE] rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500 ease-out",
                status === "failed" ? "bg-amber-500" : "bg-gradient-to-r from-[#E85D3B] to-[#D4956A]",
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-[#9B9B9B]">
            <span>{progress}% complete</span>
            <span>Session: {sessionId.slice(-8)}</span>
          </div>
        </div>

        {/* Current Step Indicator */}
        <div className="flex items-center gap-2 sm:gap-4 mt-4">
          <StepIndicator
            label="Scrape"
            active={status === "scraping"}
            completed={["generating", "completed"].includes(status)}
          />
          <div className="w-8 h-0.5 bg-[#E8E4DE]" />
          <StepIndicator label="Generate" active={status === "generating"} completed={status === "completed"} />
          <div className="w-8 h-0.5 bg-[#E8E4DE]" />
          <StepIndicator label="Complete" active={false} completed={status === "completed"} />
        </div>
      </div>
    </section>
  )
}

function StepIndicator({ label, active, completed }: { label: string; active: boolean; completed: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
          completed && "bg-green-500 text-white",
          active && "bg-[#E85D3B] text-white animate-pulse",
          !active && !completed && "bg-[#E8E4DE] text-[#9B9B9B]",
        )}
      >
        {completed ? <CheckCircle2 className="w-4 h-4" /> : active ? <Loader2 className="w-4 h-4 animate-spin" /> : ""}
      </div>
      <span
        className={cn("text-[10px] sm:text-xs", active || completed ? "text-[#1A1A1A] font-medium" : "text-[#9B9B9B]")}
      >
        {label}
      </span>
    </div>
  )
}
