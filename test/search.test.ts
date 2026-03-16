import { describe, it, expect, beforeAll } from "vitest";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { setDocsRoot } from "../src/docs/reader.js";
import { searchDocs } from "../src/docs/search.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsRoot = join(__dirname, "..", "docs");

beforeAll(() => {
  setDocsRoot(docsRoot);
});

describe("searchDocs", () => {
  it("finds results for 'animation'", async () => {
    const results = await searchDocs("animation");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].score).toBeGreaterThan(0);
    expect(results[0].snippet.length).toBeGreaterThan(0);
  });

  it("respects limit parameter", async () => {
    const results = await searchDocs("sprite", undefined, undefined, 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("filters by category", async () => {
    const results = await searchDocs("movement", "behaviors");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.category === "behaviors")).toBe(true);
  });

  it("returns empty for nonsense query", async () => {
    const results = await searchDocs("xyznonexistent123");
    expect(results.length).toBe(0);
  });

  it("scores title matches higher", async () => {
    const results = await searchDocs("sprite");
    const spriteResult = results.find((r) => r.slug === "sprite");
    expect(spriteResult).toBeDefined();
    // Title match should give it a high score
    expect(spriteResult!.score).toBeGreaterThan(10);
  });

  it("returns results sorted by score descending", async () => {
    const results = await searchDocs("platform");
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
  });
});
