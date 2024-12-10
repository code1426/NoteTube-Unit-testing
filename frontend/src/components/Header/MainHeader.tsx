import { SidebarTrigger } from "../ui/sidebar";
import { useSidebar } from "../ui/sidebar";
import ProfileDropdown from "./ProfileDropdown";

const MainHeader = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="fixed top-0 select-none h-16 w-full bg-white z-20 border-b px-4 border-gray-300 shadow-sm shadow-gray-200 flex flex-row justify-between items-center">
      <div className="flex flex-row gap-4">
        <SidebarTrigger className="bg-white ml-[-12px] w-8 h-8 active:bg-gray-300 border border-gray-200 shadow-sm" />

        <div
          onClick={toggleSidebar}
          className="flex flex-row gap-2 cursor-pointer items-center justify-start"
        >
          <img src="./logo.svg" alt="Logo" className="w-8 h-8 mb-2" />
          <span className="text-3xl font-secondaryRegular text-green">
            NoteTube
          </span>
        </div>
      </div>
      <ProfileDropdown />
    </div>
  );
};

export default MainHeader;
