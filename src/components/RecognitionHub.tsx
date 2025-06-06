
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Star, Trophy, ThumbsUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample data for shoutouts
const sampleShoutouts = [
  {
    id: 1,
    name: "David Kim",
    message: "Consistently provides helpful feedback to peers and has completed all project milestones ahead of schedule!",
    date: "2 days ago",
    public: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Emma Roberts",
    message: "Helped several peers troubleshoot technical issues in the forum.",
    date: "4 days ago",
    public: false,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop"
  }
];

// Contributor of the week
const topContributor = {
  name: "Zoe Williams",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
  achievements: [
    { name: "Helpful Peer x5", icon: ThumbsUp, color: "bg-green-100 text-green-800 border-green-200" },
    { name: "Project Power-Up x12", icon: Star, color: "bg-yellow-100 text-yellow-800 border-yellow-200" }
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
                <Badge key={idx} variant="outline" className={`flex items-center gap-1 px-2 py-1 ${badge.color}`}>
                  <badge.icon className="h-3 w-3" />
                  <span className="text-xs">{badge.name}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
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
      </div>
    </div>
  );
}
