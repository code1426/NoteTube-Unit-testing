import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar/AppSidebar";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="flex">
        <SidebarTrigger className="my-4 mx-2" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
