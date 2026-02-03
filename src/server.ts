/**
 * MCP File Forge - Server Implementation
 *
 * Core MCP server setup with STDIO transport.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerReadTools } from './tools/read.js';
import { registerWriteTools } from './tools/write.js';
import { registerSearchTools } from './tools/search.js';
import { registerMetadataTools } from './tools/metadata.js';
import { registerScaffoldTools } from './tools/scaffold.js';
import { loadConfig } from './config/index.js';
import { getSandbox, enableReadOnlyMode } from './security/index.js';

// Server metadata
const SERVER_NAME = 'mcp-file-forge';
const SERVER_VERSION = '0.1.0';

/**
 * Create and configure the MCP server instance.
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });

  // Register all tools
  registerReadTools(server);
  registerWriteTools(server);
  registerSearchTools(server);
  registerMetadataTools(server);
  registerScaffoldTools(server);

  return server;
}

/**
 * Create STDIO transport for the server.
 */
export function createTransport(): StdioServerTransport {
  return new StdioServerTransport();
}

/**
 * Start the MCP server with STDIO transport.
 */
export async function startServer(): Promise<void> {
  // Load configuration
  const config = await loadConfig();

  // Initialize sandbox with config
  const sandbox = getSandbox(config.sandbox);
  await sandbox.initialize();

  // Enable read-only mode if configured
  if (config.read_only) {
    enableReadOnlyMode();
    console.error(`[${SERVER_NAME}] Running in read-only mode`);
  }

  // Create and start server
  const server = createServer();
  const transport = createTransport();

  // Log to stderr (stdout is reserved for MCP protocol)
  console.error(`[${SERVER_NAME}] Starting server v${SERVER_VERSION}...`);
  console.error(`[${SERVER_NAME}] Allowed paths: ${sandbox.getAllowedPaths().join(', ')}`);

  await server.connect(transport);

  console.error(`[${SERVER_NAME}] Server connected and ready`);
}
