import { Suspense } from "react"
import { HackathonDashboard } from "@/components/hackathon-dashboard"

export default function Page() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <HackathonDashboard />
    </Suspense>
  )
}

function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen bg-[#FDF9F3]">
      <div className="hidden lg:block w-[260px] bg-white border-r border-[#E8E4DE]" />
      <main className="flex-1 p-4 sm:p-6 lg:p-10">
        <div className="animate-pulse">
          <div className="h-12 bg-[#E8E4DE] rounded-xl mb-8 max-w-md" />
          <div className="bg-white rounded-2xl p-8">
            <div className="h-10 bg-[#E8E4DE] rounded-full w-48 mb-6" />
            <div className="h-14 bg-[#E8E4DE] rounded-xl mb-6" />
            <div className="h-32 bg-[#E8E4DE] rounded-xl mb-6" />
            <div className="h-14 bg-[#E8E4DE] rounded-xl w-64" />
          </div>
        </div>
      </main>
    </div>
  )
}
