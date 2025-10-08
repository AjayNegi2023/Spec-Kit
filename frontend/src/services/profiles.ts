import axios from 'axios';
import { Profile } from '../types/models';
import { getToken } from './auth';

const API_URL =  'http://localhost:3000';

const profileApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
profileApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProfiles = async (): Promise<Profile[]> => {
  const response = await profileApi.get<Profile[]>('/profiles');
  return response.data;
};

export const getProfile = async (id: string): Promise<Profile> => {
  const response = await profileApi.get<Profile>(`/profiles/${id}`);
  return response.data;
};

export const updateProfile = async (id: string, profile: Partial<Profile>): Promise<Profile> => {
  const response = await profileApi.put<Profile>(`/profiles/${id}`, profile);
  return response.data;
};