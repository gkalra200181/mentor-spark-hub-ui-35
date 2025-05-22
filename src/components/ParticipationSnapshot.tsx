
import { useState } from 'react';
import LearnerCard from '@/components/LearnerCard';

// Sample data for learners
const sampleLearners = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "",
    completionPercentage: 85,
    tasksCompleted: 12,
    lastActive: "Today at 2:45 PM",
    recentProjects: ["AI Ethics Framework", "NLP Classification Tool"]
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    avatar: "",
    completionPercentage: 62,
    tasksCompleted: 8,
    lastActive: "Yesterday at 11:20 AM",
    recentProjects: ["Computer Vision Demo", "Chatbot Implementation"]
  },
  {
    id: 3,
    name: "David Kim",
    email: "david.kim@example.com",
    avatar: "",
    completionPercentage: 94,
    tasksCompleted: 15,
    lastActive: "Today at 9:10 AM",
    recentProjects: ["ML Model Deployment", "AI Strategy Document"]
  },
  {
    id: 4,
    name: "Sarah Patel",
    email: "sarah.patel@example.com",
    avatar: "",
    completionPercentage: 38,
    tasksCompleted: 5,
    lastActive: "3 days ago",
    recentProjects: ["Data Visualization Project"]
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james.wilson@example.com",
    avatar: "",
    completionPercentage: 25,
    tasksCompleted: 3,
    lastActive: "1 week ago",
    recentProjects: ["Getting Started with AI"]
  },
  {
    id: 6,
    name: "Emma Roberts",
    email: "emma.roberts@example.com",
    avatar: "",
    completionPercentage: 71,
    tasksCompleted: 10,
    lastActive: "Today at 3:30 PM",
    recentProjects: ["Recommendation Engine", "Sentiment Analysis Tool"]
  },
];

export default function ParticipationSnapshot() {
  const [learners] = useState(sampleLearners);
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-left text-lg">Participation Snapshot</h3>
        <span className="text-sm text-gray-500">{learners.length} learners</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {learners.map(learner => (
          <LearnerCard key={learner.id} learner={learner} />
        ))}
      </div>
    </div>
  );
}
