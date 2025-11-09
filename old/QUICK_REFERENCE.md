# Quick Reference - Gemini Review Plugin

## 📦 Repository Structure
```
claude-plugins/
├── .claude-plugin/marketplace.json    # Marketplace catalog
├── gemini-review/                     # Plugin directory
│   ├── .claude-plugin/plugin.json    # Plugin manifest
│   ├── .mcp.json                     # MCP config
│   ├── server.js                     # MCP server (350+ lines)
│   ├── package.json                  # Dependencies
│   ├── test-server.js               # Tests
│   └── README.md                     # Documentation
├── README.md                          # Marketplace overview
├── GETTING_STARTED.md                 # Developer guide
├── IMPLEMENTATION_SUMMARY.md          # This implementation
└── setup.sh                           # Setup script
```

## 🚀 Publishing to GitHub (First Time)

```bash
cd /path/to/claude-plugins

# Initialize git
git init
git add .
git commit -m "Initial commit: gemini-review plugin v1.0.0"

# Connect to GitHub (create repo first at github.com/bgreenwell/claude-plugins)
git remote add origin [email protected]:bgreenwell/claude-plugins.git
git branch -M main
git push -u origin main
```

## 🧪 Testing Locally

```bash
# 1. Install dependencies
cd gemini-review
npm install

# 2. Run tests
npm test

# 3. Test in Claude Code
/plugin marketplace add /absolute/path/to/claude-plugins
/plugin install gemini-review@claude-plugins

# 4. Try it
"Have Gemini review this code for performance"
```

## 👥 User Installation (After Publishing)

```bash
# Prerequisites
pip install gemini-cli

# Authenticate (choose one)
gemini auth login              # Google account (recommended)
# OR
gemini config set api_key KEY  # API key

# Install from GitHub
/plugin marketplace add bgreenwell/claude-plugins
/plugin install gemini-review@bgreenwell
```

## 💬 Usage Examples

**Code review:**
```
"Have Gemini review my changes to auth.js for security issues"
"Ask Gemini to check this function for bugs"
```

**Plan validation:**
```
"Get Gemini's opinion on this refactoring plan"
"Have Gemini review my architecture approach"
```

**Documentation review:**
```
"Ask Gemini to review this README for clarity"
"Have Gemini check @docs/api.md for technical accuracy"
```

**Test coverage:**
```
"Get Gemini's assessment of my test coverage"
"Have Gemini review these tests for completeness"
```

## 🔧 Common Commands

### Plugin Management
```bash
/plugin marketplace add bgreenwell/claude-plugins  # Add marketplace
/plugin marketplace list                           # List marketplaces
/plugin marketplace update bgreenwell              # Update marketplace
/plugin install gemini-review@bgreenwell           # Install plugin
/plugin list                                       # List installed
/plugin uninstall gemini-review                    # Remove plugin
```

### Development
```bash
cd gemini-review
npm install              # Install dependencies
npm test                 # Run tests
npm start                # Start MCP server (for debugging)
```

### Git Workflow
```bash
git status               # Check changes
git add .                # Stage changes
git commit -m "msg"      # Commit
git push                 # Push to GitHub
git tag v1.1.0           # Tag version
git push --tags          # Push tags
```

## 📋 Review Types

| Type | Focus Areas |
|------|-------------|
| `code_changes` | Correctness, performance, security, maintainability |
| `plan` | Feasibility, risks, completeness, alternatives |
| `documentation` | Accuracy, clarity, grammar, tone |
| `architecture` | Scalability, trade-offs, technology choices |
| `test_coverage` | Completeness, edge cases, quality |
| `custom` | User-specified criteria |

## 🐛 Troubleshooting

**Plugin not loading:**
```bash
claude --debug           # Check logs
# Verify JSON syntax in manifests
```

**gemini-cli not found:**
```bash
pip install gemini-cli
which gemini            # Verify installation
```

**Authentication errors:**
```bash
gemini config set api_key YOUR_KEY
gemini -p "test"        # Verify it works
```

**MCP server issues:**
```bash
cd gemini-review
npm install             # Reinstall dependencies
node --version          # Check Node 18+
```

## 📝 Version Updates

1. Edit version in:
   - `gemini-review/.claude-plugin/plugin.json`
   - `.claude-plugin/marketplace.json`
   - `gemini-review/package.json`

2. Commit and push:
   ```bash
   git add .
   git commit -m "Bump version to 1.1.0"
   git tag v1.1.0
   git push && git push --tags
   ```

3. Users update:
   ```bash
   /plugin marketplace update bgreenwell
   ```

## 🎯 Key Files to Remember

- **server.js** - Main MCP server logic (edit for functionality changes)
- **plugin.json** - Plugin metadata (edit for version/description)
- **marketplace.json** - Marketplace catalog (edit when adding plugins)
- **README.md** (plugin) - User documentation
- **.mcp.json** - MCP server configuration (rarely need to edit)

## 🔗 Important Links

- Plugin docs: https://code.claude.com/docs/en/plugins
- MCP docs: https://code.claude.com/docs/en/mcp
- Gemini API: https://aistudio.google.com/apikey
- Your repo: https://github.com/bgreenwell/claude-plugins

---

**Ready to ship!** Push to GitHub and start using across all your projects. 🚀
