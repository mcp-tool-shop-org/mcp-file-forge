---
title: Security Model
description: Sandboxing, path restrictions, and symlink protection.
sidebar:
  order: 4
---

MCP File Forge enforces multiple layers of protection to keep AI agents within their designated workspace. Security is not optional — it's built into every file operation.

## Protection layers

### Path sandboxing
Every path is resolved to an absolute path and checked against the `allowed_paths` list before any I/O occurs. Operations targeting paths outside allowed directories are rejected immediately.

### Denied paths
Glob patterns that are blocked even within allowed directories. The defaults block `**/node_modules/**` and `**/.git/**`. Add your own with `MCP_FILE_FORGE_DENIED_PATHS`.

### Symlink protection
Symlinks are not followed by default. If a symlink target resolves outside the sandbox, the operation is denied. Enable with `MCP_FILE_FORGE_FOLLOW_SYMLINKS=true` only when you trust all symlink targets.

### Path traversal detection
`..` sequences that would escape the sandbox are rejected, regardless of how they're composed.

### Size limits
Files larger than `max_file_size` (default: 100 MB) are refused to prevent memory exhaustion.

### Depth limits
Recursive operations are capped at `max_depth` levels (default: 20) to prevent runaway traversal.

### Read-only mode
Set `MCP_FILE_FORGE_READ_ONLY=true` to disable all write operations. This is ideal for auditing, exploration, or untrusted agents. Only read and search tools remain active.

### Null-byte rejection
Paths containing `\0` are refused — this prevents null-byte injection attacks that could bypass path validation.

### Windows long-path guard
Paths exceeding 32,767 characters are refused. This is the Windows API maximum.

## Data scope

| Aspect | Detail |
|--------|--------|
| **Data accessed** | Files within explicitly allowed directories only |
| **Data NOT accessed** | No cloud sync, no telemetry, no analytics |
| **Network** | stdio transport only — no network listeners, no egress |
| **Telemetry** | None collected or sent |
