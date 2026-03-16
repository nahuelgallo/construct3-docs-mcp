import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { searchDocs } from "../docs/search.js";
import { toolResult, toolError } from "./shared.js";

export function registerSearchDocs(server: McpServer): void {
  server.tool(
    "search_docs",
    "Full-text search across Construct 3 documentation. Returns matching topics with relevance-scored snippets.",
    {
      query: z.string().describe("Search query"),
      category: z
        .enum([
          "plugins",
          "behaviors",
          "project",
          "scripting",
          "interface",
          "effects",
          "publishing",
        ])
        .optional()
        .describe("Filter by category"),
      lang: z.string().optional().describe("Language code (default: en)"),
      limit: z
        .number()
        .min(1)
        .max(50)
        .optional()
        .describe("Max results (default: 10)"),
    },
    async ({ query, category, lang, limit }) => {
      try {
        const results = await searchDocs(query, category, lang, limit ?? 10);
        if (results.length === 0) {
          return toolResult({
            message: `No results found for "${query}"`,
            results: [],
          });
        }
        return toolResult({
          query,
          totalResults: results.length,
          results,
        });
      } catch (error) {
        return toolError(
          `Search failed: ${error instanceof Error ? error.message : error}`
        );
      }
    }
  );
}
