export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'alumni' | 'admin';
  avatar?: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  headline: string;
  bio: string;
  graduationYear: number;
  company?: string;
  location: string;
  skills: string[];
  experience?: {
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description: string;
  }[];
  projects?: {
    name: string;
    description: string;
    technologies: string[];
  }[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  postedBy: string;
  postedDate: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface APIError {
  message: string;
  status: number;
}