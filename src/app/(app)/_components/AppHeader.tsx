import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function AppHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center">
      <div className="flex items-center px-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mx-2" />
        <Link href="/dashboard">
          <span className="font-semibold tracking-tight">Tinda</span>
          <span className="text-violet-600">Track</span>
        </Link>
      </div>
    </header>
  )
}
