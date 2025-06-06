
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Hero from "@/components/Hero";
import SearchAndFilters from "@/components/SearchAndFilters";
import KeyMetrics from "@/components/KeyMetrics";
import ParticipationSnapshot from "@/components/ParticipationSnapshot";
import ActionsAndNudges from "@/components/ActionsAndNudges";
import RecognitionHub from "@/components/RecognitionHub";
import ReflectionLog from "@/components/ReflectionLog";

const Index = () => {
  // Sample data for the group
  const groupData = {
    name: "July 2025 Gamma Cohort",
    size: 98
  };

  // Empty handler for filters since this page doesn't use the filtering functionality
  const handleFiltersChange = () => {
    // This page doesn't implement filtering, only the TA Engagement page does
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Hero groupName={groupData.name} groupSize={groupData.size} />
          
          <div className="space-y-6 max-w-7xl mx-auto">
            <SearchAndFilters onFiltersChange={handleFiltersChange} />
            
            <KeyMetrics />
            
            <ParticipationSnapshot />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActionsAndNudges />
              <ReflectionLog />
            </div>
            
            <RecognitionHub />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
