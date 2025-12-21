---
name: gemini-batch-review
description: Batch review of multiple files/directories with real-time progress tracking using stream-json. Ideal for reviewing 5+ files, multiple directories, or entire modules with progress visibility.
---

# /gemini-batch-review Command

Review multiple files or directories with real-time progress tracking and aggregated results.

## Syntax

```
/gemini-batch-review <paths...> [--model flash|pro] [--focus area]
```

## Arguments

**paths** (required)
- One or more file paths, patterns, or directories
- Space-separated list
- Examples: `src/ tests/`, `src/**/*.js docs/*.md`, `src/auth src/api src/services`

**--model** (optional)
- Model to use for review
- Options: `flash` (fast, default) or `pro` (thorough)
- Default: `gemini-2.5-flash` (recommended for batch)

**--focus** (optional)
- Specific area to focus review on
- Examples: `security`, `performance`, `testing`, `documentation`
- Default: General code quality review

## How It Works

When user invokes this command:

1. **Collect Files**
   - Expand all paths/patterns to file list
   - Filter code files (skip binaries, build artifacts)
   - Count total files to review

2. **Validate**
   - Check gemini-cli installed and authenticated
   - Verify at least one file found
   - Warn if file count is very high (>20 files)

3. **Construct Batch Prompt**
   - Build comprehensive prompt for all files
   - Include @ references for each file
   - Add focus-specific criteria if specified

4. **Execute with Stream-JSON**
   - Call gemini-cli with `--output-format stream-json`
   - Monitor event stream in real-time
   - Track progress through events

5. **Display Progress**
   - Show "Starting batch review..."
   - Update progress as files are processed
   - Display real-time status

6. **Aggregate Results**
   - Collect all findings
   - Group by file
   - Categorize by severity (errors/warnings)
   - Calculate total token usage

7. **Present Summary**
   - File-by-file breakdown
   - Overall statistics
   - Prioritized recommendations
   - Token usage and cost estimate

## Examples

### Review Multiple Directories
```
/gemini-batch-review src/ tests/ docs/
```
**Behavior:** Reviews all files in src/, tests/, and docs/ with progress

### Review Specific File Types
```
/gemini-batch-review src/**/*.js tests/**/*.test.js
```
**Behavior:** Reviews all JS files in src/ and test files in tests/

### Security Audit Across Modules
```
/gemini-batch-review src/auth src/api src/middleware --focus security --model pro
```
**Behavior:** Thorough security review of multiple modules with Pro model

### Performance Review
```
/gemini-batch-review src/services src/utils --focus performance
```
**Behavior:** Performance-focused batch review

### Documentation Review
```
/gemini-batch-review docs/**/*.md README.md CONTRIBUTING.md --focus documentation
```
**Behavior:** Review all documentation files

## Implementation

When Claude processes this command:

```bash
# 1. Collect and expand file paths
files=()
for path in $paths; do
    if [[ -d "$path" ]]; then
        # Directory: find code files
        while IFS= read -r file; do
            files+=("$file")
        done < <(find "$path" -type f \( -name "*.js" -o -name "*.ts" -o -name "*.py" -o -name "*.java" -o -name "*.go" \) 2>/dev/null)
    else
        # File or pattern
        files+=($path)
    fi
done

file_count=${#files[@]}

if [[ $file_count -eq 0 ]]; then
    echo "Error: No files found to review"
    exit 1
fi

echo "Found $file_count files to review"

# 2. Build file list for prompt
file_refs=$(printf "@%s " "${files[@]}")

# 3. Determine model
model="${model_arg:-gemini-2.5-flash}"

# 4. Build focus-specific prompt
if [[ "$focus" == "security" ]]; then
    prompt="Perform security review of these files:
- Authentication/authorization issues
- Input validation and sanitization
- SQL injection and XSS vulnerabilities
- Sensitive data handling
- Security best practices

Review each file and provide findings.

Files: $file_refs"
elif [[ "$focus" == "performance" ]]; then
    prompt="Review these files for performance:
- Algorithm efficiency
- Memory usage and leaks
- Database query optimization
- Caching strategies
- Bottlenecks and slow paths

Files: $file_refs"
elif [[ "$focus" == "testing" ]]; then
    prompt="Review test coverage and quality:
- Test completeness
- Edge case coverage
- Test maintainability
- Missing test scenarios
- Test quality and assertions

Files: $file_refs"
else
    # General review
    prompt="Review these files for code quality:
- Correctness and logic errors
- Maintainability and readability
- Best practices
- Potential bugs

Provide findings for each file.

Files: $file_refs"
fi

# 5. Execute with stream-json for progress
echo ""
echo "Starting batch review..."
echo ""

current_file=0
gemini -m "$model" -p "$prompt" --output-format stream-json 2>&1 | \
while IFS= read -r line; do
    event_type=$(echo "$line" | jq -r '.type // empty' 2>/dev/null)

    case "$event_type" in
        "init")
            echo "Initializing review session..."
            ;;
        "message")
            role=$(echo "$line" | jq -r '.message.role // empty' 2>/dev/null)
            if [[ "$role" == "assistant" ]]; then
                ((current_file++))
                percentage=$((current_file * 100 / file_count))
                echo "Processing... [$current_file/$file_count] ($percentage%)"
            fi
            ;;
        "result")
            # Final results
            final_response=$(echo "$line" | jq -r '.response // empty' 2>/dev/null)
            final_tokens=$(echo "$line" | jq -r '.stats.models | to_entries | map(.value.tokens.total) | add // 0' 2>/dev/null)

            echo ""
            echo "==========================="
            echo "Batch Review Complete!"
            echo "==========================="
            echo ""
            echo "$final_response"
            echo ""
            echo "---"
            echo "Files reviewed: $file_count"
            echo "Model: $model"
            echo "Tokens used: $final_tokens"
            ;;
        "error")
            error_msg=$(echo "$line" | jq -r '.error // "Unknown error"' 2>/dev/null)
            echo "Warning: $error_msg"
            ;;
    esac
done
```

