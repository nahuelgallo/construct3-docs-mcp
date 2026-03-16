/**
 * Script tools: list_scripts, read_script, write_script.
 * Handles JavaScript files within a Construct 3 project.
 */

import { z } from 'zod';
import { readFile, writeFile, readdir, mkdir, stat } from 'fs/promises';
import { join, dirname, resolve, relative, isAbsolute } from 'path';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { Construct3ProjectReader } from '../construct3/project-reader.js';
import { toolResult, toolError } from './shared.js';

export function registerScriptTools(
  server: McpServer,
  reader: Construct3ProjectReader,
) {
  const projectDir = reader.getProjectDir();

  /**
   * Resolve a path safely within the project directory.
   */
  function safeResolve(...segments: string[]): string {
    const resolved = resolve(projectDir, ...segments);
    const rel = relative(projectDir, resolved);
    if (rel.startsWith('..') || isAbsolute(rel)) {
      throw new Error('Path traversal detected: path escapes project directory');
    }
    return resolved;
  }

  // ─── list_scripts ─────────────────────────────────────────

  server.tool(
    'list_scripts',
    'List all JavaScript script files in the Construct 3 project',
    {},
    async () => {
      try {
        const scriptsDir = safeResolve('scripts');
        const scripts: string[] = [];

        try {
          await collectScripts(scriptsDir, '', scripts);
        } catch (e: unknown) {
          if (e && typeof e === 'object' && 'code' in e && e.code === 'ENOENT') {
            return toolResult({ count: 0, scripts: [], note: 'No scripts/ directory found in project' });
          }
          throw e;
        }

        // Also list scripts registered in the c3proj
        const project = reader.getProject();
        const registeredScripts: string[] = [];
        if (project.rootFileFolders?.script) {
          collectFileItems(project.rootFileFolders.script, registeredScripts);
        }

        return toolResult({
          count: scripts.length,
          scripts,
          registeredInProject: registeredScripts,
        });
      } catch (error) {
        return toolError(`Error listing scripts: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  );

  // ─── read_script ──────────────────────────────────────────

  server.tool(
    'read_script',
    'Read the contents of a JavaScript script file from the Construct 3 project',
    {
      path: z.string().max(500).describe('Script file path relative to scripts/ (e.g., "main.js" or "utils/helpers.js")'),
    },
    async (args) => {
      try {
        const filePath = safeResolve('scripts', args.path);

        const stats = await stat(filePath);
        if (stats.size > 5 * 1024 * 1024) {
          return toolError(`Script file too large (${(stats.size / 1024 / 1024).toFixed(1)}MB > 5MB limit)`);
        }

        const content = await readFile(filePath, 'utf-8');
        return toolResult({
          path: args.path,
          size: stats.size,
          content,
        });
      } catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
          return toolError(`Script file not found: scripts/${args.path}. Use list_scripts to see available scripts.`);
        }
        return toolError(`Error reading script: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  );

  // ─── write_script ─────────────────────────────────────────

  server.tool(
    'write_script',
    'Create or modify a JavaScript script file in the Construct 3 project',
    {
      path: z.string().max(500).describe('Script file path relative to scripts/ (e.g., "main.js" or "utils/helpers.js")'),
      content: z.string().max(1_000_000).describe('JavaScript source code content'),
    },
    async (args) => {
      try {
        // Validate path
        if (!args.path.endsWith('.js')) {
          return toolError('Script path must end with .js');
        }

        const filePath = safeResolve('scripts', args.path);

        // Ensure directory exists
        await mkdir(dirname(filePath), { recursive: true });

        // Check if this is a new file or an update
        let isNew = false;
        try {
          await stat(filePath);
        } catch {
          isNew = true;
        }

        await writeFile(filePath, args.content, 'utf-8');

        return toolResult({
          success: true,
          path: `scripts/${args.path}`,
          action: isNew ? 'created' : 'updated',
          size: Buffer.byteLength(args.content, 'utf-8'),
          note: isNew
            ? 'New script file created. You may need to add it to the project in the Construct 3 editor for it to be included in builds.'
            : 'Script file updated.',
        });
      } catch (error) {
        return toolError(`Error writing script: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  );

  // ─── read_project_file ────────────────────────────────────

  server.tool(
    'read_project_file',
    'Read any JSON file from the Construct 3 project directory',
    {
      path: z.string().max(500).describe('File path relative to project root (e.g., "objectTypes/Player.json")'),
    },
    async (args) => {
      try {
        const filePath = safeResolve(args.path);

        const stats = await stat(filePath);
        if (stats.size > 10 * 1024 * 1024) {
          return toolError(`File too large (${(stats.size / 1024 / 1024).toFixed(1)}MB > 10MB limit)`);
        }

        const content = await readFile(filePath, 'utf-8');

        // Try to parse as JSON for pretty-printing
        try {
          const parsed = JSON.parse(content);
          return toolResult({ path: args.path, data: parsed });
        } catch {
          // Not JSON, return raw content
          return toolResult({ path: args.path, content });
        }
      } catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
          return toolError(`File not found: ${args.path}`);
        }
        return toolError(`Error reading file: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  );

  // ─── write_project_file ───────────────────────────────────

  server.tool(
    'write_project_file',
    'Write a JSON file to the Construct 3 project directory',
    {
      path: z.string().max(500).describe('File path relative to project root'),
      data: z.unknown().describe('JSON data to write'),
    },
    async (args) => {
      try {
        const filePath = safeResolve(args.path);

        // Ensure directory exists
        await mkdir(dirname(filePath), { recursive: true });

        const json = JSON.stringify(args.data, null, '\t');
        if (json.length > 5 * 1024 * 1024) {
          return toolError('Data too large (max 5MB)');
        }

        // Check if update or create
        let isNew = false;
        try {
          await stat(filePath);
        } catch {
          isNew = true;
        }

        await writeFile(filePath, json, 'utf-8');

        return toolResult({
          success: true,
          path: args.path,
          action: isNew ? 'created' : 'updated',
          size: Buffer.byteLength(json, 'utf-8'),
        });
      } catch (error) {
        return toolError(`Error writing file: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  );
}

// ─── Helpers ──────────────────────────────────────────────────

async function collectScripts(dir: string, prefix: string, out: string[]): Promise<void> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isFile() && entry.name.endsWith('.js')) {
      out.push(relPath);
    } else if (entry.isDirectory()) {
      await collectScripts(join(dir, entry.name), relPath, out);
    }
  }
}

function collectFileItems(
  folder: { items: Array<{ name: string }>; subfolders: Array<{ name: string; items: Array<{ name: string }>; subfolders: unknown[] }> },
  out: string[],
  prefix = '',
): void {
  for (const item of folder.items) {
    out.push(prefix ? `${prefix}/${item.name}` : item.name);
  }
  for (const sub of folder.subfolders) {
    const subPrefix = prefix ? `${prefix}/${sub.name}` : sub.name;
    collectFileItems(sub as typeof folder, out, subPrefix);
  }
}
