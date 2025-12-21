---
name: gemini-review
description: Get a second opinion from Google's Gemini on code changes, plans, documentation, architecture, and other work products. Use when you need independent validation, cross-checking critical decisions, catching blind spots, or getting multiple AI perspectives on important work.
license: MIT
---

# Gemini Review Skill

Get independent second opinions from Google's Gemini AI on your code, plans, documentation, and architecture decisions. This skill enables you to leverage multiple AI perspectives for critical work.

## Overview

This skill provides structured templates and workflows for getting Gemini's feedback on various development artifacts. Use it when you need:

- **Independent validation** of critical code changes
- **Cross-checking** important architectural decisions
- **Catching blind spots** in complex logic or edge cases
- **Multiple perspectives** on challenging problems
- **Pre-commit reviews** for high-stakes changes

## Prerequisites & Setup

Before using this skill, you need to install and configure gemini-cli.

### Installing gemini-cli

```bash
pip install gemini-cli
```

### Authentication

Choose one of these authentication methods:

**Option 1: Google OAuth (Recommended)**
```bash
gemini auth login
```

**Option 2: API Key**
```bash
# Get your API key from https://aistudio.google.com/apikey
gemini config set api_key YOUR_API_KEY
```

### Verify Setup

Test that gemini-cli is working:
```bash
gemini -p "test"
```

If you see a response from Gemini, you're ready to go!

## How to Use Gemini CLI

### Basic Syntax

```bash
gemini -p "your prompt here"
```

### File References

Use @ syntax INSIDE the prompt to reference files:

```bash
gemini -p "Review this code: @src/app.js"
```

**Important:** @ file references must be inside the quoted prompt, not as separate arguments.

### Multiple Files

```bash
gemini -p "Review these files: @file1.js @file2.js @file3.js"
```

### Model Selection

Choose between Flash (fast) and Pro (thorough):

```bash
# Fast review
gemini -m gemini-2.5-flash -p "Quick review: @src/utils.js"

# Deep review
gemini -m gemini-2.5-pro -p "Comprehensive security review: @src/auth/*"
```

## Advanced Features

### JSON Output for Structured Reviews

Use `--output-format json` to get structured, parseable output that's easier to process programmatically:

```bash
gemini -p "Review this code: @src/auth.js" --output-format json
```

**JSON Response Structure:**
```json
{
  "response": "The review findings text...",
  "stats": {
    "models": {
      "gemini-2.5-flash": {
        "tokens": {
          "input": 5000,
          "output": 1200,
          "total": 6200
        }
      }
    }
  }
}
```

**How Claude Should Use JSON Output:**

1. **Execute with JSON format:**
```bash
result=$(gemini -p "Review for security: @src/auth.js" --output-format json)
```

2. **Parse the response:**
```bash
# Extract review findings
response=$(echo "$result" | jq -r '.response')

# Extract token usage
tokens=$(echo "$result" | jq -r '.stats.models | to_entries | map(.value.tokens.total) | add // 0')
```

3. **Present to user:**
```
Review findings: [formatted response]
Tokens used: [total tokens]
```

**Benefits of JSON Output:**
- Structured data for better parsing
- Token usage tracking for cost awareness
- Tool execution metrics
- Programmatic processing

**When to Use JSON:**
- Slash commands (automated workflows)
- Need to extract specific data (token counts, findings)
- Multiple file reviews requiring aggregation
- Integration with other tools

**Fallback:** If `jq` is not available, use text output (`--output-format text`) instead.

### Stream-JSON for Real-Time Progress

For long-running reviews (multiple files, large codebases), use `--output-format stream-json` to get real-time progress updates:

```bash
gemini -p "Review all files: @src/**/*.js" --output-format stream-json
```

**Stream-JSON Event Types:**
1. `init` - Review session started
2. `message` - User/assistant message exchange
3. `tool_use` - Tool invocation
4. `tool_result` - Tool execution result
5. `error` - Non-fatal error
6. `result` - Final aggregated results

**How Claude Should Use Stream-JSON:**

For batch reviews or long operations, monitor the event stream:

