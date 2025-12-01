"use client"

import type React from "react"

import { useState } from "react"
import { FileText, Globe, Link2, ChevronDown, Star, FileCheck, PenLine, Users, Trophy } from "lucide-react"
import type { HackathonData } from "@/lib/types"
import { cn } from "@/lib/utils"

interface AnalysisReportProps {
  data: HackathonData
}

export function AnalysisReport({ data }: AnalysisReportProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [isDescExpanded, setIsDescExpanded] = useState(false)

  const toggleSection = (section: string) => {
    const newSet = new Set(expandedSections)
    if (newSet.has(section)) {
      newSet.delete(section)
    } else {
      newSet.add(section)
    }
    setExpandedSections(newSet)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const getDaysRemaining = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return days > 0 ? `${days} days remaining` : "Deadline passed"
  }

  const getDuration = () => {
    if (data.duration) {
      const start = new Date(data.duration.start)
      const end = new Date(data.duration.end)
      const hours = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60))
      return { hours: `${hours}h`, range: `${formatDate(data.duration.start)} - ${formatDate(data.duration.end)}` }
    }
    return { hours: "48h", range: "TBA" }
  }

  const duration = getDuration()

  return (
    <section className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#E8E4DE]">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] rounded-xl flex items-center justify-center text-white shrink-0">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-[22px] font-bold text-[#1A1A1A] mb-1 truncate">{data.title}</h2>
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-[#6B6B6B] bg-[#FDF9F3] px-2 sm:px-3 py-1 rounded-full">
              <Globe className="w-3 h-3" />
              {data.platform}
            </span>
          </div>
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-[13px] font-medium bg-[#FDF9F3] border border-[#E8E4DE] text-[#1A1A1A] hover:bg-[#E8E4DE] transition-colors shrink-0"
        >
          <Link2 className="w-3.5 h-3.5" />
          Copy Link
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-7">
        <StatCard label="Total Prize Pool" value={data.prize_total} sub="Multiple tracks" accentColor="bg-[#4CAF50]" />
        <StatCard
          label="Submission Deadline"
          value={formatDate(data.deadline)}
          sub={getDaysRemaining(data.deadline)}
          accentColor="bg-[#E85D3B]"
          smallValue
        />
        <StatCard label="Duration" value={duration.hours} sub={duration.range} accentColor="bg-[#3B82F6]" />
        <StatCard
          label="Judges"
          value={data.judges?.length.toString() || "0"}
          sub="Industry experts"
          accentColor="bg-[#8B5CF6]"
        />
      </div>

      {/* Tagline */}
      {data.tagline && (
        <div className="bg-gradient-to-r from-[#FFF0EB] to-[#FFF5F0] rounded-xl p-3 sm:p-4 mb-5 sm:mb-6 border-l-4 border-[#E85D3B]">
          <p className="text-sm sm:text-[15px] font-medium text-[#1A1A1A] italic">&ldquo;{data.tagline}&rdquo;</p>
        </div>
      )}

      {/* Description */}
      <div className="mb-5 sm:mb-6">
        <div className="text-xs sm:text-[13px] font-semibold text-[#6B6B6B] mb-2">About This Hackathon</div>
        <p className={cn("text-sm text-[#1A1A1A] leading-relaxed transition-all", !isDescExpanded && "line-clamp-3")}>
          {data.description}
        </p>
        <button
          onClick={() => setIsDescExpanded(!isDescExpanded)}
          className="mt-2 text-[13px] font-medium text-[#E85D3B] hover:underline flex items-center gap-1"
        >
          Show {isDescExpanded ? "less" : "more"}
          <ChevronDown className={cn("w-3 h-3 transition-transform", isDescExpanded && "rotate-180")} />
        </button>
      </div>

      {/* Collapsible Sections */}
      <div className="flex flex-col gap-3">
        {/* Prizes */}
        <CollapsibleSection
          title="Prizes & Rewards"
          icon={<Trophy className="w-4 h-4" />}
          iconBg="bg-[#E8F5E9] text-[#4CAF50]"
          badge={`${data.prizes.length} prizes`}
          isOpen={expandedSections.has("prizes")}
          onToggle={() => toggleSection("prizes")}
        >
          <div className="flex flex-col gap-3">
            {data.prizes.map((prize, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 bg-white p-3 sm:p-3.5 rounded-lg border border-[#E8E4DE]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
                      i === 0 && "bg-[#FFF8E1] text-[#FFA000]",
                      i === 1 && "bg-[#ECEFF1] text-[#607D8B]",
                      i === 2 && "bg-[#FBE9E7] text-[#BF360C]",
                      i > 2 && "bg-[#FDF9F3] text-[#6B6B6B]",
                    )}
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-[#1A1A1A]">{prize.name}</div>
                    {prize.description && <div className="text-xs text-[#9B9B9B] truncate">{prize.description}</div>}
                  </div>
                </div>
                <div className="font-bold text-base text-[#4CAF50] sm:shrink-0 pl-11 sm:pl-0">{prize.amount}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Themes & Technologies */}
        <CollapsibleSection
          title="Themes & Technologies"
          icon={<Star className="w-4 h-4" />}
          iconBg="bg-[#F3E5F5] text-[#8B5CF6]"
          badge={`${(data.themes?.length || 0) + (data.technologies?.length || 0) + (data.tags?.length || 0)} items`}
          isOpen={expandedSections.has("themes")}
          onToggle={() => toggleSection("themes")}
        >
          <div>
            {data.themes && data.themes.length > 0 && (
              <div className="mb-4 sm:mb-5">
                <div className="text-xs sm:text-[13px] font-semibold text-[#6B6B6B] mb-2 sm:mb-3">Themes</div>
                <div className="flex flex-wrap gap-2">
                  {data.themes.map((theme, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium bg-[#F3E5F5] text-[#7B1FA2]"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.technologies && data.technologies.length > 0 && (
              <div className="mb-4 sm:mb-5">
                <div className="text-xs sm:text-[13px] font-semibold text-[#6B6B6B] mb-2 sm:mb-3">Technologies</div>
                <div className="flex flex-wrap gap-2">
                  {data.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium bg-[#E3F2FD] text-[#1565C0]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.tags && data.tags.length > 0 && (
              <div>
                <div className="text-xs sm:text-[13px] font-semibold text-[#6B6B6B] mb-2 sm:mb-3">Categories</div>
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium bg-[#E8F5E9] text-[#2E7D32]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* Requirements */}
        <CollapsibleSection
          title="Submission Requirements"
          icon={<FileCheck className="w-4 h-4" />}
          iconBg="bg-[#FFF3E0] text-[#E85D3B]"
          isOpen={expandedSections.has("requirements")}
          onToggle={() => toggleSection("requirements")}
        >
          <div className="bg-white p-3 sm:p-4 rounded-lg border border-[#E8E4DE] text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-wrap">
            {data.requirements}
          </div>
        </CollapsibleSection>

        {/* Judging Criteria */}
        {data.judgingCriteria?.criteria && (
          <CollapsibleSection
            title="Judging Criteria"
            icon={<PenLine className="w-4 h-4" />}
            iconBg="bg-[#E3F2FD] text-[#3B82F6]"
            isOpen={expandedSections.has("judging")}
            onToggle={() => toggleSection("judging")}
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              {data.judgingCriteria.criteria.map((criterion, i) => (
                <div key={i} className="bg-white p-3 sm:p-4 rounded-lg border border-[#E8E4DE]">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-semibold text-sm text-[#1A1A1A]">{criterion.name}</span>
                    {criterion.weight && (
                      <span className="bg-[#3B82F6] text-white px-2.5 py-1 rounded-xl text-xs font-semibold shrink-0">
                        {criterion.weight}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#6B6B6B] leading-relaxed">{criterion.description}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Judges */}
        {data.judges && data.judges.length > 0 && (
          <CollapsibleSection
            title="Judges Panel"
            icon={<Users className="w-4 h-4" />}
            iconBg="bg-[#FCE4EC] text-[#E91E63]"
            badge={`${data.judges.length} judges`}
            isOpen={expandedSections.has("judges")}
            onToggle={() => toggleSection("judges")}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2 sm:gap-3">
              {data.judges.map((judge, i) => {
                const initials = judge
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()
                return (
                  <div
                    key={i}
                    className="bg-white p-3 sm:p-3.5 rounded-lg border border-[#E8E4DE] flex items-center gap-3"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#E8E4DE] to-[#D4CFC7] flex items-center justify-center font-semibold text-xs sm:text-sm text-[#6B6B6B] shrink-0">
                      {initials}
                    </div>
                    <span className="font-medium text-xs sm:text-[13px] text-[#1A1A1A] truncate">{judge}</span>
                  </div>
                )
              })}
            </div>
          </CollapsibleSection>
        )}
      </div>
    </section>
  )
}

function StatCard({
  label,
  value,
  sub,
  accentColor,
  smallValue,
}: {
  label: string
  value: string
  sub: string
  accentColor: string
  smallValue?: boolean
}) {
  return (
    <div className="bg-[#FDF9F3] rounded-xl p-4 sm:p-5 relative overflow-hidden">
      <div className={cn("absolute top-0 left-0 w-1 h-full", accentColor)} />
      <div className="text-[10px] sm:text-xs text-[#9B9B9B] uppercase tracking-wide mb-1 sm:mb-1.5">{label}</div>
      <div className={cn("font-bold text-[#1A1A1A]", smallValue ? "text-xs sm:text-sm" : "text-lg sm:text-xl")}>
        {value}
      </div>
      <div className="text-[10px] sm:text-xs text-[#6B6B6B] mt-1">{sub}</div>
    </div>
  )
}

function CollapsibleSection({
  title,
  icon,
  iconBg,
  badge,
  isOpen,
  onToggle,
  children,
}: {
  title: string
  icon: React.ReactNode
  iconBg: string
  badge?: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border border-[#E8E4DE] rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between p-3 sm:p-4 bg-white cursor-pointer transition-colors hover:bg-[#FDF9F3]",
          isOpen && "bg-[#FDF9F3] border-b border-[#E8E4DE]",
        )}
      >
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-[#1A1A1A]">
          <div className={cn("w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0", iconBg)}>
            {icon}
          </div>
          <span className="truncate">{title}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {badge && (
            <span className="hidden sm:inline bg-[#E8E4DE] px-2.5 py-1 rounded-xl text-xs font-medium text-[#6B6B6B]">
              {badge}
            </span>
          )}
          <ChevronDown className={cn("w-4 h-4 text-[#6B6B6B] transition-transform", isOpen && "rotate-180")} />
        </div>
      </button>
      <div className={cn("overflow-hidden transition-all duration-300", isOpen ? "max-h-[800px]" : "max-h-0")}>
        <div className="p-3 sm:p-5 bg-[#FDF9F3]">{children}</div>
      </div>
    </div>
  )
}
