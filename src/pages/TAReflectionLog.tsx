
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const TAReflectionLog = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">TA Reflection Log</h1>
            
            <div className="card">
              <p className="text-gray-600">
                This page will contain your saved reflections and teaching tips. 
                Please provide more details on how this page should look.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TAReflectionLog;