```bash
gemini -p "Review multiple files..." --output-format stream-json | \
  while IFS= read -r line; do
    event_type=$(echo "$line" | jq -r '.type // empty')
    case "$event_type" in
      "init")
        echo "Starting review..."
        ;;
      "message")
        role=$(echo "$line" | jq -r '.message.role // empty')
        if [[ "$role" == "assistant" ]]; then
          echo "Processing..."
        fi
        ;;
      "result")
        echo "Complete!"
        final_result="$line"
        ;;
    esac
  done
```

**When to Use Stream-JSON:**
- Batch reviews of 5+ files
- Large codebase analysis
- User wants progress visibility
- Long-running operations

**Display Progress:**
- Show file count: "Processing file 3 of 10..."
- Show current file: "Reviewing src/auth/session.js..."
- Show completion: "Review complete! Found 5 issues."

### Directory Context for Architectural Reviews

Use `--include-directories` to provide broader context for architectural and design reviews:

```bash
gemini -p "Review this architecture: @docs/architecture.md" \
  --include-directories src,docs
```

**When to Use:**
- Architecture reviews (need full codebase context)
- API design validation (see all endpoints)
- Refactoring plans (understand system structure)
- Cross-cutting concern analysis

**Example:**
```bash
gemini -p "Is this auth approach consistent with the rest of the codebase?" \
  --include-directories src/auth,src/api,src/middleware
```

**Note:** Be mindful of context size - don't include build artifacts, node_modules, etc.

## Review Templates

Use these structured prompts for different review types.

### Code Changes Review

```bash
gemini -p "Review the following code changes for:
- Correctness and logic errors
- Performance implications
- Maintainability and code quality
- Edge cases and error handling
- Security considerations

Provide specific, actionable feedback.

Code to review: @path/to/file.js"
```

### Plan Review

```bash
gemini -p "Review this plan for:
- Feasibility and completeness
- Potential risks and challenges
- Missing considerations
- Implementation approach
- Alternative strategies

Provide constructive feedback and suggestions.

Plan: @path/to/plan.md"
```

### Documentation Review

```bash
gemini -p "Review this documentation for:
- Technical accuracy
- Clarity for the intended audience
- Completeness of coverage
- Grammar and flow
- Tone alignment (encouraging, professional, practical)

Provide specific improvement suggestions.

Documentation: @path/to/docs.md"
```

### Architecture Review

```bash
gemini -p "Review this architecture for:
- Scalability and performance
- Maintainability and modularity
- Security considerations
- Technology choices
- Trade-offs and alternatives

Provide technical feedback and recommendations.

Architecture description: @path/to/architecture.md"
```

### Test Coverage Review

```bash
gemini -p "Review this test coverage for:
- Completeness of test scenarios
- Edge case coverage
- Test quality and maintainability
- Missing test cases
- Testing approach

Provide specific suggestions for improvement.

Tests to review: @path/to/tests/"
```

### Custom Review

```bash
gemini -p "Review the following content based on these specific criteria: [CRITERIA]

Additional context: [CONTEXT]

Content to review: @path/to/file"
```

## Best Practices

### When to Get Gemini Reviews

- Before merging critical code changes
- When making important architectural decisions
- For complex refactoring plans
- To validate test coverage completeness
- When you need a fresh perspective on a problem
- For security-sensitive code
- When evaluating multiple implementation approaches

### Providing Context

Always give Gemini context about:
- What the code/plan/doc is trying to achieve
- Any constraints or requirements
- Why you're making specific choices
- What specific aspects you want feedback on

**Example:**
```bash
gemini -p "Context: We're refactoring our auth system to improve security for mobile clients.

Please review this implementation focusing on:
- Mobile-specific security concerns
- Performance for slow networks
- Token refresh strategy

Code to review: @src/auth/mobile.js"
```

### Focusing Reviews

Specify what to focus on for more targeted feedback:

```bash
gemini -p "Review this API design, focusing specifically on:
1. Security vulnerabilities
2. Rate limiting strategy
3. Error handling patterns

Code: @src/api/routes.js"
```

## Working with Files

### Single File

```bash
gemini -p "Review this for security issues: @src/auth.js"
```

### Multiple Files

```bash
gemini -p "Review these related files for consistency: @src/user.js @src/auth.js @tests/user.test.js"
```

