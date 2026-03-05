---
title: Reference
description: Architecture, error codes, and development guide.
sidebar:
  order: 6
---

## Architecture

MCP File Forge runs as an MCP server over stdio transport. Every incoming tool call passes through the security layer before reaching the tool implementation.

```
Client (Claude Desktop, etc.)
  ↓ stdio (JSON-RPC)
MCP Server
  ↓
Security Layer (path validation, sandbox check)
  ↓
Tool Implementation (read, write, search, etc.)
  ↓
File System
```

## Transport

MCP File Forge uses **stdio transport** exclusively. There are no network listeners and no outbound connections. Communication happens through stdin/stdout using the MCP JSON-RPC protocol.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Run tests
npm test

# Lint
npm run lint
```

## Related documentation

| Document | Description |
|----------|-------------|
| [HANDBOOK.md](https://github.com/mcp-tool-shop-org/mcp-file-forge/blob/main/HANDBOOK.md) | Deep-dive into security model, tool reference, templates, architecture |
| [CHANGELOG.md](https://github.com/mcp-tool-shop-org/mcp-file-forge/blob/main/CHANGELOG.md) | Release history |
| [SECURITY.md](https://github.com/mcp-tool-shop-org/mcp-file-forge/blob/main/SECURITY.md) | Security policy and vulnerability reporting |
