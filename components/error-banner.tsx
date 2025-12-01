"use client"

import { AlertTriangle, X } from "lucide-react"

interface ErrorBannerProps {
  message: string
  isRefunded?: boolean
  onDismiss: () => void
}

export function ErrorBanner({ message, isRefunded, onDismiss }: ErrorBannerProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-semibold text-amber-800 mb-1">Analysis Failed {isRefunded && "- Credit Refunded"}</h4>
        <p className="text-sm text-amber-700">{message}</p>
      </div>
      <button onClick={onDismiss} className="p-1 hover:bg-amber-100 rounded transition-colors">
        <X className="w-4 h-4 text-amber-500" />
      </button>
    </div>
  )
}
