---
title: Templates
description: Project scaffolding with variable substitution.
sidebar:
  order: 5
---

MCP File Forge includes a template engine for project scaffolding. Templates let AI agents create entire project structures with variable substitution.

## How templates work

A template is a directory containing files with substitution markers. When `scaffold_project` runs:

1. The template directory is copied to the destination
2. `{{var}}` and `${var}` markers in file contents are replaced with provided values
3. `__var__` markers in file and directory names are renamed

## Using templates

### List available templates

```
list_templates({ category: "node" })
```

### Scaffold a project

```
scaffold_project({
  template: "node-cli",
  destination: "C:/Projects/my-tool",
  variables: {
    name: "my-tool",
    description: "A helpful CLI",
    author: "Your Name"
  }
})
```

## Template paths

Templates are loaded from directories configured via:
- `MCP_FILE_FORGE_TEMPLATE_PATHS` environment variable (comma-separated)
- `templates.paths` in the config file
- Default: `./templates` relative to the working directory

## Writing templates

Create a directory with your project structure. Use substitution markers where values should be injected:

**File contents:** `{{name}}` or `${name}` in any text file

**File/directory names:** `__name__` is renamed to the variable value

For example, a template file named `__name__/package.json` containing `"name": "{{name}}"` would create `my-tool/package.json` with `"name": "my-tool"` when scaffolded with `variables: { name: "my-tool" }`.