## Output Format

**During Execution:**
```
Found 8 files to review

Starting batch review...

Initializing review session...
Processing... [1/8] (12%)
Processing... [2/8] (25%)
Processing... [3/8] (37%)
Processing... [4/8] (50%)
Processing... [5/8] (62%)
Processing... [6/8] (75%)
Processing... [7/8] (87%)
Processing... [8/8] (100%)

===========================
Batch Review Complete!
===========================
```

**Final Results:**
```
Review Findings by File:

src/auth/login.js:
  ✓ Password hashing looks secure
  ⚠️  Line 42: Add rate limiting
  ❌ Line 67: Missing error handling

src/auth/session.js:
  ✓ Session management OK
  ⚠️  Line 89: Use httpOnly cookies

src/api/routes.js:
  ✓ Route structure is clean
  ⚠️  Line 156: Add input validation

src/api/middleware.js:
  ✓ Middleware chain is correct

src/services/processor.js:
  ⚠️  Line 234: Potential performance bottleneck
  ⚠️  Line 301: Consider caching results

tests/auth.test.js:
  ⚠️  Missing edge case tests
  ⚠️  Line 89: Add negative test cases

tests/api.test.js:
  ✓ Good test coverage

docs/API.md:
  ✓ Documentation is clear and complete

---

Summary:
  Files reviewed: 8
  Files with errors: 1
  Files with warnings: 5
  Clean files: 2

  Total issues:
    ❌ Errors: 1
    ⚠️  Warnings: 8
    ✓ Passed checks: 6

Priority Recommendations:
  1. [CRITICAL] src/auth/login.js:67 - Add error handling
  2. [HIGH] src/auth/login.js:42 - Implement rate limiting
  3. [MEDIUM] src/auth/session.js:89 - Use httpOnly cookies
  4. [MEDIUM] tests/auth.test.js - Add edge case coverage

---
Files reviewed: 8
Model: gemini-2.5-flash
Tokens used: 12,450 (~$0.03)
```

## Progress Indicators

Claude should display progress using stream-json events:

**Start:**
```
Found 15 files to review

Starting batch review...
```

**During:**
```
Initializing review session...
Processing... [1/15] (6%)
Processing... [3/15] (20%)
Processing... [5/15] (33%)
...
```

**Complete:**
```
Processing... [15/15] (100%)

===========================
Batch Review Complete!
===========================
```

## Error Handling

**No files found:**
```
Error: No files found to review

Check:
  - Paths exist: ls <path>
  - Patterns are correct: src/**/*.js
  - Not all binary/build files

Try: /gemini-batch-review src/ tests/
```

**Too many files:**
```
Warning: Found 50 files to review

This may:
  - Take several minutes
  - Use significant tokens (~$0.50+)
  - Hit rate limits

Recommendations:
  - Review in smaller batches
  - Use more specific patterns
  - Review by module/feature

Continue? (y/n)
```

**gemini-cli errors:**
```
Error: gemini-cli not installed

Install: pip install gemini-cli
Setup: gemini auth login
```

**Rate limiting:**
```
Warning: Rate limit encountered

Completed: 5/10 files
Remaining: 5 files

Options:
  - Wait 30 seconds and retry remaining files
  - Use --model flash (if using pro)
  - Review remaining files separately
```

## Best Practices

**For Claude:**
- Always show file count before starting
- Display real-time progress (percentage)
- Aggregate results clearly by file
- Prioritize errors over warnings
- Show total token usage and cost estimate
- If >20 files, warn about time/cost
- Handle stream-json events gracefully
- Provide actionable summary

**For Users:**
- Batch review 5-20 files (sweet spot)
- Use Flash model for large batches (cost-effective)
- Use Pro model for critical reviews only
- Group files logically (by feature/module)
- Review related files together
- Don't batch unrelated code

## When to Use This Command

**Good Use Cases:**
- Reviewing multiple modules/directories
- Pre-release code quality check
- Security audit across codebase
- Performance review of service layer
- Documentation completeness check
- Test coverage review

**Use /gemini-review Instead When:**
- Reviewing 1-4 files
- Quick pre-commit check
- Specific file changes
- Don't need progress tracking

**Use Natural Language Instead When:**
- Want Claude's analysis too
- Need discussion about findings
- Complex review requirements
- Want Q&A about results

## Notes

- Uses stream-json for real-time progress
- Recommended for 5-20 files
- Default model is Flash (cost-effective)
- Shows token usage for cost tracking
- Aggregates results for easy scanning
- Prioritizes issues by severity
- Can handle multiple directories
- Filters out binary/build files automatically
