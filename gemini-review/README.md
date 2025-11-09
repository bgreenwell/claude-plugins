# Gemini Review Plugin

Get a second opinion from Gemini on Claude Code's work. This plugin integrates Google's Gemini LLM to provide independent validation and feedback on code changes, architectural plans, documentation, and other work products.

## Why Use This?

- **Independent Validation**: Get a second LLM perspective on important decisions
- **Catch Blind Spots**: Different models have different strengths and may notice different issues
- **Cross-Validation**: Verify critical code changes with multiple AI opinions
- **Complement Your Workflow**: Already use Gemini? Now it's integrated into Claude Code

## Prerequisites

**Required before installation:**

1. **gemini-cli** - The Gemini command-line interface
   ```bash
   pip install gemini-cli  # Or your appropriate install method
   ```

2. **Authenticate with Gemini** - Choose one method:
   
   **Option A: Google Account (recommended)**
   ```bash
   gemini auth login
   ```
   
   **Option B: API Key**
   ```bash
   # Get a key from https://aistudio.google.com/apikey
   gemini config set api_key YOUR_API_KEY
   ```

**Setup time:** ~5 minutes

## Installation

### Add the Marketplace

First, add this plugin marketplace:

```bash
/plugin marketplace add bgreenwell/claude-plugins
```

### Install the Plugin

Then install gemini-review:

```bash
/plugin install gemini-review@bgreenwell
```

### Verify Setup

Check that everything is configured:

```bash
# In Claude Code, ask Claude to verify:
"Can you check if gemini-cli is set up correctly?"
```

Claude will use the `gemini_check_setup` tool to validate your installation.

## Usage

The plugin provides a `gemini_review` tool that Claude Code can use automatically. Just ask Claude naturally:

### Example Prompts

**Review code changes:**
```
"Have Gemini review my changes to auth.js for security issues"
"Ask Gemini to check this function for performance problems"
```

**Review plans:**
```
"Get Gemini's opinion on this refactoring plan"
"Have Gemini validate my architecture approach"
```

**Review documentation:**
```
"Ask Gemini to review this README for clarity"
"Have Gemini check the docs in @installation.qmd for accuracy"
```

**Review test coverage:**
```
"Get Gemini's assessment of whether these tests are comprehensive"
"Have Gemini review my test suite for gaps"
```

**Custom reviews:**
```
"Ask Gemini to review this code focusing on readability and maintainability"
"Have Gemini evaluate this design for scalability"
```

## Review Types

The plugin supports these review types, each with specific focus areas:

- **`code_changes`** - Correctness, performance, maintainability, security
- **`plan`** - Feasibility, risks, completeness, alternatives
- **`documentation`** - Accuracy, clarity, grammar, tone
- **`architecture`** - Scalability, maintainability, trade-offs
- **`test_coverage`** - Completeness, edge cases, quality
- **`custom`** - Specify your own criteria

## How It Works

1. You ask Claude Code to get a Gemini review
2. Claude Code calls the `gemini_review` tool with appropriate parameters
3. The plugin executes `gemini-cli` with optimized prompts
4. Gemini's feedback is returned to Claude Code
5. Claude Code can act on the feedback or discuss it with you

## Best For

- Developers who already use Gemini in their workflow
- Teams wanting standardized code review processes
- Critical decisions that benefit from multiple perspectives
- Learning and improving code quality

## Advanced Usage

### Using File References

The plugin works best with file paths (uses gemini-cli's `@` syntax):

```
"Have Gemini review the authentication logic in @src/auth.js"
```

Note: When Claude Code calls gemini-cli, it includes the @ references inside the prompt string, which is how gemini-cli expects them.

### Specifying Criteria

You can focus the review on specific aspects:

```
"Ask Gemini to review my API design, focusing on security and performance"
```

### Providing Context

Give Gemini context for better reviews:

```
"Have Gemini review this refactoring. Context: We're optimizing for mobile performance"
```

## Troubleshooting

**Tool not available:**
- Run `/plugin list` to verify the plugin is installed
- Check that Node.js 18+ is installed
- Try reinstalling: `/plugin uninstall gemini-review` then reinstall

**"gemini-cli not found" error:**
- Install gemini-cli: `pip install gemini-cli`
- Verify it's in your PATH: `which gemini`

**Authentication errors:**
- Authenticate via Google: `gemini auth login`
- Or use API key from https://aistudio.google.com/apikey
- Configure API key: `gemini config set api_key YOUR_KEY`
- Test manually: `gemini -p "test"`

**Reviews timing out:**
- Large files may take longer
- Try reviewing specific sections instead of entire files
- Check your internet connection

## What This Plugin Does NOT Do

- ❌ Store your API key (you manage this via gemini-cli)
- ❌ Send data anywhere except Gemini's API
- ❌ Work without gemini-cli installed
- ❌ Replace Claude Code (it augments it!)

## Privacy & Security

- Your code is sent to Google's Gemini API for review
- API key is managed by gemini-cli, not this plugin
- Review Google's data policies: https://ai.google.dev/gemini-api/terms
- Use responsibly with proprietary/sensitive code

## Contributing

Found a bug or have a suggestion? Open an issue or PR:
https://github.com/bgreenwell/claude-plugins

## License

MIT License - See LICENSE file for details

## Author

Brandon Greenwell
- GitHub: [@bgreenwell](https://github.com/bgreenwell)
- Email: [email protected]

---

**Enjoy having two AI perspectives on your code!** 🚀
