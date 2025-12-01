import { type NextRequest, NextResponse } from "next/server"
import type { AnalysisStatus } from "@/lib/types"

const sessionProgress: Map<string, { status: AnalysisStatus; startTime: number }> = new Map()

export async function GET(request: NextRequest, { params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
  }

  // Initialize session if not exists
  if (!sessionProgress.has(sessionId)) {
    sessionProgress.set(sessionId, { status: "pending", startTime: Date.now() })
  }

  const session = sessionProgress.get(sessionId)!
  const elapsedSeconds = (Date.now() - session.startTime) / 1000

  // Simulate progress through stages
  let status: AnalysisStatus = "pending"
  let progress = 0
  let message = ""

  if (elapsedSeconds < 2) {
    status = "pending"
    progress = 5
    message = "Initializing analysis..."
  } else if (elapsedSeconds < 6) {
    status = "scraping"
    progress = Math.min(40, 10 + (elapsedSeconds - 2) * 7.5)
    message = "Scraping hackathon data from the source..."
  } else if (elapsedSeconds < 12) {
    status = "generating"
    progress = Math.min(90, 40 + (elapsedSeconds - 6) * 8.3)
    message = "Generating unique project ideas..."
  } else {
    status = "completed"
    progress = 100
    message = "Analysis complete!"
  }

  sessionProgress.set(sessionId, { ...session, status })

  return NextResponse.json({
    sessionId,
    status,
    progress: Math.round(progress),
    message,
    isRefunded: false,
  })
}
