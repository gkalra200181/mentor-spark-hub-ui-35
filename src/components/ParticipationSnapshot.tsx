
import { useState } from 'react';
import LearnerCard from '@/components/LearnerCard';

// Sample data for learners
const sampleLearners = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    completionPercentage: 85,
    tasksCompleted: 12,
    lastActive: "Today at 2:45 PM",
    recentProjects: ["AI Ethics Framework", "NLP Classification Tool"],
    commentsGiven: 24,
    badgesEarned: 3,
    activityTimeline: [
      { action: "Posted comment on 'Group Project Ideas'", date: "5 days ago" },
      { action: "Submitted Week 2 project 'AI Ethics Framework'", date: "1 week ago" },
      { action: "Earned 'Helpful Reviewer' badge", date: "1 week ago" }
    ]
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    completionPercentage: 62,
    tasksCompleted: 8,
    lastActive: "Yesterday at 11:20 AM",
    recentProjects: ["Computer Vision Demo", "Chatbot Implementation"],
    commentsGiven: 15,
    badgesEarned: 2,
    activityTimeline: [
      { action: "Submitted Week 3 project 'Computer Vision Demo'", date: "3 days ago" },
      { action: "Posted comment on 'ML Model Training'", date: "1 week ago" }
    ]
  },
  {
    id: 3,
    name: "David Kim",
    email: "david.kim@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    completionPercentage: 94,
    tasksCompleted: 15,
    lastActive: "Today at 9:10 AM",
    recentProjects: ["ML Model Deployment", "AI Strategy Document"],
    commentsGiven: 30,
    badgesEarned: 5,
    activityTimeline: [
      { action: "Earned 'All-Star Contributor' badge", date: "2 days ago" },
      { action: "Submitted Week 4 project 'ML Model Deployment'", date: "3 days ago" },
      { action: "Posted comment on 'Deployment Best Practices'", date: "4 days ago" }
    ]
  },
  {
    id: 4,
    name: "Sarah Patel",
    email: "sarah.patel@example.com",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
    completionPercentage: 38,
    tasksCompleted: 5,
    lastActive: "3 days ago",
    recentProjects: ["Data Visualization Project"],
    commentsGiven: 7,
    badgesEarned: 1,
    activityTimeline: [
      { action: "Posted comment on 'Data Visualization Techniques'", date: "3 days ago" },
      { action: "Submitted Week 1 project 'Data Visualization'", date: "2 weeks ago" }
    ]
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james.wilson@example.com",
    avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150&h=150&fit=crop",
    completionPercentage: 25,
    tasksCompleted: 3,
    lastActive: "1 week ago",
    recentProjects: ["Getting Started with AI"],
    commentsGiven: 3,
    badgesEarned: 0,
    activityTimeline: [
      { action: "Submitted Week 1 project 'Getting Started with AI'", date: "1 week ago" }
    ]
  },
  {
    id: 6,
    name: "Emma Roberts",
    email: "emma.roberts@example.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    completionPercentage: 71,
    tasksCompleted: 10,
    lastActive: "Today at 3:30 PM",
    recentProjects: ["Recommendation Engine", "Sentiment Analysis Tool"],
    commentsGiven: 18,
    badgesEarned: 2,
    activityTimeline: [
      { action: "Posted comment on 'Recommendation Algorithms'", date: "Today" },
      { action: "Submitted Week 3 project 'Recommendation Engine'", date: "3 days ago" },
      { action: "Earned 'Quick Learner' badge", date: "1 week ago" }
    ]
  },
  // 6 additional dummy learner profiles
  {
    id: 7,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
    completionPercentage: 89,
    tasksCompleted: 13,
    lastActive: "Today at 10:15 AM",
    recentProjects: ["Neural Network Design", "Voice Assistant Project"],
    commentsGiven: 27,
    badgesEarned: 4,
    activityTimeline: [
      { action: "Submitted Hackathon project 'Voice Assistant'", date: "2 days ago" },
      { action: "Posted comment on 'Neural Network Architecture'", date: "4 days ago" },
      { action: "Earned 'Hackathon Star' badge", date: "2 days ago" }
    ]
  },
  {
    id: 8,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    completionPercentage: 78,
    tasksCompleted: 11,
    lastActive: "Yesterday at 5:20 PM",
    recentProjects: ["Image Recognition Tool", "Community Learning Hub"],
    commentsGiven: 20,
    badgesEarned: 3,
    activityTimeline: [
      { action: "Submitted Community Creation project 'Learning Hub'", date: "1 week ago" },
      { action: "Posted comment on 'Community Engagement'", date: "1 week ago" },
      { action: "Earned 'Community Builder' badge", date: "1 week ago" }
    ]
  },
  {
    id: 9,
    name: "Carlos Rodriguez",
    email: "carlos.rodriguez@example.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    completionPercentage: 52,
    tasksCompleted: 7,
    lastActive: "4 days ago",
    recentProjects: ["Data Analysis Framework", "Machine Learning Basics"],
    commentsGiven: 12,
    badgesEarned: 1,
    activityTimeline: [
      { action: "Submitted Week 2 project 'Data Analysis Framework'", date: "1 week ago" },
      { action: "Posted comment on 'ML Basics Discussion'", date: "2 weeks ago" }
    ]
  },
  {
    id: 10,
    name: "Zoe Williams",
    email: "zoe.williams@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    completionPercentage: 95,
    tasksCompleted: 16,
    lastActive: "Today at 1:05 PM",
    recentProjects: ["Natural Language Processing", "AI Research Paper", "Virtual Reality Demo"],
    commentsGiven: 35,
    badgesEarned: 6,
    activityTimeline: [
      { action: "Submitted Week 4 project 'NLP Advanced Techniques'", date: "Yesterday" },
      { action: "Posted comment on 'Research Methodologies'", date: "3 days ago" },
      { action: "Earned 'Research Excellence' badge", date: "3 days ago" }
    ]
  },
  {
    id: 11,
    name: "Omar Hassan",
    email: "omar.hassan@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    completionPercentage: 32,
    tasksCompleted: 4,
    lastActive: "5 days ago",
    recentProjects: ["Introduction to AI"],
    commentsGiven: 5,
    badgesEarned: 0,
    activityTimeline: [
      { action: "Submitted Week 1 project 'Introduction to AI'", date: "2 weeks ago" },
      { action: "Posted comment on 'Getting Started Thread'", date: "3 weeks ago" }
    ]
  },
  {
    id: 12,
    name: "Aisha Johnson",
    email: "aisha.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop",
    completionPercentage: 67,
    tasksCompleted: 9,
    lastActive: "Today at 11:45 AM",
    recentProjects: ["Deep Learning Project", "AI Ethics Case Study"],
    commentsGiven: 16,
    badgesEarned: 2,
    activityTimeline: [
      { action: "Posted comment on 'Ethics in AI'", date: "Today" },
      { action: "Submitted Week 3 project 'Deep Learning'", date: "4 days ago" },
      { action: "Earned 'Thoughtful Discussion' badge", date: "1 week ago" }
    ]
  }
];

export default function ParticipationSnapshot() {
  const [learners] = useState(sampleLearners);
  const [selectedLearner, setSelectedLearner] = useState(null);
  
  const handleSelectLearner = (learner) => {
    setSelectedLearner(learner);
  };
  
  const handleCloseSheet = () => {
    setSelectedLearner(null);
  };
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-left text-lg">Participation Snapshot</h3>
        <span className="text-sm text-gray-500">{learners.length} learners</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {learners.map(learner => (
          <LearnerCard 
            key={learner.id} 
            learner={learner}
            onSelect={handleSelectLearner}
            selectedLearner={selectedLearner}
            onClose={handleCloseSheet}
          />
        ))}
      </div>
    </div>
  );
}
