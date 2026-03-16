#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerSearchDocs } from "./tools/search-docs.js";
import { registerGetDoc } from "./tools/get-doc.js";
import { registerListTopics } from "./tools/list-topics.js";
import { registerListCategories } from "./tools/list-categories.js";
import { registerGetAceReference } from "./tools/get-ace-reference.js";
import { registerGetExamples } from "./tools/get-examples.js";

const server = new McpServer({
  name: "construct3-docs",
  version: "1.0.0",
});

// Register all tools
registerSearchDocs(server);
registerGetDoc(server);
registerListTopics(server);
registerListCategories(server);
registerGetAceReference(server);
registerGetExamples(server);

// Start server
async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("construct3-docs MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
