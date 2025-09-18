# AI Mental Health Companion - MVP

A comprehensive mental health tracking and AI-powered companion application that helps users monitor their emotional well-being and provides personalized support.

## Features

### 🎯 Core Features
- **User Authentication**: Secure registration and login system
- **Daily Mood Tracking**: Emoji-based mood input with intensity levels
- **AI-Powered Recommendations**: Personalized coping strategies and activities
- **Trend Dashboard**: Visual analytics of mood patterns over time
- **Alert System**: Detection of concerning mood patterns with professional resources
- **AI Chat Interface**: Conversational support and guidance
- **Multi-Language Support**: English, Hindi, Tamil, Spanish, and French

### 🚀 Technical Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Analytics**: Interactive charts and insights
- **Secure Authentication**: JWT-based security
- **RESTful API**: Clean, documented endpoints
- **Database Integration**: MongoDB for data persistence
- **Modern UI/UX**: Clean, accessible interface

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd ai-mental-health-companion
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/mental-health-companion
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=3000
   NODE_ENV=development
   ```

3. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env
   ```

4. **Run the Application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`

## Demo Walkthrough

### 1. User Registration
- Click "Register" tab
- Fill in username, email, password
- Select preferred language (English, Hindi, Tamil, Spanish, French)
- Click "Register" to create account

### 2. Daily Mood Tracking
- Navigate to "Mood Tracker" section
- Select your current mood using emoji buttons
- Adjust intensity slider (1-10)
- Add optional notes and tags
- Click "Submit Mood" to save

### 3. AI Recommendations
- After submitting mood, view personalized AI recommendations
- Recommendations include mindfulness exercises, activities, or professional resources
- Based on mood type and intensity

### 4. Dashboard Analytics
- View "Dashboard" for comprehensive analytics
- See mood trends over time (7, 30, or 90 days)
- Check mood distribution charts
- Read personalized insights
- View alerts for concerning patterns

### 5. AI Chat Support
- Navigate to "AI Chat" section
- Type messages or use quick response buttons
- Receive contextual AI responses
- Chat history is saved for continuity

### 6. Profile Management
- Access "Profile" section
- Update language preferences
- Set daily reminder times
- View account statistics

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Mood Tracking
- `POST /api/mood/submit` - Submit mood entry
- `GET /api/mood/entries` - Get mood entries
- `GET /api/mood/today` - Get today's mood
- `PUT /api/mood/entries/:id` - Update mood entry
- `DELETE /api/mood/entries/:id` - Delete mood entry

### Dashboard
- `GET /api/dashboard/trends` - Get mood trends and analytics
- `GET /api/dashboard/summary` - Get mood summary for date range

### Chat
- `POST /api/chat/send` - Send chat message
- `GET /api/chat/history` - Get chat history
- `GET /api/chat/sessions` - Get chat sessions
- `GET /api/chat/quick-responses` - Get quick response options

## Sample Demo Conversation

### User Journey Example:

**1. Registration & Login**
```
User: Creates account with email "demo@example.com"
System: "Registration successful! Welcome to AI Mental Health Companion"
```

**2. Mood Input**
```
User: Selects "😊 Happy" mood with intensity 7
User: Adds note: "Had a great day at work, finished my project"
User: Tags: [work, social]
System: "Mood entry saved successfully!"
```

**3. AI Recommendation**
```
AI: "Practice gratitude meditation to amplify your positive feelings. 
     Consider planning a small celebration or treating yourself to something you enjoy."
```

**4. Dashboard Update**
```
System: Shows mood trend chart with new data point
System: Updates average mood intensity
System: Displays insight: "Your mood has been improving over the recent period. Keep up the positive momentum!"
```

**5. Chat Interaction**
```
User: "I'm feeling a bit anxious about tomorrow's presentation"
AI: "I can sense you're feeling anxious. Let's try the 5-4-3-2-1 grounding technique: 
     Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste."
```

**6. Alert System**
```
System: "You've reported low mood for 3 consecutive days. Consider reaching out to a mental health professional."
Resources: ["National Suicide Prevention Lifeline: 988", "Crisis Text Line: Text HOME to 741741"]
```

## Deployment Options

### Local Development
```bash
npm run dev
```

### Production Deployment
```bash
npm start
```

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Cloud Deployment
- **Heroku**: Add MongoDB Atlas, set environment variables
- **AWS**: Use EC2 with RDS for MongoDB
- **Google Cloud**: Use App Engine with Cloud MongoDB
- **Vercel**: Frontend deployment with serverless functions

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: Protection against abuse
- **CORS Configuration**: Secure cross-origin requests
- **Helmet.js**: Security headers

## Multi-Language Support

The application supports 5 languages:
- **English** (en) - Default
- **Hindi** (hi) - हिन्दी
- **Tamil** (ta) - தமிழ்
- **Spanish** (es) - Español
- **French** (fr) - Français

Language switching is available in the header and profile settings.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Future Enhancements

- **Machine Learning**: Advanced mood prediction algorithms
- **Wearable Integration**: Smartwatch and fitness tracker data
- **Professional Network**: Connect with mental health professionals
- **Group Support**: Community features and group therapy
- **Advanced Analytics**: Deeper insights and predictions
- **Mobile App**: Native iOS and Android applications

---

**Built with ❤️ for mental health awareness and support**