import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { DocCategory, DocEntry, DocManifest } from "../docs/types.js";
import { DOC_CATEGORIES } from "../docs/types.js";

/**
 * Rebuild the index.json manifest for a language by scanning the docs directory.
 */
export async function rebuildManifest(
  docsRoot: string,
  lang: string
): Promise<DocManifest> {
  const langDir = join(docsRoot, lang);
  const entries: DocEntry[] = [];
  const categoryCounts: Record<string, number> = {};

  for (const category of DOC_CATEGORIES) {
    categoryCounts[category] = 0;
    const categoryDir = join(langDir, category);

    let files: string[];
    try {
      files = await readdir(categoryDir);
    } catch {
      continue; // Category dir doesn't exist yet
    }

    for (const file of files) {
      if (!file.endsWith(".md")) continue;

      const filePath = join(categoryDir, file);
      const content = await readFile(filePath, "utf-8");
      const meta = parseFrontmatter(content);

      const slug = file.replace(/\.md$/, "");
      entries.push({
        slug,
        title: meta.title || slug,
        category: (meta.category as DocCategory) || category,
        lang,
        sourceUrl: meta.url || "",
        lastScraped: meta.lastScraped || new Date().toISOString(),
        filePath: `${lang}/${category}/${file}`,
      });

      categoryCounts[category]++;
    }
  }

  const manifest: DocManifest = {
    lang,
    lastUpdated: new Date().toISOString(),
    totalTopics: entries.length,
    categories: categoryCounts as Record<DocCategory, number>,
    entries,
  };

  // Write manifest
  await writeFile(
    join(langDir, "index.json"),
    JSON.stringify(manifest, null, 2),
    "utf-8"
  );

  return manifest;
}

function parseFrontmatter(content: string): Record<string, string> {
  const meta: Record<string, string> = {};
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return meta;

  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }

  return meta;
}
