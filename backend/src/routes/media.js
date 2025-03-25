const express = require('express');
const router = express.Router();
const {
  getMediaAssets,
  createMediaAsset,
  updateMediaAsset,
  deleteMediaAsset,
  updateMediaStatus
} = require('../controllers/mediaController');
const { protect } = require('../middleware/authMiddleware');

// Get all media assets for a project
router.get('/project/:projectId', protect, getMediaAssets);

// Create a new media asset
router.post('/', protect, createMediaAsset);

// Update a media asset
router.put('/:id', protect, updateMediaAsset);

// Delete a media asset
router.delete('/:id', protect, deleteMediaAsset);

// Update media asset status
router.put('/:id/status', protect, updateMediaStatus);

module.exports = router;