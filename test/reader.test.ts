import { describe, it, expect, beforeAll } from "vitest";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  setDocsRoot,
  loadManifest,
  getDocContent,
  listEntries,
  getAceReference,
} from "../src/docs/reader.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsRoot = join(__dirname, "..", "docs");

beforeAll(() => {
  setDocsRoot(docsRoot);
});

describe("loadManifest", () => {
  it("loads English manifest", async () => {
    const manifest = await loadManifest("en");
    expect(manifest).not.toBeNull();
    expect(manifest!.lang).toBe("en");
    expect(manifest!.totalTopics).toBeGreaterThan(0);
  });

  it("falls back to English for unknown language code", async () => {
    // getLangOrDefault("xx") returns "en", so this loads English manifest
    const manifest = await loadManifest("xx");
    expect(manifest).not.toBeNull();
    expect(manifest!.lang).toBe("en");
  });
});

describe("getDocContent", () => {
  it("gets sprite doc content", async () => {
    const result = await getDocContent("sprite");
    expect(result).not.toBeNull();
    expect(result!.entry.slug).toBe("sprite");
    expect(result!.content).toContain("Sprite");
  });

  it("returns null for non-existent topic", async () => {
    const result = await getDocContent("nonexistent-topic-xyz");
    expect(result).toBeNull();
  });

  it("filters by category", async () => {
    const result = await getDocContent("sprite", "plugins");
    expect(result).not.toBeNull();
    expect(result!.entry.category).toBe("plugins");
  });
});

describe("listEntries", () => {
  it("lists all entries", async () => {
    const entries = await listEntries();
    expect(entries.length).toBeGreaterThan(50);
  });

  it("filters by category", async () => {
    const entries = await listEntries("behaviors");
    expect(entries.length).toBeGreaterThan(10);
    expect(entries.every((e) => e.category === "behaviors")).toBe(true);
  });
});

describe("getAceReference", () => {
  it("gets ACE for sprite", async () => {
    const ace = await getAceReference("sprite");
    expect(ace).not.toBeNull();
    expect(ace!.actions.length).toBeGreaterThan(0);
    expect(ace!.conditions.length).toBeGreaterThan(0);
    expect(ace!.expressions.length).toBeGreaterThan(0);
  });

  it("gets ACE for platform behavior", async () => {
    const ace = await getAceReference("platform");
    expect(ace).not.toBeNull();
    expect(ace!.category).toBe("behaviors");
  });

  it("returns null for non-existent plugin", async () => {
    const ace = await getAceReference("nonexistent-xyz");
    expect(ace).toBeNull();
  });
});
