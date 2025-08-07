#!/bin/bash

# Adobe Enterprise CMS - Demo Setup Script
# This script prepares the demo environment for the Adobe presentation

set -e

echo "🎯 Setting up Adobe Enterprise CMS Demo..."
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "keystone.ts" ]; then
    echo "❌ Error: Please run this script from the adobe-enterprise-cms directory"
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm globally..."
    npm install -g pnpm
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Run postinstall to set up Keystone
echo "⚙️  Running Keystone setup..."
pnpm postinstall

# Remove existing database to ensure clean start
echo "🗄️  Preparing clean database..."
rm -f adobe-cms.db adobe-cms.db-journal keystone.db keystone.db-journal

# Create upload directories
echo "📁 Creating upload directories..."
mkdir -p public/images public/documents public/videos public/assets

echo ""
echo "✅ Demo setup complete!"
echo ""
echo "🚀 To start the demo:"
echo "   1. Run: pnpm dev"
echo "   2. In another terminal: pnpm seed-data"
echo "   3. Open: http://localhost:3000"
echo ""
echo "🔐 Demo credentials:"
echo "   Admin: james.wilson@adobe.com / demo123"
echo "   Content Manager: sarah.johnson@adobe.com / demo123"
echo "   Brand Manager: michael.chen@adobe.com / demo123"
echo "   Creative: emily.rodriguez@adobe.com / demo123"
echo ""
echo "📋 See DEMO_SCRIPT.md for the full presentation guide"
echo ""
echo "Good luck with your Adobe presentation! 🎉"