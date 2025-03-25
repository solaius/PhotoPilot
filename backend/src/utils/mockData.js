/**
 * Mock data for development without a database
 */

// Mock user data
const users = [
  {
    _id: '60d0fe4f5311236168a109ca',
    name: 'Development User',
    email: 'dev@example.com',
    password: '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LG1dXGBCerUuGyt1KqMOtJBGZk3pHLe', // 'password123'
    cloudAccounts: [],
    socialAccounts: [],
    createdAt: new Date('2023-01-01')
  }
];

// Mock project data
const projects = [
  {
    _id: '60d0fe4f5311236168a109cb',
    name: 'Wedding Shoot 2023',
    cloudPath: '/wedding_shoot_2023',
    cloudProvider: 'dropbox',
    owner: '60d0fe4f5311236168a109ca',
    collaborators: [],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    _id: '60d0fe4f5311236168a109cc',
    name: 'Nature Photography',
    cloudPath: '/nature_photography',
    cloudProvider: 'google',
    owner: '60d0fe4f5311236168a109ca',
    collaborators: [],
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-01')
  }
];

// Mock media asset data
const mediaAssets = [
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
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
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
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
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
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-01')
  }
];

// Helper functions to simulate database operations
const findById = (collection, id) => {
  return collection.find(item => item._id === id);
};

const findOne = (collection, filter) => {
  return collection.find(item => {
    return Object.keys(filter).every(key => {
      return item[key] === filter[key];
    });
  });
};

const find = (collection, filter = {}) => {
  if (Object.keys(filter).length === 0) {
    return [...collection];
  }

  return collection.filter(item => {
    return Object.keys(filter).some(key => {
      if (key === '$or') {
        return filter[key].some(orFilter => {
          return Object.keys(orFilter).some(orKey => {
            return item[orKey] === orFilter[orKey];
          });
        });
      }
      return item[key] === filter[key];
    });
  });
};

const create = (collection, data) => {
  const newItem = {
    ...data,
    _id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  collection.push(newItem);
  return newItem;
};

const updateById = (collection, id, data) => {
  const index = collection.findIndex(item => item._id === id);
  if (index === -1) return null;
  
  const updatedItem = {
    ...collection[index],
    ...data,
    updatedAt: new Date()
  };
  collection[index] = updatedItem;
  return updatedItem;
};

const deleteById = (collection, id) => {
  const index = collection.findIndex(item => item._id === id);
  if (index === -1) return false;
  
  collection.splice(index, 1);
  return true;
};

// Export mock data and helper functions
module.exports = {
  users,
  projects,
  mediaAssets,
  findById,
  findOne,
  find,
  create,
  updateById,
  deleteById
};