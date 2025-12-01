"use client"

import { Bell, ChevronRight, User, Menu, Layers } from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-[#E8E4DE] transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5 text-[#6B6B6B]" />
        </button>

        {/* Logo - visible on all screens */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-[#E85D3B] to-[#FF7B5C] rounded-lg flex items-center justify-center">
            <Layers className="w-[18px] h-[18px] text-white" />
          </div>
          <span className="text-xl font-bold text-[#1A1A1A]">DevZen</span>
        </div>

        {/* Breadcrumb - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-2 text-sm text-[#6B6B6B] ml-6 pl-6 border-l border-[#E8E4DE]">
          <span className="cursor-pointer hover:text-[#1A1A1A] transition-colors">Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#1A1A1A] font-medium">New Analysis</span>
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="w-10 h-10 rounded-full bg-white border border-[#E8E4DE] flex items-center justify-center cursor-pointer relative hover:border-[#D4CFC7] transition-colors">
          <Bell className="w-5 h-5 text-[#6B6B6B]" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#E85D3B] rounded-full" />
        </button>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-[#1A1A1A]">Alex Developer</div>
            <div className="text-xs text-[#9B9B9B]">Free Plan</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8E4DE] to-[#D4CFC7] flex items-center justify-center">
            <User className="w-5 h-5 text-[#6B6B6B]" />
          </div>
        </div>
      </div>
    </header>
  )
}
