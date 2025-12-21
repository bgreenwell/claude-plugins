# Gemini Review Plugin

Get independent second opinions from Google's Gemini AI on your code, plans, documentation, and architecture decisions.

## What's New in v1.2

**Slash Commands:**
- `/gemini-review` - Quick review with smart defaults
- `/gemini-batch-review` - Batch review with real-time progress

**Enhanced Capabilities:**
- JSON output for structured results and token tracking
- Stream-JSON for real-time progress on long reviews
- Directory context support for architectural reviews
- Improved error handling with retry logic
- Better model selection guidance

## Overview

The Gemini Review plugin enables Claude Code to leverage Google's Gemini AI for independent validation and cross-checking of critical work. Use it when you need multiple AI perspectives, want to catch blind spots, or require validation before making important decisions.

## Why Use This?

- **Independent Validation**: Get a second LLM perspective on important decisions
- **Catch Blind Spots**: Different models have different strengths and may notice different issues
- **Cross-Validation**: Verify critical code changes with multiple AI opinions
- **Multiple Perspectives**: Combine Claude and Gemini's insights for comprehensive reviews
- **Proactive Integration**: Claude knows when to autonomously consult Gemini

## Prerequisites

### 1. Install gemini-cli

```bash
pip install gemini-cli
```

### 2. Authenticate with Gemini

Choose one method:

**Option A: Google OAuth (recommended)**
```bash
gemini auth login
```

**Option B: API Key**
```bash
# Get a key from https://aistudio.google.com/apikey
gemini config set api_key YOUR_API_KEY
```

### 3. Verify Setup

```bash
gemini -p "test"
```

If you see a response from Gemini, you're ready!

**Setup time:** ~5 minutes

## Installation

### Add the Marketplace

```bash
/plugin marketplace add https://github.com/bgreenwell/claude-plugins
```

### Install the Plugin

```bash
/plugin install gemini-review@bgreenwell-plugins
```

### Verify Installation

Ask Claude:
```
"Do you have the gemini-review skill available?"
```

## Usage

### Three Ways to Get Reviews

#### 1. Natural Language (Most Flexible)

Simply ask Claude naturally. Claude will autonomously consult Gemini:

```
"Review my changes to auth.js for security issues"
"Get a second opinion on this refactoring"
"Should I use Redis or Memcached for session storage?"
"Are my tests comprehensive enough?"
```

#### 2. Quick Command (Explicit Review)

Use `/gemini-review` for quick, targeted reviews:

```bash
# Review staged files
/gemini-review

# Review specific files
/gemini-review src/auth/login.js

# Security-focused review
/gemini-review src/auth/* --focus security

# Deep review with Pro model
/gemini-review src/api/* --model pro
```

**Options:**
- `[file-pattern]` - Files to review (default: git staged files)
- `--model flash|pro` - Model selection (default: flash)
- `--focus area` - Focus area (security, performance, testing, etc.)

#### 3. Batch Review (Multiple Files)

Use `/gemini-batch-review` for reviewing many files with progress:

```bash
# Review multiple directories
/gemini-batch-review src/ tests/ docs/

# Security audit across modules
/gemini-batch-review src/auth src/api --focus security --model pro

# Performance review
/gemini-batch-review src/services src/utils --focus performance
```

**Features:**
- Real-time progress tracking
- Aggregated results by file
- Optimal for 5-20 files
- Shows token usage

### Example Prompts

**Review code changes:**
```
"Review my changes to auth.js for security issues"
"Get a second opinion on this refactoring"
```

**Review architectural decisions:**
```
"Should I use microservices or monolith for this project?"
"Get Gemini's perspective on this API design"
```

**Review documentation:**
```
"Review this README for clarity and completeness"
"Get feedback on my architecture documentation"
```

**Review test coverage:**
```
"Are my tests comprehensive enough?"
"Get a second opinion on my test suite"
```

**Security audits:**
```
"Perform a security review of my authentication system"
"Check this code for vulnerabilities"
```

## How It Works

When you ask for a review or second opinion:

