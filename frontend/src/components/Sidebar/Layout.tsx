import SideBar from "./SideBar";

import { Outlet } from "react-router-dom";

interface LayoutProps {
  setAuth: (value: boolean) => void;
}

const Layout = ({ setAuth }: LayoutProps) => {
  return (
    <div className="flex">
      <SideBar setAuth={setAuth} />
      <Outlet />
    </div>
  );
};

export default Layout;
