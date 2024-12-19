import { MdOutlineNoteAdd as upload } from "react-icons/md"; // upload notes
import { TbCards as decks } from "react-icons/tb"; // my decks
import { CgNotes as notes } from "react-icons/cg";
import { GoVideo as videos } from "react-icons/go"; // generated videos
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
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="bg-white dark:bg-dark-background dark:border-dark-border"
    >
      <SidebarHeader>
        <SidebarMenuButton
          variant="header"
          size="lg"
          asChild
          onClick={toggleSidebar}
          className="h-12 select-none font-secondaryRegular hover:dark:bg-dark-foreground hover:text-green text-green"
        >
          <div>
            <img src="../logo.svg" alt="Logo" className="w-8 h-8 mb-2" />
            <span className="text-2xl">NoteTube</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarSeparator className="border-gray-200 border-t dark:border-dark-background" />
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Menu</SidebarGroupLabel> */}
          <SidebarGroupContent className="">
            <SidebarMenu className="flex gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`transition-all hover:bg-gray-200 hover:dark:bg-dark-foreground active:bg-gray-200`}
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
