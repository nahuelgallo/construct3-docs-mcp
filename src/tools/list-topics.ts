import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { listEntries } from "../docs/reader.js";
import { toolResult, toolError } from "./shared.js";

export function registerListTopics(server: McpServer): void {
  server.tool(
    "list_topics",
    "List all available Construct 3 documentation topics, optionally filtered by category.",
    {
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
    },
    async ({ category, lang }) => {
      try {
        const entries = await listEntries(category, lang);
        if (entries.length === 0) {
          return toolResult({
            message: "No topics found. Run c3-docs-scrape to download documentation.",
            topics: [],
          });
        }
        return toolResult({
          totalTopics: entries.length,
          topics: entries.map((e) => ({
            slug: e.slug,
            title: e.title,
            category: e.category,
          })),
        });
      } catch (error) {
        return toolError(
          `Failed to list topics: ${error instanceof Error ? error.message : error}`
        );
      }
    }
  );
}
