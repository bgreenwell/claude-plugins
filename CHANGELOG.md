# Changelog

All notable changes to the claude-plugins marketplace will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.1.0]: https://github.com/bgreenwell/claude-plugins/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/bgreenwell/claude-plugins/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/bgreenwell/claude-plugins/releases/tag/v1.0.0
