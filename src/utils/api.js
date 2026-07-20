import axios from 'axios';

const getBaseUrl = () => {
  const isLocal = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname === '127.0.0.1' || 
     window.location.hostname.startsWith('192.168.'));

  if (isLocal) {
    return 'http://localhost:5000/api';
  }

  // If running on Cloud Run default frontend URL, replace 'frontend' with 'backend'
  if (typeof window !== 'undefined' && window.location.hostname.includes('courier-medicine-frontend')) {
    const backendHostname = window.location.hostname.replace('courier-medicine-frontend', 'courier-medicine-backend');
    return `https://${backendHostname}/api`;
  }

  // Secure fallback for custom domains in production pointing to the deployed Cloud Run backend
  return 'https://courier-medicine-backend-249329877539.asia-south1.run.app/api';
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

// Response interceptor to handle token expiration/401 Unauthorized response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Only redirect if not already on the login page to avoid loops
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
