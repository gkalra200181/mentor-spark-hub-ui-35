
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TAEngagement from "./pages/TAEngagement";
import TADashboard from "./pages/TADashboard";
import TAReflectionLog from "./pages/TAReflectionLog";
import MemberConnect from "./pages/MemberConnect";
import SmallGroupProjects from "./pages/SmallGroupProjects";
import ToolCurations from "./pages/ToolCurations";
import ProjectGallery from "./pages/ProjectGallery";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const App = () => {
  // Move QueryClient initialization inside the component
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TAEngagement />} />
            <Route path="/dashboard" element={<TADashboard />} />
            <Route path="/reflections" element={<TAReflectionLog />} />
            <Route path="/connect" element={<MemberConnect />} />
            <Route path="/projects" element={<SmallGroupProjects />} />
            <Route path="/tools" element={<ToolCurations />} />
            <Route path="/gallery" element={<ProjectGallery />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
