// Global state
let currentUser = null;
let currentLanguage = 'en';
let currentSection = 'dashboard';
let moodCharts = {};

// Translation data
const translations = {
    en: {
        nav: {
            dashboard: 'Dashboard',
            mood: 'Mood Tracker',
            chat: 'AI Chat',
            profile: 'Profile'
        },
        dashboard: {
            title: 'Your Mental Health Dashboard',
            streak: 'Day Streak',
            average: 'Average Mood',
            recommendations: 'Recommendations',
            moodTrend: 'Mood Trend',
            moodDistribution: 'Mood Distribution',
            insights: 'Insights'
        },
        mood: {
            title: 'How are you feeling today?',
            'very-happy': 'Very Happy',
            happy: 'Happy',
            neutral: 'Neutral',
            sad: 'Sad',
            'very-sad': 'Very Sad',
            anxious: 'Anxious',
            angry: 'Angry',
            excited: 'Excited',
            calm: 'Calm',
            intensity: 'Intensity (1-10):',
            notes: 'Notes (optional):',
            tags: 'Tags:',
            submit: 'Submit Mood',
            today: 'Today\'s Entry',
            recommendation: 'AI Recommendation'
        },
        chat: {
            title: 'AI Mental Health Companion',
            subtitle: 'I\'m here to listen and support you. How can I help today?',
            welcome: 'Hello! I\'m your AI mental health companion. I\'m here to listen, support, and provide guidance. How are you feeling today?',
            anxious: 'I\'m feeling anxious',
            need_support: 'I need someone to talk to',
            mindfulness: 'Suggest a mindfulness exercise'
        },
        profile: {
            title: 'Your Profile',
            settings: 'Settings',
            language: 'Language:',
            reminder: 'Daily Reminder Time:',
            notifications: 'Enable notifications',
            save: 'Save Changes',
            stats: 'Your Statistics',
            total_entries: 'Total Mood Entries:',
            member_since: 'Member Since:',
            last_login: 'Last Login:'
        }
    },
    hi: {
        nav: {
            dashboard: 'डैशबोर्ड',
            mood: 'मूड ट्रैकर',
            chat: 'AI चैट',
            profile: 'प्रोफ़ाइल'
        },
        dashboard: {
            title: 'आपका मानसिक स्वास्थ्य डैशबोर्ड',
            streak: 'दिन की श्रृंखला',
            average: 'औसत मूड',
            recommendations: 'सुझाव',
            moodTrend: 'मूड ट्रेंड',
            moodDistribution: 'मूड वितरण',
            insights: 'अंतर्दृष्टि'
        },
        mood: {
            title: 'आज आप कैसा महसूस कर रहे हैं?',
            'very-happy': 'बहुत खुश',
            happy: 'खुश',
            neutral: 'सामान्य',
            sad: 'उदास',
            'very-sad': 'बहुत उदास',
            anxious: 'चिंतित',
            angry: 'गुस्सा',
            excited: 'उत्साहित',
            calm: 'शांत',
            intensity: 'तीव्रता (1-10):',
            notes: 'नोट्स (वैकल्पिक):',
            tags: 'टैग:',
            submit: 'मूड सबमिट करें',
            today: 'आज की प्रविष्टि',
            recommendation: 'AI सुझाव'
        },
        chat: {
            title: 'AI मानसिक स्वास्थ्य साथी',
            subtitle: 'मैं यहाँ आपकी बात सुनने और सहायता करने के लिए हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?',
            welcome: 'नमस्ते! मैं आपका AI मानसिक स्वास्थ्य साथी हूँ। मैं यहाँ सुनने, सहायता करने और मार्गदर्शन प्रदान करने के लिए हूँ। आज आप कैसा महसूस कर रहे हैं?',
            anxious: 'मैं चिंतित महसूस कर रहा हूँ',
            need_support: 'मुझे किसी से बात करने की जरूरत है',
            mindfulness: 'एक माइंडफुलनेस व्यायाम सुझाएं'
        },
        profile: {
            title: 'आपकी प्रोफ़ाइल',
            settings: 'सेटिंग्स',
            language: 'भाषा:',
            reminder: 'दैनिक अनुस्मारक समय:',
            notifications: 'सूचनाएं सक्षम करें',
            save: 'परिवर्तन सहेजें',
            stats: 'आपके आंकड़े',
            total_entries: 'कुल मूड प्रविष्टियां:',
            member_since: 'सदस्य बने:',
            last_login: 'अंतिम लॉगिन:'
        }
    },
    ta: {
        nav: {
            dashboard: 'டாஷ்போர்டு',
            mood: 'மனநிலை கண்காணிப்பு',
            chat: 'AI அரட்டை',
            profile: 'சுயவிவரம்'
        },
        dashboard: {
            title: 'உங்கள் மனநல ஆரோக்கிய டாஷ்போர்டு',
            streak: 'நாள் தொடர்',
            average: 'சராசரி மனநிலை',
            recommendations: 'பரிந்துரைகள்',
            moodTrend: 'மனநிலை போக்கு',
            moodDistribution: 'மனநிலை விநியோகம்',
            insights: 'நுண்ணறிவு'
        },
        mood: {
            title: 'இன்று நீங்கள் எப்படி உணருகிறீர்கள்?',
            'very-happy': 'மிகவும் மகிழ்ச்சி',
            happy: 'மகிழ்ச்சி',
            neutral: 'நடுநிலை',
            sad: 'வருத்தம்',
            'very-sad': 'மிகவும் வருத்தம்',
            anxious: 'கவலை',
            angry: 'கோபம்',
            excited: 'உற்சாகம்',
            calm: 'அமைதி',
            intensity: 'தீவிரம் (1-10):',
            notes: 'குறிப்புகள் (விருப்பமானது):',
            tags: 'குறிச்சொற்கள்:',
            submit: 'மனநிலையை சமர்ப்பிக்கவும்',
            today: 'இன்றைய பதிவு',
            recommendation: 'AI பரிந்துரை'
        },
        chat: {
            title: 'AI மனநல ஆரோக்கிய துணை',
            subtitle: 'நான் உங்களைக் கேட்கவும் ஆதரிக்கவும் இங்கே இருக்கிறேன். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?',
            welcome: 'வணக்கம்! நான் உங்கள் AI மனநல ஆரோக்கிய துணை. நான் கேட்க, ஆதரிக்க மற்றும் வழிகாட்டுதல் வழங்க இங்கே இருக்கிறேன். இன்று நீங்கள் எப்படி உணருகிறீர்கள்?',
            anxious: 'நான் கவலைப்படுகிறேன்',
            need_support: 'நான் யாருடனாவது பேச வேண்டும்',
            mindfulness: 'ஒரு மனநிலை பயிற்சியை பரிந்துரைக்கவும்'
        },
        profile: {
            title: 'உங்கள் சுயவிவரம்',
            settings: 'அமைப்புகள்',
            language: 'மொழி:',
            reminder: 'தினசரி நினைவூட்டல் நேரம்:',
            notifications: 'அறிவிப்புகளை இயக்கவும்',
            save: 'மாற்றங்களை சேமிக்கவும்',
            stats: 'உங்கள் புள்ளிவிவரங்கள்',
            total_entries: 'மொத்த மனநிலை பதிவுகள்:',
            member_since: 'உறுப்பினர் ஆனது:',
            last_login: 'கடைசி உள்நுழைவு:'
        }
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check for existing authentication
    const token = localStorage.getItem('authToken');
    if (token) {
        // Verify token and load app
        verifyTokenAndLoadApp(token);
    } else {
        // Show login modal
        showAuthModal();
    }

    // Set up event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Auth form submissions
    document.getElementById('loginFormElement').addEventListener('submit', handleLogin);
    document.getElementById('registerFormElement').addEventListener('submit', handleRegister);
    
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const section = e.currentTarget.dataset.section;
            switchSection(section);
        });
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Mood tracking
    document.querySelectorAll('.mood-option').forEach(option => {
        option.addEventListener('click', (e) => {
            selectMood(e.currentTarget);
        });
    });

    document.getElementById('intensitySlider').addEventListener('input', (e) => {
        document.getElementById('intensityValue').textContent = e.target.value;
    });

    document.getElementById('submitMood').addEventListener('click', submitMood);

    // Chat
    document.getElementById('sendMessage').addEventListener('click', sendChatMessage);
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    });

    document.querySelectorAll('.quick-response-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const message = e.currentTarget.dataset.message;
            document.getElementById('chatInput').value = message;
            sendChatMessage();
        });
    });

    // Profile
    document.getElementById('saveProfile').addEventListener('click', saveProfile);

    // Language selector
    document.getElementById('languageSelector').addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });

    // Dashboard controls
    document.getElementById('trendPeriod').addEventListener('change', (e) => {
        loadDashboardData(e.target.value);
    });
}

