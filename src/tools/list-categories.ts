import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { loadManifest } from "../docs/reader.js";
import { DOC_CATEGORIES, CATEGORY_DESCRIPTIONS } from "../docs/types.js";
import { toolResult, toolError } from "./shared.js";

export function registerListCategories(server: McpServer): void {
  server.tool(
    "list_categories",
    "List all documentation categories with descriptions and topic counts.",
    {
      lang: z.string().optional().describe("Language code (default: en)"),
    },
    async ({ lang }) => {
      try {
        const manifest = await loadManifest(lang);

        const categories = DOC_CATEGORIES.map((cat) => ({
          name: cat,
          description: CATEGORY_DESCRIPTIONS[cat],
          topicCount: manifest?.categories[cat] ?? 0,
        }));

        return toolResult({
          totalCategories: categories.length,
          totalTopics: manifest?.totalTopics ?? 0,
          categories,
        });
      } catch (error) {
        return toolError(
          `Failed to list categories: ${error instanceof Error ? error.message : error}`
        );
      }
    }
  );
}
