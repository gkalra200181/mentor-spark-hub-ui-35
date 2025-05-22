
import { Users } from "lucide-react";

interface HeroProps {
  groupName: string;
  groupSize: number;
}

export default function Hero({ groupName, groupSize }: HeroProps) {
  return (
    <div className="bg-primary/5 rounded-lg p-8 mb-6 text-center">
      <h1 className="text-[28px] font-semibold mb-1">Your Learner Group</h1>
      <div className="flex items-center justify-center gap-2 mb-2">
        <h2 className="text-[22px] font-semibold">{groupName}</h2>
        <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-soft">
          <Users className="h-4 w-4 text-primary mr-1" />
          <span className="text-sm font-medium">{groupSize} learners</span>
        </div>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Welcome back! Use this dashboard to track your learners' progress, engage with them, and support their learning journey in the AI Enthusiast Community.
      </p>
    </div>
  );
}