### Inline Content (when no file exists)

```bash
gemini -p "Review this plan:

1. Refactor authentication
2. Add OAuth support
3. Implement rate limiting

What are the risks and missing pieces?"
```

### Supported File Types

Gemini CLI supports:
- Code files (.js, .py, .ts, .jsx, .tsx, .java, .go, etc.)
- Documentation (.md, .qmd, .txt, .rst)
- Configuration (.json, .yaml, .toml)
- Images (for UI/design reviews)
- PDFs (for document reviews)

## Model Selection

Choose the right model for your needs:

**gemini-2.5-flash**
- Fast responses
- Good for quick reviews
- Straightforward code analysis
- Cost-effective for frequent use

**gemini-2.5-pro**
- More thorough analysis
- Better for complex architecture
- Critical security reviews
- Important decisions

**Examples:**
```bash
# Quick review with Flash
gemini -m gemini-2.5-flash -p "Quick review of this function: @src/utils.js"

# Deep review with Pro
gemini -m gemini-2.5-pro -p "Comprehensive security review: @src/auth/*"
```

## Error Handling & Retry Logic

### Graceful Error Recovery

When calling gemini-cli, Claude should handle errors gracefully and provide clear guidance:

**1. Check if gemini-cli is installed:**
```bash
if ! command -v gemini &> /dev/null; then
    echo "Error: gemini-cli not found"
    echo "Install: pip install gemini-cli"
    echo "Setup guide: https://github.com/bgreenwell/claude-plugins/tree/main/gemini-review"
    exit 1
fi
```

**2. Verify authentication:**
```bash
if ! gemini -p "test" &> /dev/null 2>&1; then
    echo "Error: gemini-cli not authenticated"
    echo "Run: gemini auth login"
    echo "Or set API key: gemini config set api_key YOUR_KEY"
    exit 1
fi
```

**3. Handle rate limiting:**
If you encounter rate limit errors, suggest:
- Wait a few seconds and retry
- Use gemini-2.5-flash (fewer tokens, less likely to hit limits)
- Break large reviews into smaller chunks

**4. Timeout handling:**
For large files or slow connections:
- First attempt: Use specified model (Pro or Flash)
- If timeout: Retry with gemini-2.5-flash (faster)
- If still fails: Suggest reviewing smaller sections

**5. JSON parsing errors:**
```bash
result=$(gemini -p "..." --output-format json 2>&1)

# Try to parse JSON
if echo "$result" | jq . > /dev/null 2>&1; then
    # JSON is valid, proceed
    response=$(echo "$result" | jq -r '.response')
else
    # JSON parsing failed, fall back to text mode
    echo "Note: JSON parsing failed, using text output"
    result=$(gemini -p "..." --output-format text)
fi
```

**6. Network errors:**
If network errors occur:
- Suggest checking internet connection
- Retry once after 2-3 second delay
- If persists, report error clearly to user

### Error Message Guidelines

**For Claude:**
- Always provide actionable next steps
- Don't just report errors - suggest solutions
- Include relevant documentation links
- Show exact commands to fix the problem

**Example Good Error Message:**
```
I encountered an authentication error with gemini-cli.

To fix this:
1. Run: gemini auth login
2. Or set an API key from https://aistudio.google.com/apikey
3. Then retry your review request

Would you like me to try again once you've authenticated?
```

**Example Bad Error Message:**
```
Error: 401 Unauthorized
```

## Troubleshooting

### "gemini-cli not found"

**Problem:** gemini command not available

**Solution:**
```bash
pip install gemini-cli
# Verify installation
which gemini
```

### "Not authenticated" or "Login required"

**Problem:** Gemini CLI not authenticated

**Solutions:**
```bash
# Option 1: Google OAuth (recommended)
gemini auth login

# Option 2: API Key
# Get key from https://aistudio.google.com/apikey
gemini config set api_key YOUR_API_KEY

# Test authentication
gemini -p "test"
```

### "API key invalid" or "Authentication failed"

**Problem:** Invalid credentials

**Solutions:**
- For OAuth: Run `gemini auth login` again
- For API key: Generate new key at https://aistudio.google.com/apikey
- Check key is set correctly: `gemini config list`