// Authentication functions
async function handleLogin(e) {
    e.preventDefault();
    showLoading();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('authToken', data.token);
            currentUser = data.user;
            hideAuthModal();
            loadApp();
            showToast('Login successful!', 'success');
        } else {
            showToast(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        showToast('Network error. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

async function handleRegister(e) {
    e.preventDefault();
    showLoading();

    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const language = document.getElementById('registerLanguage').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, language })
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('authToken', data.token);
            currentUser = data.user;
            hideAuthModal();
            loadApp();
            showToast('Registration successful!', 'success');
        } else {
            showToast(data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        showToast('Network error. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

async function verifyTokenAndLoadApp(token) {
    try {
        const response = await fetch('/api/auth/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const user = await response.json();
            currentUser = user;
            loadApp();
        } else {
            localStorage.removeItem('authToken');
            showAuthModal();
        }
    } catch (error) {
        localStorage.removeItem('authToken');
        showAuthModal();
    }
}

function handleLogout() {
    localStorage.removeItem('authToken');
    currentUser = null;
    showAuthModal();
    showToast('Logged out successfully', 'success');
}

// UI Functions
function showAuthModal() {
    document.getElementById('authModal').style.display = 'flex';
    document.getElementById('app').classList.add('hidden');
}

function hideAuthModal() {
    document.getElementById('authModal').style.display = 'none';
    document.getElementById('app').classList.remove('hidden');
}

function switchTab(tab) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    document.querySelector(`[onclick="switchTab('${tab}')"]`).classList.add('active');
    document.getElementById(`${tab}Form`).classList.add('active');
}

function switchSection(section) {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(section).classList.add('active');
    
    currentSection = section;
    
    // Load section-specific data
    if (section === 'dashboard') {
        loadDashboardData();
    } else if (section === 'mood') {
        loadTodayMood();
    } else if (section === 'chat') {
        loadChatHistory();
    } else if (section === 'profile') {
        loadProfile();
    }
}

function loadApp() {
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('authModal').style.display = 'none';
    
    // Set user language
    if (currentUser && currentUser.language) {
        currentLanguage = currentUser.language;
        document.getElementById('languageSelector').value = currentUser.language;
        updateTranslations();
    }
    
    // Load initial section
    switchSection('dashboard');
}

// Dashboard functions
async function loadDashboardData(period = '30') {
    showLoading();
    
    try {
        const response = await fetch(`/api/dashboard/trends?period=${period}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            updateDashboard(data);
        } else {
            showToast('Failed to load dashboard data', 'error');
        }
    } catch (error) {
        showToast('Network error loading dashboard', 'error');
    } finally {
        hideLoading();
    }
}

function updateDashboard(data) {
    // Update stats
    document.getElementById('streakCount').textContent = data.totalEntries || 0;
    document.getElementById('averageMood').textContent = data.averageIntensities ? 
        Object.values(data.averageIntensities).reduce((a, b) => a + b, 0) / Object.keys(data.averageIntensities).length : '-';
    document.getElementById('recommendationsCount').textContent = data.totalEntries || 0;

    // Update charts
    updateMoodTrendChart(data.dailyData);
    updateMoodDistributionChart(data.moodDistribution);

    // Update insights
    updateInsights(data.insights);

    // Update alerts
    updateAlerts(data.alerts);
}

function updateMoodTrendChart(dailyData) {
    const ctx = document.getElementById('moodTrendChart').getContext('2d');
    
    if (moodCharts.trend) {
        moodCharts.trend.destroy();
    }
    
    const labels = dailyData.map(d => new Date(d.date).toLocaleDateString());
    const intensities = dailyData.map(d => d.intensity);
    
    moodCharts.trend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Mood Intensity',
                data: intensities,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
}

function updateMoodDistributionChart(moodDistribution) {
    const ctx = document.getElementById('moodDistributionChart').getContext('2d');
    
    if (moodCharts.distribution) {
        moodCharts.distribution.destroy();
    }
    
    const labels = moodDistribution.map(m => m.mood);
    const data = moodDistribution.map(m => m.count);
    
    moodCharts.distribution = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#f093fb',
                    '#f5576c',
                    '#4facfe',
                    '#00f2fe',
                    '#43e97b',
                    '#38f9d7',
                    '#ffecd2'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function updateInsights(insights) {
    const container = document.getElementById('insightsList');
    container.innerHTML = '';
    
    if (insights && insights.length > 0) {
        insights.forEach(insight => {
            const div = document.createElement('div');
            div.className = 'insight-item';
            div.innerHTML = `<p>${insight.text}</p>`;
            container.appendChild(div);
        });
    } else {
        container.innerHTML = '<p>No insights available yet. Keep tracking your mood to see personalized insights!</p>';
    }
}

function updateAlerts(alerts) {
    const container = document.getElementById('alerts');
    container.innerHTML = '';
    
    if (alerts && alerts.length > 0) {
        alerts.forEach(alert => {
            const div = document.createElement('div');
            div.className = `alert alert-${alert.severity === 'high' ? 'danger' : 'warning'}`;
            div.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <strong>${alert.message}</strong>
                    ${alert.resources ? `<ul>${alert.resources.map(r => `<li>${r}</li>`).join('')}</ul>` : ''}
                </div>
            `;
            container.appendChild(div);
        });
    }
}

// Mood tracking functions
function selectMood(option) {
    document.querySelectorAll('.mood-option').forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    document.getElementById('submitMood').disabled = false;
}

async function submitMood() {
    const selectedMood = document.querySelector('.mood-option.selected');
    if (!selectedMood) return;

    const mood = selectedMood.dataset.mood;
    const emoji = selectedMood.dataset.emoji;
    const intensity = parseInt(document.getElementById('intensitySlider').value);
    const notes = document.getElementById('moodNotes').value;
    const tags = Array.from(document.querySelectorAll('.mood-tags input:checked')).map(cb => cb.value);

    showLoading();

    try {
        const response = await fetch('/api/mood/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({ mood, emoji, intensity, notes, tags })
        });

        const data = await response.json();
        
        if (response.ok) {
            showToast('Mood entry saved successfully!', 'success');
            loadTodayMood();
            // Show AI recommendation
            showAIRecommendation(data.recommendation);
        } else {
            showToast(data.message || 'Failed to save mood entry', 'error');
        }
    } catch (error) {
        showToast('Network error saving mood entry', 'error');
    } finally {
        hideLoading();
    }
}

async function loadTodayMood() {
    try {
        const response = await fetch('/api/mood/today', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        
        if (response.ok) {
            const entry = await response.json();
            if (entry) {
                displayTodayEntry(entry);
            } else {
                hideTodayEntry();
            }
        }
    } catch (error) {
        console.error('Error loading today\'s mood:', error);
    }
}

function displayTodayEntry(entry) {
    document.getElementById('todayEmoji').textContent = entry.emoji;
    document.getElementById('todayMood').textContent = entry.mood;
    document.getElementById('todayIntensity').textContent = `Intensity: ${entry.intensity}/10`;
    document.getElementById('todayNotes').textContent = entry.notes || 'No notes';
    
    const tagsContainer = document.getElementById('todayTags');
    tagsContainer.innerHTML = '';
    if (entry.tags && entry.tags.length > 0) {
        entry.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'entry-tag';
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });
    }
    
    document.getElementById('todayEntry').classList.remove('hidden');
}

