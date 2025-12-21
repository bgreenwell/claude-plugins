---
name: gemini-review
description: Quick review with Gemini using smart defaults. Reviews git staged files if no pattern provided, or specific files/patterns if specified. Supports model selection and focus areas.
---

# /gemini-review Command

Quick, explicit Gemini review with sensible defaults and structured output.

## Syntax

```
/gemini-review [file-pattern] [--model flash|pro] [--focus area]
```

## Arguments

**file-pattern** (optional)
- File path, glob pattern, or directory to review
- If omitted: Reviews git staged files (`git diff --cached --name-only`)
- Examples: `src/auth/*`, `src/auth/login.js`, `tests/*.test.js`

**--model** (optional)
- Model to use for review
- Options: `flash` (fast, default) or `pro` (thorough)
- Default: `gemini-2.5-flash`

**--focus** (optional)
- Specific area to focus review on
- Examples: `security`, `performance`, `maintainability`, `testing`
- Default: General code quality review

## How It Works

When user invokes this command:

1. **Parse Arguments**
   - Extract file pattern (or use git staged files)
   - Determine model (Flash or Pro)
   - Identify focus area if specified

2. **Validate Files**
   - Check gemini-cli is installed and authenticated
   - Verify files exist and are accessible
   - Filter out binary/build files

3. **Construct Prompt**
   - Build focused Gemini prompt based on review type
   - Include @ file references
   - Add focus-specific criteria if --focus provided

4. **Execute Review**
   - Call gemini-cli with `--output-format json`
   - Use specified model (--model flag)
   - Capture structured JSON response

5. **Parse Results**
   - Extract review findings from JSON
   - Extract token usage statistics
   - Parse for errors, warnings, suggestions

6. **Format Output**
   - Display file-by-file breakdown
   - Show severity levels (✓ OK, ⚠ Warning, ❌ Error)
   - Present actionable recommendations
   - Show token usage at bottom

## Examples

### Review Git Staged Files
```
/gemini-review
```
**Behavior:** Reviews all files in git staging area

### Review Specific Files
```
/gemini-review src/auth/login.js src/auth/session.js
```
**Behavior:** Reviews just those two files

### Review with Pattern
```
/gemini-review src/auth/*
```
**Behavior:** Reviews all files in src/auth/

### Deep Review with Pro
```
/gemini-review src/auth/* --model pro
```
**Behavior:** Uses gemini-2.5-pro for thorough review

### Security-Focused Review
```
/gemini-review src/api/* --focus security
```
**Behavior:** Reviews API files with security-specific criteria

### Performance Review
```
/gemini-review src/services/processor.js --model pro --focus performance
```
**Behavior:** Deep performance analysis with Pro model

## Implementation

When Claude processes this command:

```bash
# 1. Determine files to review
if [[ -n "$file_pattern" ]]; then
    files="$file_pattern"
else
    # Use git staged files
    files=$(git diff --cached --name-only | grep -E '\.(js|ts|py|java|go|rb)$' | head -10)
    if [[ -z "$files" ]]; then
        echo "No staged files found. Specify files to review."
        exit 1
    fi
fi

# 2. Determine model
model="${model_arg:-gemini-2.5-flash}"

# 3. Build prompt based on focus
if [[ "$focus" == "security" ]]; then
    prompt="Perform a security review focusing on:
- SQL injection vulnerabilities
- XSS vulnerabilities
- Authentication/authorization issues
- Input validation
- Sensitive data exposure

Files: @$files"
elif [[ "$focus" == "performance" ]]; then
    prompt="Review for performance issues:
- Algorithm efficiency
- Memory usage
- Database query optimization
- Caching opportunities
- Bottlenecks

Files: @$files"
else
    # General review
    prompt="Review this code for:
- Correctness and logic errors
- Code quality and maintainability
- Potential bugs and edge cases
- Best practices

Files: @$files"
fi

# 4. Execute with JSON output
result=$(gemini -m "$model" -p "$prompt" --output-format json 2>&1)

# 5. Parse JSON (with fallback)
if echo "$result" | jq . > /dev/null 2>&1; then
    response=$(echo "$result" | jq -r '.response')
    tokens=$(echo "$result" | jq -r '.stats.models | to_entries | map(.value.tokens.total) | add // 0')
else
    # Fallback to text if JSON parsing fails
    echo "Warning: JSON parsing failed, using text output"
    result=$(gemini -m "$model" -p "$prompt" --output-format text)
    response="$result"
    tokens="N/A"
fi

# 6. Format and display results
echo "Gemini Review Results"
echo "===================="
echo ""
echo "$response"
echo ""
echo "---"
echo "Model: $model"
echo "Tokens used: $tokens"
```

## Output Format

```
Gemini Review Results
====================

src/auth/login.js:
  ✓ Password hashing implementation looks secure
  ⚠️  Line 42: Consider adding rate limiting for login attempts
  ⚠️  Line 67: Missing error handling for database connection failures

src/auth/session.js:
  ✓ Session management follows best practices
  ❌ Line 89: Session token stored in plain text (use httpOnly cookies)

src/auth/tokens.js:
  ✓ JWT implementation is correct
  ⚠️  Line 123: Token expiration should be configurable

Summary:
  Files reviewed: 3
  Errors: 1
  Warnings: 3
  Clean checks: 3

Recommendations:
  1. Fix session token storage (critical security issue)
  2. Add rate limiting to prevent brute force attacks
  3. Make token expiration configurable
  4. Add database error handling

---
Model: gemini-2.5-flash
Tokens used: 4,523
```

## Error Handling

**No files found:**
```
Error: No files to review
- If using default (staged files): No files are currently staged
- If using pattern: No files match pattern 'src/nonexistent/*'

Try:
  - Stage files with: git add <files>
  - Specify explicit file pattern: /gemini-review src/**/*.js
```

**gemini-cli not found:**
```
Error: gemini-cli not installed

Install:
  pip install gemini-cli

Setup:
  gemini auth login

Docs: https://github.com/bgreenwell/claude-plugins/tree/main/gemini-review
```

**Authentication error:**
```
Error: gemini-cli not authenticated

Run one of:
  gemini auth login
  gemini config set api_key YOUR_API_KEY

Then retry: /gemini-review
```

## Best Practices

**For Claude:**
- Always validate gemini-cli is installed before calling
- Use JSON output for structured parsing
- Show token usage to help users track costs
- Format output clearly with visual indicators (✓ ⚠️ ❌)
- Provide actionable recommendations, not just problems
- If reviewing 5+ files, suggest /gemini-batch-review instead

**For Users:**
- Use default (staged files) for pre-commit reviews
- Use --model pro for critical security reviews
- Use --focus to get targeted feedback
- Review files in logical groups (by feature/module)
- Don't review too many files at once (use batch command for that)

## When to Use This Command

**Good Use Cases:**
- Quick review before commit
- Validate specific file changes
- Get targeted feedback (--focus)
- Repeatable review workflow
- When you want explicit control over what's reviewed

**Use Natural Language Instead When:**
- Want Claude's analysis + Gemini's perspective
- Need discussion/Q&A about findings
- Complex, nuanced requirements
- Want conversational interaction

**Use /gemini-batch-review Instead When:**
- Reviewing 5+ files
- Need progress visibility
- Processing multiple directories
- Batch workflow

## Notes

- Default model is Flash (faster, cheaper)
- Use Pro for critical/complex reviews
- Token usage shown helps track costs
- Supports all file types Gemini can read
- Max ~10 files recommended (use batch for more)
