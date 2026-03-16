import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getDocContent } from "../docs/reader.js";
import { toolResult, toolError } from "./shared.js";

export function registerGetDoc(server: McpServer): void {
  server.tool(
    "get_doc",
    "Get the full markdown content of a Construct 3 documentation topic.",
    {
      topic: z.string().describe("Topic slug (e.g. 'sprite', 'platform', 'layouts')"),
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
        .describe("Category to disambiguate topics with same slug"),
      lang: z.string().optional().describe("Language code (default: en)"),
    },
    async ({ topic, category, lang }) => {
      try {
        const result = await getDocContent(topic, category, lang);
        if (!result) {
          return toolError(
            `Topic "${topic}" not found. Use list_topics to see available topics.`
          );
        }
        return toolResult({
          slug: result.entry.slug,
          title: result.entry.title,
          category: result.entry.category,
          lang: result.entry.lang,
          sourceUrl: result.entry.sourceUrl,
          content: result.content,
        });
      } catch (error) {
        return toolError(
          `Failed to get doc: ${error instanceof Error ? error.message : error}`
        );
      }
    }
  );
}
