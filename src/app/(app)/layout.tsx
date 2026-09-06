import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppHeader } from "./_components/AppHeader"
import { AppSideBar } from "./_components/AppSidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset>
        <AppHeader />
        <main className="min-h-svh">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
