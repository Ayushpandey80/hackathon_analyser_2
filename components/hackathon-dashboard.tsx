"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AnalyzerForm } from "@/components/analyzer-form"
import { AnalysisReport } from "@/components/analysis-report"
import { ProjectBlueprints } from "@/components/project-blueprints"
import { AnalysisLoader } from "@/components/analysis-loader"
import { ErrorBanner } from "@/components/error-banner"
import { Toast, type ToastType } from "@/components/toast"
import type { HackathonData, IdeaData } from "@/lib/types"

type DashboardPhase = "form" | "processing" | "results"

interface ToastState {
  message: string
  type: ToastType
}

async function safeJsonParse(response: Response): Promise<{ ok: boolean; data?: unknown; error?: string }> {
  const contentType = response.headers.get("content-type")
  console.log("[v0] Response content-type:", contentType)

  // First get the text to see what we're dealing with
  const text = await response.text()
  console.log("[v0] Response body preview:", text.substring(0, 200))

  // Check if it looks like HTML
  if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
    return { ok: false, error: "Server returned HTML instead of JSON. API route may not exist." }
  }

  // Try to parse as JSON
  try {
    const data = JSON.parse(text)
    return { ok: true, data }
  } catch {
    return { ok: false, error: `Failed to parse JSON: ${text.substring(0, 100)}` }
  }
}

export function HackathonDashboard() {
  const searchParams = useSearchParams()

  const [phase, setPhase] = useState<DashboardPhase>("form")
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isStarting, setIsStarting] = useState(false)
  const [analysisData, setAnalysisData] = useState<HackathonData | null>(null)
  const [ideas, setIdeas] = useState<IdeaData[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [error, setError] = useState<{ message: string; isRefunded: boolean } | null>(null)
  const [toast, setToast] = useState<ToastState | null>(null)

  // Phase 3: Resume capability - check URL params on mount
  useEffect(() => {
    const urlSessionId = searchParams.get("sessionId")
    const storedSessionId = typeof window !== "undefined" ? localStorage.getItem("analysisSessionId") : null

    const activeSessionId = urlSessionId || storedSessionId
    console.log("[v0] Dashboard mounted, urlSessionId:", urlSessionId, "storedSessionId:", storedSessionId)

    if (activeSessionId) {
      setSessionId(activeSessionId)
      setPhase("processing")
    }
  }, [searchParams])

  // Phase 1: Start analysis
  const handleStartAnalysis = async (url: string, context: string) => {
    setIsStarting(true)
    setError(null)
    console.log("[v0] Starting analysis for URL:", url)

    try {
      // Step 2: API Call
      console.log("[v0] Calling /api/analysis/create")
      const response = await fetch("/api/analysis/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, context }),
      })

      console.log("[v0] Create response status:", response.status)
      console.log("[v0] Create response headers:", Object.fromEntries(response.headers.entries()))

      const result = await safeJsonParse(response)

      if (!result.ok) {
        throw new Error(result.error || "Failed to parse response")
      }

      if (!response.ok) {
        const errorData = result.data as { error?: string }
        throw new Error(errorData?.error || `API error: ${response.status}`)
      }

      const data = result.data as { sessionId: string; message?: string }
      console.log("[v0] Create response data:", data)

      const newSessionId = data.sessionId

      // Step 3: Store session ID
      localStorage.setItem("analysisSessionId", newSessionId)
      console.log("[v0] Stored sessionId in localStorage:", newSessionId)

      // Step 5: Show toast notification
      setToast({ message: data.message || "Analysis started. 1 credit deducted.", type: "success" })

      setSessionId(newSessionId)
      setPhase("processing")
    } catch (err) {
      console.error("[v0] Start analysis error:", err)
      setToast({ message: err instanceof Error ? err.message : "Failed to start analysis", type: "error" })
    } finally {
      setIsStarting(false)
    }
  }

  // Phase 2 → 3: Handle completion
  const handleAnalysisComplete = useCallback(async () => {
    if (!sessionId) return
    console.log("[v0] Analysis complete, fetching results for sessionId:", sessionId)

    try {
      // Fetch full results
      const apiUrl = `/api/analysis/${sessionId}`
      console.log("[v0] Fetching from:", apiUrl)
      const response = await fetch(apiUrl)

      console.log("[v0] Results response status:", response.status)

      const result = await safeJsonParse(response)

      if (!result.ok) {
        throw new Error(result.error || "Failed to parse results")
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch results: ${response.status}`)
      }

      const data = result.data as { hackathonData: HackathonData; ideas: IdeaData[] }
      console.log("[v0] Results data:", data)

      setAnalysisData(data.hackathonData)
      setIdeas(data.ideas)
      setPhase("results")

      // Clear stored session
      localStorage.removeItem("analysisSessionId")

      setToast({ message: "Analysis complete! Your ideas are ready.", type: "success" })
    } catch (err) {
      console.error("[v0] Fetch results error:", err)
      setError({
        message: err instanceof Error ? err.message : "Failed to load results",
        isRefunded: false,
      })
      setPhase("form")
    }
  }, [sessionId])

  // Phase 3: Handle failure
  const handleAnalysisError = useCallback((message: string, isRefunded: boolean) => {
    console.log("[v0] Analysis error:", message, "isRefunded:", isRefunded)
    setError({ message, isRefunded })
    setPhase("form")
    localStorage.removeItem("analysisSessionId")

    if (isRefunded) {
      setToast({ message: "Analysis failed - your credit has been refunded.", type: "info" })
    }
  }, [])

  // Reset to form
  const handleNewAnalysis = () => {
    setPhase("form")
    setSessionId(null)
    setAnalysisData(null)
    setIdeas([])
    setError(null)
    window.history.replaceState({}, "", window.location.pathname)
  }

  return (
    <div className="flex min-h-screen bg-[#FDF9F3]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 ml-0 lg:ml-[260px] p-4 sm:p-6 lg:p-10">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Error Banner */}
        {error && (
          <ErrorBanner message={error.message} isRefunded={error.isRefunded} onDismiss={() => setError(null)} />
        )}

        {/* Phase 1: Form */}
        {phase === "form" && <AnalyzerForm onStartAnalysis={handleStartAnalysis} isStarting={isStarting} />}

        {/* Phase 2: Processing */}
        {phase === "processing" && sessionId && (
          <AnalysisLoader sessionId={sessionId} onComplete={handleAnalysisComplete} onError={handleAnalysisError} />
        )}

        {/* Phase 3: Results */}
        {phase === "results" && (
          <>
            {/* New Analysis Button */}
            <div className="mb-4 flex justify-end">
              <button
                onClick={handleNewAnalysis}
                className="px-4 py-2 text-sm font-medium text-[#E85D3B] hover:bg-[#FFF0EB] rounded-lg transition-colors"
              >
                + New Analysis
              </button>
            </div>

            {analysisData && <AnalysisReport data={analysisData} />}
            {ideas.length > 0 && <ProjectBlueprints ideas={ideas} />}
          </>
        )}
      </main>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