1. **Claude analyzes** your code/docs and forms its own opinion
2. **Claude constructs** a focused prompt for Gemini
3. **Claude calls gemini-cli** with appropriate file references
4. **Gemini reviews** the content independently
5. **Claude synthesizes** both perspectives
6. **You receive** comprehensive findings with actionable recommendations

## Review Types Supported

- **Code Changes**: Logic, performance, security, edge cases, maintainability
- **Architecture**: Scalability, maintainability, technology choices, trade-offs
- **Documentation**: Accuracy, clarity, completeness, grammar, tone
- **Test Coverage**: Scenarios, edge cases, quality, missing cases
- **Security**: Vulnerabilities, best practices, OWASP compliance
- **Plans**: Feasibility, risks, alternatives, completeness

## Features

### Slash Commands (New in v1.2)

**`/gemini-review`**
- Quick review with smart defaults
- Reviews staged files if no pattern provided
- Supports model and focus area selection
- Shows structured results with token usage

**`/gemini-batch-review`**
- Review 5+ files with real-time progress
- Stream-JSON for progress tracking
- Aggregated results by file
- Priority recommendations

### JSON Output Support (New in v1.2)

- Structured, parseable output
- Token usage tracking for cost awareness
- Better result formatting
- Integration with automation workflows

### Stream-JSON Progress (New in v1.2)

- Real-time progress updates for long reviews
- Batch processing visibility
- Event-based monitoring
- Optimal for multiple file reviews

### Structured Review Templates

Claude has access to proven review templates for:
- Code changes review
- Plan validation
- Documentation quality checks
- Architecture assessment
- Test coverage analysis
- Custom criteria reviews

### Model Selection

Claude automatically chooses the right Gemini model:
- **gemini-2.5-flash**: Fast, for quick reviews (default)
- **gemini-2.5-pro**: Thorough, for critical decisions

You can also request specific models:
```
"Use Gemini Pro for a thorough security audit"
```

Or specify via command:
```
/gemini-review src/auth/* --model pro
```

### Multi-File Support

Review multiple related files together:
```
"Review these auth files for consistency: @src/auth.js @src/session.js @tests/auth.test.js"
```

Or use batch command:
```
/gemini-batch-review src/auth src/session tests/auth
```

### Context-Aware Reviews

Claude automatically provides relevant context to Gemini about:
- What the code is trying to achieve
- Your specific requirements
- Constraints and decisions
- What aspects to focus on

### Directory Context (New in v1.2)

For architectural reviews, provide broader codebase context:
```
"Review this architecture with full context"
```

Uses `--include-directories` for system-wide understanding.

## Best Practices

### When to Get Gemini Reviews

✅ Before merging critical code changes
✅ Important architectural decisions
✅ Complex refactoring plans
✅ Security-sensitive code
✅ Test coverage validation
✅ When you need a fresh perspective

❌ Trivial questions or simple tasks
❌ Repeatedly for the same content
❌ As a replacement for your own analysis

### Providing Context

Give Claude context for better reviews:
```
"Review this auth refactoring. Context: We're optimizing for mobile performance and need to support offline mode."
```

### Focusing Reviews

Specify what aspects to focus on:
```
"Review this API design, focusing specifically on security vulnerabilities and rate limiting"
```

## Example Workflows

### Pre-Commit Review

```
You: "Review these authentication changes before I commit"

Claude will:
1. Read and analyze the auth files
2. Identify potential issues
3. Get Gemini's independent review
4. Present comprehensive findings
5. Recommend specific improvements
```

### Architecture Decision

```
You: "Should I use REST or GraphQL for this API?"

Claude will:
1. Consider your requirements
2. Analyze trade-offs
3. Get Gemini's perspective
4. Present both opinions
5. Make a recommendation
```

### Security Audit

```
You: "Perform a security audit of my authentication system"

Claude will:
1. Review the auth code
2. Identify security concerns
3. Get Gemini Pro's security review
4. Combine findings
5. Prioritize vulnerabilities
```

## What This Plugin Provides

- **SKILL.md**: Comprehensive guide for Claude on using gemini-cli
- **Review Templates**: Structured prompts for different review types
- **Best Practices**: When and how to use Gemini reviews
- **Troubleshooting**: Common issues and solutions
- **Examples**: Real-world usage patterns

