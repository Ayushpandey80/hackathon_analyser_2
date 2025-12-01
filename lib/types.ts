export interface Prize {
  name: string
  amount: string
  description?: string
}

export interface JudgingCriterion {
  name: string
  weight?: string
  description: string
}

export interface HackathonData {
  title: string
  hackathon_name?: string
  tagline?: string
  description: string
  platform: string
  url?: string
  startDate?: string
  endDate?: string
  deadline: string
  registrationDeadline?: string
  duration?: {
    start: string
    end: string
    timezone?: string
  }
  prize_total: string
  prizes: Prize[]
  themes?: string[]
  technologies?: string[]
  tags?: string[]
  requirements?: string
  judgingCriteria?: {
    criteria: JudgingCriterion[]
  }
  judges?: string[]
}

export interface MVPItem {
  label: string
  task: string
}

export interface FeasibilityBreakdown {
  technicalComplexity: number
  timeToMVP: number
  resourceRequirements: number
  riskLevel: number
}

export interface IdeaData {
  title: string
  description: string
  briefDescription?: string
  mvpDescription?: string
  feasibilityScore: number
  feasibilityBreakdown: FeasibilityBreakdown
  noveltyScore: number
  noveltyExplanation: string
  // Legacy fields for backward compatibility
  category?: string
  score?: number
  novelty?: string
  feasibility?: string
  xfactor?: string
  techStack?: string[]
  mvp?: MVPItem[]
}

export type AnalysisStatus = "pending" | "scraping" | "generating" | "completed" | "failed"

export interface CreateAnalysisResponse {
  sessionId: string
  message?: string
}

export interface AnalysisStatusResponse {
  sessionId: string
  status: AnalysisStatus
  progress?: number
  message?: string
  isRefunded?: boolean
  error?: string
}

export interface AnalysisResultResponse {
  sessionId: string
  hackathonData: HackathonData
  ideas: IdeaData[]
}