### Timeout errors

**Problem:** Large files taking too long

**Solutions:**
- Review specific sections instead of entire files
- Use gemini-2.5-flash for faster processing
- Break large reviews into smaller chunks
- Check internet connection
- Retry with smaller context (fewer files)

### File not found with @ references

**Problem:** `@path/to/file` not working

**Solutions:**
- Use relative paths from current directory
- Verify file exists: `ls path/to/file`
- Ensure @ reference is inside the quoted prompt
- Use absolute paths if relative paths don't work

### JSON parsing errors

**Problem:** `jq` command fails or JSON output malformed

**Solutions:**
- Install jq: `brew install jq` (macOS) or `apt-get install jq` (Linux)
- Fall back to text output: `--output-format text`
- Check gemini-cli version is up to date: `pip install --upgrade gemini-cli`

### Rate limiting

**Problem:** "Too many requests" or rate limit errors

**Solutions:**
- Wait 10-30 seconds before retrying
- Use gemini-2.5-flash (lower token usage)
- Break large batch reviews into smaller groups
- Check your API quota/limits

## Examples

### Example 1: Review Code Changes Before Commit

```bash
# Get Gemini's opinion on changes
gemini -p "I'm about to commit these authentication changes.
Please review for:
- Security vulnerabilities
- Breaking changes
- Missing error handling

Changes: @src/auth/login.js @src/auth/session.js"
```

### Example 2: Architecture Decision

```bash
# Get feedback on architecture approach
gemini -p "I'm deciding between microservices and monolith for this e-commerce platform.

Context:
- Small team (5 devs)
- Need to ship fast
- Expected 10k users in first year

Please review this architecture document and advise:
@docs/architecture/microservices-proposal.md"
```

### Example 3: Test Coverage Assessment

```bash
# Check if tests are comprehensive
gemini -p "Review these tests and tell me:
1. What edge cases are missing?
2. Are there integration test gaps?
3. Is error handling tested?

Tests: @tests/payment.test.js
Implementation: @src/payment.js"
```

### Example 4: Documentation Review

```bash
# Improve documentation quality
gemini -p "Review this README for:
- Clarity for new contributors
- Missing setup steps
- Grammar and tone

README: @README.md"
```

### Example 5: Security Audit

```bash
# Deep security review
gemini -m gemini-2.5-pro -p "Perform a security audit of this authentication system:
- SQL injection vulnerabilities
- XSS vulnerabilities
- CSRF protection
- Session management
- Password handling
- Input validation

Files: @src/auth/* @src/middleware/security.js"
```

### Example 6: Using JSON Output for Structured Results

```bash
# Get structured review output
result=$(gemini -p "Review for security: @src/auth/login.js" --output-format json)

# Parse and display
response=$(echo "$result" | jq -r '.response')
tokens=$(echo "$result" | jq -r '.stats.models | to_entries | map(.value.tokens.total) | add // 0')

echo "Security Review Findings:"
echo "$response"
echo ""
echo "Tokens used: $tokens"
```

**When Claude uses this:**
- Slash commands (automated workflows)
- Need to show token usage to user
- Aggregating results from multiple reviews
- Better structured output formatting

### Example 7: Batch Review with Progress Tracking

```bash
# Review multiple directories with real-time progress
gemini -p "Review all these files for code quality and best practices:
@src/api/*.js
@src/services/*.js
@src/utils/*.js" \
--output-format stream-json | \
while IFS= read -r line; do
  event_type=$(echo "$line" | jq -r '.type // empty')
  case "$event_type" in
    "init")
      echo "Starting batch review..."
      ;;
    "message")
      # Show progress
      echo "Processing..."
      ;;
    "result")
      # Final results
      final=$(echo "$line" | jq -r '.response')
      echo "Review complete!"
      echo "$final"
      ;;
  esac
done
```

**When Claude uses this:**
- User asks to review multiple files/directories
- Long-running operations (5+ files)
- User wants to see progress updates
- Batch processing workflows

### Example 8: Architecture Review with Directory Context

