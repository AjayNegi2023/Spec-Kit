import axios from 'axios';
import { LoginCredentials, AuthResponse } from '../types/models';

const API_URL =  'http://localhost:3000';

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await authApi.post<AuthResponse>('/auth/login', credentials);
    const { token, user } = response.data;
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return response.data;
    }
    throw new Error('Invalid response from server');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to login');
  }
};

export const logout = async (): Promise<void> => {
  try {
    await authApi.post('/auth/logout');
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const getToken = () => {
  return localStorage.getItem('token');
};