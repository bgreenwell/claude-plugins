# CLAUDE.md

Context for Claude Code when working with this repository.

## What This Repository Is

This is a **Claude Code plugin marketplace** - a distribution point for Claude Code plugins. The repository structure follows the [official plugin marketplace specification](https://code.claude.com/docs/en/plugin-marketplaces).

**Owner:** Brandon Greenwell ([email protected])
**Distribution:** GitHub (`bgreenwell/claude-plugins`)

## Repository Structure

```
claude-plugins/
├── .claude-plugin/
│   └── marketplace.json         # Marketplace catalog (CRITICAL)
└── [plugin-name]/               # Each plugin in its own directory
    ├── .claude-plugin/
    │   └── plugin.json          # Plugin metadata
    ├── skills/                  # Skills (markdown with YAML frontmatter)
    │   └── skill-name.md
    ├── commands/                # Slash commands (optional)
    ├── agents/                  # Specialized agents (optional)
    ├── hooks/                   # Lifecycle hooks (optional)
    └── README.md                # User documentation
```

**Important:** Each plugin is a top-level directory. Check `.claude-plugin/marketplace.json` for the complete list.

## Critical Files

### `.claude-plugin/marketplace.json`
The marketplace catalog. This file:
- Must use valid JSON syntax
- Lists all plugins in the `plugins` array
- Must validate with `claude plugin validate` before commits
- Uses kebab-case for names

### Per-Plugin Files

**Required:**
- `.claude-plugin/plugin.json` - Plugin metadata and component references
- `README.md` - User-facing documentation

**Component Directories (create as needed):**
- `skills/` - Skills that teach Claude how to use external tools (markdown with YAML frontmatter)
- `commands/` - Slash commands for users (markdown with YAML frontmatter)
- `agents/` - Specialized sub-agents with specific capabilities (markdown with YAML frontmatter)
- `hooks/` - Lifecycle event handlers (shell scripts)

## Common Development Tasks

### Adding a New Plugin

**Recommended: Use claude-forge CLI**
```bash
cd /path/to/claude-plugins
cforge new-plugin --name plugin-name --description "Plugin description"
```

**Manual approach:**
1. Create plugin directory: `mkdir plugin-name`
2. Create standard structure:
   - `plugin-name/.claude-plugin/plugin.json` with metadata
   - `plugin-name/skills/` directory
   - `plugin-name/commands/`, `plugin-name/agents/`, `plugin-name/hooks/` (as needed)
3. Create skill files in `skills/` with YAML frontmatter
4. Create `README.md` with documentation
5. Update `.claude-plugin/marketplace.json` - add entry to `plugins` array
6. Validate: `cforge validate --path plugin-name`
7. Test locally: `/plugin marketplace add ./` then `/plugin install plugin-name@bgreenwell-plugins`

### Updating a Plugin

1. Make changes to plugin files (skills, commands, agents, hooks, README)
2. Bump version number in:
   - Plugin's `.claude-plugin/plugin.json`
   - `.claude-plugin/marketplace.json` entry for that plugin
3. Update CHANGELOG.md with changes
4. Validate: `cforge validate --path plugin-name`
5. Test installation from local marketplace

### Testing Locally

```bash
# Add local marketplace
/plugin marketplace add ./

# Install plugin
/plugin install plugin-name@bgreenwell-plugins

# Test functionality
# (verify tools/commands/agents work)

# Clean up
/plugin uninstall plugin-name
/plugin marketplace remove bgreenwell-plugins
```

## Code Conventions

### Naming
- Marketplace name: `bgreenwell-plugins` (kebab-case)
- Plugin names: kebab-case (e.g., `gemini-review`)
- Skill files: kebab-case (e.g., `gemini-review.md`)
- Component names: kebab-case for files, descriptive for content

### Versioning
Use [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

Version must be updated in:
1. Plugin's `.claude-plugin/plugin.json`
2. Marketplace's `marketplace.json` plugin entry

### Skill Development Guidelines
When creating skills (markdown files that teach Claude to use tools):
- Use YAML frontmatter with required `description` field
- Provide clear, step-by-step instructions for Claude
- Specify what external tools/commands to use
- Include error handling guidance
- Document expected inputs and outputs
- Add examples where helpful
- Consider when Claude should autonomously use this skill

## Security Checklist

When working with plugin code:
- Never commit API keys or credentials
- Validate all file paths (prevent directory traversal)
- Sanitize inputs before shell execution
- Use timeouts for external processes
- Check dependencies for vulnerabilities
- Document what data is sent to external services
- Test with malicious inputs

## Pre-Commit Requirements

Before committing changes:
1. Run `cforge validate --path plugin-name` - must pass
2. Test plugin installation from local marketplace
3. Verify plugin functionality in Claude Code
4. Update version numbers in both plugin.json and marketplace.json
5. Update CHANGELOG.md with changes
6. Ensure README.md is accurate and up-to-date

## Environment

- **Platform:** Cross-platform (macOS, Linux, Windows)
- **Distribution:** GitHub serves marketplace via raw URLs
- **Development Tools:** claude-forge CLI for scaffolding and validation
- **External Dependencies:** Plugins may require external tools (e.g., gemini-cli)

## Key References

- [Plugin Marketplaces Guide](https://code.claude.com/docs/en/plugin-marketplaces)
- [claude-forge Repository](https://github.com/bgreenwell/claude-forge) - CLI tool for plugin development
- Current plugins: See `.claude-plugin/marketplace.json`

---

**When working in this repo, you're likely:** developing/updating plugins, testing functionality, updating the marketplace catalog, or reviewing documentation. Always validate with `cforge validate` before committing.