function hideTodayEntry() {
    document.getElementById('todayEntry').classList.add('hidden');
}

function showAIRecommendation(recommendation) {
    document.getElementById('recommendationText').textContent = recommendation.text;
    document.getElementById('recommendationType').textContent = recommendation.type;
    document.getElementById('aiRecommendation').classList.remove('hidden');
}

// Chat functions
async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message to chat
    addChatMessage(message, true);
    input.value = '';

    showLoading();

    try {
        const response = await fetch('/api/chat/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        
        if (response.ok) {
            addChatMessage(data.aiResponse.message, false);
        } else {
            addChatMessage('Sorry, I encountered an error. Please try again.', false);
        }
    } catch (error) {
        addChatMessage('Sorry, I\'m having trouble connecting. Please try again.', false);
    } finally {
        hideLoading();
    }
}

function addChatMessage(message, isUser) {
    const container = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

async function loadChatHistory() {
    try {
        const response = await fetch('/api/chat/history?limit=20', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        
        if (response.ok) {
            const messages = await response.json();
            const container = document.getElementById('chatMessages');
            container.innerHTML = '';
            
            messages.forEach(msg => {
                addChatMessage(msg.message, msg.isUser);
            });
        }
    } catch (error) {
        console.error('Error loading chat history:', error);
    }
}

// Profile functions
async function loadProfile() {
    if (!currentUser) return;

    document.getElementById('profileUsername').textContent = currentUser.username;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileLanguage').value = currentUser.language || 'en';
    document.getElementById('reminderTime').value = currentUser.preferences?.reminderTime || '20:00';
    document.getElementById('notificationsEnabled').checked = currentUser.preferences?.notifications !== false;
}

async function saveProfile() {
    const language = document.getElementById('profileLanguage').value;
    const reminderTime = document.getElementById('reminderTime').value;
    const notifications = document.getElementById('notificationsEnabled').checked;

    showLoading();

    try {
        const response = await fetch('/api/auth/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
                language,
                preferences: {
                    reminderTime,
                    notifications
                }
            })
        });

        if (response.ok) {
            const data = await response.json();
            currentUser = data.user;
            showToast('Profile updated successfully!', 'success');
        } else {
            showToast('Failed to update profile', 'error');
        }
    } catch (error) {
        showToast('Network error updating profile', 'error');
    } finally {
        hideLoading();
    }
}

// Language functions
function changeLanguage(lang) {
    currentLanguage = lang;
    updateTranslations();
    
    // Update user language preference
    if (currentUser) {
        fetch('/api/auth/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({ language: lang })
        });
    }
}

function updateTranslations() {
    const t = translations[currentLanguage] || translations.en;
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        const keys = key.split('.');
        let value = t;
        
        for (const k of keys) {
            value = value[k];
        }
        
        if (value) {
            element.textContent = value;
        }
    });
}

// Utility functions
function showLoading() {
    document.getElementById('loadingSpinner').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingSpinner').classList.add('hidden');
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}