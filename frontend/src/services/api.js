import axios from 'axios';

// Placeholder for future backend integration
const API_BASE_URL = 'https://api.example.com/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for auth tokens here in the future
api.interceptors.request.use((config) => {
  // const token = localStorage.getItem('token');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

export const loginUser = async (credentials) => {
  // TODO: Replace with actual API call
  // return api.post('/auth/login', credentials);
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { token: 'mock-token', role: credentials.role } });
    }, 500);
  });
};

export const fetchFactoryData = async () => {
  // TODO: Replace with actual API call
  // return api.get('/factory/dashboard');
  return Promise.resolve({ data: {} });
};

export const createFactory = async (factoryData) => {
  // TODO: Replace with actual API call
  // return api.post('/factory', factoryData);
  return Promise.resolve({ data: factoryData });
};

export default api;
