# Plagiarism Review Plugin

Multi-layered plagiarism detection for academic writing. Check originality, detect citation issues, analyze writing style consistency, and verify academic integrity before submission.

## Overview

The Plagiarism Review plugin provides Claude Code with comprehensive strategies for detecting plagiarism using multiple approaches:

- **LLM-Based Analysis** - Use Gemini to detect style inconsistencies
- **Local Similarity** - Compare documents with TF-IDF and cosine similarity
- **Web Search** - Verify passages against online sources
- **API Integration** - Optional commercial plagiarism detection services

## Why Use This Plugin?

- **Pre-Submission Checks** - Verify originality before submitting academic work
- **Citation Verification** - Ensure proper attribution and formatting
- **Style Consistency** - Detect writing inconsistencies that may indicate plagiarism
- **Self-Plagiarism** - Check against your own previous work
- **Educational** - Learn what plagiarism detection tools look for
- **Multi-Layered** - Combine multiple detection methods for confidence

## Installation

### Prerequisites

**Required:**
```bash
# Install gemini-cli for LLM-based analysis
pip install gemini-cli
gemini auth login
```

**Optional (Enhanced Features):**
```bash
# For local similarity analysis
pip install scikit-learn nltk numpy

# For web verification
# Get Google Custom Search API key at:
# https://console.cloud.google.com/
```

### Install Plugin

```bash
# Add the marketplace
/plugin marketplace add https://github.com/bgreenwell/claude-plugins

# Install the plugin
/plugin install plagiarism-review@bgreenwell-plugins
```

### Verify Installation

Ask Claude:
```
"Do you have the plagiarism-review skill available?"
```

## Usage

Simply ask Claude naturally for plagiarism checks. Claude will autonomously use the appropriate detection methods.

### Example Prompts

**Quick Check:**
```
"Check this paper for plagiarism before I submit it"
"Review my essay for originality issues"
```

**Citation Review:**
```
"Check my paper for citation issues"
"Verify that I've cited sources properly"
```

**Style Analysis:**
```
"Analyze my writing for style consistency"
"Check if my paper has suspicious style changes"
```

**Document Comparison:**
```
"Compare these two papers for similarity"
"Check if I accidentally reused content from my previous paper"
```

**Deep Analysis:**
```
"Run a comprehensive plagiarism check with all methods"
"Do a thorough originality review before submission"
```

## Detection Methods

### Method 1: LLM-Based Analysis (Always Available)

Claude uses Gemini to analyze:
- Writing style consistency
- Citation completeness
- Suspicious passages
- Technical language appropriateness
- Formatting inconsistencies

**No setup required** - Works immediately with gemini-cli.

### Method 2: Local Similarity Analysis

Python-based document comparison using:
- **TF-IDF** - Statistical text analysis
- **Cosine Similarity** - Document similarity scoring
- **N-Gram Shingling** - Paraphrasing detection
- **Jaccard Similarity** - Set-based comparison

**Requires:** Python with scikit-learn
**Benefit:** Completely local, no external services

### Method 3: Web Search Verification

Search suspicious passages against online sources:
- Extract key phrases
- Search Google/Bing
- Identify potential sources
- Provide URLs for manual verification

**Requires:** Google Custom Search API (optional)
**Benefit:** Finds web-based matches

### Method 4: Commercial APIs

Integrate professional plagiarism services:
- **Copyleaks** - 99.1% accuracy, 100+ languages
- **Grammarly** - 16 billion web pages + academic databases
- **Others** - User-supplied API keys

**Requires:** API subscription
**Benefit:** Access to proprietary academic databases

## How It Works

When you ask for a plagiarism check:

1. **Claude analyzes** your request and determines appropriate detection level
2. **Gemini screening** identifies suspicious passages and style issues
3. **Local comparison** (if available) checks against reference documents
4. **Web verification** (if requested) searches for online matches
5. **API check** (if configured) runs comprehensive database search
6. **Claude synthesizes** all findings into actionable report
7. **You receive** detailed analysis with specific recommendations

## Report Format

Claude provides structured reports including:

```
PLAGIARISM ANALYSIS REPORT

Overall Risk: MEDIUM (Score: 6/10)

Suspicious Passages:
1. Lines 45-52: [quoted text]
   - Issue: Style inconsistency
   - Similarity: 85%
   - Action: Verify sources

Citation Issues:
- 3 missing citations
- 2 formatting problems

Web Matches:
- Passage 1: [URL]
- Passage 2: [URL]

Recommendations:
1. Add citation for lines 45-52
2. Revise paraphrasing in lines 103-110
3. Fix citation format in bibliography

Next Steps:
- Review flagged passages
- Verify sources manually
- Consider institutional check
```

## Use Cases

### Pre-Submission Checking

Check academic papers before submission:
```
"I need to submit this paper tomorrow. Run a plagiarism check."
```

Claude will:
1. Analyze writing style
2. Check citations
3. Flag suspicious passages
4. Provide improvement recommendations

### Citation Verification

Ensure proper attribution:
```
"Check if I cited all my sources correctly"
```

Claude will:
1. Identify uncited claims
2. Check citation formatting
3. Verify quote attributions
4. Suggest missing citations

### Self-Plagiarism Detection

Check against your previous work:
```
"Make sure I didn't accidentally copy from my previous paper"
```

