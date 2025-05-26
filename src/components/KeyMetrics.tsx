import { TrendingUp, Users, CheckCircle } from 'lucide-react';
export default function KeyMetrics() {
  // Dummy data for metrics
  const metrics = {
    activePercentage: 78,
    topContributors: 12,
    avgTasksCompleted: 8.5
  };
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card flex items-center p-6">
        <div className="rounded-full bg-primary/10 p-3 mr-4">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Active Learners</p>
          <h3 className="text-2xl font-semibold text-left">{metrics.activePercentage}%</h3>
        </div>
      </div>
      
      <div className="card flex items-center p-6">
        <div className="rounded-full bg-secondary/20 p-3 mr-4">
          <Users className="h-6 w-6 text-secondary" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Learners Onboarding</p>
          <h3 className="text-2xl font-semibold text-left">{metrics.topContributors}</h3>
        </div>
      </div>
      
      <div className="card flex items-center p-6">
        <div className="rounded-full bg-interactive/10 p-3 mr-4">
          <CheckCircle className="h-6 w-6 text-interactive" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Tasks Completion Rate</p>
          <h3 className="text-2xl font-semibold text-left">{metrics.avgTasksCompleted}</h3>
        </div>
      </div>
    </div>;
}