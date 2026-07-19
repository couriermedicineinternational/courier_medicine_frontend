import axios from 'axios';

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  // If envUrl uses localhost but we are accessing via an IP address (like on a phone)
  if (envUrl.includes('localhost') && window.location.hostname !== 'localhost') {
    return envUrl.replace('localhost', window.location.hostname);
  }
  return envUrl;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
});

// Optional: Add request interceptor to auto-attach tokens if auth is ever integrated on the client side
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
