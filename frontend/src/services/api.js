import axios from 'axios';

// Check if we're in development mode with mock data
const isDevelopment = process.env.NODE_ENV === 'development';
const useMockData = process.env.REACT_APP_USE_MOCK_DATA === 'true';

// Create an axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:53585/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    // Always add the token if available
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // In development mode with mock data, we can log the request
    if (isDevelopment) {
      console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, logout the user
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

// Projects API
export const projectsAPI = {
  getProjects: () => api.get('/projects'),
  getProjectById: (id) => api.get(`/projects/${id}`),
  createProject: (projectData) => api.post('/projects', projectData),
  updateProject: (id, projectData) => api.put(`/projects/${id}`, projectData),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  addCollaborator: (projectId, collaboratorData) =>
    api.post(`/projects/${projectId}/collaborators`, collaboratorData),
};

// Media API
export const mediaAPI = {
  getMediaAssets: (projectId) => api.get(`/media/project/${projectId}`),
  createMediaAsset: (mediaData) => api.post('/media', mediaData),
  updateMediaAsset: (id, mediaData) => api.put(`/media/${id}`, mediaData),
  deleteMediaAsset: (id) => api.delete(`/media/${id}`),
  updateMediaStatus: (id, status) => api.put(`/media/${id}/status`, { status }),
};

// Cloud Storage API
export const cloudAPI = {
  connectDropbox: () => api.get('/cloud/dropbox/connect'),
  connectGoogleDrive: () => api.get('/cloud/google/connect'),
  connectOneDrive: () => api.get('/cloud/onedrive/connect'),
  syncProject: (projectId) => api.post(`/cloud/sync/${projectId}`),
};

// AI API
export const aiAPI = {
  generateCaption: (mediaId) => api.post(`/ai/caption/${mediaId}`),
  generateContent: (mediaId, options) => api.post(`/ai/content/${mediaId}`, options),
};

// Social Media API
export const socialAPI = {
  connectInstagram: () => api.get('/social/instagram/connect'),
  connectTwitter: () => api.get('/social/twitter/connect'),
  connectFacebook: () => api.get('/social/facebook/connect'),
  publishToSocial: (mediaId, platforms, content) =>
    api.post('/social/publish', { mediaId, platforms, content }),
};

export default api;