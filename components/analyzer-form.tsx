"use client"

import { useState } from "react"
import { Rocket, ArrowRight, Play, Loader2 } from "lucide-react"

interface AnalyzerFormProps {
  onStartAnalysis: (url: string, context: string) => Promise<void>
  isStarting: boolean
  isDisabled?: boolean
}

export function AnalyzerForm({ onStartAnalysis, isStarting, isDisabled }: AnalyzerFormProps) {
  const [url, setUrl] = useState("")
  const [context, setContext] = useState("")

  const handleSubmit = () => {
    if (!url) return
    onStartAnalysis(url, context)
  }

  const getButtonText = () => {
    if (isStarting) return "Starting Analysis..."
    return "Generate Winning Ideas"
  }

  return (
    <section className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8 shadow-sm">
      {/* AI Idea Generator Badge */}
      <div className="inline-flex justify-center items-center gap-2 bg-[#E85D3B] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 sm:mb-6">
        <Rocket className="w-4 h-4" />
        AI Idea Generator
      </div>

      {/* URL Input */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-sm sm:text-base font-semibold text-[#1A1A1A] mb-2 sm:mb-3">
          Paste Hackathon URL<span className="text-[#E85D3B]">*</span>
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://devpost.com/software/example"
          disabled={isDisabled}
          className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-[#E8E4DE] rounded-xl text-sm bg-white focus:outline-none focus:border-[#E85D3B] focus:ring-2 focus:ring-[#FFF0EB] transition-all placeholder:text-[#9B9B9B] disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
        />
      </div>

      {/* Context Input */}
      <div className="mb-6 sm:mb-8">
        <label className="block text-sm sm:text-base font-semibold text-[#1A1A1A] mb-2 sm:mb-3">
          Add Context<span className="text-[#9B9B9B] font-normal">(Optional)</span>
        </label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Add context (piit here..."
          rows={4}
          disabled={isDisabled}
          className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-[#E8E4DE] rounded-xl text-sm bg-white focus:outline-none focus:border-[#E85D3B] focus:ring-2 focus:ring-[#FFF0EB] transition-all resize-none placeholder:text-[#9B9B9B] disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={handleSubmit}
          disabled={isStarting || !url || isDisabled}
          className="w-full sm:flex-1 sm:max-w-md flex items-center justify-center gap-2 bg-[#D4956A] hover:bg-[#C4855A] text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-sm sm:text-base font-semibold cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isStarting ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              {getButtonText()}
            </>
          ) : (
            <>
              {getButtonText()}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </>
          )}
        </button>

        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-medium text-[#1A1A1A] border border-[#E8E4DE] bg-white hover:bg-[#FDF9F3] transition-colors">
          See How It Works
          <Play className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}
