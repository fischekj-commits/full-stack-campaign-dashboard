#!/bin/bash

# Frontend Deployment Script for Campaign Dashboard

echo "🚀 Deploying Campaign Dashboard Frontend..."

# Navigate to client directory
cd "$(dirname "$0")/client" || exit 1

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the frontend
echo "🔨 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo "✅ Build successful!"
echo ""
echo "📂 Built files are in: client/dist"
echo ""
echo "Choose deployment option:"
echo "1. Deploy to Vercel (recommended)"
echo "2. Deploy to Netlify"
echo "3. Copy deployment instructions"
echo ""

read -p "Enter option (1-3): " option

case $option in
  1)
    echo "🔵 Deploying to Vercel..."
    if command -v vercel &> /dev/null; then
      vercel --prod
    else
      echo "❌ Vercel CLI not found. Install with: npm install -g vercel"
      echo "Then run: vercel --prod"
    fi
    ;;
  2)
    echo "🟢 Deploying to Netlify..."
    if command -v netlify &> /dev/null; then
      netlify deploy --prod --dir=dist
    else
      echo "❌ Netlify CLI not found. Install with: npm install -g netlify-cli"
      echo "Then run: netlify deploy --prod --dir=dist"
    fi
    ;;
  3)
    echo ""
    echo "📋 Manual Deployment Instructions:"
    echo ""
    echo "Vercel:"
    echo "  1. Install: npm install -g vercel"
    echo "  2. Deploy: cd client && vercel --prod"
    echo ""
    echo "Netlify:"
    echo "  1. Install: npm install -g netlify-cli"
    echo "  2. Deploy: cd client && netlify deploy --prod --dir=dist"
    echo ""
    echo "Railway:"
    echo "  1. Create new service in Railway"
    echo "  2. Select the 'client' directory as root"
    echo "  3. Railway will auto-detect and deploy"
    echo ""
    ;;
  *)
    echo "Invalid option"
    exit 1
    ;;
esac
