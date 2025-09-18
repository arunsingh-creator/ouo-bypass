const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000
  },
  isUser: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  sessionId: {
    type: String,
    required: true
  }
});

// Index for efficient queries
chatMessageSchema.index({ userId: 1, timestamp: -1 });
chatMessageSchema.index({ sessionId: 1, timestamp: 1 });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);