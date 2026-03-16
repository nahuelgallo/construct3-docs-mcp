import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { DocCategory, DocManifest, SearchResult } from "./types.js";
import { loadManifest, getDocsRootPath } from "./reader.js";
import { getLangOrDefault } from "../i18n/languages.js";

/**
 * Full-text search across all documentation.
 * Uses simple TF-based scoring with snippet extraction.
 */
export async function searchDocs(
  query: string,
  category?: DocCategory,
  lang?: string,
  limit = 10
): Promise<SearchResult[]> {
  const l = getLangOrDefault(lang);
  const manifest = await loadManifest(l);
  if (!manifest) return [];

  const entries = category
    ? manifest.entries.filter((e) => e.category === category)
    : manifest.entries;

  const queryTerms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1);

  if (queryTerms.length === 0) return [];

  const results: SearchResult[] = [];
  const docsRoot = getDocsRootPath();

  for (const entry of entries) {
    const filePath = join(docsRoot, entry.filePath);
    let content: string;
    try {
      content = await readFile(filePath, "utf-8");
    } catch {
      continue;
    }

    // Strip frontmatter
    content = content.replace(/^---\n[\s\S]*?\n---\n/, "");
    const contentLower = content.toLowerCase();

    // Score: count term occurrences + boost for title matches
    let score = 0;
    let bestSnippetPos = -1;

    for (const term of queryTerms) {
      // Title boost
      if (entry.title.toLowerCase().includes(term)) {
        score += 10;
      }
      if (entry.slug.includes(term)) {
        score += 5;
      }

      // Content matches
      let searchFrom = 0;
      while (true) {
        const idx = contentLower.indexOf(term, searchFrom);
        if (idx === -1) break;
        score += 1;
        if (bestSnippetPos === -1) bestSnippetPos = idx;
        searchFrom = idx + term.length;
      }
    }

    if (score === 0) continue;

    // Extract snippet around best match
    const snippet = extractSnippet(content, bestSnippetPos, 200);

    results.push({
      slug: entry.slug,
      title: entry.title,
      category: entry.category,
      lang: l,
      snippet,
      score,
    });
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}

function extractSnippet(content: string, position: number, maxLen: number): string {
  if (position === -1) return content.slice(0, maxLen);

  // Find the start of the line/paragraph
  let start = Math.max(0, position - 80);
  // Snap to word boundary
  if (start > 0) {
    const spaceIdx = content.indexOf(" ", start);
    if (spaceIdx !== -1 && spaceIdx < position) {
      start = spaceIdx + 1;
    }
  }

  let end = Math.min(content.length, start + maxLen);
  // Snap to word boundary
  const lastSpace = content.lastIndexOf(" ", end);
  if (lastSpace > start + maxLen / 2) {
    end = lastSpace;
  }

  let snippet = content.slice(start, end).trim();
  // Clean up markdown artifacts
  snippet = snippet.replace(/#+\s*/g, "").replace(/\n+/g, " ");

  if (start > 0) snippet = "..." + snippet;
  if (end < content.length) snippet += "...";

  return snippet;
}
