import { useState } from 'react';
import LearnerCard from '@/components/LearnerCard';

// Sample data for learners with logical status variations
const sampleLearners = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    completionPercentage: 85,
    tasksCompleted: 12,
    badgesEarned: 3,
    appOnboarded: true,
    joinedTeams: true,
    linkedinPost: "https://www.linkedin.com/posts/sophs_week-1-challenge-fun-image-generation-activity-7306256779720413184-Mwe6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADnYiIBZRftD5-UH5cdkW2VIwcfPD4hrJk",
    teamsPost: "https://teams.live.com/l/message/19:6kSa5B3ZPI3G1O4QBLQdGvtDAF5CN50WgpcJ6SDDdME1@thread.v2/1741948192916?tenantId=9188040d-6c67-4c5b-b112-36a304b66dad&groupId=null&parentMessageId=1741948192916&teamName=AI%20Community%3A%20AI%20Forward&channelName=project%20discussion&createdTime=1741948192916&owningTeamId=19%3AAW9FAEuRM8rQDqGeGxvkNY4nRbaU70iXkr339swElJk1%40thread.v2",
    linkedinProfile: "https://www.linkedin.com/in/alexjohnson"
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    completionPercentage: 62,
    tasksCompleted: 8,
    badgesEarned: 2,
    appOnboarded: true,
    joinedTeams: false,
    linkedinPost: "https://www.linkedin.com/posts/sophs_week-1-challenge-fun-image-generation-activity-7306256779720413184-Mwe6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADnYiIBZRftD5-UH5cdkW2VIwcfPD4hrJk",
    teamsPost: "https://teams.live.com/l/message/19:6kSa5B3ZPI3G1O4QBLQdGvtDAF5CN50WgpcJ6SDDdME1@thread.v2/1741948192916?tenantId=9188040d-6c67-4c5b-b112-36a304b66dad&groupId=null&parentMessageId=1741948192916&teamName=AI%20Community%3A%20AI%20Forward&channelName=project%20discussion&createdTime=1741948192916&owningTeamId=19%3AAW9FAEuRM8rQDqGeGxvkNY4nRbaU70iXkr339swElJk1%40thread.v2",
    linkedinProfile: "https://www.linkedin.com/in/mariagarcia"
  },
  {
    id: 3,
    name: "David Mattas",
    email: "david.mattas@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    completionPercentage: 94,
    tasksCompleted: 15,
    badgesEarned: 5,
    appOnboarded: true,
    joinedTeams: true,
    linkedinPost: "https://www.linkedin.com/posts/sophs_week-1-challenge-fun-image-generation-activity-7306256779720413184-Mwe6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADnYiIBZRftD5-UH5cdkW2VIwcfPD4hrJk",
    teamsPost: "https://teams.live.com/l/message/19:6kSa5B3ZPI3G1O4QBLQdGvtDAF5CN50WgpcJ6SDDdME1@thread.v2/1741948192916?tenantId=9188040d-6c67-4c5b-b112-36a304b66dad&groupId=null&parentMessageId=1741948192916&teamName=AI%20Community%3A%20AI%20Forward&channelName=project%20discussion&createdTime=1741948192916&owningTeamId=19%3AAW9FAEuRM8rQDqGeGxvkNY4nRbaU70iXkr339swElJk1%40thread.v2",
    linkedinProfile: "https://www.linkedin.com/in/davidkim"
  },
  {
    id: 4,
    name: "Sarah Patel",
    email: "sarah.patel@example.com",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
    completionPercentage: 38,
    tasksCompleted: 5,
    badgesEarned: 1,
    appOnboarded: true,
    joinedTeams: false,
    linkedinPost: "https://www.linkedin.com/posts/sophs_week-1-challenge-fun-image-generation-activity-7306256779720413184-Mwe6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADnYiIBZRftD5-UH5cdkW2VIwcfPD4hrJk",
    teamsPost: "https://teams.live.com/l/message/19:6kSa5B3ZPI3G1O4QBLQdGvtDAF5CN50WgpcJ6SDDdME1@thread.v2/1741948192916?tenantId=9188040d-6c67-4c5b-b112-36a304b66dad&groupId=null&parentMessageId=1741948192916&teamName=AI%20Community%3A%20AI%20Forward&channelName=project%20discussion&createdTime=1741948192916&owningTeamId=19%3AAW9FAEuRM8rQDqGeGxvkNY4nRbaU70iXkr339swElJk1%40thread.v2",
    linkedinProfile: "https://www.linkedin.com/in/sarahpatel"
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james.wilson@example.com",
    avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150&h=150&fit=crop",
    completionPercentage: 25,
    tasksCompleted: 3,
    badgesEarned: 0,
    appOnboarded: false,
    joinedTeams: false,
    linkedinPost: "https://www.linkedin.com/posts/sophs_week-1-challenge-fun-image-generation-activity-7306256779720413184-Mwe6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADnYiIBZRftD5-UH5cdkW2VIwcfPD4hrJk",
    teamsPost: "https://teams.live.com/l/message/19:6kSa5B3ZPI3G1O4QBLQdGvtDAF5CN50WgpcJ6SDDdME1@thread.v2/1741948192916?tenantId=9188040d-6c67-4c5b-b112-36a304b66dad&groupId=null&parentMessageId=1741948192916&teamName=AI%20Community%3A%20AI%20Forward&channelName=project%20discussion&createdTime=1741948192916&owningTeamId=19%3AAW9FAEuRM8rQDqGeGxvkNY4nRbaU70iXkr339swElJk1%40thread.v2",
    linkedinProfile: "https://www.linkedin.com/in/jameswilson"
  },
  {
    id: 6,
    name: "Emma Roberts",
    email: "emma.roberts@example.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    completionPercentage: 71,
    tasksCompleted: 10,
    badgesEarned: 2,
    appOnboarded: true,
    joinedTeams: false,
    linkedinPost: "https://www.linkedin.com/posts/sophs_week-1-challenge-fun-image-generation-activity-7306256779720413184-Mwe6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADnYiIBZRftD5-UH5cdkW2VIwcfPD4hrJk",
    teamsPost: "https://teams.live.com/l/message/19:6kSa5B3ZPI3G1O4QBLQdGvtDAF5CN50WgpcJ6SDDdME1@thread.v2/1741948192916?tenantId=9188040d-6c67-4c5b-b112-36a304b66dad&groupId=null&parentMessageId=1741948192916&teamName=AI%20Community%3A%20AI%20Forward&channelName=project%20discussion&createdTime=1741948192916&owningTeamId=19%3AAW9FAEuRM8rQDqGeGxvkNY4nRbaU70iXkr339swElJk1%40thread.v2",
    linkedinProfile: "https://www.linkedin.com/in/emmaroberts"
  },
  {
    id: 7,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
    completionPercentage: 89,
    tasksCompleted: 13,
    badgesEarned: 4,
    appOnboarded: true,
    joinedTeams: true,
    linkedinPost: "https://www.linkedin.com/posts/sophs_week-1-challenge-fun-image-generation-activity-7306256779720413184-Mwe6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADnYiIBZRftD5-UH5cdkW2VIwcfPD4hrJk",
    teamsPost: "https://teams.live.com/l/message/19:6kSa5B3ZPI3G1O4QBLQdGvtDAF5CN50WgpcJ6SDDdME1@thread.v2/1741948192916?tenantId=9188040d-6c67-4c5b-b112-36a304b66dad&groupId=null&parentMessageId=1741948192916&teamName=AI%20Community%3A%20AI%20Forward&channelName=project%20discussion&createdTime=1741948192916&owningTeamId=19%3AAW9FAEuRM8rQDqGeGxvkNY4nRbaU70iXkr339swElJk1%40thread.v2",
    linkedinProfile: "https://www.linkedin.com/in/michaelchen"
  },
  {
    id: 8,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    completionPercentage: 78,
    tasksCompleted: 11,
    badgesEarned: 3,
    appOnboarded: true,
    joinedTeams: true,
    linkedinPost: "https://www.linkedin.com/posts/sophs_week-1-challenge-fun-image-generation-activity-7306256779720413184-Mwe6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADnYiIBZRftD5-UH5cdkW2VIwcfPD4hrJk",
    teamsPost: "https://teams.live.com/l/message/19:6kSa5B3ZPI3G1O4QBLQdGvtDAF5CN50WgpcJ6SDDdME1@thread.v2/1741948192916?tenantId=9188040d-6c67-4c5b-b112-36a304b66dad&groupId=null&parentMessageId=1741948192916&teamName=AI%20Community%3A%20AI%20Forward&channelName=project%20discussion&createdTime=1741948192916&owningTeamId=19%3AAW9FAEuRM8rQDqGeGxvkNY4nRbaU70iXkr339swElJk1%40thread.v2",
    linkedinProfile: "https://www.linkedin.com/in/priyasingh"
  },
  {
    id: 9,
    name: "Carlos Rodriguez",
    email: "carlos.rodriguez@example.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    completionPercentage: 52,
    tasksCompleted: 7,
    badgesEarned: 1,
    appOnboarded: true,
    joinedTeams: false,
    linkedinPost: "https://www.linkedin.com/posts/sophs_week-1-challenge-fun-image-generation-activity-7306256779720413184-Mwe6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADnYiIBZRftD5-UH5cdkW2VIwcfPD4hrJk",
    teamsPost: "https://teams.live.com/l/message/19:6kSa5B3ZPI3G1O4QBLQdGvtDAF5CN50WgpcJ6SDDdME1@thread.v2/1741948192916?tenantId=9188040d-6c67-4c5b-b112-36a304b66dad&groupId=null&parentMessageId=1741948192916&teamName=AI%20Community%3A%20AI%20Forward&channelName=project%20discussion&createdTime=1741948192916&owningTeamId=19%3AAW9FAEuRM8rQDqGeGxvkNY4nRbaU70iXkr339swElJk1%40thread.v2",
    linkedinProfile: "https://www.linkedin.com/in/carlosrodriguez"
  },
  {
    id: 10,
    name: "Zoe Williams",
    email: "zoe.williams@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    completionPercentage: 95,
    tasksCompleted: 16,
    badgesEarned: 6,
    appOnboarded: true,
    joinedTeams: true,
    linkedinPost: "https://www.linkedin.com/posts/sophs_week-1-challenge-fun-image-generation-activity-7306256779720413184-Mwe6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADnYiIBZRftD5-UH5cdkW2VIwcfPD4hrJk",
    teamsPost: "https://teams.live.com/l/message/19:6kSa5B3ZPI3G1O4QBLQdGvtDAF5CN50WgpcJ6SDDdME1@thread.v2/1741948192916?tenantId=9188040d-6c67-4c5b-b112-36a304b66dad&groupId=null&parentMessageId=1741948192916&teamName=AI%20Community%3A%20AI%20Forward&channelName=project%20discussion&createdTime=1741948192916&owningTeamId=19%3AAW9FAEuRM8rQDqGeGxvkNY4nRbaU70iXkr339swElJk1%40thread.v2",
    linkedinProfile: "https://www.linkedin.com/in/zoewilliams"
  },
  {
    id: 11,
    name: "Zach Hassan",
    email: "zach.hassan@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    completionPercentage: 32,
    tasksCompleted: 4,
    badgesEarned: 0,
    appOnboarded: false,
    joinedTeams: false,
    linkedinPost: "https://www.linkedin.com/posts/sophs_week-1-challenge-fun-image-generation-activity-7306256779720413184-Mwe6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADnYiIBZRftD5-UH5cdkW2VIwcfPD4hrJk",
    teamsPost: "https://teams.live.com/l/message/19:6kSa5B3ZPI3G1O4QBLQdGvtDAF5CN50WgpcJ6SDDdME1@thread.v2/1741948192916?tenantId=9188040d-6c67-4c5b-b112-36a304b66dad&groupId=null&parentMessageId=1741948192916&teamName=AI%20Community%3A%20AI%20Forward&channelName=project%20discussion&createdTime=1741948192916&owningTeamId=19%3AAW9FAEuRM8rQDqGeGxvkNY4nRbaU70iXkr339swElJk1%40thread.v2",
    linkedinProfile: "https://www.linkedin.com/in/omarhassan"
  },
  {
    id: 12,
    name: "Aisha Johnson",
    email: "aisha.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop",
    completionPercentage: 67,
    tasksCompleted: 9,
    badgesEarned: 2,
    appOnboarded: true,
    joinedTeams: false,
    linkedinPost: "https://www.linkedin.com/posts/sophs_week-1-challenge-fun-image-generation-activity-7306256779720413184-Mwe6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADnYiIBZRftD5-UH5cdkW2VIwcfPD4hrJk",
    teamsPost: "https://teams.live.com/l/message/19:6kSa5B3ZPI3G1O4QBLQdGvtDAF5CN50WgpcJ6SDDdME1@thread.v2/1741948192916?tenantId=9188040d-6c67-4c5b-b112-36a304b66dad&groupId=null&parentMessageId=1741948192916&teamName=AI%20Community%3A%20AI%20Forward&channelName=project%20discussion&createdTime=1741948192916&owningTeamId=19%3AAW9FAEuRM8rQDqGeGxvkNY4nRbaU70iXkr339swElJk1%40thread.v2",
    linkedinProfile: "https://www.linkedin.com/in/aishajohnson"
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
