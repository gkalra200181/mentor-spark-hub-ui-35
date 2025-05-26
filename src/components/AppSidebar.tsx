
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { HomeIcon, UsersIcon, MessagesSquareIcon, FolderGit2Icon, PackageSearchIcon, GalleryHorizontalIcon, BarChartIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Navigation items for the sidebar
  const items = [
    {
      title: "TA Weekly Task Dashboard",
      url: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "TA Engagament Tracker",
      url: "/",
      icon: UsersIcon,
    },
    {
      title: "Member Connect",
      url: "/connect",
      icon: MessagesSquareIcon,
    },
    {
      title: "Small Group Projects",
      url: "/projects",
      icon: FolderGit2Icon,
    },
    {
      title: "Tool Curations",
      url: "/tools",
      icon: PackageSearchIcon,
    },
    {
      title: "Project Gallery",
      url: "/gallery",
      icon: GalleryHorizontalIcon,
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: BarChartIcon,
    },
  ];

  return (
    <Sidebar className="border-r border-[#E1DFDD]">
      <SidebarHeader className="flex items-center h-16 px-4">
        <div className="flex items-center space-x-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" 
            alt="Microsoft Logo" 
            className="h-6 w-auto" 
          />
          <span className="font-semibold text-lg text-primary">AI Enthusiast Community</span>
        </div>
        <SidebarTrigger className="ml-auto lg:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={location.pathname === item.url ? 'text-primary font-semibold' : ''}>
                    <Link to={item.url} className="flex items-center space-x-3 py-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
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
}
