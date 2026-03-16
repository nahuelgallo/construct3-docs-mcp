import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getAceReference } from "../docs/reader.js";
import { toolResult, toolError } from "./shared.js";

export function registerGetAceReference(server: McpServer): void {
  server.tool(
    "get_ace_reference",
    "Get the Actions, Conditions, and Expressions (ACE) reference for a Construct 3 plugin or behavior.",
    {
      plugin: z
        .string()
        .describe("Plugin or behavior slug (e.g. 'sprite', 'platform', 'tween')"),
      lang: z.string().optional().describe("Language code (default: en)"),
    },
    async ({ plugin, lang }) => {
      try {
        const ace = await getAceReference(plugin, lang);
        if (!ace) {
          return toolError(
            `No ACE reference found for "${plugin}". Use list_topics with category "plugins" or "behaviors" to see available options.`
          );
        }
        return toolResult({
          plugin: ace.plugin,
          category: ace.category,
          actionsCount: ace.actions.length,
          conditionsCount: ace.conditions.length,
          expressionsCount: ace.expressions.length,
          actions: ace.actions,
          conditions: ace.conditions,
          expressions: ace.expressions,
        });
      } catch (error) {
        return toolError(
          `Failed to get ACE reference: ${error instanceof Error ? error.message : error}`
        );
      }
    }
  );
}
