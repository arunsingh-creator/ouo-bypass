const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('./auth');
const ChatMessage = require('../models/ChatMessage');
const MoodEntry = require('../models/MoodEntry');
const router = express.Router();

// AI response generator (simulated for MVP)
const generateAIResponse = async (userMessage, userId) => {
  // Get recent mood context
  const recentMoods = await MoodEntry.find({ userId })
    .sort({ date: -1 })
    .limit(5);

  const context = recentMoods.length > 0 ? {
    recentMood: recentMoods[0].mood,
    averageIntensity: recentMoods.reduce((sum, entry) => sum + entry.intensity, 0) / recentMoods.length,
    moodTrend: recentMoods.length >= 3 ? calculateMoodTrend(recentMoods.slice(0, 3)) : 'unknown'
  } : null;

  // Simple keyword-based responses with context awareness
  const responses = {
    greeting: [
      "Hello! I'm here to support you. How are you feeling today?",
      "Hi there! I'm your mental health companion. What's on your mind?",
      "Hello! I'm glad you're here. How can I help you today?"
    ],
    feeling_sad: [
      "I understand you're feeling sad. It's okay to feel this way. Would you like to try some gentle breathing exercises or talk about what's on your mind?",
      "I hear that you're going through a tough time. Remember, these feelings are temporary. What usually helps you feel better?",
      "Feeling sad is a natural part of being human. You're not alone in this. Would you like to try a mindfulness exercise together?"
    ],
    feeling_anxious: [
      "I can sense you're feeling anxious. Let's try the 5-4-3-2-1 grounding technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
      "Anxiety can be overwhelming. Try taking slow, deep breaths. Inhale for 4 counts, hold for 4, exhale for 4. You're safe in this moment.",
      "I understand anxiety can feel scary. Remember, this feeling will pass. What's one small thing you can do right now to help yourself feel more grounded?"
    ],
    feeling_angry: [
      "I can hear the anger in your message. It's okay to feel angry - it's a valid emotion. What's one way you can safely express or release this energy?",
      "Anger is a powerful emotion. Sometimes it helps to take a step back and breathe. What might be underneath this anger?",
      "I understand you're feeling angry. It's important to acknowledge these feelings. What would help you feel heard and understood right now?"
    ],
    feeling_happy: [
      "That's wonderful to hear! I'm so glad you're feeling happy. What's contributing to this positive feeling?",
      "I love hearing about your happiness! These moments are precious. How can you savor and extend this positive energy?",
      "Your joy is contagious! It's great to celebrate the good moments. What made today special for you?"
    ],
    need_help: [
      "I'm here to listen and support you. Sometimes talking about what's troubling you can help. What's on your mind?",
      "You're not alone in this. I'm here to help you work through whatever you're facing. What would be most helpful right now?",
      "I want to support you in the best way I can. Can you tell me more about what you're experiencing?"
    ],
    general_support: [
      "I'm here for you. Sometimes just knowing someone is listening can help. What's going on in your world today?",
      "You're doing great by reaching out. It takes courage to ask for support. How can I best help you right now?",
      "I'm glad you're here. You don't have to face challenges alone. What's on your mind today?"
    ]
  };

  // Analyze user message for context
  const message = userMessage.toLowerCase();
  let responseCategory = 'general_support';

  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    responseCategory = 'greeting';
  } else if (message.includes('sad') || message.includes('depressed') || message.includes('down') || message.includes('blue')) {
    responseCategory = 'feeling_sad';
  } else if (message.includes('anxious') || message.includes('worried') || message.includes('nervous') || message.includes('panic')) {
    responseCategory = 'feeling_anxious';
  } else if (message.includes('angry') || message.includes('mad') || message.includes('frustrated') || message.includes('irritated')) {
    responseCategory = 'feeling_angry';
  } else if (message.includes('happy') || message.includes('good') || message.includes('great') || message.includes('wonderful')) {
    responseCategory = 'feeling_happy';
  } else if (message.includes('help') || message.includes('support') || message.includes('struggling')) {
    responseCategory = 'need_help';
  }

  // Add context-aware modifications
  let response = responses[responseCategory][Math.floor(Math.random() * responses[responseCategory].length)];

  if (context && context.recentMood) {
    if (context.recentMood === 'sad' && responseCategory === 'general_support') {
      response = "I notice you've been feeling down recently. How are you doing today? I'm here to listen.";
    } else if (context.recentMood === 'anxious' && responseCategory === 'general_support') {
      response = "I see you've been feeling anxious lately. How are you feeling right now? Remember, I'm here to support you.";
    }
  }

  // Add helpful resources if needed
  if (responseCategory === 'feeling_sad' || responseCategory === 'feeling_anxious') {
    response += "\n\nIf you're having thoughts of self-harm, please reach out to a mental health professional or call the National Suicide Prevention Lifeline at 988.";
  }

  return response;
};

