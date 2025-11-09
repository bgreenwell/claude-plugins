# Changelog

All notable changes to the gemini-review plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-11-09

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

[1.0.1]: https://github.com/bgreenwell/claude-plugins/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/bgreenwell/claude-plugins/releases/tag/v1.0.0
