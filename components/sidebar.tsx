"use client"

import { LayoutGrid, Layers, Crown, X } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={`
        w-[260px] bg-white border-r border-[#E8E4DE] py-6 fixed h-screen overflow-y-auto flex flex-col z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#FDF9F3] lg:hidden">
          <X className="w-5 h-5 text-[#6B6B6B]" />
        </button>

        <div className="flex items-center gap-2.5 px-6 mb-8 lg:hidden">
          <div className="w-8 h-8 bg-gradient-to-br from-[#E85D3B] to-[#FF7B5C] rounded-lg flex items-center justify-center">
            <Layers className="w-[18px] h-[18px] text-white" />
          </div>
          <span className="text-xl font-bold text-[#1A1A1A]">DevZen</span>
        </div>

        {/* Menu */}
        <div className="mb-6 mt-4 lg:mt-0">
          <div className="text-[11px] font-semibold text-[#9B9B9B] uppercase tracking-wide px-6 mb-2">Menu</div>
          <a href="#" className="flex items-center gap-3 px-6 py-3 bg-[#FFF0EB] text-[#E85D3B] text-sm font-medium">
            <LayoutGrid className="w-5 h-5" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-6 py-3 text-[#6B6B6B] text-sm font-medium hover:bg-[#FDF9F3] transition-colors"
          >
            <Layers className="w-5 h-5 opacity-70" />
            Saved Ideas
          </a>
        </div>

        {/* Recent Analysis */}
        <div className="mb-6">
          <div className="text-[11px] font-semibold text-[#9B9B9B] uppercase tracking-wide px-6 mb-2">
            Recent Analysis
          </div>
          <div className="flex items-center gap-2.5 px-6 py-2.5 text-[#6B6B6B] text-[13px] cursor-pointer hover:bg-[#FDF9F3] transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4CFC7]" />
            ETH Global SF
          </div>
          <div className="flex items-center gap-2.5 px-6 py-2.5 text-[#6B6B6B] text-[13px] cursor-pointer hover:bg-[#FDF9F3] transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4CFC7]" />
            Solana Hyperdrive
          </div>
        </div>

        {/* Upgrade Card */}
        <div className="mt-auto mx-4 bg-gradient-to-br from-[#2D2D2D] to-[#1A1A1A] rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="bg-white/20 px-2.5 py-1 rounded-xl text-[11px] font-semibold">PRO</span>
          </div>
          <div className="text-sm font-semibold mb-1">Upgrade Plan</div>
          <div className="text-xs opacity-70 mb-3">Unlimited analysis.</div>
          <button className="w-full bg-[#E85D3B] text-white border-none py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer hover:bg-[#D14D2B] transition-colors">
            Upgrade Now
          </button>
        </div>
      </aside>
    </>
  )
}
