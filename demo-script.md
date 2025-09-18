# AI Mental Health Companion - Demo Script

## Hackathon Demo Presentation (15 minutes)

### Introduction (2 minutes)
"Welcome to the AI Mental Health Companion - an innovative solution that combines AI technology with mental health support to help users track their emotional well-being and receive personalized guidance."

### Live Demo Walkthrough (10 minutes)

#### 1. User Registration (1 minute)
- **Action**: Navigate to the application
- **Show**: Clean, modern interface with registration form
- **Demo**: 
  - Fill in username: "demo_user"
  - Email: "demo@example.com"
  - Password: "demo123"
  - Language: Select "English"
  - Click "Register"
- **Result**: "Registration successful! Welcome to AI Mental Health Companion"

#### 2. Daily Mood Tracking (2 minutes)
- **Action**: Navigate to "Mood Tracker" section
- **Show**: Emoji-based mood selection interface
- **Demo**:
  - Select "😊 Happy" mood
  - Adjust intensity slider to 7
  - Add note: "Had a productive day, feeling optimistic"
  - Select tags: [work, social, exercise]
  - Click "Submit Mood"
- **Result**: 
  - "Mood entry saved successfully!"
  - AI Recommendation appears: "Practice gratitude meditation to amplify your positive feelings. Consider planning a small celebration or treating yourself to something you enjoy."

#### 3. Dashboard Analytics (2 minutes)
- **Action**: Navigate to "Dashboard" section
- **Show**: Comprehensive analytics dashboard
- **Demo**:
  - Point out mood trend chart showing the new data point
  - Show mood distribution pie chart
  - Highlight insights section
  - Demonstrate period selector (7, 30, 90 days)
- **Result**: Visual representation of mental health trends

#### 4. AI Chat Interface (2 minutes)
- **Action**: Navigate to "AI Chat" section
- **Show**: Conversational AI interface
- **Demo**:
  - Type: "I'm feeling a bit stressed about work deadlines"
  - Show AI response: "I understand you're feeling stressed. Try the 5-4-3-2-1 grounding technique..."
  - Use quick response button: "Suggest a mindfulness exercise"
  - Show contextual AI response
- **Result**: Personalized, supportive AI conversation

#### 5. Alert System Demo (1 minute)
- **Action**: Simulate multiple low mood entries
- **Show**: Alert system in action
- **Demo**:
  - Show alert: "You've reported low mood for 3 consecutive days"
  - Display professional resources
  - Highlight crisis support information
- **Result**: Proactive mental health monitoring

#### 6. Multi-Language Support (1 minute)
- **Action**: Change language in header
- **Show**: Instant language switching
- **Demo**:
  - Switch to Hindi: "आपका मानसिक स्वास्थ्य डैशबोर्ड"
  - Switch to Tamil: "உங்கள் மனநல ஆரோக்கிய டாஷ்போர்டு"
  - Switch back to English
- **Result**: Seamless multilingual experience

#### 7. Profile Management (1 minute)
- **Action**: Navigate to "Profile" section
- **Show**: User settings and statistics
- **Demo**:
  - Update language preference
  - Set reminder time
  - View account statistics
  - Save changes
- **Result**: "Profile updated successfully!"

### Key Features Highlight (2 minutes)

#### Technical Excellence
- **Responsive Design**: Works on all devices
- **Real-time Analytics**: Interactive charts with Chart.js
- **Secure Authentication**: JWT-based security
- **RESTful API**: Clean, scalable architecture
- **Database Integration**: MongoDB for data persistence

#### AI-Powered Features
- **Contextual Recommendations**: Based on mood and history
- **Conversational AI**: Natural language processing
- **Pattern Detection**: Identifies concerning trends
- **Personalized Support**: Tailored to individual needs

#### Mental Health Focus
- **Evidence-Based**: Grounded in mental health best practices
- **Crisis Support**: Professional resources and hotlines
- **Privacy-First**: Secure, confidential data handling
- **Accessible**: Multi-language, inclusive design

### Call to Action (1 minute)
"This MVP demonstrates the potential of AI in mental health support. The application is ready for:
- **Immediate Deployment**: Production-ready codebase
- **User Testing**: Real-world validation
- **Feature Expansion**: Machine learning integration
- **Professional Integration**: Healthcare provider connections

**Next Steps:**
1. Deploy to cloud platform
2. Conduct user research
3. Integrate advanced AI models
4. Partner with mental health professionals"

## Demo Data Preparation

### Sample User Accounts
```javascript
// Test accounts for demo
const demoUsers = [
  {
    username: "demo_user",
    email: "demo@example.com",
    password: "demo123",
    language: "en"
  },
  {
    username: "test_user",
    email: "test@example.com", 
    password: "test123",
    language: "hi"
  }
];
```

### Sample Mood Entries
```javascript
// Pre-populate with sample data
const sampleMoods = [
  {
    mood: "happy",
    emoji: "😊",
    intensity: 7,
    notes: "Great day at work",
    tags: ["work", "social"]
  },
  {
    mood: "anxious", 
    emoji: "😰",
    intensity: 6,
    notes: "Feeling worried about presentation",
    tags: ["work", "health"]
  },
  {
    mood: "calm",
    emoji: "😌", 
    intensity: 8,
    notes: "Peaceful evening walk",
    tags: ["exercise", "social"]
  }
];
```

### Demo Scenarios

#### Scenario 1: Happy User Journey
1. User logs in with positive mood
2. Submits "Happy" mood entry
3. Receives positive AI recommendation
4. Views uplifting dashboard insights

#### Scenario 2: Support-Seeking User
1. User reports anxious mood
2. AI provides grounding techniques
3. Chat interface offers ongoing support
4. Dashboard shows concerning pattern alert

#### Scenario 3: Multi-Language User
1. User switches to Hindi interface
2. All text updates instantly
3. Submits mood in native language
4. Receives culturally appropriate recommendations

## Troubleshooting Guide

### Common Issues During Demo

#### 1. Database Connection
**Problem**: "MongoDB connection error"
**Solution**: 
```bash
# Start MongoDB
mongod

# Or use cloud MongoDB Atlas
# Update MONGODB_URI in .env
```

#### 2. Port Already in Use
**Problem**: "Port 3000 already in use"
**Solution**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

#### 3. Missing Dependencies
**Problem**: "Module not found"
**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 4. CORS Issues
**Problem**: "CORS error in browser"
**Solution**: Check CORS configuration in server.js

### Demo Backup Plan
- **Screenshots**: Prepare static screenshots of key features
- **Video Recording**: Pre-recorded demo video
- **Live Coding**: Show code structure and architecture
- **Interactive Q&A**: Focus on technical discussion

## Success Metrics

### Demo Success Indicators
- ✅ Application loads without errors
- ✅ User can register and login
- ✅ Mood tracking works smoothly
- ✅ AI recommendations appear
- ✅ Dashboard charts render correctly
- ✅ Chat interface responds
- ✅ Language switching works
- ✅ Mobile responsiveness demonstrated

### Audience Engagement
- **Technical Questions**: Architecture, scalability, security
- **Feature Requests**: Additional functionality ideas
- **Integration Questions**: Healthcare system connections
- **Business Questions**: Monetization, user acquisition

---

**Remember**: Keep the demo focused, engaging, and demonstrate real value for mental health support. The goal is to show how AI can make mental health care more accessible and personalized.