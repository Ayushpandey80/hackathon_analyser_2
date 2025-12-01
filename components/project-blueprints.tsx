"use client"

import { Sparkles } from "lucide-react"
import type { IdeaData } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ProjectBlueprintsProps {
  ideas: IdeaData[]
}

export function ProjectBlueprints({ ideas }: ProjectBlueprintsProps) {
  const getMetricWidth = (value: number | string | undefined) => {
    if (typeof value === "number") {
      return `${value}%`
    }
    switch (value) {
      case "max":
        return "100%"
      case "high":
        return "80%"
      case "medium":
      case "med":
        return "60%"
      case "low":
        return "40%"
      default:
        return "50%"
    }
  }

  const formatLevel = (value: number | string | undefined) => {
    if (typeof value === "number") {
      if (value >= 80) return "High"
      if (value >= 60) return "Medium"
      if (value >= 40) return "Low"
      return "Very Low"
    }
    if (value === "med") return "Medium"
    if (typeof value === "string") {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return "N/A"
  }

  const getOverallScore = (idea: IdeaData) => {
    if (idea.score !== undefined) return idea.score
    // Calculate from new fields
    return Math.round((idea.feasibilityScore + idea.noveltyScore) / 2)
  }

  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      {/* Section Header */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#E85D3B] rounded-full flex items-center justify-center text-white shrink-0">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <span className="text-base sm:text-lg font-bold text-[#1A1A1A]">Generated Project Blueprints</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {ideas.map((idea, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-[#E8E4DE] transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] mb-1">{idea.title}</h3>
                <div className="text-[10px] sm:text-xs text-[#9B9B9B]">{idea.category || "General"}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl sm:text-[28px] font-bold text-[#E85D3B]">
                  {getOverallScore(idea)}
                  <span className="text-xs sm:text-sm text-[#9B9B9B] font-medium">/100</span>
                </div>
                <div className="text-[9px] sm:text-[10px] text-[#9B9B9B] uppercase tracking-wide">Idea Score</div>
              </div>
            </div>

            {/* Description - use briefDescription if available */}
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-4 sm:mb-5">
              {idea.briefDescription || idea.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <MetricBar
                label="Novelty"
                value={idea.noveltyScore ?? idea.novelty}
                gradientClass="from-[#F5A623] to-[#FF6B35]"
                getWidth={getMetricWidth}
                formatLevel={formatLevel}
              />
              <MetricBar
                label="Feasibility"
                value={idea.feasibilityScore ?? idea.feasibility}
                gradientClass="from-[#4CAF50] to-[#8BC34A]"
                getWidth={getMetricWidth}
                formatLevel={formatLevel}
              />
              <MetricBar
                label="X-Factor"
                value={idea.xfactor ?? Math.round((idea.noveltyScore || 50) * 0.8)}
                gradientClass="from-[#9C27B0] to-[#E91E63]"
                getWidth={getMetricWidth}
                formatLevel={formatLevel}
              />
            </div>

            {/* Tech Stack */}
            {idea.techStack && idea.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                {idea.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#FDF9F3] border border-[#E8E4DE] rounded-md text-[10px] sm:text-xs font-medium font-mono text-[#1A1A1A]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* MVP Requirements - use mvpDescription or legacy mvp array */}
            <div className="bg-[#FDF9F3] rounded-lg p-3 sm:p-4">
              <div className="text-[10px] sm:text-[11px] text-[#9B9B9B] uppercase tracking-wide mb-2 sm:mb-3">
                MVP Requirements
              </div>
              {idea.mvpDescription ? (
                <p className="text-xs sm:text-[13px] text-[#1A1A1A] leading-relaxed">{idea.mvpDescription}</p>
              ) : idea.mvp ? (
                idea.mvp.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-[13px] text-[#1A1A1A] mb-1.5 sm:mb-2 last:mb-0"
                  >
                    <strong className="text-[#E85D3B] font-mono text-[10px] sm:text-xs shrink-0">{item.label}:</strong>
                    <span>{item.task}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#9B9B9B]">No MVP requirements specified</p>
              )}
            </div>

            {idea.noveltyExplanation && (
              <div className="mt-4 pt-4 border-t border-[#E8E4DE]">
                <div className="text-[10px] sm:text-[11px] text-[#9B9B9B] uppercase tracking-wide mb-2">
                  Why It&apos;s Novel
                </div>
                <p className="text-xs sm:text-[13px] text-[#6B6B6B] leading-relaxed">{idea.noveltyExplanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function MetricBar({
  label,
  value,
  gradientClass,
  getWidth,
  formatLevel,
}: {
  label: string
  value: number | string | undefined
  gradientClass: string
  getWidth: (v: number | string | undefined) => string
  formatLevel: (v: number | string | undefined) => string
}) {
  return (
    <div className="flex-1">
      <div className="text-[9px] sm:text-[10px] text-[#9B9B9B] uppercase tracking-wide mb-1">{label}</div>
      <div className="h-1.5 bg-[#E8E4DE] rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500", gradientClass)}
          style={{ width: getWidth(value) }}
        />
      </div>
      <div className="flex justify-between items-center mt-1">
        {typeof value === "number" && <span className="text-[9px] text-[#9B9B9B]">{value}%</span>}
        <span className="text-[10px] sm:text-[11px] font-semibold text-[#6B6B6B] ml-auto">{formatLevel(value)}</span>
      </div>
    </div>
  )
}
