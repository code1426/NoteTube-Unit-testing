import SideBar from "./SideBar";

import { Outlet } from "react-router-dom";

interface LayoutProps {
  setAuth: (value: boolean) => void;
}

const Layout = ({ setAuth }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <SideBar setAuth={setAuth} />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
