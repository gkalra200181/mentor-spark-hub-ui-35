
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Star, Trophy, MessageCircle, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample data for shoutouts
const sampleShoutouts = [
  {
    id: 1,
    name: "David Kim",
    message: "Consistently provides helpful feedback to peers and has completed all project milestones ahead of schedule!",
    date: "2 days ago",
    public: true,
    avatar: ""
  },
  {
    id: 2,
    name: "Emma Roberts",
    message: "Created an excellent presentation on AI ethics that has been featured in our monthly newsletter.",
    date: "4 days ago",
    public: false,
    avatar: ""
  }
];

// Contributor of the week
const topContributor = {
  name: "Alex Johnson",
  avatar: "",
  achievements: [
    { name: "Kind Commenter", icon: MessageCircle },
    { name: "Project Power-Up", icon: Code }
  ]
};

export default function RecognitionHub() {
  const [shoutouts, setShoutouts] = useState(sampleShoutouts);
  
  const handleTogglePublic = (id: number) => {
    setShoutouts(prev => 
      prev.map(item => 
        item.id === id ? { ...item, public: !item.public } : item
      )
    );
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="card">
      <h3 className="font-semibold text-lg text-left mb-4">Recognition Hub</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h4 className="font-medium text-left mb-2">Weekly Shout-Out Wall</h4>
          <div className="space-y-4">
            {shoutouts.map((shoutout) => (
              <div key={shoutout.id} className="border rounded-md p-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={shoutout.avatar} alt={shoutout.name} />
                    <AvatarFallback>{getInitials(shoutout.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h5 className="font-medium text-left">{shoutout.name}</h5>
                      <span className="text-xs text-gray-500">{shoutout.date}</span>
                    </div>
                    <p className="text-sm text-left mt-1">{shoutout.message}</p>
                    <div className="flex justify-end items-center gap-2 mt-2">
                      <Label htmlFor={`public-${shoutout.id}`} className="text-xs">
                        Display publicly
                      </Label>
                      <Switch 
                        id={`public-${shoutout.id}`}
                        checked={shoutout.public}
                        onCheckedChange={() => handleTogglePublic(shoutout.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <h4 className="font-medium text-left">Contributor of the Week</h4>
          </div>
          
          <div className="border rounded-md p-4 bg-gray-50">
            <div className="flex justify-center mb-3">
              <Avatar className="h-16 w-16">
                <AvatarImage src={topContributor.avatar} alt={topContributor.name} />
                <AvatarFallback>{getInitials(topContributor.name)}</AvatarFallback>
              </Avatar>
            </div>
            <h5 className="font-medium text-center mb-3">{topContributor.name}</h5>
            <div className="flex flex-wrap gap-2 justify-center">
              {topContributor.achievements.map((badge, idx) => (
                <Badge key={idx} variant="outline" className="flex items-center gap-1 px-2 py-1 bg-white">
                  <badge.icon className="h-3 w-3" />
                  <span>{badge.name}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
