#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { execFile } from "child_process";
import { promisify } from "util";
import { access } from "fs/promises";

const execFileAsync = promisify(execFile);

// Configuration constants
const GEMINI_EXEC_TIMEOUT = 120000; // 120 seconds
const GEMINI_EXEC_MAX_BUFFER = 1024 * 1024 * 10; // 10MB
const GEMINI_CHECK_TIMEOUT = 5000; // 5 seconds for setup checks

// Standard review prompt templates
const REVIEW_TEMPLATES = {
  code_changes: `Review the code changes for:
- Correctness and logic errors
- Performance implications
- Maintainability and code quality
- Edge cases and error handling
- Security considerations
Provide specific, actionable feedback.`,

  plan: `Review this plan for:
- Feasibility and completeness
- Potential risks and challenges
- Missing considerations
- Implementation approach
- Alternative strategies
Provide constructive feedback and suggestions.`,

  documentation: `Review the documentation for:
- Technical accuracy
- Clarity for the intended audience
- Completeness of coverage
- Grammar and flow
- Tone alignment (encouraging, professional, practical)
- Sentence case compliance
Provide specific improvement suggestions.`,

  architecture: `Review the architecture for:
- Scalability and performance
- Maintainability and modularity
- Security considerations
- Technology choices
- Trade-offs and alternatives
Provide technical feedback and recommendations.`,

  test_coverage: `Review the test coverage for:
- Completeness of test scenarios
- Edge case coverage
- Test quality and maintainability
- Missing test cases
- Testing approach
Provide specific suggestions for improvement.`,

  custom: `Review the content based on the specified criteria.`
};

/**
 * Check if gemini-cli is installed and accessible
 */
async function checkGeminiCli() {
  try {
    await execFileAsync("gemini", ["--version"], { timeout: GEMINI_CHECK_TIMEOUT });
    return { available: true };
  } catch (error) {
    // Check if it's a "command not found" error
    if (error.code === 127 || error.code === 'ENOENT' ||
        (error.message && error.message.toLowerCase().includes('not found'))) {
      return {
        available: false,
        error: "gemini-cli not found. Install it first: pip install gemini-cli (or appropriate install command)"
      };
    }
    // Command exists but --version failed for another reason, consider it available
    return { available: true };
  }
}

/**
 * Test if gemini-cli is configured with valid credentials
 */
async function checkGeminiConfigured() {
  try {
    // Try a minimal test command
    const { stdout, stderr } = await execFileAsync("gemini", ["-p", "test"], {
      timeout: GEMINI_CHECK_TIMEOUT
    });

    // Check for auth errors in both stdout and stderr
    const output = (stdout + stderr).toLowerCase();
    if (output.includes('not authenticated') ||
        output.includes('login required') ||
        output.includes('authentication failed') ||
        output.includes('api key')) {
      return {
        configured: false,
        error: "Gemini not authenticated. Authenticate with: gemini auth login (or set API key if preferred)"
      };
    }

    return { configured: true };
  } catch (error) {
    // If command runs but times out, assume it's working
    if (error.killed || error.signal === 'SIGTERM') {
      return { configured: true };
    }
    return {
      configured: false,
      error: "Could not verify Gemini authentication. Ensure gemini-cli is properly set up with: gemini auth login"
    };
  }
}

/**
 * Execute gemini-cli review
 */
async function executeGeminiReview(reviewType, target, criteria = [], context = "") {
  // Get the appropriate template
  const template = REVIEW_TEMPLATES[reviewType] || REVIEW_TEMPLATES.custom;

  // Build the prompt
  let fullPrompt = template;
  if (criteria && criteria.length > 0) {
    fullPrompt += `\n\nSpecific focus areas: ${criteria.join(", ")}`;
  }

  if (context) {
    fullPrompt += `\n\nAdditional context: ${context}`;
  }

  // Determine if target is a file path or inline content using fs.access()
  let isFile = false;
  if (typeof target === "string") {
    try {
      await access(target);
      isFile = true;
    } catch (e) {
      // Not a file or not accessible, treat as inline content
      isFile = false;
    }
  }

  if (isFile) {
    // Add file reference with @ syntax
    fullPrompt += `\n\n@${target}`;
  } else {
    // Treat as inline content
    fullPrompt += `\n\nContent to review:\n${target}`;
  }

  try {
    const { stdout, stderr } = await execFileAsync("gemini", ["-p", fullPrompt], {
      maxBuffer: GEMINI_EXEC_MAX_BUFFER,
      timeout: GEMINI_EXEC_TIMEOUT
    });

    return {
      success: true,
      review: stdout,
      command: `gemini -p "..." @${isFile ? target : '(inline content)'}` // Simplified display
    };
  } catch (error) {
    return {
      success: false,
      error: `Gemini CLI error: ${error.message}`,
      stderr: error.stderr || ""
    };
  }
}

/**
 * Create and start the MCP server
 */
async function main() {
  const server = new Server(
    {
      name: "gemini-review",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "gemini_review",
          description: "Get a second opinion from Gemini on code changes, plans, documentation, architecture, or other work products. Returns Gemini's analysis and recommendations.",
          inputSchema: {
            type: "object",
            properties: {
              review_type: {
                type: "string",
                enum: ["code_changes", "plan", "documentation", "architecture", "test_coverage", "custom"],
                description: "Type of review to perform. Each type has specific focus areas.",
              },
              target: {
                type: "string",
                description: "What to review: a file path (e.g., 'src/app.js') or inline content. Use file paths when possible for better context.",
              },
              criteria: {
                type: "array",
                items: { type: "string" },
                description: "Optional: Specific aspects to focus on (e.g., ['performance', 'security', 'readability'])",
              },
              context: {
                type: "string",
                description: "Optional: Additional context for the review (e.g., 'This is part of a refactoring to improve performance')",
              },
            },
            required: ["review_type", "target"],
          },
        },
        {
          name: "gemini_check_setup",
          description: "Verify that gemini-cli is installed and properly configured. Use this to troubleshoot if gemini_review isn't working.",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
      ],
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === "gemini_check_setup") {
      // Check prerequisites
      const cliCheck = await checkGeminiCli();
      if (!cliCheck.available) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Setup Issue: ${cliCheck.error}\n\nPlease install gemini-cli before using this plugin.`,
            },
          ],
        };
      }

      const configCheck = await checkGeminiConfigured();
      if (!configCheck.configured) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Configuration Issue: ${configCheck.error}\n\nPlease configure gemini-cli with your API key.`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: "✅ gemini-cli is installed and configured correctly!",
          },
        ],
      };
    }

    if (name === "gemini_review") {
      // Validate prerequisites before executing
      const cliCheck = await checkGeminiCli();
      if (!cliCheck.available) {
        return {
          content: [
            {
              type: "text",
              text: `Cannot perform review: ${cliCheck.error}`,
            },
          ],
          isError: true,
        };
      }

      // Execute the review
      const result = await executeGeminiReview(
        args.review_type,
        args.target,
        args.criteria || [],
        args.context || ""
      );

      if (result.success) {
        return {
          content: [
            {
              type: "text",
              text: `# Gemini Review (${args.review_type})\n\n${result.review}\n\n---\n_Command executed: ${result.command}_`,
            },
          ],
        };
      } else {
        return {
          content: [
            {
              type: "text",
              text: `Review failed: ${result.error}\n\n${result.stderr}`,
            },
          ],
          isError: true,
        };
      }
    }

    return {
      content: [
        {
          type: "text",
          text: `Unknown tool: ${name}`,
        },
      ],
      isError: true,
    };
  });

  // Start the server
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error("Gemini Review MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
