---
title: Tool Reference
description: All 17 tools across five categories.
sidebar:
  order: 2
---

MCP File Forge provides 17 tools organized into five categories. All tools enforce sandbox restrictions — operations outside allowed paths are rejected.

## Reading

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `read_file` | Read file contents | `path`, `encoding?`, `start_line?`, `end_line?`, `max_size_kb?` |
| `read_directory` | List directory entries | `path`, `recursive?`, `max_depth?`, `include_hidden?`, `pattern?` |
| `read_multiple` | Batch-read multiple files | `paths`, `encoding?`, `fail_on_error?` |

## Writing

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `write_file` | Write or overwrite a file | `path`, `content`, `encoding?`, `create_dirs?`, `overwrite?`, `backup?` |
| `create_directory` | Create a directory | `path`, `recursive?` |
| `copy_file` | Copy a file or directory | `source`, `destination`, `overwrite?`, `recursive?` |
| `move_file` | Move or rename | `source`, `destination`, `overwrite?` |
| `delete_file` | Delete a file or directory | `path`, `recursive?`, `force?` |

All writing tools are disabled when `MCP_FILE_FORGE_READ_ONLY=true`.

## Search

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `glob_search` | Find files by glob pattern | `pattern`, `base_path?`, `max_results?`, `include_dirs?` |
| `grep_search` | Search file contents with regex | `pattern`, `path?`, `glob?`, `case_sensitive?`, `max_results?`, `context_lines?` |
| `find_by_content` | Literal text search (no regex) | `text`, `path?`, `file_pattern?`, `max_results?` |

## Metadata

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `file_stat` | File/directory statistics | `path` |
| `file_exists` | Check existence and type | `path`, `type?` (`file` / `directory` / `any`) |
| `get_disk_usage` | Directory size breakdown | `path`, `max_depth?` |
| `compare_files` | Compare two paths | `path1`, `path2` |

## Scaffolding

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `scaffold_project` | Create project from template | `template`, `destination`, `variables?`, `overwrite?` |
| `list_templates` | List available templates | `category?` |

Scaffolding tools use `{{var}}` / `${var}` substitution in file contents and `__var__` renaming in file paths. See the [Templates](/mcp-file-forge/handbook/templates/) page for details.
