import api from './api';
import { Job } from '../types/models';

export const getJobs = async (): Promise<Job[]> => {
  const response = await api.get<Job[]>('/jobs');
  return response.data;
};

export const getJob = async (id: string): Promise<Job> => {
  const response = await api.get<Job>(`/jobs/${id}`);
  return response.data;
};