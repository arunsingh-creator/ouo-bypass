const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('./auth');
const MoodEntry = require('../models/MoodEntry');
const router = express.Router();

// AI recommendation engine (simulated for MVP)
const getAIRecommendation = (mood, intensity, notes = '') => {
  const recommendations = {
    'very-happy': [
      { type: 'activity', text: 'Share your joy with others! Consider calling a friend or family member.' },
      { type: 'journaling', text: 'Write about what made you feel so great today. This can help you recreate these positive feelings.' },
      { type: 'exercise', text: 'Channel this positive energy into a workout or outdoor activity.' }
    ],
    'happy': [
      { type: 'mindfulness', text: 'Practice gratitude meditation to amplify your positive feelings.' },
      { type: 'social', text: 'Plan a small celebration or treat yourself to something you enjoy.' },
      { type: 'activity', text: 'Engage in a creative activity like drawing, writing, or music.' }
    ],
    'neutral': [
      { type: 'mindfulness', text: 'Try a 5-minute breathing exercise to center yourself.' },
      { type: 'activity', text: 'Take a short walk or do some light stretching.' },
      { type: 'journaling', text: 'Reflect on what you\'re grateful for today.' }
    ],
    'sad': [
      { type: 'relaxation', text: 'Try a warm bath, gentle music, or a comfort activity you enjoy.' },
      { type: 'social', text: 'Reach out to a trusted friend or family member for support.' },
      { type: 'mindfulness', text: 'Practice self-compassion meditation. Remember, it\'s okay to feel sad sometimes.' }
    ],
    'very-sad': [
      { type: 'professional', text: 'Consider reaching out to a mental health professional. You don\'t have to face this alone.' },
      { type: 'relaxation', text: 'Focus on gentle self-care activities. Even small steps matter.' },
      { type: 'social', text: 'Don\'t isolate yourself. Reach out to someone you trust.' }
    ],
    'anxious': [
      { type: 'mindfulness', text: 'Try the 5-4-3-2-1 grounding technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.' },
      { type: 'breathing', text: 'Practice box breathing: Inhale for 4, hold for 4, exhale for 4, hold for 4.' },
      { type: 'activity', text: 'Engage in a calming activity like coloring, knitting, or gentle yoga.' }
    ],
    'angry': [
      { type: 'exercise', text: 'Channel this energy into physical activity like running, boxing, or intense exercise.' },
      { type: 'mindfulness', text: 'Try progressive muscle relaxation to release tension.' },
      { type: 'journaling', text: 'Write about what triggered your anger and explore healthy ways to address it.' }
    ],
    'excited': [
      { type: 'activity', text: 'Channel this energy into a productive or creative project.' },
      { type: 'social', text: 'Share your excitement with others who might be interested.' },
      { type: 'mindfulness', text: 'Practice mindful breathing to stay grounded in your excitement.' }
    ],
    'calm': [
      { type: 'mindfulness', text: 'Maintain this peaceful state with meditation or gentle breathing.' },
      { type: 'journaling', text: 'Reflect on what helped you achieve this calm state.' },
      { type: 'activity', text: 'Engage in activities that maintain this peaceful energy.' }
    ]
  };

  const moodRecommendations = recommendations[mood] || recommendations['neutral'];
  const randomRecommendation = moodRecommendations[Math.floor(Math.random() * moodRecommendations.length)];
  
  return {
    text: randomRecommendation.text,
    type: randomRecommendation.type
  };
};

// Submit mood entry
router.post('/submit', authenticateToken, [
  body('mood').isIn(['very-happy', 'happy', 'neutral', 'sad', 'very-sad', 'anxious', 'angry', 'excited', 'calm']),
  body('emoji').notEmpty(),
  body('intensity').isInt({ min: 1, max: 10 }),
  body('notes').optional().isLength({ max: 500 }),
  body('tags').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mood, emoji, intensity, notes, tags } = req.body;
    const userId = req.user.userId;

    // Check if entry already exists for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingEntry = await MoodEntry.findOne({
      userId,
      date: { $gte: today, $lt: tomorrow }
    });

    if (existingEntry) {
      return res.status(400).json({ message: 'Mood entry already exists for today' });
    }

    // Get AI recommendation
    const aiRecommendation = getAIRecommendation(mood, intensity, notes);

    // Create mood entry
    const moodEntry = new MoodEntry({
      userId,
      mood,
      emoji,
      intensity,
      notes,
      tags: tags || [],
      aiRecommendation: aiRecommendation.text,
      aiRecommendationType: aiRecommendation.type
    });

    await moodEntry.save();

    res.status(201).json({
      message: 'Mood entry saved successfully',
      entry: moodEntry,
      recommendation: aiRecommendation
    });
  } catch (error) {
    console.error('Mood submission error:', error);
    res.status(500).json({ message: 'Server error saving mood entry' });
  }
});

// Get mood entries for a user
router.get('/entries', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate, limit = 30 } = req.query;
    const userId = req.user.userId;

    let query = { userId };
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const entries = await MoodEntry.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.json(entries);
  } catch (error) {
    console.error('Mood entries fetch error:', error);
    res.status(500).json({ message: 'Server error fetching mood entries' });
  }
});

// Get today's mood entry
router.get('/today', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const entry = await MoodEntry.findOne({
      userId,
      date: { $gte: today, $lt: tomorrow }
    });

    res.json(entry);
  } catch (error) {
    console.error('Today\'s mood fetch error:', error);
    res.status(500).json({ message: 'Server error fetching today\'s mood' });
  }
});

// Update mood entry
router.put('/entries/:id', authenticateToken, [
  body('mood').optional().isIn(['very-happy', 'happy', 'neutral', 'sad', 'very-sad', 'anxious', 'angry', 'excited', 'calm']),
  body('intensity').optional().isInt({ min: 1, max: 10 }),
  body('notes').optional().isLength({ max: 500 }),
  body('tags').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const userId = req.user.userId;
    const updates = req.body;

    const entry = await MoodEntry.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!entry) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }

    res.json({ message: 'Mood entry updated successfully', entry });
  } catch (error) {
    console.error('Mood update error:', error);
    res.status(500).json({ message: 'Server error updating mood entry' });
  }
});

// Delete mood entry
router.delete('/entries/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const entry = await MoodEntry.findOneAndDelete({ _id: id, userId });

    if (!entry) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }

    res.json({ message: 'Mood entry deleted successfully' });
  } catch (error) {
    console.error('Mood deletion error:', error);
    res.status(500).json({ message: 'Server error deleting mood entry' });
  }
});

module.exports = router;