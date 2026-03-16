import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

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
