---
name: plagiarism-review
description: Multi-layered plagiarism detection for academic writing using LLM analysis, local algorithms, web search, and optional APIs. Use when checking originality, detecting citation issues, analyzing writing style consistency, or verifying academic integrity before submission.
license: MIT
---

# Plagiarism Review Skill

Comprehensive plagiarism detection for academic writing using multiple detection strategies. Check text originality, identify citation issues, analyze writing style consistency, and verify academic integrity.

## Overview

This skill provides multi-layered plagiarism detection combining:

1. **LLM-Based Analysis** - Use Gemini to detect style inconsistencies and suspicious passages
2. **Local Similarity** - Compare documents using TF-IDF and cosine similarity
3. **Web Search** - Verify suspicious passages against online sources
4. **API Integration** - Optional commercial plagiarism detection services

## When to Use This Skill

- Checking academic papers before submission
- Verifying originality of writing
- Detecting citation issues
- Identifying style inconsistencies
- Self-plagiarism checking
- Comparing document similarity
- Educational academic integrity review

## Prerequisites

### Required (Always Available)
- **gemini-cli** - For LLM-based analysis
  ```bash
  pip install gemini-cli
  gemini auth login
  ```

### Optional (Enhanced Features)
- **Python 3.8+** - For local similarity analysis
  ```bash
  pip install scikit-learn nltk numpy
  ```

- **Google Custom Search API** - For web verification
  - Create API key at https://console.cloud.google.com/
  - Set up Custom Search Engine at https://programmablesearchengine.google.com/

