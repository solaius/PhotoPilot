const Project = require('../models/Project');
const MediaAsset = require('../models/MediaAsset');

// Import mock data for development
const mockData = require('../utils/mockData');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
  try {
    const { name, cloudPath, cloudProvider } = req.body;

    const project = new Project({
      name,
      cloudPath,
      cloudProvider,
      owner: req.user.id
    });

    const createdProject = await project.save();

    res.status(201).json(createdProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all projects for a user
// @route   GET /api/projects
// @access  Private
exports.getProjects = async (req, res) => {
  try {
    // Check if we're using mock data
    if (process.env.NODE_ENV === 'development' && process.env.MOCK_DB === 'true') {
      // Get projects from mock data
      const projects = mockData.find(mockData.projects, {
        $or: [
          { owner: req.user.id },
          { 'collaborators.userId': req.user.id }
        ]
      });
      
      // Add owner details to each project
      const projectsWithOwner = projects.map(project => {
        const owner = mockData.findById(mockData.users, project.owner);
        return {
          ...project,
          owner: {
            _id: owner._id,
            name: owner.name,
            email: owner.email
          }
        };
      });
      
      return res.json(projectsWithOwner);
    }

    // Find projects where user is owner or collaborator
    const projects = await Project.find({
      $or: [
        { owner: req.user.id },
        { 'collaborators.userId': req.user.id }
      ]
    }).populate('owner', 'name email');

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a project by ID
// @route   GET /api/projects/:id
// @access  Private
exports.getProjectById = async (req, res) => {
  try {
    // Check if we're using mock data
    if (process.env.NODE_ENV === 'development' && process.env.MOCK_DB === 'true') {
      const project = mockData.findById(mockData.projects, req.params.id);
      
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      // Add owner details
      const owner = mockData.findById(mockData.users, project.owner);
      const projectWithDetails = {
        ...project,
        owner: {
          _id: owner._id,
          name: owner.name,
          email: owner.email
        },
        collaborators: project.collaborators.map(collab => {
          const user = mockData.findById(mockData.users, collab.userId);
          return {
            ...collab,
            userId: {
              _id: user ? user._id : collab.userId,
              name: user ? user.name : 'Unknown User',
              email: user ? user.email : 'unknown@example.com'
            }
          };
        })
      };
      
      // In development mode with auth bypass, we skip the authorization check
      if (!(process.env.BYPASS_AUTH === 'true')) {
        // Check if user is owner or collaborator
        const isOwner = projectWithDetails.owner._id === req.user.id;
        const isCollaborator = projectWithDetails.collaborators.some(
          (collab) => collab.userId._id === req.user.id
        );

        if (!isOwner && !isCollaborator) {
          return res.status(403).json({ message: 'Not authorized to access this project' });
        }
      }
      
      return res.json(projectWithDetails);
    }

    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('collaborators.userId', 'name email');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is owner or collaborator
    const isOwner = project.owner._id.toString() === req.user.id;
    const isCollaborator = project.collaborators.some(
      (collab) => collab.userId._id.toString() === req.user.id
    );

    if (!isOwner && !isCollaborator) {
      return res.status(403).json({ message: 'Not authorized to access this project' });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
  try {
    const { name, cloudPath, collaborators } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    project.name = name || project.name;
    project.cloudPath = cloudPath || project.cloudPath;
    project.collaborators = collaborators || project.collaborators;
    project.updatedAt = Date.now();

    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    // Delete all media assets associated with the project
    await MediaAsset.deleteMany({ projectId: req.params.id });

    // Delete the project
    await project.remove();

    res.json({ message: 'Project removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add a collaborator to a project
// @route   POST /api/projects/:id/collaborators
// @access  Private
exports.addCollaborator = async (req, res) => {
  try {
    const { userId, role } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to add collaborators' });
    }

    // Check if collaborator already exists
    const existingCollaborator = project.collaborators.find(
      (collab) => collab.userId.toString() === userId
    );

    if (existingCollaborator) {
      return res.status(400).json({ message: 'User is already a collaborator' });
    }

    project.collaborators.push({ userId, role });
    project.updatedAt = Date.now();

    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};