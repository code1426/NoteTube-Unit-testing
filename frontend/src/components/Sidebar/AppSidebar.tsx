import { MdOutlineNoteAdd as upload } from "react-icons/md"; // upload notes
import { TbCards as decks } from "react-icons/tb"; // my decks
import { CgNotes as notes } from "react-icons/cg";
import { GoVideo as videos } from "react-icons/go"; // generated videos
import { FcVideoFile as AppLogo } from "react-icons/fc"; //placeholder of app logo
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
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

// Menu items.
const items = [
  {
    title: "Upload notes",
    url: "/upload-notes",
    icon: upload,
  },
  {
    title: "My decks",
    url: "/decks",
    icon: decks,
  },
  {
    title: "Notes",
    url: "/notes-history",
    icon: notes,
  },
  {
    title: "Generated Videos",
    url: "/generated-videos",
    icon: videos,
  },
];

const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();
  const location = useLocation();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton
          variant="header"
          size="lg"
          asChild
          onClick={toggleSidebar}
          className="h-12 select-none font-secondaryRegular hover:text-green text-green"
        >
          <div>
            <AppLogo
              style={{ width: 32, height: 32 }}
              className="bg-green rounded-full "
            />
            <span className="text-2xl">NoteTube</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarSeparator className="border-gray-200 border-t" />
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Menu</SidebarGroupLabel> */}
          <SidebarGroupContent className="">
            <SidebarMenu className="flex gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`transition-all hover:bg-gray-200 active:bg-gray-200`}
                    asChild
                    size={"lg"}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon
                        className={`${location.pathname === item.url && "text-green"}`}
                        style={{ width: 30, height: 30 }}
                      />
                      <span
                        className={`text-base ${location.pathname === item.url && "text-green"}`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
