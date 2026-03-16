#!/usr/bin/env node

/**
 * Construct 3 Unified MCP Server
 *
 * Combines:
 * - 6 documentation tools (always available)
 * - 28 project tools (query, mutation, analysis)
 * - 5 scripting/file tools
 * - 6 resources + 6 prompts
 *
 * Usage:
 *   node dist/index.js [project-path]
 *
 * If project-path is provided, project tools are registered.
 * Documentation tools work regardless of project path.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Documentation tools (always available)
import { registerSearchDocs } from "./tools/search-docs.js";
import { registerGetDoc } from "./tools/get-doc.js";
import { registerListTopics } from "./tools/list-topics.js";
import { registerListCategories } from "./tools/list-categories.js";
import { registerGetAceReference } from "./tools/get-ace-reference.js";
import { registerGetExamples } from "./tools/get-examples.js";

// Project tools (require project path)
import { Construct3ProjectReader } from "./construct3/project-reader.js";
import { Construct3ProjectWriter } from "./construct3/project-writer.js";
import { IdGenerator } from "./construct3/id-generator.js";
import { registerQueryTools } from "./tools/query.js";
import { registerMutationTools } from "./tools/mutations.js";
import { registerAnalysisTools } from "./tools/analysis.js";
import { registerScriptTools } from "./tools/script-tools.js";
import { registerProjectResources } from "./resources/project.js";
import { registerWorkflowPrompts } from "./prompts/workflows.js";

const server = new McpServer(
  { name: "construct3-docs", version: "2.0.0" },
  { capabilities: { resources: {}, tools: {}, prompts: {} } },
);

// ─── Documentation tools (always available) ─────────────────

registerSearchDocs(server);
registerGetDoc(server);
registerListTopics(server);
registerListCategories(server);
registerGetAceReference(server);
registerGetExamples(server);

// ─── Project tools (optional — require project path) ────────

async function initializeProject(path: string): Promise<Construct3ProjectReader> {
  let projectFile = path;
  if (!path.endsWith('.c3proj')) {
    const found = await Construct3ProjectReader.findProjectFile(path);
    if (!found) {
      throw new Error(`No .c3proj file found in directory: ${path}`);
    }
    projectFile = found;
  }

  const isValid = await Construct3ProjectReader.isValidProject(projectFile);
  if (!isValid) {
    throw new Error(`Invalid Construct3 project file: ${projectFile}`);
  }

  const reader = new Construct3ProjectReader(projectFile);
  await reader.loadProject();
  return reader;
}

async function main(): Promise<void> {
  const projectPath = process.argv[2] || process.env.C3_PROJECT_PATH;

  console.error("Construct3 Unified MCP Server starting...");
  console.error(`Documentation tools: 6 registered`);

  if (projectPath) {
    try {
      console.error(`Project path: ${projectPath}`);
      const reader = await initializeProject(projectPath);
      const metadata = reader.getMetadata();
      console.error(`Loaded project: ${metadata.name}`);

      // Query tools (9)
      registerQueryTools(server, reader);

      // Mutation tools (14: objects, events, layouts, project, animations)
      const idGen = new IdGenerator();
      const writer = new Construct3ProjectWriter(reader, idGen);
      registerMutationTools(server, reader, writer, idGen);

      // Analysis tools (8)
      registerAnalysisTools(server, reader);

      // Script & file tools (5)
      registerScriptTools(server, reader);

      // Resources (6)
      registerProjectResources(server, reader);

      // Prompts (6)
      registerWorkflowPrompts(server, reader);

      console.error(`Project tools: 36 registered`);
    } catch (error) {
      console.error(
        `Warning: Could not load project: ${error instanceof Error ? error.message : String(error)}`
      );
      console.error("Documentation tools are still available.");
    }
  } else {
    console.error("No project path provided — documentation tools only.");
    console.error("Pass a project path as argument to enable project tools.");
  }

  // Start transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Construct3 Unified MCP Server ready");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
