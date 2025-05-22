
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const ToolCurations = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="bg-primary/5 rounded-lg p-8 mb-6 text-center max-w-7xl mx-auto">
            <h1 className="text-[28px] font-semibold mb-3">Tool Curations</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              This page is currently under development. Please check back later.
            </p>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ToolCurations;
