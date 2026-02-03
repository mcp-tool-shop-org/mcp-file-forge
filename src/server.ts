/**
 * MCP File Forge - Server Implementation
 *
 * Core MCP server setup with STDIO transport.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerReadTools } from './tools/read.js';
import { registerWriteTools } from './tools/write.js';

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
  const server = createServer();
  const transport = createTransport();

  // Log to stderr (stdout is reserved for MCP protocol)
  console.error(`[${SERVER_NAME}] Starting server v${SERVER_VERSION}...`);

  await server.connect(transport);

  console.error(`[${SERVER_NAME}] Server connected and ready`);
}
