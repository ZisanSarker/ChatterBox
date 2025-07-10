import axios from 'axios';
import type { Message } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config) => {
    if (import.meta.env.MODE === 'development') {
      console.log(`API ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const fetchMessages = async (): Promise<Message[]> => {
  try {
    const res = await apiClient.get<Message[]>('/api/messages');
    return res.data;
  } catch {
    return [];
  }
};

export const sendMessage = async (message: { username: string; text: string }) => {
  return apiClient.post('/api/messages', message);
};

export default apiClient;
