/**
 * Shared utilities for MCP tools.
 * Merged from docs-mcp toolResult/toolError + project-mcp validations.
 */

import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { Construct3ProjectReader } from '../construct3/project-reader.js';
import type { Construct3ProjectWriter } from '../construct3/project-writer.js';
import type { IdGenerator } from '../construct3/id-generator.js';
import { RESERVED_NAMES } from '../construct3/templates.js';

// ─── Tool Response Helpers ──────────────────────────────────

/** Wrap a successful result for MCP tool response */
export function toolResult(data: unknown): CallToolResult {
  const text =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);
  return {
    content: [{ type: "text", text }],
  };
}

/** Wrap an error result for MCP tool response */
export function toolError(message: string): CallToolResult {
  return {
    content: [{ type: "text", text: message }],
    isError: true,
  };
}

// ─── Dependency Bundle ──────────────────────────────────────

/** Dependency bundle passed to each domain's registerXTools() function. */
export interface MutationToolDeps {
  server: McpServer;
  reader: Construct3ProjectReader;
  writer: Construct3ProjectWriter;
  idGen: IdGenerator;
}

// ─── Validation Helpers ─────────────────────────────────────

/** Validate that a name is safe for use as a filename and C3 identifier. */
export function validateName(name: string): void {
  if (!name || name.length === 0) {
    throw new Error('Name cannot be empty');
  }
  if (name.length > 200) {
    throw new Error('Name too long (max 200 characters)');
  }
  if (!/^[a-zA-Z_][a-zA-Z0-9_ ]*$/.test(name)) {
    throw new Error('Name must start with a letter or underscore and contain only alphanumeric characters, underscores, and spaces');
  }
  // Reserved name check
  if (RESERVED_NAMES.has(name)) {
    throw new Error(`"${name}" is a reserved name in Construct 3 and cannot be used`);
  }
}

/** Validate a subfolder path is safe. */
export function validateSubfolder(subfolder: string): void {
  if (subfolder.includes('..') || subfolder.includes('\\') || subfolder.startsWith('/')) {
    throw new Error('Subfolder path contains invalid characters (use forward slashes only, no "..")');
  }
  const parts = subfolder.split('/');
  for (const part of parts) {
    if (part.length === 0 || part === '.' || part === '..') {
      throw new Error('Subfolder path contains invalid segments');
    }
  }
}
