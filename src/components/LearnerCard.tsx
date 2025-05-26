
import { useState } from "react";
import {
  MessageSquare,
  AlertCircle,
  Award,
  ChevronRight,
  MessageCircle,
  Award as AwardIcon,
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

  const isOpen = selectedLearner && selectedLearner.id === learner.id;

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
              <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
              <p className="text-sm">{learner.email}</p>
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
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-gray-500 mb-3">Actions</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-white text-indigo-400"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Message</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 text-slate-50 bg-indigo-500 hover:bg-indigo-400"
              >
                <AlertCircle className="h-3.5 w-3.5" />
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
