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

### File not found with @ references

**Problem:** `@path/to/file` not working

**Solutions:**
- Use relative paths from current directory
- Verify file exists: `ls path/to/file`
- Ensure @ reference is inside the quoted prompt
- Use absolute paths if relative paths don't work

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

1. **Read the relevant files first** to understand context
2. **Construct a specific prompt** based on the review type
3. **Use Bash tool** to call gemini-cli with appropriate @ file references
4. **Parse Gemini's response** and synthesize it with Claude's own analysis
5. **Present both perspectives** to the user, highlighting agreements and differences

### What Claude Should NOT Do

- Don't call Gemini for trivial questions
- Don't send sensitive/proprietary code without user permission
- Don't replace Claude's own analysis - augment it
- Don't call Gemini repeatedly for the same content
- Don't use Gemini for simple questions that Claude can answer directly

### Example Workflow

```
User: "Can you review my authentication code for security issues?"

Claude actions:
1. Read the auth code files
2. Perform own security analysis
3. Construct Gemini prompt with specific security focus
4. Call: gemini -m gemini-2.5-pro -p "Security review: @src/auth.js"
5. Compare Gemini's findings with own analysis
6. Present comprehensive security report to user
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
