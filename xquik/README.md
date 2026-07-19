# Xquik

Plan and implement Xquik REST API, MCP, webhook, and X data automation workflows.

## Overview

This plugin helps Claude choose the right Xquik surface for X data, monitoring, compose, webhook, and integration tasks. It points agents to Xquik's public API reference, MCP docs, MCP manifest, and OpenAPI document before they name endpoints or fields.

## Prerequisites

- Xquik account
- Xquik API key for REST API requests
- Claude Code or another MCP-capable client for MCP workflows

## Installation

```bash
/plugin marketplace add bgreenwell/claude-plugins
/plugin install xquik@bgreenwell-plugins
```

## Usage

Ask Claude to plan or implement an Xquik workflow:

```text
Use Xquik to plan an X account monitoring workflow with webhook delivery.
```

Claude should verify the relevant Xquik docs before returning endpoints, request fields, response fields, or setup steps.

## Source Docs

- API reference: https://docs.xquik.com/api-reference/overview
- MCP docs: https://docs.xquik.com/mcp/overview
- MCP manifest: https://xquik.com/.well-known/mcp.json
- OpenAPI document: https://xquik.com/openapi.json

## Privacy & Security

Keep Xquik opt-in. Store API keys in environment variables such as `XQUIK_API_KEY`, and never paste, print, or commit secrets.

## Troubleshooting

- Confirm the API key is present in `XQUIK_API_KEY` before testing REST requests.
- Recheck the public docs and OpenAPI document when a route or field differs from an older example.
- Use the MCP overview for supported client setup and authentication.

## License

MIT License. See [LICENSE](../LICENSE) for details.

Xquik is an independent third-party service. Not affiliated with X Corp. "Twitter" and "X" are trademarks of X Corp.
