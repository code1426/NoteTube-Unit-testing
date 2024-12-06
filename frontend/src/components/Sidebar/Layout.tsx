import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar/AppSidebar";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="flex flox-col w-full">
        <SidebarTrigger className="my-4 mx-2 border border-gray-100 shadow shadow-gray-300 p-4" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
