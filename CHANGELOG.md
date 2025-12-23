# Changelog

All notable changes to the claude-plugins marketplace will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2025-12-22 (gemini-review)

### Fixed
- **Critical fix**: Skill auto-trigger for natural language review requests
  - Updated YAML description to position Gemini as primary review tool (not just "second opinions")
  - Expanded trigger conditions from 6 to 8 items with broader verbs (review, validate, check, audit, assess)
  - Added explicit "DO invoke Gemini proactively" guidance
  - Restructured "What NOT to Do" section as Do/Don't format
  - Made it clear: if reviewing user code/docs, invoke Gemini

### Impact
- Natural language requests like "Review test.js" now trigger the skill automatically
- No longer requires "second opinion" or "Gemini" keywords
- Skill works as intended for any code review request

## [1.2.0] - 2025-12-21 (gemini-review)

### Added
- **NEW:** `/gemini-review` slash command for quick reviews with smart defaults
  - Reviews git staged files by default (no args needed)
  - Supports file patterns, model selection (`--model flash|pro`), and focus areas (`--focus security`)
  - Shows structured output with severity indicators (✓ ⚠️ ❌)
  - Displays token usage for cost awareness
- **NEW:** `/gemini-batch-review` command for batch processing with progress tracking
  - Reviews 5-20 files optimally with real-time progress
  - Uses stream-JSON for progress visibility ("Processing... [5/10] 50%")
  - Aggregates results by file with priority recommendations
  - Shows token usage and cost estimates
- **NEW:** JSON output support (`--output-format json`)
  - Structured, parseable output for better result processing
  - Token usage extraction and tracking
  - Integration with automation workflows
- **NEW:** Stream-JSON support (`--output-format stream-json`)
  - Real-time progress updates for long-running reviews
  - Event-based monitoring (init, message, tool_use, result)
  - Optimal for batch operations
- **NEW:** Directory context support (`--include-directories`)
  - Provide broader codebase context for architectural reviews
  - System-wide understanding for refactoring plans
  - Cross-cutting concern analysis

### Improved
- Enhanced skill file (+252 lines) with comprehensive JSON/stream-JSON guidance
- Better error handling with retry logic and graceful fallbacks
- Improved model selection guidance (when to use Flash vs Pro)
- Expanded examples demonstrating new capabilities
- Better structured output formatting
- Enhanced troubleshooting section with JSON parsing errors

### Documentation
- Added "What's New in v1.2" section to README
- Comprehensive slash command reference with examples
- JSON output usage patterns and best practices
- Stream-JSON progress tracking examples
- Command-specific documentation (120+ lines per command)
- Updated all examples to show new features

### Technical
- First plugin in marketplace to implement slash commands
- Pioneering command-based plugin patterns
- Template for future command development
- No breaking changes - fully backward compatible
- Natural language interaction still works exactly as before

## [1.1.0] - 2025-12-20 (gemini-review)

### Changed
- **BREAKING**: Migrated from MCP server to skill-based architecture
- Restructured to use `skills/` directory per claude-forge standards
- Removed Node.js dependencies and MCP server implementation
- Skills now teach Claude to use gemini-cli directly via Bash tool
- Updated plugin structure to include standard directories (commands/, agents/, hooks/)

### Fixed
- Removed broken setup.sh npm commands
- Updated documentation to reflect skill-based approach
- Fixed CLAUDE.md to accurately describe current architecture

### Migration Notes
- If you have an existing installation, reinstall the plugin to get the new structure
- The functionality remains the same, but the implementation has changed
- No action required from users - Claude will use the skill automatically

## [1.0.0] - 2025-12-20 (plagiarism-review)

### Added
- Initial release of plagiarism-review plugin
- Multi-layered plagiarism detection for academic writing
- LLM-based style analysis using Gemini
- Local similarity checking (TF-IDF, cosine similarity, n-gram shingling)
- Web search verification guidance
- Commercial API integration instructions (Copyleaks, Grammarly)
- Citation verification capabilities
- Writing style consistency analysis
- Comprehensive documentation and examples
- Privacy and data handling information

### Features
- Multiple detection layers with increasing sophistication
- Educational focus on academic integrity
- Python scripts for local analysis
- Integration with external APIs (optional)
- Skill-based architecture using claude-forge standards

## [1.0.1] - 2025-11-09 (gemini-review)

### Fixed
- **Critical fix**: @ file reference syntax now works correctly
  - File references must be inside the quoted prompt, not as separate arguments
  - Updated `buildGeminiCommand()` to include @ references within the prompt string
  - Correct: `gemini -p "Review this code @file.js"`
  - Incorrect: `gemini -p "Review this code" @file.js`
- Updated test script to use correct @ syntax
- Improved test error reporting with warnings instead of hard failures

### Changed
- Authentication documentation now shows both Google account and API key methods
- Test suite now treats file reference test as non-critical (shows warning if it fails)

## [1.0.0] - 2025-11-09

### Added
- Initial release of gemini-review plugin
- MCP server integration with gemini-cli
- Six review types: code_changes, plan, documentation, architecture, test_coverage, custom
- Built-in review templates for each type
- Prerequisite validation (checks for gemini-cli installation and authentication)
- Support for file references using @ syntax
- Support for inline content review
- Custom criteria and context parameters
- Comprehensive documentation and examples
- Test script for validating setup
- Setup automation script

### Features
- `gemini_review` tool for getting second opinions from Gemini
- `gemini_check_setup` tool for troubleshooting
- Error handling with helpful messages
- Timeout protection (60s for reviews)
- Shell escaping for prompt injection protection

[1.2.0]: https://github.com/bgreenwell/claude-plugins/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/bgreenwell/claude-plugins/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/bgreenwell/claude-plugins/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/bgreenwell/claude-plugins/releases/tag/v1.0.0