function calculateMoodTrend(moods) {
  if (moods.length < 2) return 'stable';
  
  const intensities = moods.map(m => m.intensity);
  const first = intensities[0];
  const last = intensities[intensities.length - 1];
  
  if (last > first + 1) return 'improving';
  if (last < first - 1) return 'declining';
  return 'stable';
}

// Send a message to AI
router.post('/send', authenticateToken, [
  body('message').isLength({ min: 1, max: 1000 }).trim(),
  body('sessionId').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, sessionId = `session_${Date.now()}` } = req.body;
    const userId = req.user.userId;

    // Save user message
    const userMessage = new ChatMessage({
      userId,
      message,
      isUser: true,
      sessionId
    });
    await userMessage.save();

    // Generate AI response
    const aiResponse = await generateAIResponse(message, userId);

    // Save AI response
    const aiMessage = new ChatMessage({
      userId,
      message: aiResponse,
      isUser: false,
      sessionId
    });
    await aiMessage.save();

    res.json({
      userMessage: {
        id: userMessage._id,
        message: userMessage.message,
        timestamp: userMessage.timestamp,
        isUser: true
      },
      aiResponse: {
        id: aiMessage._id,
        message: aiMessage.message,
        timestamp: aiMessage.timestamp,
        isUser: false
      },
      sessionId
    });
  } catch (error) {
    console.error('Chat send error:', error);
    res.status(500).json({ message: 'Server error processing chat message' });
  }
});

// Get chat history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const { sessionId, limit = 50 } = req.query;
    const userId = req.user.userId;

    let query = { userId };
    if (sessionId) {
      query.sessionId = sessionId;
    }

    const messages = await ChatMessage.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.json(messages.reverse()); // Return in chronological order
  } catch (error) {
    console.error('Chat history error:', error);
    res.status(500).json({ message: 'Server error fetching chat history' });
  }
});

// Get available sessions
router.get('/sessions', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const sessions = await ChatMessage.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$sessionId',
          lastMessage: { $max: '$timestamp' },
          messageCount: { $sum: 1 }
        }
      },
      { $sort: { lastMessage: -1 } },
      { $limit: 20 }
    ]);

    res.json(sessions);
  } catch (error) {
    console.error('Chat sessions error:', error);
    res.status(500).json({ message: 'Server error fetching chat sessions' });
  }
});

// Get quick responses for common situations
router.get('/quick-responses', authenticateToken, async (req, res) => {
  try {
    const quickResponses = [
      {
        category: 'crisis',
        responses: [
          "I'm having thoughts of self-harm",
          "I feel like giving up",
          "I need immediate help"
        ]
      },
      {
        category: 'support',
        responses: [
          "I need someone to talk to",
          "I'm feeling overwhelmed",
          "I need coping strategies"
        ]
      },
      {
        category: 'mood',
        responses: [
          "I'm feeling anxious",
          "I'm feeling sad",
          "I'm feeling angry",
          "I'm feeling happy"
        ]
      },
      {
        category: 'activities',
        responses: [
          "Suggest a mindfulness exercise",
          "Give me a journaling prompt",
          "Recommend a relaxation technique"
        ]
      }
    ];

    res.json(quickResponses);
  } catch (error) {
    console.error('Quick responses error:', error);
    res.status(500).json({ message: 'Server error fetching quick responses' });
  }
});

module.exports = router;