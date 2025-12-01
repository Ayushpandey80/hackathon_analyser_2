import { type NextRequest, NextResponse } from "next/server"
import { sampleHackathonData, sampleIdeas } from "@/lib/sample-data"

export async function GET(request: NextRequest, { params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
  }

  // In production, fetch from database
  // For demo, return sample data
  return NextResponse.json({
    sessionId,
    hackathonData: sampleHackathonData,
    ideas: sampleIdeas,
  })
}
