const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  mood: {
    type: String,
    required: true,
    enum: ['very-happy', 'happy', 'neutral', 'sad', 'very-sad', 'anxious', 'angry', 'excited', 'calm']
  },
  emoji: {
    type: String,
    required: true
  },
  intensity: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  notes: {
    type: String,
    maxlength: 500
  },
  tags: [{
    type: String,
    enum: ['work', 'family', 'health', 'relationships', 'finances', 'weather', 'social', 'exercise', 'sleep', 'food']
  }],
  aiRecommendation: {
    type: String,
    maxlength: 1000
  },
  aiRecommendationType: {
    type: String,
    enum: ['mindfulness', 'exercise', 'journaling', 'social', 'professional', 'relaxation', 'activity']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
moodEntrySchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('MoodEntry', moodEntrySchema);