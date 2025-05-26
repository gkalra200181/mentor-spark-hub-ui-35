
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import KeyMetrics from "@/components/KeyMetrics";
import ParticipationSnapshot from "@/components/ParticipationSnapshot";
import ActionsAndNudges from "@/components/ActionsAndNudges";

const TAAdminDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="flex items-center gap-2 px-4 py-3 border-b">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">TA Admin Dashboard</h1>
          </header>
          
          <main className="flex-1 space-y-4 p-4">
            <KeyMetrics />
            
            <ParticipationSnapshot />
            
            <div id="actions-nudges">
              <ActionsAndNudges />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TAAdminDashboard;