- **Commercial APIs** - For comprehensive checking
  - Copyleaks API key (https://copyleaks.com/)
  - Grammarly Premium (https://www.grammarly.com/)

## Detection Methods

### Method 1: LLM-Based Style Analysis (Primary)

Use Gemini to analyze writing for plagiarism indicators.

#### Style Consistency Check

```bash
gemini -m gemini-2.5-pro -p "Analyze this academic text for plagiarism indicators:

**Analysis Criteria:**
1. Writing style consistency - look for sudden changes in:
   - Vocabulary sophistication
   - Sentence structure complexity
   - Tone and voice
   - Technical language usage

2. Citation issues:
   - Missing citations for complex ideas
   - Improperly attributed quotes
   - Inconsistent citation formatting
   - Claims without sources

3. Suspicious patterns:
   - Passages that seem overly polished vs surrounding text
   - Technical language beyond expected level
   - Abrupt topic transitions without context
   - Formatting inconsistencies

4. Academic integrity concerns:
   - Ideas presented without development
   - Unexplained technical concepts
   - Missing methodology explanations

**Text to analyze:**
@path/to/document.txt

**Provide detailed report with:**
- Overall plagiarism risk score (1-10)
- Specific suspicious passages (quote them with line references)
- Reasons for each flag
- Citation issues identified
- Recommendations for verification
- Suggested improvements"
```

#### Targeted Passage Analysis

```bash
gemini -m gemini-2.5-pro -p "Analyze these specific passages for plagiarism likelihood:

**Passage 1 (Lines 45-52):**
[paste suspicious text]

**Passage 2 (Lines 103-110):**
[paste suspicious text]

For each passage, determine:
1. Likelihood of plagiarism (1-10)
2. Specific indicators (style, complexity, terminology)
3. Whether citations are needed
4. Suggested search terms to verify originality
5. Recommendations for the author

Be specific and provide actionable feedback."
```

#### Citation Verification

```bash
gemini -m gemini-2.5-pro -p "Review this academic text for citation issues:

**Check for:**
1. Claims requiring citations but lacking them
2. Improperly formatted citations
3. Quotes without attribution
4. Paraphrased content needing citations
5. Statistical claims without sources
6. Historical facts without references
7. Technical definitions without attribution

**Document:**
@path/to/document.txt

**Provide:**
- List of passages needing citations (with line numbers)
- Current citation issues
- Citation format inconsistencies
- Recommendations for improvement"
```

### Method 2: Local Similarity Analysis

Use Python with scikit-learn for document comparison.

#### TF-IDF Cosine Similarity Script

Create `check_similarity.py`:

```python
#!/usr/bin/env python3
"""
Plagiarism detection using TF-IDF and Cosine Similarity
"""

import sys
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def load_document(filepath):
    """Load document from file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def check_similarity(doc1_path, doc2_path, threshold=0.7):
    """
    Compare two documents for similarity

    Args:
        doc1_path: Path to first document
        doc2_path: Path to second document
        threshold: Similarity threshold (0-1)

    Returns:
        Similarity score and analysis
    """
    # Load documents
    doc1 = load_document(doc1_path)
    doc2 = load_document(doc2_path)

    # Create TF-IDF vectors
    vectorizer = TfidfVectorizer(
        lowercase=True,
        stop_words='english',
        ngram_range=(1, 3),  # Unigrams, bigrams, and trigrams
        max_features=5000
    )

    # Fit and transform documents
    tfidf_matrix = vectorizer.fit_transform([doc1, doc2])

    # Calculate cosine similarity
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

    # Interpret results
    print(f"\n{'='*60}")
    print(f"PLAGIARISM SIMILARITY ANALYSIS")
    print(f"{'='*60}\n")
    print(f"Document 1: {doc1_path}")
    print(f"Document 2: {doc2_path}")
    print(f"\nSimilarity Score: {similarity:.2%}")
    print(f"Threshold: {threshold:.2%}")
    print(f"\nAssessment: ", end="")

    if similarity >= 0.9:
        print("VERY HIGH SIMILARITY - Likely plagiarism")
        risk = "CRITICAL"
    elif similarity >= 0.7:
        print("HIGH SIMILARITY - Substantial overlap detected")
        risk = "HIGH"
    elif similarity >= 0.5:
        print("MODERATE SIMILARITY - Review recommended")
        risk = "MEDIUM"
    elif similarity >= 0.3:
        print("LOW SIMILARITY - Some common content")
        risk = "LOW"
    else:
        print("MINIMAL SIMILARITY - Documents appear distinct")
        risk = "MINIMAL"

    print(f"Risk Level: {risk}\n")
    print(f"{'='*60}\n")

    return similarity

def check_against_corpus(target_doc, corpus_dir, threshold=0.7):
    """
    Compare target document against corpus of documents

    Args:
        target_doc: Path to document to check
        corpus_dir: Directory containing reference documents
        threshold: Similarity threshold
    """
    import os

    target_text = load_document(target_doc)
    corpus_files = [f for f in os.listdir(corpus_dir) if f.endswith('.txt')]

    results = []
    for corpus_file in corpus_files:
        corpus_path = os.path.join(corpus_dir, corpus_file)
        corpus_text = load_document(corpus_path)

        vectorizer = TfidfVectorizer(
            lowercase=True,
            stop_words='english',
            ngram_range=(1, 3),
            max_features=5000
        )

        tfidf_matrix = vectorizer.fit_transform([target_text, corpus_text])
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

        if similarity >= threshold:
            results.append((corpus_file, similarity))

    # Sort by similarity (descending)
    results.sort(key=lambda x: x[1], reverse=True)

    print(f"\n{'='*60}")
    print(f"CORPUS COMPARISON RESULTS")
    print(f"{'='*60}\n")
    print(f"Target Document: {target_doc}")
    print(f"Corpus Directory: {corpus_dir}")
    print(f"Threshold: {threshold:.2%}\n")

    if results:
        print(f"Found {len(results)} matches above threshold:\n")
        for filename, similarity in results:
            print(f"  {filename}: {similarity:.2%}")
    else:
        print("No matches above threshold found.")

    print(f"\n{'='*60}\n")

    return results

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage:")
        print("  Compare two documents:")
        print("    python check_similarity.py <doc1> <doc2> [threshold]")
        print("  Compare against corpus:")
        print("    python check_similarity.py <target_doc> <corpus_dir> --corpus [threshold]")
        sys.exit(1)

    if "--corpus" in sys.argv:
        target = sys.argv[1]
        corpus = sys.argv[2]
        threshold = float(sys.argv[4]) if len(sys.argv) > 4 else 0.7
        check_against_corpus(target, corpus, threshold)
    else:
        doc1 = sys.argv[1]
        doc2 = sys.argv[2]
        threshold = float(sys.argv[3]) if len(sys.argv) > 3 else 0.7
        check_similarity(doc1, doc2, threshold)
```

#### N-Gram Shingling Script

Create `check_ngrams.py`:

```python
#!/usr/bin/env python3
"""
N-gram shingling for paraphrasing detection
"""

import sys
from collections import Counter
import re

def create_ngrams(text, n=3):
    """Create n-grams from text"""
    # Clean and tokenize
    words = re.findall(r'\w+', text.lower())

    # Create n-grams
    ngrams = []
    for i in range(len(words) - n + 1):
        ngram = ' '.join(words[i:i+n])
        ngrams.append(ngram)

    return ngrams

def jaccard_similarity(set1, set2):
    """Calculate Jaccard similarity between two sets"""
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))

    return intersection / union if union > 0 else 0

def check_ngram_similarity(doc1_path, doc2_path, n=3):
    """Check similarity using n-gram shingling"""
    # Load documents
    with open(doc1_path, 'r', encoding='utf-8') as f:
        doc1 = f.read()
    with open(doc2_path, 'r', encoding='utf-8') as f:
        doc2 = f.read()

    # Create n-grams
    ngrams1 = set(create_ngrams(doc1, n))
    ngrams2 = set(create_ngrams(doc2, n))

    # Calculate similarity
    similarity = jaccard_similarity(ngrams1, ngrams2)

    # Find common n-grams
    common = ngrams1.intersection(ngrams2)
    common_sorted = sorted(common, key=lambda x: (
        max(doc1.lower().count(x), doc2.lower().count(x))
    ), reverse=True)

    print(f"\n{'='*60}")
    print(f"N-GRAM SHINGLING ANALYSIS (n={n})")
    print(f"{'='*60}\n")
    print(f"Document 1: {doc1_path}")
    print(f"Document 2: {doc2_path}")
    print(f"\nJaccard Similarity: {similarity:.2%}")
    print(f"Common {n}-grams: {len(common)}")

    print(f"\nAssessment: ", end="")
    if similarity >= 0.5:
        print("HIGH OVERLAP - Likely paraphrasing or copying")
    elif similarity >= 0.3:
        print("MODERATE OVERLAP - Review recommended")
    elif similarity >= 0.15:
        print("LOW OVERLAP - Some common phrases")
    else:
        print("MINIMAL OVERLAP - Documents appear distinct")

    if common_sorted:
        print(f"\nTop 10 common {n}-grams:")
        for i, ngram in enumerate(common_sorted[:10], 1):
            print(f"  {i}. \"{ngram}\"")

    print(f"\n{'='*60}\n")

    return similarity

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python check_ngrams.py <doc1> <doc2> [n]")
        print("  n = n-gram size (default: 3)")
        sys.exit(1)

    doc1 = sys.argv[1]
    doc2 = sys.argv[2]
    n = int(sys.argv[3]) if len(sys.argv) > 3 else 3

    check_ngram_similarity(doc1, doc2, n)
```

#### Usage Examples

```bash
# Compare two documents
python check_similarity.py paper1.txt paper2.txt

# Compare with custom threshold
python check_similarity.py paper1.txt paper2.txt 0.6

# Check against corpus of previous papers
python check_similarity.py new_paper.txt ./previous_papers/ --corpus

# N-gram analysis for paraphrasing
python check_ngrams.py paper1.txt paper2.txt 3
```

### Method 3: Web Search Verification

Verify suspicious passages against online sources.

#### Using Google Custom Search API

```python
#!/usr/bin/env python3
"""
Web search verification for plagiarism detection
"""

import sys
import requests
import time

def search_passage(passage, api_key, search_engine_id, num_results=5):
    """
    Search for passage using Google Custom Search API

    Args:
        passage: Text to search for
        api_key: Google API key
        search_engine_id: Custom Search Engine ID
        num_results: Number of results to return
    """
    url = "https://www.googleapis.com/customsearch/v1"

    # Truncate long passages
    query = passage[:100] + "..." if len(passage) > 100 else passage

    params = {
        'key': api_key,
        'cx': search_engine_id,
        'q': query,
        'num': num_results
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        results = []
        if 'items' in data:
            for item in data['items']:
                results.append({
                    'title': item.get('title'),
                    'url': item.get('link'),
                    'snippet': item.get('snippet')
                })

        return results

    except requests.exceptions.RequestException as e:
        print(f"Error searching: {e}")
        return []

def check_web_plagiarism(document_path, api_key, search_engine_id):
    """Check document against web sources"""
    with open(document_path, 'r', encoding='utf-8') as f:
        text = f.read()

    # Extract suspicious passages (you'd implement better extraction)
    # For now, split into paragraphs
    paragraphs = [p.strip() for p in text.split('\n\n') if len(p.strip()) > 100]

    print(f"\n{'='*60}")
    print(f"WEB PLAGIARISM CHECK")
    print(f"{'='*60}\n")
    print(f"Document: {document_path}")
    print(f"Checking {len(paragraphs)} passages...\n")

    matches_found = []

    for i, paragraph in enumerate(paragraphs[:5], 1):  # Limit to avoid API costs
        print(f"Checking passage {i}...")
        results = search_passage(paragraph, api_key, search_engine_id)

        if results:
            matches_found.append({
                'passage_num': i,
                'passage': paragraph[:100] + "...",
                'results': results
            })

        time.sleep(1)  # Rate limiting

    if matches_found:
        print(f"\nFound {len(matches_found)} passages with web matches:\n")
        for match in matches_found:
            print(f"Passage {match['passage_num']}:")
            print(f"  \"{match['passage']}\"")
            print(f"  Potential sources:")
            for result in match['results'][:3]:
                print(f"    - {result['title']}")
                print(f"      {result['url']}")
            print()
    else:
        print("\nNo significant web matches found.")

    print(f"{'='*60}\n")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python check_web.py <document> <api_key> <search_engine_id>")
        sys.exit(1)

    doc = sys.argv[1]
    api_key = sys.argv[2]
    engine_id = sys.argv[3]

    check_web_plagiarism(doc, api_key, engine_id)
```

#### Manual Web Search Strategy

When API access isn't available:

1. **Identify suspicious passages** - Use Gemini analysis
2. **Extract key phrases** - 5-8 word unique combinations
3. **Search manually:**
   ```
   "exact phrase in quotes"
   site:edu "academic phrase"
   intitle:"unique title words"
   ```
4. **Document sources** - Record URLs for verification

### Method 4: Commercial API Integration

For comprehensive checking with proprietary databases.

#### Copyleaks API

```bash
# Install Copyleaks Node.js SDK
npm install plagiarism-checker

# Or use Python SDK
pip install copyleaks
```

```python
#!/usr/bin/env python3
"""
Copyleaks API plagiarism detection
"""

from copyleaks.copyleaks import Copyleaks
from copyleaks.models.submit.document import FileDocument
from copyleaks.models.submit.properties.scan_properties import ScanProperties
import sys
import os

def check_with_copyleaks(document_path, email, api_key):
    """
    Check document using Copyleaks API

    Requires:
        - Copyleaks account
        - API key from https://api.copyleaks.com/
    """
    # Authenticate
    auth_token = Copyleaks.login(email, api_key)

    # Prepare document
    file_submission = FileDocument(document_path)
    scan_properties = ScanProperties()

    # Submit for scanning
    scan_id = Copyleaks.submit_file(auth_token, scan_id, file_submission, scan_properties)

    print(f"Document submitted for scanning. Scan ID: {scan_id}")
    print("Check results at: https://api.copyleaks.com/v3/scans/{scan_id}/result")

    return scan_id

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python check_copyleaks.py <document> <email> <api_key>")
        sys.exit(1)

    doc = sys.argv[1]
    email = sys.argv[2]
    api_key = sys.argv[3]

    check_with_copyleaks(doc, email, api_key)
```

## Review Templates

### Quick Style Check

```bash
gemini -m gemini-2.5-flash -p "Quick plagiarism screening:

Analyze this text for obvious plagiarism indicators:
- Major style shifts
- Citation problems
- Most suspicious passage

Text: @document.txt

Provide brief assessment with risk score (1-10)."
```

### Standard Plagiarism Check

Combines LLM analysis with local comparison:

1. **Run Gemini analysis** for style issues
2. **Run TF-IDF comparison** against known corpus
3. **Synthesize results**

```bash
# Step 1: LLM analysis
gemini -m gemini-2.5-pro -p "[Full style analysis prompt] @document.txt"

# Step 2: Local comparison (if corpus available)
python check_similarity.py document.txt reference_corpus/ --corpus

# Step 3: Review both reports
```

### Deep Plagiarism Check

All layers including web verification:

1. Gemini style analysis
2. Local TF-IDF similarity
3. N-gram shingling
4. Web search top 5 suspicious passages
5. Citation format check

### Citation Verification Only

```bash
gemini -m gemini-2.5-pro -p "Citation analysis only:

Review this academic text for citation issues:
1. Missing citations
2. Improperly formatted citations
3. Quotes without attribution
4. Paraphrased content needing sources

Document: @document.txt

List each issue with line numbers and recommendations."
```

### Self-Plagiarism Check

```bash
# Compare against your own previous work
python check_similarity.py new_paper.txt previous_papers/ --corpus 0.5

# Lower threshold (0.5) since some self-reference is acceptable
```

### Comparative Analysis

```bash
# Direct comparison of two documents
python check_similarity.py paper1.txt paper2.txt
python check_ngrams.py paper1.txt paper2.txt 3

# Get detailed breakdown
```

## Output Interpretation

### Understanding Similarity Scores

**TF-IDF Cosine Similarity:**
- 0.9-1.0: Very high similarity - likely plagiarism
- 0.7-0.9: High similarity - substantial overlap
- 0.5-0.7: Moderate similarity - review recommended
- 0.3-0.5: Low similarity - some common content
- 0.0-0.3: Minimal similarity - documents distinct

**N-Gram Jaccard Similarity:**
- 0.5+: High overlap - likely paraphrasing or copying
- 0.3-0.5: Moderate overlap - review recommended
- 0.15-0.3: Low overlap - some common phrases
- 0-0.15: Minimal overlap - documents distinct

**Gemini Risk Scores:**
- 9-10: Critical - immediate review required
- 7-8: High - substantial concerns
- 5-6: Medium - some red flags
- 3-4: Low - minor issues
- 1-2: Minimal - acceptable

### Evaluating Flagged Passages

**False Positive Indicators:**
- Common academic phrases
- Standard terminology
- Widely-known facts
- Proper citations present
- Acceptable paraphrasing

**True Positive Indicators:**
- Extended verbatim text
- Unique phrasing matches
- Technical details without explanation
- Missing citations
- Style dramatically different from rest

### Citation Issues

**Requires Citation:**
- Specific research findings
- Statistical data
- Theoretical frameworks
- Direct quotes
- Paraphrased arguments
- Non-common knowledge

**Does Not Require Citation:**
- Common knowledge
- Your own original ideas
- Your own research data
- Widely known facts
- General observations

## Best Practices

### When to Run Plagiarism Checks

**Always Check:**
- Before submitting academic papers
- After major revisions
- When incorporating sources
- For collaborative work
- Before publication

**Regular Checks:**
- During drafting process
- After each major section
- When paraphrasing sources
- For self-plagiarism concerns

### Preparing Documents for Checking

1. **Save as plain text** - .txt format works best
2. **Remove non-text elements** - images, tables, equations
3. **Keep citations** - helps identify proper attribution
4. **Note any quotations** - properly formatted quotes are acceptable
5. **Separate references** - bibliography shouldn't be checked

### Working with Citations

**Proper Citation Practices:**
- Cite immediately after using source
- Use consistent citation format
- Include page numbers for direct quotes
- Paraphrase substantially, don't just change words
- Use quotation marks for exact phrases
- Track all sources during research

**Citation Red Flags:**
- Large sections without citations
- Abrupt style changes at citation points
- Generic citations ("Smith, 2020") without context
- Missing page numbers for quotes
- Inconsistent citation formatting

### Academic Integrity Guidelines

**Acceptable:**
- Proper paraphrasing with citation
- Direct quotes with attribution
- Building on cited ideas
- Self-citation of your own work
- Collaborative work with attribution

**Unacceptable:**
- Copying without attribution
- Minimal paraphrasing
- Patch writing (mixing source words)
- Self-plagiarism without disclosure
- Collaborative work presented as individual

### Tool Limitations

**These Tools Cannot:**
- Access proprietary academic databases (Turnitin, JSTOR)
- Provide definitive proof of plagiarism
- Replace institutional plagiarism checkers
- Detect all sophisticated paraphrasing
- Evaluate intent or context

**These Tools Can:**
- Identify suspicious passages for review
- Compare against available sources
- Detect style inconsistencies
- Check citation completeness
- Provide educational feedback
- Screen before official submission

### Important Disclaimers

**Use Responsibly:**
- Self-check tool, not replacement for institutional systems
- False positives possible
- Manual review required for flagged passages
- Consider academic context
- Verify matches before accusations
- Seek guidance from instructors

**Privacy Considerations:**
- Local tools keep data private
- API services send text to external servers
- Read provider privacy policies
- Don't submit confidential work
- Consider institutional policies

## Troubleshooting

### "gemini-cli not found"

```bash
pip install gemini-cli
gemini auth login
gemini -p "test"
```

### Python Dependencies

```bash
# Install required packages
pip install scikit-learn nltk numpy

# Download NLTK data
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
```

### "ModuleNotFoundError"

```bash
# Verify Python installation
python3 --version

# Install in virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Google API Rate Limits

**Problem:** "429 Rate Limit Exceeded"

**Solutions:**
- Reduce number of searches
- Add delays between requests (1-2 seconds)
- Check daily quota limits
- Upgrade to paid tier
- Use manual searches for key passages

### Large Documents

**Problem:** Timeout or memory errors

**Solutions:**
- Split document into sections
- Check suspicious sections individually
- Increase n-gram threshold
- Use sampling for initial screening
- Process incrementally

### Interpreting Conflicting Results

**Scenario:** High similarity but looks original

**Check:**
- Is it common academic language?
- Are citations present?
- Is it your own previous work?
- Standard terminology vs unique phrasing
- Field-specific conventions

### False Positives

**Common Causes:**
- Technical terminology
- Standard phrases
- Proper citations not recognized
- Your own previous work
- Widely-used frameworks

**How to Verify:**
- Check if citations present
- Verify matched sources
- Consider field norms
- Review context
- Get instructor input

## Examples

### Example 1: Pre-Submission Check

```bash
# Full workflow for final paper check

# Step 1: Quick style screening
gemini -m gemini-2.5-flash -p "Quick plagiarism check: @final_paper.txt"

# Step 2: If concerns raised, deeper analysis
gemini -m gemini-2.5-pro -p "[Full style analysis] @final_paper.txt"

# Step 3: Local comparison (if have previous papers)
python check_similarity.py final_paper.txt my_previous_papers/ --corpus

# Step 4: Citation verification
gemini -m gemini-2.5-pro -p "[Citation check prompt] @final_paper.txt"

# Step 5: Review all reports and make necessary revisions
```

### Example 2: Collaborative Work Verification

```bash
# Ensure collaborative sections are properly integrated

# Compare your section with partner's
python check_similarity.py my_section.txt partner_section.txt

# Check your section independently
gemini -m gemini-2.5-pro -p "Style analysis: @my_section.txt"

# Verify combined document coherence
gemini -p "Analyze style consistency across sections: @combined_paper.txt"
```

### Example 3: Self-Plagiarism Check

```bash
# Check new work against your previous papers

# Low threshold - some overlap expected
python check_similarity.py new_paper.txt previous_papers/ --corpus 0.4

# Identify specific overlapping passages
python check_ngrams.py new_paper.txt previous_paper.txt 4

# Verify proper self-citation
gemini -p "Check if previous work is properly self-cited: @new_paper.txt"
```

### Example 4: Suspicious Passage Investigation

```bash
# Deep dive on flagged section

# Extract suspicious passage to file
echo "[suspicious text]" > suspicious_passage.txt

# Web search verification
python check_web.py suspicious_passage.txt <api_key> <engine_id>

# Or manual Google search
google "exact phrase from passage"

# LLM analysis of specific passage
gemini -m gemini-2.5-pro -p "Analyze this passage for plagiarism:
[paste passage]
Is this likely original or copied? Why?"
```

## Integration Tips for Claude

### When Claude Should Use This Skill

Claude should autonomously check for plagiarism when:
1. User asks to "check for plagiarism"
2. User mentions "originality" or "academic integrity"
3. User requests "citation review"
4. User says "before submission" for academic work
5. User wants to "compare documents"
6. User mentions "Turnitin" or institutional checkers

### How Claude Should Use This Skill

**Standard Workflow:**
1. Ask user which detection level they want
2. Start with Gemini style analysis (always available)
3. If local tools available, add TF-IDF comparison
4. Synthesize findings into clear report
5. Provide specific recommendations
6. Offer next steps

**Report Format:**
```
PLAGIARISM ANALYSIS REPORT
=========================

Document: filename.txt
Date: YYYY-MM-DD
Analysis Level: [Quick/Standard/Deep]

OVERALL ASSESSMENT
- Plagiarism Risk: [Score]/10
- Risk Level: [Minimal/Low/Medium/High/Critical]

SUSPICIOUS PASSAGES
1. Lines 45-52: [quote]
   - Issue: Style inconsistency
   - Similarity: 85% (if measured)
   - Action: Verify sources, add citation

2. Lines 103-110: [quote]
   - Issue: Missing citation
   - Action: Add proper attribution

CITATION ISSUES
- 3 passages needing citations
- 2 formatting inconsistencies
- 1 missing bibliography entry

WEB MATCHES (if checked)
- Passage 1: [URL]
- Passage 2: [URL]

RECOMMENDATIONS
1. [Specific action]
2. [Specific action]
3. [Specific action]

NEXT STEPS
- Review flagged passages
- Add missing citations
- Revise paraphrasing
- Consider institutional check
```

### What Claude Should NOT Do

- Don't accuse anyone of plagiarism
- Don't make definitive judgments
- Don't skip disclaimer about tool limitations
- Don't ignore context (citations, quotes)
- Don't replace institutional checkers

## Summary

This skill provides multi-layered plagiarism detection combining:

**Immediate Value (No Setup):**
- Gemini-based style analysis
- Citation issue detection
- Suspicious passage identification

**Enhanced Features (With Setup):**
- Local TF-IDF similarity checking
- N-gram paraphrasing detection
- Web search verification
- Commercial API integration

**Best Used For:**
- Pre-submission self-checks
- Academic integrity education
- Citation verification
- Writing style analysis
- Document comparison

**Remember:**
- Screening tool, not proof
- Manual review required
- Respect privacy and policies
- Seek instructor guidance
- Maintain academic integrity

Use this skill to improve your academic writing and ensure proper attribution!