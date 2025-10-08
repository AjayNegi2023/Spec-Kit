import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getProfiles } from '../services/profiles';
import type { Profile } from '../types/models';
import Avatar from '../components/common/Avatar';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface FilterState {
  graduationYear: string;
  location: string;
  skills: string[];
}

export default function Directory() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    graduationYear: '',
    location: '',
    skills: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const data = await getProfiles();
      setProfiles(data);
    } catch (err) {
      setError('Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  const locations = useMemo(() => {
    return Array.from(new Set(profiles.map(p => p.location).filter(Boolean)));
  }, [profiles]);

  const graduationYears = useMemo(() => {
    return Array.from(new Set(profiles.map(p => p.graduationYear))).sort((a, b) => b - a);
  }, [profiles]);

  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    profiles.forEach(profile => {
      profile.skills?.forEach(skill => skillSet.add(skill));
    });
    return Array.from(skillSet);
  }, [profiles]);

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const searchLower = search.toLowerCase();
      const matchesSearch = 
        profile.name.toLowerCase().includes(searchLower) ||
        profile.headline.toLowerCase().includes(searchLower) ||
        profile.company?.toLowerCase().includes(searchLower) ||
        profile.location?.toLowerCase().includes(searchLower) ||
        profile.skills?.some(skill => skill.toLowerCase().includes(searchLower));

      const matchesYear = !filters.graduationYear || profile.graduationYear.toString() === filters.graduationYear;
      const matchesLocation = !filters.location || profile.location === filters.location;
      const matchesSkills = filters.skills.length === 0 || 
        filters.skills.every(skill => profile.skills?.includes(skill));

      return matchesSearch && matchesYear && matchesLocation && matchesSkills;
    });
  }, [profiles, search, filters]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" color="text-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
          <span className="mr-2">⚠️</span>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Alumni Directory</h1>
            <p className="text-gray-600 mt-1">Connect with {profiles.length} alumni in the network</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search profiles..."
                className="input-field pl-10 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-primary px-4 py-2 flex items-center gap-2"
            >
              <span>🎯</span>
              Filters
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className={`mt-4 grid gap-4 ${showFilters ? 'block animate-slide-up' : 'hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.graduationYear}
              onChange={(e) => setFilters(f => ({ ...f, graduationYear: e.target.value }))}
              className="input-field"
            >
              <option value="">All Years</option>
              {graduationYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={filters.location}
              onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
              className="input-field"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <select
              value={filters.skills}
              onChange={(e) => {
                const value = Array.from(e.target.selectedOptions, option => option.value);
                setFilters(f => ({ ...f, skills: value }));
              }}
              multiple
              className="input-field h-24"
            >
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProfiles.map((profile, index) => (
          <div
            key={profile.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar name={profile.name} src={profile.avatar} size="lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {profile.name}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{profile.headline}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {profile.company && (
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🏢</span>
                    <span className="text-sm">{profile.company}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    <span className="text-sm">{profile.location}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">🎓</span>
                  <span className="text-sm">Class of {profile.graduationYear}</span>
                </div>
              </div>

              {profile.skills && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.skills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {profile.skills.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                      +{profile.skills.length - 3} more
                    </span>
                  )}
                </div>
              )}

              <div className="mt-6">
                <Link
                  to={`/profiles/${profile.id}`}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <span className="mr-2">👤</span>
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900">No profiles found</h3>
          <p className="text-gray-600 mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}