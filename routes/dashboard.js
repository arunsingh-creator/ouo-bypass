const express = require('express');
const { authenticateToken } = require('./auth');
const MoodEntry = require('../models/MoodEntry');
const router = express.Router();

// Get mood trends and statistics
router.get('/trends', authenticateToken, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const userId = req.user.userId;
    
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get mood entries for the period
    const entries = await MoodEntry.find({
      userId,
      date: { $gte: startDate }
    }).sort({ date: 1 });

    // Calculate statistics
    const moodCounts = {};
    const intensitySum = {};
    const moodCount = {};
    const weeklyData = {};
    const dailyData = {};

    entries.forEach(entry => {
      const date = new Date(entry.date);
      const dayKey = date.toISOString().split('T')[0];
      const weekKey = getWeekKey(date);

      // Overall statistics
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      intensitySum[entry.mood] = (intensitySum[entry.mood] || 0) + entry.intensity;
      moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;

      // Daily data
      if (!dailyData[dayKey]) {
        dailyData[dayKey] = {
          date: dayKey,
          mood: entry.mood,
          emoji: entry.emoji,
          intensity: entry.intensity,
          count: 1
        };
      } else {
        dailyData[dayKey].count += 1;
        dailyData[dayKey].intensity = (dailyData[dayKey].intensity + entry.intensity) / 2;
      }

      // Weekly data
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = {
          week: weekKey,
          moods: [],
          averageIntensity: 0,
          count: 0
        };
      }
      weeklyData[weekKey].moods.push(entry.mood);
      weeklyData[weekKey].averageIntensity += entry.intensity;
      weeklyData[weekKey].count += 1;
    });

    // Calculate average intensities
    Object.keys(intensitySum).forEach(mood => {
      intensitySum[mood] = intensitySum[mood] / moodCount[mood];
    });

    // Calculate weekly averages
    Object.keys(weeklyData).forEach(week => {
      weeklyData[week].averageIntensity = weeklyData[week].averageIntensity / weeklyData[week].count;
      weeklyData[week].dominantMood = getDominantMood(weeklyData[week].moods);
    });

    // Detect concerning patterns
    const alerts = detectConcerningPatterns(entries);

    // Get mood distribution
    const moodDistribution = Object.keys(moodCounts).map(mood => ({
      mood,
      count: moodCounts[mood],
      percentage: ((moodCounts[mood] / entries.length) * 100).toFixed(1)
    }));

    // Get recent trend
    const recentTrend = calculateTrend(entries.slice(-7));

    res.json({
      period: days,
      totalEntries: entries.length,
      moodDistribution,
      averageIntensities: intensitySum,
      dailyData: Object.values(dailyData),
      weeklyData: Object.values(weeklyData),
      recentTrend,
      alerts,
      insights: generateInsights(entries, moodDistribution, recentTrend)
    });
  } catch (error) {
    console.error('Dashboard trends error:', error);
    res.status(500).json({ message: 'Server error fetching trends' });
  }
});

// Get mood summary for a specific date range
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user.userId;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const entries = await MoodEntry.find({
      userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: 1 });

    const summary = {
      totalEntries: entries.length,
      averageIntensity: entries.reduce((sum, entry) => sum + entry.intensity, 0) / entries.length,
      moodBreakdown: {},
      mostCommonMood: null,
      leastCommonMood: null,
      intensityTrend: entries.map(entry => ({
        date: entry.date,
        intensity: entry.intensity,
        mood: entry.mood
      }))
    };

    // Calculate mood breakdown
    entries.forEach(entry => {
      summary.moodBreakdown[entry.mood] = (summary.moodBreakdown[entry.mood] || 0) + 1;
    });

    // Find most and least common moods
    const moodCounts = Object.entries(summary.moodBreakdown);
    if (moodCounts.length > 0) {
      summary.mostCommonMood = moodCounts.reduce((a, b) => a[1] > b[1] ? a : b)[0];
      summary.leastCommonMood = moodCounts.reduce((a, b) => a[1] < b[1] ? a : b)[0];
    }

    res.json(summary);
  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({ message: 'Server error fetching summary' });
  }
});

