import { readFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { DocManifest, DocEntry, DocCategory, AceReference, CodeExample } from "./types.js";
import { getLangOrDefault } from "../i18n/languages.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getDocsRoot(): string {
  // In dist: dist/docs/reader.js → go up to project root → docs/
  return join(__dirname, "..", "..", "docs");
}

let docsRoot = getDocsRoot();

/** Override docs root (useful for testing) */
export function setDocsRoot(root: string): void {
  docsRoot = root;
}

/** Get the docs root path */
export function getDocsRootPath(): string {
  return docsRoot;
}

/** Load the manifest for a language */
export async function loadManifest(lang?: string): Promise<DocManifest | null> {
  const l = getLangOrDefault(lang);
  const manifestPath = join(docsRoot, l, "index.json");
  try {
    const data = await readFile(manifestPath, "utf-8");
    return JSON.parse(data) as DocManifest;
  } catch {
    return null;
  }
}

/** Get the content of a doc topic */
export async function getDocContent(
  slug: string,
  category?: DocCategory,
  lang?: string
): Promise<{ content: string; entry: DocEntry } | null> {
  const l = getLangOrDefault(lang);
  const manifest = await loadManifest(l);
  if (!manifest) return null;

  let entry: DocEntry | undefined;
  if (category) {
    entry = manifest.entries.find((e) => e.slug === slug && e.category === category);
  } else {
    entry = manifest.entries.find((e) => e.slug === slug);
  }

  if (!entry) {
    // Fallback to English if requested lang doesn't have the topic
    if (l !== "en") {
      return getDocContent(slug, category, "en");
    }
    return null;
  }

  const filePath = join(docsRoot, entry.filePath);
  try {
    const content = await readFile(filePath, "utf-8");
    // Strip frontmatter for output
    const stripped = content.replace(/^---\n[\s\S]*?\n---\n/, "");
    return { content: stripped, entry };
  } catch {
    return null;
  }
}

/** List all entries, optionally filtered by category */
export async function listEntries(
  category?: DocCategory,
  lang?: string
): Promise<DocEntry[]> {
  const manifest = await loadManifest(lang);
  if (!manifest) return [];

  if (category) {
    return manifest.entries.filter((e) => e.category === category);
  }
  return manifest.entries;
}

/** Get ACE reference for a plugin/behavior */
export async function getAceReference(
  plugin: string,
  lang?: string
): Promise<AceReference | null> {
  const l = getLangOrDefault(lang);
  const manifest = await loadManifest(l);
  if (!manifest) return null;

  // Find in plugins or behaviors
  const entry = manifest.entries.find(
    (e) => e.slug === plugin && (e.category === "plugins" || e.category === "behaviors")
  );

  if (!entry) {
    if (l !== "en") return getAceReference(plugin, "en");
    return null;
  }

  const acePath = join(
    docsRoot,
    l,
    entry.category,
    `${plugin}.ace.json`
  );

  try {
    const data = await readFile(acePath, "utf-8");
    const ace = JSON.parse(data);
    return {
      plugin,
      category: entry.category,
      ...ace,
    };
  } catch {
    // No ACE file — try extracting from the markdown
    return null;
  }
}

/** Get code examples matching a query */
export async function getCodeExamples(
  query: string,
  lang?: string,
  limit = 10
): Promise<CodeExample[]> {
  const l = getLangOrDefault(lang);
  const manifest = await loadManifest(l);
  if (!manifest) return [];

  const queryLower = query.toLowerCase();
  const results: CodeExample[] = [];

  for (const entry of manifest.entries) {
    const exPath = join(
      docsRoot,
      l,
      entry.category,
      `${entry.slug}.examples.json`
    );

    try {
      await access(exPath);
      const data = await readFile(exPath, "utf-8");
      const examples = JSON.parse(data) as Array<{
        title: string;
        code: string;
        language: string;
      }>;

      for (const ex of examples) {
        if (
          ex.title.toLowerCase().includes(queryLower) ||
          ex.code.toLowerCase().includes(queryLower) ||
          entry.slug.includes(queryLower)
        ) {
          results.push({
            ...ex,
            sourceSlug: entry.slug,
            sourceCategory: entry.category,
          });
        }
      }
    } catch {
      continue;
    }

    if (results.length >= limit) break;
  }

  return results.slice(0, limit);
}
