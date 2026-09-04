import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSideBar } from "./_components/AppSidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset>
        <SidebarTrigger />
        <main className="min-h-svh">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
