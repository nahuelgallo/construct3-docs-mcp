import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getCodeExamples } from "../docs/reader.js";
import { toolResult, toolError } from "./shared.js";

export function registerGetExamples(server: McpServer): void {
  server.tool(
    "get_examples",
    "Search for code examples and snippets from the Construct 3 documentation.",
    {
      query: z
        .string()
        .describe("Search query for code examples (e.g. 'collision', 'tween', 'spawn')"),
      lang: z.string().optional().describe("Language code (default: en)"),
      limit: z
        .number()
        .min(1)
        .max(30)
        .optional()
        .describe("Max results (default: 10)"),
    },
    async ({ query, lang, limit }) => {
      try {
        const examples = await getCodeExamples(query, lang, limit ?? 10);
        if (examples.length === 0) {
          return toolResult({
            message: `No code examples found for "${query}"`,
            examples: [],
          });
        }
        return toolResult({
          query,
          totalResults: examples.length,
          examples,
        });
      } catch (error) {
        return toolError(
          `Failed to get examples: ${error instanceof Error ? error.message : error}`
        );
      }
    }
  );
}
