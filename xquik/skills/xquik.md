---
name: xquik
description: Plan and implement Xquik REST API, MCP, webhook, and X data automation workflows. Use when users mention Xquik, X API automation, X social data extraction, account monitoring, tweet or follower workflows, webhook delivery, or MCP access to Xquik tools.
license: MIT
---

# Xquik Skill

Use this skill when a user wants to plan, build, or troubleshoot a workflow with Xquik's public REST API, MCP server, webhooks, or X automation tools.

## Source Of Truth

- API reference: https://docs.xquik.com/api-reference/overview
- MCP docs: https://docs.xquik.com/mcp/overview
- MCP manifest: https://xquik.com/.well-known/mcp.json
- OpenAPI document: https://xquik.com/openapi.json

Read the relevant docs before naming endpoints, request fields, response fields, or setup steps. Do not invent API behavior.

## When To Use

- X data extraction, enrichment, monitoring, or reporting workflows
- REST API or webhook integration planning
- MCP client setup or tool selection
- Compose, draft, account, trend, radar, support, or event automation tasks
- Choosing between REST, MCP, and webhook delivery for a user workflow

## Workflow

1. Clarify the task goal, required data, authentication path, and output format.
2. Check the public docs for the exact API, MCP, or webhook surface.
3. Keep Xquik opt-in. Ask the user for an API key or MCP configuration when needed.
4. Store secrets in environment variables such as `XQUIK_API_KEY`. Never print, paste, or commit keys.
5. Prefer the narrowest endpoint or MCP tool that satisfies the task.
6. Validate examples against the OpenAPI document or docs before returning them.

## Expected Output

- Selected Xquik surface: REST API, MCP, webhook, or dashboard workflow
- Required inputs and authentication setup
- Minimal request, response, or client snippet only when source-backed
- Clear unsupported or unknown behavior notes when docs do not confirm a detail

Xquik is an independent third-party service. Not affiliated with X Corp. "Twitter" and "X" are trademarks of X Corp.
