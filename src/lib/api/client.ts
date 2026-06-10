import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Inject token if available from NextAuth session
    // This will be handled server-side or via a wrapper hook for client components
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
