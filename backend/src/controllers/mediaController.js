const MediaAsset = require('../models/MediaAsset');
const Project = require('../models/Project');

// Import mock data for development
const mockData = require('../utils/mockData');

// @desc    Get all media assets for a project
// @route   GET /api/media/project/:projectId
// @access  Private
exports.getMediaAssets = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Check if we're using mock data
    if (process.env.NODE_ENV === 'development' && process.env.MOCK_DB === 'true') {
      // Get project from mock data
      const project = mockData.findById(mockData.projects, projectId);
      
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      // In development mode with auth bypass, we skip the authorization check
      if (!(process.env.BYPASS_AUTH === 'true')) {
        // Check if user is owner or collaborator
        const isOwner = project.owner === req.user.id;
        const isCollaborator = project.collaborators.some(
          (collab) => collab.userId === req.user.id
        );

        if (!isOwner && !isCollaborator) {
          return res.status(403).json({ message: 'Not authorized to access this project' });
        }
      }
      
      // Get all media assets for the project from mock data
      const mediaAssets = mockData.find(mockData.mediaAssets, { projectId })
        .sort((a, b) => a.orderIndex - b.orderIndex);
      
      return res.json(mediaAssets);
    }

    // Check if project exists and user has access
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is owner or collaborator
    const isOwner = project.owner.toString() === req.user.id;
    const isCollaborator = project.collaborators.some(
      (collab) => collab.userId.toString() === req.user.id
    );

    if (!isOwner && !isCollaborator) {
      return res.status(403).json({ message: 'Not authorized to access this project' });
    }

    // Get all media assets for the project
    const mediaAssets = await MediaAsset.find({ projectId })
      .sort({ orderIndex: 1 });

    res.json(mediaAssets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new media asset
// @route   POST /api/media
// @access  Private
exports.createMediaAsset = async (req, res) => {
  try {
    const { projectId, filename, cloudPath, status, orderIndex } = req.body;

    // Check if project exists and user has access
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is owner or editor
    const isOwner = project.owner.toString() === req.user.id;
    const isEditor = project.collaborators.some(
      (collab) => collab.userId.toString() === req.user.id && collab.role === 'editor'
    );

    if (!isOwner && !isEditor) {
      return res.status(403).json({ message: 'Not authorized to add media to this project' });
    }

    // Create new media asset
    const mediaAsset = new MediaAsset({
      projectId,
      filename,
      cloudPath,
      status: status || 'good',
      orderIndex: orderIndex || 0
    });

    const createdMediaAsset = await mediaAsset.save();

    res.status(201).json(createdMediaAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a media asset
// @route   PUT /api/media/:id
// @access  Private
exports.updateMediaAsset = async (req, res) => {
  try {
    const { status, metadata, orderIndex } = req.body;

    const mediaAsset = await MediaAsset.findById(req.params.id);
    if (!mediaAsset) {
      return res.status(404).json({ message: 'Media asset not found' });
    }

    // Check if project exists and user has access
    const project = await Project.findById(mediaAsset.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is owner or editor
    const isOwner = project.owner.toString() === req.user.id;
    const isEditor = project.collaborators.some(
      (collab) => collab.userId.toString() === req.user.id && collab.role === 'editor'
    );

    if (!isOwner && !isEditor) {
      return res.status(403).json({ message: 'Not authorized to update media in this project' });
    }

    // Update media asset
    mediaAsset.status = status || mediaAsset.status;
    mediaAsset.metadata = metadata || mediaAsset.metadata;
    mediaAsset.orderIndex = orderIndex !== undefined ? orderIndex : mediaAsset.orderIndex;
    mediaAsset.updatedAt = Date.now();

    const updatedMediaAsset = await mediaAsset.save();

    res.json(updatedMediaAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a media asset
// @route   DELETE /api/media/:id
// @access  Private
exports.deleteMediaAsset = async (req, res) => {
  try {
    const mediaAsset = await MediaAsset.findById(req.params.id);
    if (!mediaAsset) {
      return res.status(404).json({ message: 'Media asset not found' });
    }

    // Check if project exists and user has access
    const project = await Project.findById(mediaAsset.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is owner or editor
    const isOwner = project.owner.toString() === req.user.id;
    const isEditor = project.collaborators.some(
      (collab) => collab.userId.toString() === req.user.id && collab.role === 'editor'
    );

    if (!isOwner && !isEditor) {
      return res.status(403).json({ message: 'Not authorized to delete media in this project' });
    }

    // Delete media asset
    await mediaAsset.remove();

    res.json({ message: 'Media asset removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update media asset status
// @route   PUT /api/media/:id/status
// @access  Private
exports.updateMediaStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const mediaAsset = await MediaAsset.findById(req.params.id);
    if (!mediaAsset) {
      return res.status(404).json({ message: 'Media asset not found' });
    }

    // Check if project exists and user has access
    const project = await Project.findById(mediaAsset.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is owner or editor
    const isOwner = project.owner.toString() === req.user.id;
    const isEditor = project.collaborators.some(
      (collab) => collab.userId.toString() === req.user.id && collab.role === 'editor'
    );

    if (!isOwner && !isEditor) {
      return res.status(403).json({ message: 'Not authorized to update media in this project' });
    }

    // Update media asset status
    mediaAsset.status = status;
    mediaAsset.updatedAt = Date.now();

    const updatedMediaAsset = await mediaAsset.save();

    res.json(updatedMediaAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};