Claude will:
1. Compare documents
2. Identify overlapping passages
3. Check for proper self-citation
4. Assess acceptable vs problematic reuse

### Collaborative Work

Verify collaborative writing:
```
"Check that our combined sections are properly integrated"
```

Claude will:
1. Analyze style consistency
2. Check section transitions
3. Verify proper attribution
4. Identify integration issues

## Features

### Comprehensive Detection

- **Style Analysis** - Detect writing inconsistencies
- **Citation Checking** - Verify proper attribution
- **Similarity Scoring** - Quantify document overlap
- **Source Identification** - Find matched content
- **Paraphrasing Detection** - Catch reworded copying

### Flexible Checking Levels

- **Quick** - Fast LLM screening (30 seconds)
- **Standard** - LLM + local analysis (2-3 minutes)
- **Deep** - All methods including web search (5-10 minutes)
- **Custom** - Specify which methods to use

### Educational Value

Learn about:
- What plagiarism checkers detect
- How to properly paraphrase
- When citations are needed
- Academic writing best practices
- Style consistency importance

### Privacy Options

- **Local-only** - Keep documents private with local tools
- **LLM-based** - Only sends to Gemini API
- **Full-featured** - Optional commercial API integration

## Best Practices

### When to Check

✅ **Always check:**
- Before submitting papers
- After major revisions
- When incorporating many sources
- For collaborative work

✅ **Regular checks:**
- During drafting process
- After paraphrasing sources
- Before peer review

### Preparing Documents

1. Save as plain text (.txt)
2. Remove non-text elements
3. Keep citations in document
4. Note any direct quotes
5. Separate bibliography

### Interpreting Results

**High Risk (7-10):**
- Review immediately
- Check all flagged passages
- Verify citations
- Consider instructor consultation

**Medium Risk (4-6):**
- Review flagged sections
- Add missing citations
- Improve paraphrasing

**Low Risk (1-3):**
- Minor cleanup
- Final verification
- Ready for submission

## Limitations & Disclaimers

### What This Tool Is

✅ Pre-submission self-check tool
✅ Citation verification aid
✅ Writing improvement guide
✅ Educational resource
✅ Style consistency analyzer

### What This Tool Is NOT

❌ Replacement for institutional checkers (Turnitin, etc.)
❌ Definitive proof of plagiarism
❌ Access to proprietary academic databases
❌ Legal evidence
❌ Substitute for proper citation practices

### Important Notes

- **False positives possible** - Manual review required
- **Context matters** - Consider academic field norms
- **Tool limitations** - Cannot detect all sophisticated plagiarism
- **Institutional policies** - Check your school's requirements
- **Professional guidance** - Consult instructors when unsure

## Troubleshooting

### "gemini-cli not found"

```bash
pip install gemini-cli
gemini auth login
gemini -p "test"
```

### Python Errors

```bash
# Install dependencies
pip install scikit-learn nltk numpy

# Download NLTK data
python -c "import nltk; nltk.download('punkt')"
```

### "ModuleNotFoundError"

```bash
# Use virtual environment
python3 -m venv venv
source venv/bin/activate
pip install scikit-learn nltk numpy
```

### API Rate Limits

- Reduce number of searches
- Add delays between requests
- Check daily quotas
- Consider paid tiers

### Large Documents

- Split into sections
- Check suspicious parts individually
- Use sampling for initial screening
- Process incrementally

## Privacy & Security

**Data Handling:**
- Local tools process data on your machine
- Gemini API receives text for analysis
- Web search APIs receive text snippets
- Commercial APIs follow their privacy policies

**Recommendations:**
- Use local tools for sensitive documents
- Read API provider privacy policies
- Check institutional data policies
- Don't submit confidential work to external services

## Advanced Usage

### Custom Similarity Thresholds

```
"Check my paper with a 0.6 similarity threshold"
```

### Specific Passage Investigation

```
"Analyze just this paragraph for plagiarism: [paste text]"
```

### Citation Format Checking

```
"Verify my citations follow APA format"
```

### Multiple Document Comparison

```
"Compare all three versions of my paper for consistency"
```

## Academic Integrity

This tool supports academic integrity by:

- **Preventing accidental plagiarism** - Catch mistakes before submission
- **Teaching proper citation** - Learn what needs attribution
- **Improving paraphrasing** - Understand effective rewording
- **Encouraging originality** - Develop your own voice
- **Building confidence** - Submit work knowing it's properly cited

## Support

- **Issues**: https://github.com/bgreenwell/claude-plugins/issues
- **Documentation**: See SKILL.md for comprehensive guide
- **Examples**: Included in skill documentation

## Contributing

Found a bug or have suggestions?
https://github.com/bgreenwell/claude-plugins/issues

## License

MIT License - See LICENSE file for details

## Author

Brandon Greenwell
- GitHub: [@bgreenwell](https://github.com/bgreenwell)
- Email: [email protected]

## Changelog

### v1.0.0 (Initial Release)
- LLM-based style analysis with Gemini
- Local TF-IDF similarity checking
- N-gram shingling for paraphrasing detection
- Web search verification strategies
- Commercial API integration guides
- Comprehensive review templates
- Citation checking guidance
- Academic integrity best practices

---

**Maintain academic integrity with confidence!**
