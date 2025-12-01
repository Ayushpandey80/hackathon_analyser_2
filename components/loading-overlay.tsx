"use client"

import { cn } from "@/lib/utils"

interface LoadingOverlayProps {
  isVisible: boolean
}

export function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  return (
    <div
      className={cn("fixed inset-0 bg-[#FDF9F3]/90 items-center justify-center z-50", isVisible ? "flex" : "hidden")}
    >
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-[#E8E4DE] border-t-[#E85D3B] rounded-full animate-spin mx-auto mb-4" />
        <div className="text-base font-medium text-[#1A1A1A]">Analyzing hackathon...</div>
      </div>
    </div>
  )
}
