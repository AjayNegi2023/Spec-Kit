import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';
import type { User, Job, Profile } from '../types/models';
import Avatar from '../components/common/Avatar';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface DashboardStats {
  totalAlumni: number;
  totalJobs: number;
  activeUsers: number;
  recentConnections: number;
}

interface StatsCardProps {
  title: string;
  value: number;
  icon: string;
  description: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard = ({ title, value, icon, description, trend }: StatsCardProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
    <p className="mt-2 text-sm text-gray-600">{description}</p>
    {trend && (
      <div className={`mt-2 flex items-center text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <span>{trend.isPositive ? '↑' : '↓'}</span>
        <span className="ml-1">{trend.value}% from last month</span>
      </div>
    )}
  </div>
);

const JobCard = ({ job }: { job: Job }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
        <p className="text-sm text-gray-600">{job.company}</p>
      </div>
      <span className="px-3 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">
        {job.type}
      </span>
    </div>
    <div className="mt-4 space-y-2">
      <div className="flex items-center text-gray-600">
        <span className="mr-2">📍</span>
        <span className="text-sm">{job.location}</span>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <p className="text-xs text-gray-500">
        Posted {new Date(job.postedDate).toLocaleDateString()}
      </p>
      <button className="btn-primary text-sm">Apply Now</button>
    </div>
  </div>
);

const ProfileCard = ({ profile }: { profile: Profile }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center">
      <Avatar name={profile.name} src={profile.avatar} size="lg" />
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
        <p className="text-sm text-gray-600">{profile.headline}</p>
      </div>
    </div>
    <div className="mt-4">
      <p className="text-sm text-gray-600 line-clamp-2">{profile.bio}</p>
    </div>
    <div className="mt-4 flex gap-2 flex-wrap">
      {profile.skills?.slice(0, 3).map((skill, index) => (
        <span
          key={index}
          className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
        >
          {skill}
        </span>
      ))}
      {(profile.skills?.length || 0) > 3 && (
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
          +{profile.skills!.length - 3} more
        </span>
      )}
    </div>
  </div>
);

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalAlumni: 0,
    totalJobs: 0,
    activeUsers: 0,
    recentConnections: 0,
  });
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [recommendedProfiles, setRecommendedProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Import the services at the top of the file
        const { getJobs } = await import('../services/jobs');
        const { getProfiles } = await import('../services/profiles');

        // Set initial statistics
        setStats({
          totalAlumni: 1234,
          totalJobs: 56,
          activeUsers: 789,
          recentConnections: 23,
        });

        // Fetch jobs using the jobs service
        const jobsData = await getJobs();
        setRecentJobs(jobsData.slice(0, 3));

        // Fetch profiles using the profiles service
        const profilesData = await getProfiles();
        setRecommendedProfiles(profilesData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" color="text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg p-8 text-white animate-fade-in">
        <div className="flex items-center">
          <Avatar 
            name={user?.name} 
            src={user?.avatar} 
            size="xl" 
            className="border-4 border-white" 
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.name?.split(' ')[0] || 'Guest'}! 👋
            </h1>
            <p className="mt-2 text-primary-100">Let's see what's new in your network</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
        <StatsCard
          title="Total Alumni"
          value={stats.totalAlumni}
          icon="🎓"
          description="Registered alumni in the network"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Jobs"
          value={stats.totalJobs}
          icon="💼"
          description="Open positions"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Active Users"
          value={stats.activeUsers}
          icon="👥"
          description="Users active this month"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="New Connections"
          value={stats.recentConnections}
          icon="🤝"
          description="New connections this week"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Recent Jobs */}
      <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Job Opportunities</h2>
          <Link to="/jobs" className="text-primary-600 hover:text-primary-700 font-medium">
            View all jobs →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      {/* Recommended Connections */}
      <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recommended Connections</h2>
          <Link to="/directory" className="text-primary-600 hover:text-primary-700 font-medium">
            View all alumni →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
}