# Getting Started with This Marketplace

This repository contains a Claude Code plugin marketplace with the gemini-review plugin.

## Repository Structure

```
claude-plugins/
├── .claude-plugin/
│   └── marketplace.json          # Marketplace catalog
├── gemini-review/                 # Gemini Review Plugin
│   ├── .claude-plugin/
│   │   └── plugin.json           # Plugin manifest
│   ├── .mcp.json                 # MCP server configuration
│   ├── server.js                 # MCP server implementation
│   ├── package.json              # Node.js dependencies
│   ├── test-server.js            # Test script
│   └── README.md                 # Plugin documentation
├── .gitignore
├── LICENSE
├── README.md                     # Marketplace overview
├── GETTING_STARTED.md            # This file
└── setup.sh                      # Development setup script
```

## For Plugin Users

### Prerequisites

1. **Claude Code** installed and running
2. **gemini-cli** installed: `pip install gemini-cli`
3. **Authenticate with Gemini** (choose one):
   - Google account: `gemini auth login`
   - API key: `gemini config set api_key YOUR_KEY` (get from https://aistudio.google.com/apikey)

### Installation

```bash
# In Claude Code
/plugin marketplace add bgreenwell/claude-plugins
/plugin install gemini-review@bgreenwell
```

### Usage

Just ask Claude naturally:
- "Have Gemini review my changes to auth.js"
- "Ask Gemini to validate this architecture plan"
- "Get Gemini's opinion on this refactoring approach"

See [gemini-review/README.md](./gemini-review/README.md) for detailed usage.

## For Plugin Developers

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bgreenwell/claude-plugins.git
   cd claude-plugins
   ```

2. **Run setup script**:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Test the MCP server**:
   ```bash
   cd gemini-review
   npm test
   ```

### Testing Locally

Create a local marketplace for testing:

```bash
# In Claude Code
/plugin marketplace add ./path/to/claude-plugins
/plugin install gemini-review@claude-plugins
```

### Making Changes

1. Edit files in `gemini-review/`
2. Test locally with the marketplace command above
3. Update version in `plugin.json` and `marketplace.json`
4. Commit and push to GitHub
5. Users can update with `/plugin marketplace update bgreenwell`

## Publishing Your Changes

### First-Time Setup

1. **Create GitHub repository**: https://github.com/new
2. **Push this code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: gemini-review plugin"
   git remote add origin https://github.com/bgreenwell/claude-plugins.git
   git push -u origin main
   ```

### Updating the Plugin

1. Make your changes
2. Update version numbers:
   - `gemini-review/.claude-plugin/plugin.json`
   - `.claude-plugin/marketplace.json`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update gemini-review to v1.1.0"
   git push
   ```

Users get updates automatically when they run:
```bash
/plugin marketplace update bgreenwell
```

## Adding More Plugins

To add a new plugin to this marketplace:

1. **Create plugin directory**:
   ```bash
   mkdir my-new-plugin
   mkdir my-new-plugin/.claude-plugin
   ```

2. **Add plugin files**:
   - `my-new-plugin/.claude-plugin/plugin.json`
   - Plugin components (commands/, agents/, skills/, etc.)
   - `my-new-plugin/README.md`

3. **Update marketplace catalog**:
   Edit `.claude-plugin/marketplace.json` and add your plugin to the `plugins` array:
   ```json
   {
     "name": "my-new-plugin",
     "source": "./my-new-plugin",
     "description": "What your plugin does",
     "version": "1.0.0",
     ...
   }
   ```

4. **Test locally**:
   ```bash
   /plugin marketplace add ./path/to/claude-plugins
   /plugin install my-new-plugin@claude-plugins
   ```

5. **Commit and push**

## Troubleshooting

### Plugin not loading
- Check JSON syntax in manifest files
- Verify directory structure matches documentation
- Look for errors with `claude --debug`

### MCP server not starting
- Check Node.js version (18+ required)
- Run `npm install` in plugin directory
- Check server.js for syntax errors

### Gemini reviews not working
- Verify gemini-cli is installed: `which gemini`
- Test manually: `gemini -p "hello"`
- Check API key configuration

## Resources

- [Claude Code Plugin Documentation](https://code.claude.com/docs/en/plugins)
- [MCP Documentation](https://code.claude.com/docs/en/mcp)
- [Plugin Examples](https://github.com/wshobson/agents)

## Questions?

Open an issue: https://github.com/bgreenwell/claude-plugins/issues

Happy coding! 🚀
