'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Eye, MousePointer, Download, Share2, Search, Mail } from 'lucide-react';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{ page: string; views: number }>;
  trafficSources: Array<{ source: string; visitors: number }>;
  events: Array<{ event: string; count: number }>;
  dailyViews: Array<{ date: string; views: number }>;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data - replace with actual Plausible API calls
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: AnalyticsData = {
        pageViews: 1247,
        uniqueVisitors: 892,
        bounceRate: 34.2,
        avgSessionDuration: 245,
        topPages: [
          { page: '/', views: 456 },
          { page: '/case-studies', views: 234 },
          { page: '/blog', views: 189 },
          { page: '/tools', views: 156 },
          { page: '/resume', views: 98 }
        ],
        trafficSources: [
          { source: 'Direct', visitors: 456 },
          { source: 'Google', visitors: 234 },
          { source: 'LinkedIn', visitors: 123 },
          { source: 'Twitter', visitors: 67 },
          { source: 'Other', visitors: 12 }
        ],
        events: [
          { event: 'Tool Usage', count: 89 },
          { event: 'Case Study Views', count: 156 },
          { event: 'Contact Submissions', count: 23 },
          { event: 'File Downloads', count: 45 },
          { event: 'Social Shares', count: 34 }
        ],
        dailyViews: [
          { date: '2024-08-20', views: 45 },
          { date: '2024-08-21', views: 67 },
          { date: '2024-08-22', views: 89 },
          { date: '2024-08-23', views: 123 },
          { date: '2024-08-24', views: 156 },
          { date: '2024-08-25', views: 134 },
          { date: '2024-08-26', views: 178 }
        ]
      };
      
      setData(mockData);
      setLoading(false);
    };

    fetchData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg bg-background"
        >
          <option value="1d">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Page Views"
          value={data.pageViews.toLocaleString()}
          icon={Eye}
          trend="+12.5%"
          trendUp={true}
        />
        <MetricCard
          title="Unique Visitors"
          value={data.uniqueVisitors.toLocaleString()}
          icon={Users}
          trend="+8.3%"
          trendUp={true}
        />
        <MetricCard
          title="Bounce Rate"
          value={`${data.bounceRate}%`}
          icon={TrendingUp}
          trend="-2.1%"
          trendUp={false}
        />
        <MetricCard
          title="Avg. Session"
          value={`${Math.floor(data.avgSessionDuration / 60)}m ${data.avgSessionDuration % 60}s`}
          icon={MousePointer}
          trend="+15.2%"
          trendUp={true}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Views */}
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Daily Page Views</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.dailyViews}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.trafficSources}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ source, percent }) => `${source} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="visitors"
              >
                {data.trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Pages and Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.topPages}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="page" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Events */}
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">User Events</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.events}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="event" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Event Details */}
      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Event Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <EventCard
            title="Tool Usage"
            count={data.events.find(e => e.event === 'Tool Usage')?.count || 0}
            icon={MousePointer}
            description="ROI Calculator & Discovery Canvas"
          />
          <EventCard
            title="Case Studies"
            count={data.events.find(e => e.event === 'Case Study Views')?.count || 0}
            icon={Eye}
            description="Case study engagement"
          />
          <EventCard
            title="Contact Forms"
            count={data.events.find(e => e.event === 'Contact Submissions')?.count || 0}
            icon={Mail}
            description="Form submissions"
          />
          <EventCard
            title="Downloads"
            count={data.events.find(e => e.event === 'File Downloads')?.count || 0}
            icon={Download}
            description="Resume & documents"
          />
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: string;
  trendUp: boolean;
}

function MetricCard({ title, value, icon: Icon, trend, trendUp }: MetricCardProps) {
  return (
    <div className="bg-card p-6 rounded-lg border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
        <span className="text-sm text-muted-foreground ml-2">vs last period</span>
      </div>
    </div>
  );
}

interface EventCardProps {
  title: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

function EventCard({ title, count, icon: Icon, description }: EventCardProps) {
  return (
    <div className="bg-muted/50 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-primary" />
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-2xl font-bold mb-1">{count}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
