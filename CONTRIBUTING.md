# Contributing to claude-plugins

Thank you for your interest in contributing to the `claude-plugins` marketplace! We welcome contributions including new plugins, improvements to existing plugins, documentation updates, and bug fixes.

## Ways to Contribute

1. **Add a new plugin** to the marketplace
2. **Improve existing plugins** with new features or bug fixes
3. **Enhance documentation** for better user experience
4. **Report bugs** or suggest features via [GitHub Issues](https://github.com/bgreenwell/claude-plugins/issues)

## Getting Started

### Prerequisites

- **Git** for version control
- **claude-forge CLI** for scaffolding and validation
  ```bash
  git clone https://github.com/bgreenwell/claude-forge.git
  cd claude-forge
  cargo build --release
  # Add to PATH or use full path to ./target/release/cforge
  ```
- **External tools** depending on plugin (e.g., `gemini-cli` for Gemini-based plugins)

### Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/claude-plugins.git
   cd claude-plugins
   ```
3. **Run the setup script** (optional):
   ```bash
   ./setup.sh
   ```

## Development Workflow

### Adding a New Plugin

1. **Create a new branch** for your plugin:
   ```bash
   git checkout -b plugin/your-plugin-name
   ```

2. **Scaffold the plugin** using claude-forge:
   ```bash
   cforge new-plugin --name your-plugin-name --description "Brief description"
   ```

   Or manually create the standard structure:
   ```
   your-plugin-name/
   ├── .claude-plugin/
   │   └── plugin.json
   ├── skills/
   │   └── skill-name.md
   ├── commands/
   ├── agents/
   ├── hooks/
   └── README.md
   ```

3. **Implement your plugin**:
   - Create skill files in `skills/` with YAML frontmatter
   - Add commands, agents, or hooks as needed
   - Write comprehensive documentation in `README.md`

4. **Update plugin metadata** in `.claude-plugin/plugin.json`:
   ```json
   {
     "name": "your-plugin-name",
     "version": "0.1.0",
     "description": "What your plugin does",
     "author": {
       "name": "Your Name",
       "email": "[email protected]"
     },
     "homepage": "https://github.com/bgreenwell/claude-plugins/tree/main/your-plugin-name",
     "repository": "https://github.com/bgreenwell/claude-plugins",
     "license": "MIT",
     "keywords": ["keyword1", "keyword2"],
     "skills": ["./skills/skill-name.md"]
   }
   ```

5. **Register in marketplace**:
   ```bash
   cforge register your-plugin-name
   ```

   Or manually add to `.claude-plugin/marketplace.json`:
   ```json
   {
     "name": "your-plugin-name",
     "version": "0.1.0",
     "source": "./your-plugin-name",
     "description": "Brief description"
   }
   ```

6. **Validate your plugin**:
   ```bash
   cforge validate --path your-plugin-name
   ```

7. **Test locally**:
   ```bash
   # In Claude Code:
   /plugin marketplace add /path/to/claude-plugins
   /plugin install your-plugin-name@bgreenwell-plugins
   ```

### Updating an Existing Plugin

1. **Create a feature branch**:
   ```bash
   git checkout -b fix/plugin-name-issue
   ```

2. **Make your changes** to the plugin files

3. **Bump the version** in:
   - `plugin-name/.claude-plugin/plugin.json`
   - `.claude-plugin/marketplace.json` (for this plugin entry)

4. **Update CHANGELOG.md** following [Keep a Changelog](https://keepachangelog.com/) format

5. **Validate and test** (see steps 6-7 above)

## Plugin Development Guidelines

### Directory Structure

Follow the claude-forge standard structure:

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json          # Required: Plugin metadata
├── skills/                   # Skills (markdown with YAML frontmatter)
│   └── skill-name.md
├── commands/                 # Slash commands (optional)
│   └── command-name.md
├── agents/                   # Specialized agents (optional)
│   └── agent-name.md
├── hooks/                    # Lifecycle hooks (optional)
│   └── hook-name.sh
└── README.md                 # Required: User documentation
```

### Skill Files

Skills must have YAML frontmatter:

```markdown
---
description: Brief description of what this skill enables Claude to do
argument-hint: [optional parameters]
---

# Skill Name

(Instructions for Claude: Describe how to use this skill, what tools to run,
and expected outputs.)

## When to Use

- Use case 1
- Use case 2

## Examples

Example usage scenarios.
```

### Documentation Requirements

Every plugin must include a `README.md` with:

1. **Title and description**: What the plugin does
2. **Prerequisites**: Required tools, API keys, etc.
3. **Installation**: How to install and configure
4. **Usage**: Examples of how to use the plugin
5. **Privacy/Security**: What data is sent where (if applicable)
6. **Troubleshooting**: Common issues and solutions
7. **License**: MIT license

### Naming Conventions

- **Plugin names**: kebab-case (e.g., `gemini-review`)
- **Skill files**: kebab-case (e.g., `plagiarism-check.md`)
- **Command files**: kebab-case (e.g., `daily-standup.md`)
- **Agent files**: kebab-case (e.g., `qa-reviewer.md`)

### Versioning

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features (backward compatible)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes

Version numbers must be updated in:
1. Plugin's `.claude-plugin/plugin.json`
2. Marketplace's `.claude-plugin/marketplace.json` plugin entry
3. `CHANGELOG.md`

## Submitting Changes

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature or plugin
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat(gemini-review): add architecture review template"
git commit -m "fix(plagiarism-review): correct citation detection logic"
git commit -m "docs: update README with new plugin examples"
```

### Pull Request Process

1. **Ensure your changes pass validation**:
   ```bash
   cforge validate --path your-plugin-name
   ```

2. **Test the plugin** in Claude Code to verify functionality

3. **Update documentation**:
   - Plugin README.md
   - CHANGELOG.md
   - Root README.md (if adding new plugin)

4. **Commit your changes** with clear messages

5. **Push to your fork**:
   ```bash
   git push origin plugin/your-plugin-name
   ```

6. **Open a Pull Request** with:
   - Clear title describing the change
   - Description of what the plugin does or what was fixed
   - Testing steps you performed
   - Any breaking changes or special considerations

## Code Review

All submissions require review. We'll check:

- ✅ Plugin validates with `cforge validate`
- ✅ Documentation is clear and complete
- ✅ YAML frontmatter is correct
- ✅ Version numbers are updated appropriately
- ✅ CHANGELOG.md is updated
- ✅ No security issues (hardcoded credentials, etc.)
- ✅ Plugin works as described

## Security Guidelines

When developing plugins:

- **Never commit** API keys, credentials, or secrets
- **Validate inputs** before passing to shell commands
- **Document data flows**: What data goes where (LLM APIs, external services)
- **Use environment variables** for sensitive configuration
- **Sanitize file paths** to prevent directory traversal
- **Set timeouts** for external processes
- **Handle errors gracefully** with actionable messages

## Plugin Quality Checklist

Before submitting, ensure:

- [ ] Plugin has a clear, focused purpose
- [ ] README.md is comprehensive with examples
- [ ] Prerequisites are clearly documented
- [ ] Plugin validates successfully (`cforge validate`)
- [ ] Tested in Claude Code with clean install
- [ ] YAML frontmatter includes required `description` field
- [ ] Version numbers updated in all locations
- [ ] CHANGELOG.md has entry for this version
- [ ] No hardcoded credentials or sensitive data
- [ ] Error messages are helpful and actionable
- [ ] Privacy/data handling documented (if applicable)

## Testing

### Local Testing

Test your plugin thoroughly before submitting:

1. **Clean install test**:
   ```bash
   # Remove any previous installations
   /plugin uninstall plugin-name

   # Add local marketplace
   /plugin marketplace add /path/to/claude-plugins

   # Install plugin
   /plugin install plugin-name@bgreenwell-plugins
   ```

2. **Functionality test**: Verify all features work as documented

3. **Edge case test**: Try invalid inputs, missing prerequisites, etc.

4. **Documentation test**: Can a new user follow the README successfully?

## Getting Help

- **Questions?** Open a [GitHub Discussion](https://github.com/bgreenwell/claude-plugins/discussions)
- **Bug report?** Open a [GitHub Issue](https://github.com/bgreenwell/claude-plugins/issues)
- **Need review?** Tag @bgreenwell in your PR

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

Thank you for contributing to claude-plugins! 🎉
