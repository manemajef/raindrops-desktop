import { Outlet, Link } from "react-router-dom";
import { AppSidebar } from "@/components/app-siderbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "@/components/comp-585";
import { ThemeProvider } from "@/components/theme-provider";

export default function MainLayout() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Navbar trigger={<SidebarTrigger />} />
          <Outlet />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
