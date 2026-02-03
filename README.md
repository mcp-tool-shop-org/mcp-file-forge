# MCP File Forge

A Model Context Protocol (MCP) server for secure file operations and project scaffolding.

## Features

- **Secure File Operations**: Read, write, copy, move, and delete files with sandboxed access controls
- **Project Scaffolding**: Create projects from templates with variable substitution
- **Windows-First**: Optimized for Windows paths, permissions, and conventions
- **Search Capabilities**: Glob patterns and regex content search
- **Configurable Security**: Define allowed paths, size limits, and read-only modes

## Installation

```bash
npm install @mcp-tool-shop/file-forge
```

## Quick Start

### With Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "file-forge": {
      "command": "node",
      "args": ["path/to/mcp-file-forge/build/index.js"],
      "env": {
        "MCP_FILE_FORGE_ALLOWED_PATHS": "C:/Projects,C:/Users/you/Documents"
      }
    }
  }
}
```

### Standalone

```bash
npx @mcp-tool-shop/file-forge
```

## Available Tools

### File Reading
- `read_file` - Read file contents with encoding and line range options
- `read_directory` - List directory contents with metadata
- `read_multiple` - Batch read multiple files

### File Writing
- `write_file` - Write or overwrite file contents
- `create_directory` - Create directories
- `copy_file` - Copy files or directories
- `move_file` - Move or rename files
- `delete_file` - Delete files or directories

### Search
- `glob_search` - Find files matching glob patterns
- `grep_search` - Search file contents with regex

### Metadata
- `file_stat` - Get file statistics
- `file_exists` - Check if path exists

### Scaffolding
- `scaffold_project` - Create project from template
- `list_templates` - List available templates

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MCP_FILE_FORGE_ALLOWED_PATHS` | Comma-separated allowed paths | `.` |
| `MCP_FILE_FORGE_READ_ONLY` | Disable write operations | `false` |
| `MCP_FILE_FORGE_MAX_FILE_SIZE` | Max file size in bytes | `104857600` |
| `MCP_FILE_FORGE_LOG_LEVEL` | Logging level | `info` |

### Config File

Create `mcp-file-forge.json` in the working directory:

```json
{
  "sandbox": {
    "allowed_paths": ["./projects"],
    "denied_paths": ["**/secrets/**"],
    "max_file_size": 52428800
  }
}
```

## Security

- Path sandboxing restricts operations to allowed directories
- Symlink following is disabled by default
- Read-only mode available for safe browsing
- Size limits prevent memory exhaustion

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Development mode (watch)
npm run dev

# Run tests
npm test
```

## License

MIT

## Author

mcp-tool-shop
