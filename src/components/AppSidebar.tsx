
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

export function AppSidebar() {
  const isMobile = useIsMobile();
  
  // Navigation items for the sidebar
  const items = [
    {
      title: "TA Dashboard",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "TA Admin Dashboard",
      url: "#",
      icon: UsersIcon,
      active: true,
    },
    {
      title: "Member Connect",
      url: "#",
      icon: MessagesSquareIcon,
    },
    {
      title: "Small Group Projects",
      url: "#",
      icon: FolderGit2Icon,
    },
    {
      title: "Tool Curations",
      url: "#",
      icon: PackageSearchIcon,
    },
    {
      title: "Project Gallery",
      url: "#",
      icon: GalleryHorizontalIcon,
    },
    {
      title: "Leaderboard",
      url: "#",
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
                  <SidebarMenuButton asChild className={item.active ? 'text-primary font-semibold' : ''}>
                    <a href={item.url} className="flex items-center space-x-3 py-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
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
