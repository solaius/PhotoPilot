const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cloudAccounts: [
    {
      provider: {
        type: String,
        enum: ['dropbox', 'google', 'onedrive'],
        required: true
      },
      accessToken: {
        type: String,
        required: true
      },
      refreshToken: {
        type: String,
        required: true
      },
      expiresAt: {
        type: Date,
        required: true
      }
    }
  ],
  socialAccounts: [
    {
      platform: {
        type: String,
        enum: ['instagram', 'twitter', 'facebook'],
        required: true
      },
      accessToken: {
        type: String,
        required: true
      },
      refreshToken: String,
      expiresAt: Date,
      userId: String,
      username: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);