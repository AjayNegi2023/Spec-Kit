import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile, updateProfile } from '../services/profiles';
import { getCurrentUser } from '../services/auth';
import type { Profile, User } from '../types/models';
import Avatar from '../components/common/Avatar';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUser = getCurrentUser() as User | null;

  useEffect(() => {
    if (id) loadProfile(id);
  }, [id]);

  const loadProfile = async (profileId: string) => {
    try {
      const data = await getProfile(profileId);
      setProfile(data);
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile || !id) return;

    const formData = new FormData(e.currentTarget);
    const updates = {
      headline: formData.get('headline') as string,
      bio: formData.get('bio') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      graduationYear: parseInt(formData.get('graduationYear') as string, 10),
    };

    try {
      const updated = await updateProfile(id, updates);
      setProfile(updated);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" color="text-primary-600" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
          <span className="mr-2">⚠️</span>
          {error || 'Profile not found'}
        </div>
      </div>
    );
  }

  const canEdit = currentUser && currentUser.id === profile.userId;

  const EditForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">
            Professional Headline
          </label>
          <input
            type="text"
            id="headline"
            name="headline"
            defaultValue={profile.headline}
            required
            className="input-field"
            placeholder="e.g., Senior Software Engineer at Tech Corp"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            defaultValue={profile.bio}
            required
            rows={4}
            className="input-field"
            placeholder="Tell us about yourself and your professional journey..."
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Current Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            defaultValue={profile.company}
            className="input-field"
            placeholder="e.g., Tech Corp"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={profile.location}
            className="input-field"
            placeholder="e.g., San Francisco, CA"
          />
        </div>

        <div>
          <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
            Graduation Year
          </label>
          <input
            type="number"
            id="graduationYear"
            name="graduationYear"
            defaultValue={profile.graduationYear}
            required
            className="input-field"
            min="1900"
            max="2100"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary flex items-center gap-2"
        >
          <span>💾</span>
          Save Changes
        </button>
      </div>
    </form>
  );

  const ProfileView = () => (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar name={profile.name} src={profile.avatar} size="xl" className="w-32 h-32" />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-xl text-gray-600 mt-2">{profile.headline}</p>
            <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
              {profile.location && (
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">📍</span>
                  {profile.location}
                </div>
              )}
              {profile.company && (
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">🏢</span>
                  {profile.company}
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <span className="mr-2">🎓</span>
                Class of {profile.graduationYear}
              </div>
            </div>
            {canEdit && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary mt-6 flex items-center gap-2"
              >
                <span>✏️</span>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
        <p className="text-gray-600 whitespace-pre-line">{profile.bio}</p>
      </div>

      {/* Skills Section */}
      {profile.skills && profile.skills.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {profile.experience && profile.experience.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Experience</h2>
          <div className="space-y-6">
            {profile.experience.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-primary-100 pb-6">
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary-100 rounded-full border-2 border-primary-500" />
                <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
                <p className="mt-2 text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {profile.projects && profile.projects.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 animate-slide-up" style={{ animationDelay: '800ms' }}>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {profile.projects.map((project, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {isEditing ? <EditForm /> : <ProfileView />}
    </div>
  );
}