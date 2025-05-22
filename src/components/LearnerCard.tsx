
import { useState } from 'react';
import { MessageSquare, AlertCircle, Award, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  };
}

export default function LearnerCard({ learner }: LearnerCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  // Determine status color based on completion percentage
  const getStatusColor = () => {
    if (learner.completionPercentage >= 70) return "status-dot-green";
    if (learner.completionPercentage >= 31) return "status-dot-yellow";
    return "status-dot-red";
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="relative">
      <div 
        className={cn(
          "card transition-all duration-300 hover:shadow-md cursor-pointer",
          detailsOpen && "bg-gray-50"
        )}
        onClick={() => setDetailsOpen(!detailsOpen)}
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={learner.avatar} alt={learner.name} />
            <AvatarFallback>{getInitials(learner.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-left text-sm">{learner.name}</h4>
              <div className={getStatusColor()}></div>
            </div>
            <p className="text-xs text-gray-500 text-left">{learner.email}</p>
          </div>
        </div>
      </div>

      {detailsOpen && (
        <div className="card absolute top-full left-0 right-0 z-10 mt-1 shadow-lg animate-fade-in">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-left">{learner.name}'s Details</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto" 
              onClick={(e) => {
                e.stopPropagation();
                setDetailsOpen(false);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="divider" />
          
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-gray-500 text-left">Progress</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${learner.completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-right mt-1">{learner.completionPercentage}% complete</p>
            </div>
            
            <div>
              <p className="text-xs font-medium text-gray-500 text-left">Tasks Completed</p>
              <p className="text-sm text-left">{learner.tasksCompleted}</p>
            </div>
            
            <div>
              <p className="text-xs font-medium text-gray-500 text-left">Last Active</p>
              <p className="text-sm text-left">{learner.lastActive}</p>
            </div>
            
            <div>
              <p className="text-xs font-medium text-gray-500 text-left">Recent Projects</p>
              <ul className="text-sm text-left list-disc list-inside">
                {learner.recentProjects.map((project, idx) => (
                  <li key={idx} className="text-sm">{project}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="divider" />
          
          <div className="flex gap-2 justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageSquare className="h-3 w-3" />
              <span>Message</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <AlertCircle className="h-3 w-3" />
              <span>Nudge</span>
            </Button>
            <Button 
              size="sm" 
              className="flex items-center gap-1 bg-primary hover:bg-primary/90"
              onClick={(e) => e.stopPropagation()}
            >
              <Award className="h-3 w-3" />
              <span>Recognize</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
