import { MdOutlineNoteAdd as home } from "react-icons/md"; // upload notes
import { TbCards as decks } from "react-icons/tb"; // my decks
import { RiHistoryLine as notes } from "react-icons/ri"; // history
import { GoVideo as videos } from "react-icons/go"; // generated videos
import { FcVideoFile as AppLogo } from "react-icons/fc"; //placeholder of app logo
import { BiNotification } from "react-icons/bi";
import { Edit2Icon } from "lucide-react";
import { LogOutIcon } from "lucide-react";

import { Link } from "react-router-dom";

import ProfileButton from "./ProfileButton";
import LogoutConfirmation from "../LogoutConfirmation";

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: home,
  },
  {
    title: "My decks",
    url: "/decks",
    icon: decks,
  },
  {
    title: "History",
    url: "/history",
    icon: notes,
  },
  {
    title: "Generated Videos",
    url: "/video-generator",
    icon: videos,
  },
];

const AppSidebar = () => {
  const { toggleSidebar, state } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="">
        <SidebarMenuButton
          variant="header"
          size="lg"
          asChild
          onClick={toggleSidebar}
          className="h-12 select-none bg-green hover:bg-green hover:text-white active:bg-green active:text-white text-white"
        >
          <div>
            <AppLogo
              style={{ width: 32, height: 32 }}
              className="bg-green rounded-full "
            />
            <span className="text-xl">NoteTube</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarSeparator className="border-gray-300 border-t mt-2" />
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Menu</SidebarGroupLabel> */}
          <SidebarGroupContent className="">
            <SidebarMenu className="flex gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`transition-all ${state === "expanded" && "hover:bg-green active:bg-green hover:text-white active:text-white"}`}
                    asChild
                    size={"lg"}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon style={{ width: 30, height: 30 }} />
                      <span className="text-lg">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ProfileButton state={state} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            sideOffset={12}
            align="start"
            alignOffset={12}
            avoidCollisions={true}
            className="mb-2"
          >
            <DropdownMenuLabel>
              <ProfileButton isChild state={state} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit2Icon />
              <span>Edit Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BiNotification />
              <span>Notification</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => e.preventDefault()}
              className="flex items-center"
            >
              <LogoutConfirmation>
                <div className="flex flex-1 gap-2">
                  <LogOutIcon className="p-1" />
                  <span>Log Out</span>
                </div>
              </LogoutConfirmation>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
