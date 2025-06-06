
import { useState } from "react";
import {
  AlertCircle,
  Award,
  ChevronRight,
  Award as AwardIcon,
  Mail,
  Linkedin,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TeamsIcon } from "@/components/icons/TeamsIcon";

interface LearnerCardProps {
  learner: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    completionPercentage: number;
    tasksCompleted: number;
    badgesEarned: number;
    appOnboarded: boolean;
    joinedTeams: boolean;
    linkedinPost: string;
    teamsPost: string;
    linkedinProfile: string;
    projectCompletion: {
      week1: boolean;
      week2: boolean;
      week3: boolean;
      week4: boolean;
      hackathon: boolean;
      communityCreation: boolean;
    };
  };
  onSelect: (learner: any) => void;
  selectedLearner: any;
  onClose: () => void;
}

export default function LearnerCard({
  learner,
  onSelect,
  selectedLearner,
  onClose,
}: LearnerCardProps) {
  const [showEmail, setShowEmail] = useState(false);

  // Determine status color based on completion percentage
  const getStatusColor = () => {
    if (learner.completionPercentage >= 70) return "status-dot-green";
    if (learner.completionPercentage >= 31) return "status-dot-yellow";
    return "status-dot-red";
  };

  const getProgressColor = () => {
    if (learner.completionPercentage >= 70) return "bg-[#0f7c10]";
    if (learner.completionPercentage >= 31) return "bg-[#ffaa45]";
    return "bg-[#d13438]";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleSendNudge = () => {
    // Navigate to Actions & Nudges section on main dashboard
    window.location.href = "/#actions-nudges";
  };

  const isOpen = selectedLearner && selectedLearner.id === learner.id;

  // Additional project links for high achievers (90%+)
  const additionalProjects = [
    { name: "LinkedIn post for #W4 Project - AI App Curation", url: "https://www.linkedin.com/posts/w4-ai-app-curation" },
    { name: "Teams Post for #W4 Project - AI App Curation", url: "https://teams.live.com/w4-ai-app-curation" },
    { name: "LinkedIn post for #W3 Project - Writing, Research & Productivity", url: "https://www.linkedin.com/posts/w3-writing-research" },
    { name: "Teams Post for #W3 Project - Writing, Research & Productivity", url: "https://teams.live.com/w3-writing-research" },
    { name: "LinkedIn post for Optional Community Creation - Sticker Challenge", url: "https://www.linkedin.com/posts/community-sticker-challenge" },
    { name: "Teams Post for Optional Community Creation - Sticker Challenge", url: "https://teams.live.com/community-sticker-challenge" },
    { name: "LinkedIn post for #W2 Project - Video Generation", url: "https://www.linkedin.com/posts/w2-video-generation" },
    { name: "Teams Post for #W2 Project - Video Generation", url: "https://teams.live.com/w2-video-generation" }
  ];

  const projectStatuses = [
    { key: "week1", label: "Week 1 Project", completed: learner.projectCompletion.week1 },
    { key: "week2", label: "Week 2 Project", completed: learner.projectCompletion.week2 },
    { key: "week3", label: "Week 3 Project", completed: learner.projectCompletion.week3 },
    { key: "week4", label: "Week 4 Project", completed: learner.projectCompletion.week4 },
    { key: "hackathon", label: "Optional Hackathon", completed: learner.projectCompletion.hackathon },
    { key: "communityCreation", label: "Optional Community Creation", completed: learner.projectCompletion.communityCreation }
  ];

  return (
    <div className="relative">
      <div
        className={cn(
          "card transition-all duration-300 hover:shadow-md cursor-pointer bg-white py-3 px-4 flex items-center",
          isOpen && "bg-gray-50"
        )}
        onClick={() => onSelect(learner)}
      >
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={learner.avatar} alt={learner.name} />
          <AvatarFallback>{getInitials(learner.name)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-left text-sm">{learner.name}</h4>
            <div className={getStatusColor()}></div>
          </div>
          <p className="text-xs text-gray-500 text-left">
            {learner.completionPercentage}% complete
          </p>
        </div>

        <ChevronRight className="h-4 w-4 text-gray-400" />
      </div>

      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={learner.avatar} alt={learner.name} />
                <AvatarFallback>{getInitials(learner.name)}</AvatarFallback>
              </Avatar>
              <SheetTitle className="text-left">{learner.name}</SheetTitle>
            </div>
          </SheetHeader>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Contact</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => setShowEmail(!showEmail)}
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <TeamsIcon size={14} />
                  <span>Message</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => window.open(learner.linkedinProfile, '_blank')}
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  <span>LinkedIn</span>
                </Button>
              </div>
              {showEmail && (
                <p className="text-sm mt-2 text-gray-600">{learner.email}</p>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">
                Current Status
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    learner.appOnboarded 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {learner.appOnboarded ? '✅ 😊' : '❌ 😢'}
                  </span>
                  <span className="text-sm">App onboarded</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    learner.joinedTeams 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {learner.joinedTeams ? '✅ 😊' : '❌ 😢'}
                  </span>
                  <span className="text-sm">Joined Teams</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-500">Progress</p>
                <p className="text-sm">{learner.completionPercentage}%</p>
              </div>
              <Progress
                value={learner.completionPercentage}
                className="h-2"
                indicatorClassName={getProgressColor()}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">Project Completion Status</p>
              <div className="grid grid-cols-2 gap-2">
                {projectStatuses.map((project) => (
                  <div key={project.key} className={`px-2 py-1 rounded text-xs font-medium ${
                    project.completed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {project.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Tasks Completed
                </p>
                <p className="text-sm">{learner.tasksCompleted}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Badges Earned
                </p>
                <div className="flex items-center gap-1">
                  <AwardIcon className="h-3.5 w-3.5 text-gray-400" />
                  <p className="text-sm">{learner.badgesEarned}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">
                Links to Completed Projects & LinkedIn Posts
              </p>
              <div className="space-y-2">
                <div>
                  <a 
                    href={learner.linkedinPost}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 underline block"
                  >
                    LinkedIn post for #W1 Project - Image Generation
                  </a>
                </div>
                <div>
                  <a 
                    href={learner.teamsPost}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 underline block"
                  >
                    Teams Post for #W1 Project - Image Generation
                  </a>
                </div>
                
                {learner.completionPercentage >= 90 && (
                  <>
                    {additionalProjects.map((project, index) => (
                      <div key={index}>
                        <a 
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 underline block"
                        >
                          {project.name}
                        </a>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-gray-500 mb-3">Actions</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 text-slate-50 bg-indigo-500 hover:bg-indigo-400"
                onClick={handleSendNudge}
              >
                <TeamsIcon size={14} />
                <span>Send Nudge</span>
              </Button>
              <Button
                size="sm"
                className="flex items-center gap-1 bg-[sidebar-accent-foreground] bg-indigo-400 hover:bg-indigo-300 text-indigo-900"
              >
                <Award className="h-3.5 w-3.5" />
                <span>Give Recognition</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
