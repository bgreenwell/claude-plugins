# Claude Code Plugins by Brandon Greenwell

Personal collection of Claude Code plugins for productivity and development workflows.

## Available Plugins

### 🤖 [Gemini Review](./gemini-review)

Get a second opinion from Google's Gemini on Claude Code's work. Integrates gemini-cli for independent validation of code changes, plans, documentation, and architecture.

**Status:** ✅ Stable v1.1.0

**Use cases:**
- Cross-validate critical code changes
- Get independent architectural review
- Verify documentation accuracy
- Comprehensive test coverage assessment

**Prerequisites:** Requires `gemini-cli` and Gemini authentication (Google account or API key)

[→ View Plugin Details](./gemini-review/README.md)

### 📝 [Plagiarism Review](./plagiarism-review)

Multi-layered plagiarism detection for academic writing using LLM analysis, local algorithms, and web search.

**Status:** ✅ Stable v1.0.0

**Use cases:**
- Check academic writing for originality
- Detect citation issues
- Analyze writing style consistency
- Verify academic integrity before submission

**Prerequisites:** Requires `gemini-cli` for LLM analysis, optional Python packages for enhanced features

[→ View Plugin Details](./plagiarism-review/README.md)

### 🔌 [Xquik](./xquik)

Plan Xquik REST API, MCP, webhook, and X data automation workflows with source-backed setup guidance.

**Status:** ✅ Stable v1.0.0

**Use cases:**
- Choose between Xquik REST API, MCP, and webhook workflows
- Plan X data extraction, monitoring, and automation tasks
- Keep API examples tied to Xquik's public docs and OpenAPI document

**Prerequisites:** Requires an Xquik account and API key for REST API requests

[→ View Plugin Details](./xquik/README.md)

---

## Installation

### Quick Start

```bash
# Add this marketplace to Claude Code
/plugin marketplace add bgreenwell/claude-plugins

# Install a specific plugin
/plugin install gemini-review@bgreenwell
```

### For Teams

Add to your repository's `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "bgreenwell": {
      "source": {
        "source": "github",
        "repo": "bgreenwell/claude-plugins"
      }
    }
  },
  "enabledPlugins": ["gemini-review"]
}
```

When team members trust the repository folder, plugins install automatically.

## Coming Soon

More plugins in development! Check back for updates.

Have an idea for a plugin? [Open an issue](https://github.com/bgreenwell/claude-plugins/issues)!

## Plugin Development

Want to create your own plugins? Check out the [official documentation](https://code.claude.com/docs/en/plugins).

### Repository Structure

```
claude-plugins/
├── .claude-plugin/
│   └── marketplace.json          # Marketplace catalog
├── xquik/                         # Plugin: Xquik API, MCP, and webhook planning
│   ├── .claude-plugin/
│   │   └── plugin.json
│   ├── skills/
│   │   └── xquik.md
│   └── README.md
├── gemini-review/                 # Plugin: Second opinions from Gemini
│   ├── .claude-plugin/
│   │   └── plugin.json
│   ├── skills/
│   │   └── gemini-review.md
│   ├── commands/
│   ├── agents/
│   ├── hooks/
│   └── README.md
├── plagiarism-review/             # Plugin: Plagiarism detection
│   ├── .claude-plugin/
│   │   └── plugin.json
│   ├── skills/
│   │   └── plagiarism-review.md
│   ├── commands/
│   ├── agents/
│   ├── hooks/
│   └── README.md
├── CLAUDE.md                      # Context file for Claude Code
├── CHANGELOG.md                   # Version history
├── LICENSE
├── README.md
└── setup.sh                       # Development setup script
```

## About

This marketplace contains personal productivity tools and experiments with Claude Code's plugin system. Plugins are MIT licensed and free to use, fork, or adapt.

**Author:** Brandon Greenwell  
**Contact:** [email protected]  
**Website:** https://github.com/bgreenwell

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

For bugs or feature requests, [open an issue](https://github.com/bgreenwell/claude-plugins/issues).

## License

MIT License - See individual plugin directories for details.

---

**Happy coding with Claude Code!** 🚀