// Helper functions
function getWeekKey(date) {
  const year = date.getFullYear();
  const week = getWeekNumber(date);
  return `${year}-W${week}`;
}

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getDominantMood(moods) {
  const counts = {};
  moods.forEach(mood => {
    counts[mood] = (counts[mood] || 0) + 1;
  });
  return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}

function detectConcerningPatterns(entries) {
  const alerts = [];
  const recentEntries = entries.slice(-7); // Last 7 days
  
  // Check for consecutive low mood days
  let consecutiveLowMoods = 0;
  let maxConsecutive = 0;
  
  recentEntries.forEach(entry => {
    if (['sad', 'very-sad', 'anxious', 'angry'].includes(entry.mood)) {
      consecutiveLowMoods++;
      maxConsecutive = Math.max(maxConsecutive, consecutiveLowMoods);
    } else {
      consecutiveLowMoods = 0;
    }
  });

  if (maxConsecutive >= 3) {
    alerts.push({
      type: 'consecutive_low_mood',
      severity: maxConsecutive >= 5 ? 'high' : 'medium',
      message: `You've reported low mood for ${maxConsecutive} consecutive days. Consider reaching out to a mental health professional.`,
      resources: [
        'National Suicide Prevention Lifeline: 988',
        'Crisis Text Line: Text HOME to 741741',
        'Find a therapist near you',
        'Emergency: 911'
      ]
    });
  }

  // Check for consistently low intensity
  const averageIntensity = recentEntries.reduce((sum, entry) => sum + entry.intensity, 0) / recentEntries.length;
  if (averageIntensity <= 3 && recentEntries.length >= 5) {
    alerts.push({
      type: 'low_intensity',
      severity: 'medium',
      message: 'Your mood intensity has been consistently low. Consider activities that might boost your energy.',
      suggestions: [
        'Try a new hobby or activity',
        'Spend time in nature',
        'Connect with friends or family',
        'Consider professional support'
      ]
    });
  }

  return alerts;
}

function calculateTrend(entries) {
  if (entries.length < 2) return 'insufficient_data';
  
  const firstHalf = entries.slice(0, Math.floor(entries.length / 2));
  const secondHalf = entries.slice(Math.floor(entries.length / 2));
  
  const firstAvg = firstHalf.reduce((sum, entry) => sum + entry.intensity, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((sum, entry) => sum + entry.intensity, 0) / secondHalf.length;
  
  const difference = secondAvg - firstAvg;
  
  if (difference > 1) return 'improving';
  if (difference < -1) return 'declining';
  return 'stable';
}

function generateInsights(entries, moodDistribution, trend) {
  const insights = [];
  
  if (entries.length >= 7) {
    const mostCommonMood = moodDistribution.reduce((a, b) => a.count > b.count ? a : b);
    insights.push({
      type: 'mood_pattern',
      text: `Your most common mood over this period has been ${mostCommonMood.mood} (${mostCommonMood.percentage}% of the time).`
    });
  }
  
  if (trend === 'improving') {
    insights.push({
      type: 'positive_trend',
      text: 'Great news! Your mood has been improving over the recent period. Keep up the positive momentum!'
    });
  } else if (trend === 'declining') {
    insights.push({
      type: 'concern_trend',
      text: 'I notice your mood has been declining recently. Consider reaching out for support or trying some of the recommended activities.'
    });
  }
  
  const highIntensityDays = entries.filter(entry => entry.intensity >= 8).length;
  if (highIntensityDays > 0) {
    insights.push({
      type: 'high_intensity',
      text: `You've had ${highIntensityDays} day(s) with very high mood intensity. These might be good days to reflect on what contributed to your positive feelings.`
    });
  }
  
  return insights;
}

module.exports = router;