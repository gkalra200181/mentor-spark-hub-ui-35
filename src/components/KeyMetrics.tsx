
import { TrendingUp, Users, CheckCircle } from 'lucide-react';

export default function KeyMetrics() {
  // Updated metrics data
  const metrics = {
    activePercentage: 32.6,
    activeLearners: "32/98 Learners",
    onboardingPercentage: 61.2,
    onboardingLearners: "60/98 Learners", 
    teamsPercentage: 70.0,
    teamsLearners: "42/60 Onboarded Learners"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card flex items-center p-6">
        <div className="rounded-full bg-primary/10 p-3 mr-4">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Active Learners</p>
          <h3 className="text-2xl font-semibold text-left">{metrics.activePercentage}%</h3>
          <p className="text-xs text-gray-400">{metrics.activeLearners}</p>
        </div>
      </div>
      
      <div className="card flex items-center p-6">
        <div className="rounded-full bg-secondary/20 p-3 mr-4">
          <Users className="h-6 w-6 text-secondary" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Learners Onboarding</p>
          <h3 className="text-2xl font-semibold text-left">{metrics.onboardingPercentage}%</h3>
          <p className="text-xs text-gray-400">{metrics.onboardingLearners}</p>
        </div>
      </div>
      
      <div className="card flex items-center p-6">
        <div className="rounded-full bg-interactive/10 p-3 mr-4">
          <CheckCircle className="h-6 w-6 text-interactive" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Joined MS Teams</p>
          <h3 className="text-2xl font-semibold text-left">{metrics.teamsPercentage}%</h3>
          <p className="text-xs text-gray-400">{metrics.teamsLearners}</p>
        </div>
      </div>
    </div>
  );
}
