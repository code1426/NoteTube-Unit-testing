import { SidebarTrigger } from "../ui/sidebar";
import { useSidebar } from "../ui/sidebar";
import ProfileDropdown from "./ProfileDropdown";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeToggle } from "../ThemeToggle";

const MainHeader = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <>
      <TooltipProvider>
        <div className="fixed top-0 select-none h-16 w-full bg-white dark:bg-dark-background dark:border-dark-border z-50 border-b px-4 border-gray-300 shadow-sm dark:shadow-dark-border shadow-gray-200 flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4">
            <SidebarTrigger className="bg-white dark:bg-dark-background ml-[-12px] w-8 h-8 active:bg-gray-300 active:dark:bg-dark-foreground border border-gray-200 dark:border-dark-border  shadow-sm" />

            <div
              onClick={toggleSidebar}
              className="flex flex-row gap-2 cursor-pointer items-center justify-start"
            >
              <img src="../logo.svg" alt="Logo" className="w-8 h-8 mb-2" />
              <span className="text-3xl font-secondaryRegular text-green">
                NoteTube
              </span>
            </div>
          </div>
          <div className="gap-4 flex flex-row items-center">
            <ThemeToggle />
            <ProfileDropdown />
          </div>
        </div>
      </TooltipProvider>
    </>
  );
};

export default MainHeader;
