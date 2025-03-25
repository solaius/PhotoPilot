const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addCollaborator
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// Create a new project
router.post('/', protect, createProject);

// Get all projects for a user
router.get('/', protect, getProjects);

// Get a project by ID
router.get('/:id', protect, getProjectById);

// Update a project
router.put('/:id', protect, updateProject);

// Delete a project
router.delete('/:id', protect, deleteProject);

// Add a collaborator to a project
router.post('/:id/collaborators', protect, addCollaborator);

module.exports = router;