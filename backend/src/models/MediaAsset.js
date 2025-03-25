const mongoose = require('mongoose');

const MediaAssetSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['good', 'change', 'delete', 'archived'],
    default: 'good'
  },
  cloudPath: {
    type: String,
    required: true
  },
  metadata: {
    ai_description: String,
    custom_text: String,
    social_posts: [
      {
        platform: {
          type: String,
          enum: ['instagram', 'twitter', 'facebook'],
          required: true
        },
        post_id: String,
        timestamp: Date,
        content: {
          title: String,
          caption: String,
          hashtags: [String]
        }
      }
    ]
  },
  orderIndex: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MediaAsset', MediaAssetSchema);