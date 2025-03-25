// Mock data for development
export const mockProjects = [
  {
    _id: '60d0fe4f5311236168a109cb',
    name: 'Wedding Shoot 2023',
    cloudPath: '/wedding_shoot_2023',
    cloudProvider: 'dropbox',
    owner: {
      _id: '60d0fe4f5311236168a109ca',
      name: 'Development User',
      email: 'dev@example.com'
    },
    collaborators: [],
    createdAt: '2023-01-15T00:00:00.000Z',
    updatedAt: '2023-01-15T00:00:00.000Z'
  },
  {
    _id: '60d0fe4f5311236168a109cc',
    name: 'Nature Photography',
    cloudPath: '/nature_photography',
    cloudProvider: 'google',
    owner: {
      _id: '60d0fe4f5311236168a109ca',
      name: 'Development User',
      email: 'dev@example.com'
    },
    collaborators: [],
    createdAt: '2023-02-01T00:00:00.000Z',
    updatedAt: '2023-02-01T00:00:00.000Z'
  }
];

export const mockMediaAssets = [
  {
    _id: '60d0fe4f5311236168a109cd',
    projectId: '60d0fe4f5311236168a109cb',
    filename: 'IMG_001.jpg',
    status: 'good',
    cloudPath: '/wedding_shoot_2023/IMG_001.jpg',
    metadata: {
      ai_description: 'A couple standing under a floral arch',
      custom_text: '',
      social_posts: []
    },
    orderIndex: 0,
    createdAt: '2023-01-15T00:00:00.000Z',
    updatedAt: '2023-01-15T00:00:00.000Z'
  },
  {
    _id: '60d0fe4f5311236168a109ce',
    projectId: '60d0fe4f5311236168a109cb',
    filename: 'IMG_002.jpg',
    status: 'change',
    cloudPath: '/wedding_shoot_2023/IMG_002.jpg',
    metadata: {
      ai_description: 'Bride and groom cutting the wedding cake',
      custom_text: '',
      social_posts: []
    },
    orderIndex: 1,
    createdAt: '2023-01-15T00:00:00.000Z',
    updatedAt: '2023-01-15T00:00:00.000Z'
  },
  {
    _id: '60d0fe4f5311236168a109cf',
    projectId: '60d0fe4f5311236168a109cc',
    filename: 'IMG_001.jpg',
    status: 'good',
    cloudPath: '/nature_photography/IMG_001.jpg',
    metadata: {
      ai_description: 'A sunset over mountains with a lake in the foreground',
      custom_text: '',
      social_posts: []
    },
    orderIndex: 0,
    createdAt: '2023-02-01T00:00:00.000Z',
    updatedAt: '2023-02-01T00:00:00.000Z'
  }
];

// Mock API functions
export const mockAPI = {
  getProjects: () => {
    return Promise.resolve(mockProjects);
  },
  getProjectById: (id) => {
    const project = mockProjects.find(p => p._id === id);
    if (!project) {
      return Promise.reject(new Error('Project not found'));
    }
    return Promise.resolve(project);
  },
  getMediaAssets: (projectId) => {
    const assets = mockMediaAssets.filter(m => m.projectId === projectId);
    return Promise.resolve(assets);
  },
  updateMediaStatus: (id, status) => {
    const assetIndex = mockMediaAssets.findIndex(m => m._id === id);
    if (assetIndex === -1) {
      return Promise.reject(new Error('Media asset not found'));
    }
    mockMediaAssets[assetIndex].status = status;
    return Promise.resolve(mockMediaAssets[assetIndex]);
  }
};