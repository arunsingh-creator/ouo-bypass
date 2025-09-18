#!/bin/bash

# AI Mental Health Companion - Setup Script
# This script sets up the development environment

echo "🚀 Setting up AI Mental Health Companion..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v14 or higher) first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "❌ Node.js version 14 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if MongoDB is available
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed locally."
    echo "   You can:"
    echo "   1. Install MongoDB locally: https://www.mongodb.com/try/download/community"
    echo "   2. Use MongoDB Atlas (cloud): https://www.mongodb.com/atlas"
    echo "   3. Use Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest"
    echo ""
    echo "   For now, we'll continue with the setup..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created from template"
    echo "⚠️  Please update .env with your MongoDB URI and JWT secret"
else
    echo "✅ .env file already exists"
fi

# Create logs directory
mkdir -p logs

# Check if MongoDB is running
if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is not running. Starting MongoDB..."
        if command -v brew &> /dev/null; then
            brew services start mongodb-community
        elif command -v systemctl &> /dev/null; then
            sudo systemctl start mongod
        else
            echo "   Please start MongoDB manually: mongod"
        fi
    fi
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your MongoDB URI and JWT secret"
echo "2. Start MongoDB (if not already running): mongod"
echo "3. Start the application: npm run dev"
echo "4. Open your browser: http://localhost:3000"
echo ""
echo "🔧 Available commands:"
echo "   npm start     - Start production server"
echo "   npm run dev   - Start development server with auto-reload"
echo "   npm test      - Run tests (if available)"
echo ""
echo "📚 Documentation:"
echo "   README.md     - Complete setup and usage guide"
echo "   demo-script.md - Demo presentation script"
echo ""
echo "🌟 Happy coding! Your AI Mental Health Companion is ready to go!"