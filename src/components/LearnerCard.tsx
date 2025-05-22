import { useState } from 'react';
import { MessageSquare, AlertCircle, Award, ChevronRight, Clock, MessageCircle, Award as AwardIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
interface ActivityTimelineItem {
  action: string;
  date: string;
}
interface LearnerCardProps {
  learner: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    completionPercentage: number;
    tasksCompleted: number;
    lastActive: string;
    recentProjects: string[];
    commentsGiven: number;
    badgesEarned: number;
    activityTimeline: ActivityTimelineItem[];
  };
  onSelect: (learner: any) => void;
  selectedLearner: any;
  onClose: () => void;
}
export default function LearnerCard({
  learner,
  onSelect,
  selectedLearner,
  onClose
}: LearnerCardProps) {
  // Determine status color based on completion percentage
  const getStatusColor = () => {
    if (learner.completionPercentage >= 70) return "status-dot-green";
    if (learner.completionPercentage >= 31) return "status-dot-yellow";
    return "status-dot-red";
  };
  const getProgressColor = () => {
    if (learner.completionPercentage >= 70) return "bg-status-green";
    if (learner.completionPercentage >= 31) return "bg-status-yellow";
    return "bg-status-red";
  };
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  const isOpen = selectedLearner && selectedLearner.id === learner.id;
  return <div className="relative">
      <div className={cn("card transition-all duration-300 hover:shadow-md cursor-pointer bg-white py-3 px-4 flex items-center", isOpen && "bg-gray-50")} onClick={() => onSelect(learner)}>
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={learner.avatar} alt={learner.name} />
          <AvatarFallback>{getInitials(learner.name)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-left text-sm">{learner.name}</h4>
            <div className={getStatusColor()}></div>
          </div>
          <p className="text-xs text-gray-500 text-left">{learner.completionPercentage}% complete</p>
        </div>
        
        <ChevronRight className="h-4 w-4 text-gray-400" />
      </div>

      <Sheet open={isOpen} onOpenChange={open => !open && onClose()}>
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
              <Progress value={learner.completionPercentage} className="h-2" indicatorClassName={getProgressColor()} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Last Active</p>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  <p className="text-sm">{learner.lastActive}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Tasks Completed</p>
                <p className="text-sm">{learner.tasksCompleted}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Comments Given</p>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5 text-gray-400" />
                  <p className="text-sm">{learner.commentsGiven}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Badges Earned</p>
                <div className="flex items-center gap-1">
                  <AwardIcon className="h-3.5 w-3.5 text-gray-400" />
                  <p className="text-sm">{learner.badgesEarned}</p>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Recent Projects</p>
              <div className="flex gap-2 flex-wrap">
                {learner.recentProjects.map((project, idx) => <Badge key={idx} variant="secondary" className="font-normal">{project}</Badge>)}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Activity Timeline</p>
              <div className="space-y-3">
                {learner.activityTimeline.map((item, idx) => <div key={idx} className="border-l-2 border-gray-200 pl-3 py-1">
                    <p className="text-sm">{item.action}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>)}
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-sm font-medium text-gray-500 mb-3">Actions</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1 text-black bg-indigo-200 hover:bg-indigo-100">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Message</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1 text-slate-50 bg-indigo-500 hover:bg-indigo-400">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Nudge</span>
              </Button>
              <Button size="sm" className="flex items-center gap-1 bg-indigo-800 hover:bg-indigo-700">
                <Award className="h-3.5 w-3.5" />
                <span>Recognize</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>;
}