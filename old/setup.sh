#!/bin/bash

# Setup script for gemini-review plugin development

set -e

echo "🚀 Setting up gemini-review plugin..."
echo ""

# Check Node.js version
echo "Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ Node.js 18+ required. Current version: $(node -v)"
  exit 1
fi
echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "Installing Node.js dependencies..."
cd gemini-review
npm install
echo "✅ Dependencies installed"
echo ""

# Check for gemini-cli
echo "Checking for gemini-cli..."
if ! command -v gemini &> /dev/null; then
  echo "⚠️  gemini-cli not found"
  echo ""
  echo "To use this plugin, you need to install gemini-cli:"
  echo "  pip install gemini-cli"
  echo ""
  echo "And authenticate (choose one):"
  echo "  gemini auth login                    # Google account (recommended)"
  echo "  gemini config set api_key YOUR_KEY   # API key"
  echo ""
  echo "Get API key from: https://aistudio.google.com/apikey"
else
  echo "✅ gemini-cli is installed"
  
  # Test gemini-cli
  echo ""
  echo "Testing gemini-cli configuration..."
  if npm run test 2>&1 | grep -q "All tests passed"; then
    echo "✅ gemini-cli is configured correctly!"
  else
    echo "⚠️  gemini-cli may not be configured correctly"
    echo "Run 'npm test' in the gemini-review directory for details"
  fi
fi

cd ..

echo ""
echo "=" 
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Push this repository to GitHub"
echo "2. In Claude Code, run: /plugin marketplace add bgreenwell/claude-plugins"
echo "3. Install the plugin: /plugin install gemini-review@bgreenwell"
echo "4. Try it: Ask Claude to have Gemini review some code!"
echo "="
