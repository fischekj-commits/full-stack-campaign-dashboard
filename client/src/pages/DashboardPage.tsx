import { useQuery } from '@tanstack/react-query';
import { campaignService } from '../services/campaignService';
import { TrendingUp, DollarSign, Target, MousePointer, Eye } from 'lucide-react';

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['campaign-stats'],
    queryFn: campaignService.getStats,
  });

  const { data: campaigns } = useQuery({
    queryKey: ['campaigns'],
    queryFn: campaignService.getAll,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const activeCampaigns = campaigns?.filter((c) => c.status === 'active').length || 0;
  const ctr = stats?.total_clicks && stats?.total_impressions
    ? ((stats.total_clicks / stats.total_impressions) * 100).toFixed(2)
    : '0.00';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your campaign performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats?.total_campaigns || 0}
              </p>
              <p className="text-sm text-green-600 mt-1">{activeCampaigns} active</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Target className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${Number(stats?.total_budget || 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                ${Number(stats?.total_spent || 0).toLocaleString()} spent
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Impressions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {Number(stats?.total_impressions || 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total views</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Click Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{ctr}%</p>
              <p className="text-sm text-gray-600 mt-1">
                {Number(stats?.total_clicks || 0).toLocaleString()} clicks
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <MousePointer className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Clicks</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {Number(stats?.total_clicks || 0).toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Conversions</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {Number(stats?.total_conversions || 0).toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Conversion Rate</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats?.total_clicks && stats?.total_conversions
                ? ((stats.total_conversions / stats.total_clicks) * 100).toFixed(2)
                : '0.00'}%
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Campaigns</h2>
        {campaigns && campaigns.length > 0 ? (
          <div className="space-y-3">
            {campaigns.slice(0, 5).map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                  <p className="text-sm text-gray-600">
                    Budget: ${campaign.budget.toLocaleString()} | Spent: ${campaign.spent.toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : campaign.status === 'paused'
                      ? 'bg-yellow-100 text-yellow-800'
                      : campaign.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {campaign.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No campaigns yet. Create your first campaign!</p>
        )}
      </div>
    </div>
  );
}