## Troubleshooting

### "gemini-cli not found"

```bash
pip install gemini-cli
which gemini  # Verify installation
```

### Authentication errors

```bash
# Re-authenticate via Google
gemini auth login

# Or set new API key
gemini config set api_key YOUR_NEW_KEY

# Test
gemini -p "test"
```

### "API key invalid"

1. Generate new key at https://aistudio.google.com/apikey
2. Set it: `gemini config set api_key YOUR_NEW_KEY`
3. Verify: `gemini config list`

### Timeout errors

- Review smaller sections instead of entire large files
- Use gemini-2.5-flash for faster processing
- Check your internet connection

### File not found with @ references

- Use relative paths from project root
- Verify file exists: `ls path/to/file`
- Ensure proper file permissions

## Privacy & Security

**Important considerations:**

- Code is sent to Google's Gemini API for review
- Don't use for proprietary/sensitive code without authorization
- Review your organization's AI usage policies
- gemini-cli manages API credentials (not this plugin)
- See Google's data policies: https://ai.google.dev/gemini-api/terms

## Advanced Usage

### Custom Review Criteria

```
"Review this code based on these criteria:
1. Performance for large datasets
2. Memory efficiency
3. Thread safety"
```

### Inline Content Reviews

Review plans/ideas without files:
```
"Review this approach: I'm planning to cache user sessions in Redis with 24hr expiration. What are the risks?"
```

### Comparative Reviews

```
"Compare these two implementations and recommend which is better"
```

## What This Plugin Does NOT Do

❌ Store your API key (managed by gemini-cli)
❌ Send data anywhere except Gemini's API
❌ Work without gemini-cli installed
❌ Replace Claude's analysis (augments it)
❌ Make decisions for you (provides input)

## Contributing

Found a bug or have a suggestion?
https://github.com/bgreenwell/claude-plugins/issues

## License

MIT License - See LICENSE file for details

## Author

Brandon Greenwell
- GitHub: [@bgreenwell](https://github.com/bgreenwell)
- Email: [email protected]

## Command Reference

### `/gemini-review`

Quick review with smart defaults.

**Syntax:**
```
/gemini-review [file-pattern] [--model flash|pro] [--focus area]
```

**Examples:**
```bash
# Review staged files
/gemini-review

# Review specific pattern
/gemini-review src/auth/*

# Security-focused
/gemini-review src/api/* --focus security

# Deep review
/gemini-review src/core.js --model pro --focus performance
```

**Output includes:**
- File-by-file findings
- Severity indicators (✓ ⚠️ ❌)
- Actionable recommendations
- Token usage

### `/gemini-batch-review`

Batch review with real-time progress.

**Syntax:**
```
/gemini-batch-review <paths...> [--model flash|pro] [--focus area]
```

**Examples:**
```bash
# Multiple directories
/gemini-batch-review src/ tests/ docs/

# Security audit
/gemini-batch-review src/auth src/api --focus security --model pro

# Performance review
/gemini-batch-review src/services --focus performance
```

**Features:**
- Real-time progress: "Processing... [5/10] (50%)"
- Aggregated results
- Priority recommendations
- Token usage and cost estimate

**Best for:** 5-20 files

## Changelog

### v1.2.0 (Current)
- **NEW:** Added `/gemini-review` slash command for quick reviews
- **NEW:** Added `/gemini-batch-review` command for batch processing
- **NEW:** JSON output support for structured results
- **NEW:** Stream-JSON for real-time progress tracking
- **NEW:** Directory context support (`--include-directories`)
- **IMPROVED:** Enhanced error handling with retry logic
- **IMPROVED:** Better model selection guidance
- **IMPROVED:** Expanded examples with new capabilities
- No breaking changes - fully backward compatible

### v1.1.0
- Added comprehensive SKILL.md with review templates
- Enhanced with structured prompts for different review types
- Added security audit templates
- Improved troubleshooting guide
- Added model selection guidance
- Expanded examples and best practices

### v1.0.1
- Initial MCP server-based implementation
- Basic gemini_review tool

---

**Enjoy having two AI perspectives on your code!**
