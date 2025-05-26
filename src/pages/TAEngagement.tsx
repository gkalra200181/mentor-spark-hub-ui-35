import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Hero from "@/components/Hero";
import KeyMetrics from "@/components/KeyMetrics";
import RecognitionHub from "@/components/RecognitionHub";
import ParticipationSnapshot from "@/components/ParticipationSnapshot";
import ActionsAndNudges from "@/components/ActionsAndNudges";
import SearchAndFilters from "@/components/SearchAndFilters";

const TAEngagement = () => {
  const [filters, setFilters] = useState({
    completionFilter: [0, 100],
    projectFilters: {
      week1: false,
      week2: false,
      week3: false,
      week4: false,
      hackathon: false,
      communityCreation: false
    },
    timezone: "all",
    searchQuery: ""
  });

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="flex items-center gap-2 px-4 py-3 border-b">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">TA Engagement Tracker</h1>
          </header>
          
          <main className="flex-1 space-y-4 p-4">
            <Hero groupName="July 2025 Gamma Cohort" groupSize={98} />
            
            <KeyMetrics />
            
            <RecognitionHub />
            
            <div id="actions-nudges">
              <ActionsAndNudges />
            </div>

            <SearchAndFilters onFiltersChange={handleFiltersChange} />
            
            <ParticipationSnapshot filters={filters} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TAEngagement;