```bash
# Review architecture with full codebase context
gemini -p "Review this microservices architecture for:
- Service boundaries
- Communication patterns
- Data consistency
- Scalability concerns

Architecture doc: @docs/architecture/microservices.md" \
--include-directories src/services,src/api,docs/architecture \
--model gemini-2.5-pro
```

**When Claude uses this:**
- Architecture reviews
- Need to understand full system design
- Refactoring plans that affect multiple components
- Cross-cutting concern analysis

## Integration Tips for Claude

### When Claude Should Use This Skill

Claude should autonomously invoke Gemini when:
1. User asks for a "second opinion" or "review"
2. Making critical decisions (security, architecture)
3. User mentions Gemini explicitly
4. Validating important code before commits
5. Cross-checking complex logic or algorithms
6. User wants validation of Claude's own work

### How Claude Should Use This Skill

**For Natural Language Requests:**

1. **Read the relevant files first** to understand context
2. **Construct a specific prompt** based on the review type
3. **Use JSON output** for better structured results: `--output-format json`
4. **Parse Gemini's response** and extract key findings
5. **Present both perspectives** to the user, highlighting agreements and differences

**For Slash Commands:**

Users can also invoke reviews explicitly via commands:
- `/gemini-review [files]` - Quick review with smart defaults
- `/gemini-batch-review <paths>` - Batch review with progress tracking

When user uses a slash command, Claude should:
1. Parse command arguments (file patterns, model selection, focus area)
2. Use JSON output format for structured parsing
3. Display formatted results with clear sections
4. Show token usage inline

### Choosing the Right Approach

**Use Natural Language (Skill):**
- User asks conversationally for review
- Need Claude's own analysis + Gemini's perspective
- Complex, nuanced review requirements
- User wants discussion/Q&A about findings

**Use `/gemini-review` Command:**
- User wants quick, explicit review
- Specific file patterns provided
- Repeatable workflow (same command pattern)
- User prefers command-style interface

**Use `/gemini-batch-review` Command:**
- Reviewing 5+ files simultaneously
- User wants progress visibility
- Batch processing workflow
- Multiple directories/patterns

### JSON Output Best Practices

**Always use JSON format for:**
- Slash commands (better parsing)
- Batch reviews (aggregate results)
- When showing token usage
- Programmatic workflows

**Parse JSON response:**
```bash
result=$(gemini -p "..." --output-format json)
response=$(echo "$result" | jq -r '.response')
tokens=$(echo "$result" | jq -r '.stats.models | to_entries | map(.value.tokens.total) | add // 0')
```

**Fallback if JSON fails:**
```bash
if echo "$result" | jq . > /dev/null 2>&1; then
    # Parse JSON
else
    # Use text output instead
    result=$(gemini -p "..." --output-format text)
fi
```

### What Claude Should NOT Do

- Don't call Gemini for trivial questions
- Don't send sensitive/proprietary code without user permission
- Don't replace Claude's own analysis - augment it
- Don't call Gemini repeatedly for the same content
- Don't use Gemini for simple questions that Claude can answer directly
- Don't use stream-json for single-file reviews (use regular JSON)

### Example Workflow

**Natural Language Request:**
```
User: "Can you review my authentication code for security issues?"

Claude actions:
1. Read the auth code files
2. Perform own security analysis
3. Call gemini with JSON output:
   gemini -m gemini-2.5-pro -p "Security review: @src/auth.js" --output-format json
4. Parse JSON response
5. Compare Gemini's findings with own analysis
6. Present comprehensive security report with token usage
```

**Slash Command Request:**
```
User: /gemini-review src/auth/* --model pro --focus security

Claude actions:
1. Parse command: files=src/auth/*, model=pro, focus=security
2. Construct focused prompt for security review
3. Call gemini with JSON output
4. Parse and format results
5. Display formatted findings with:
   - File-by-file breakdown
   - Severity levels (errors/warnings)
   - Token usage
   - Summary
```

## Summary

The Gemini Review skill enables you to get independent AI perspectives on your work. Use it strategically for:

- Critical code reviews
- Architecture validation
- Security audits
- Test coverage analysis
- Documentation quality checks
- Complex problem-solving

Remember to provide context, focus your reviews, and choose the appropriate model for your needs.
