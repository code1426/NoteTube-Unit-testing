import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar/AppSidebar";
import MainHeader from "../Header/MainHeader";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <MainHeader />
      <AppSidebar />
      <main className="flex flox-col w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
