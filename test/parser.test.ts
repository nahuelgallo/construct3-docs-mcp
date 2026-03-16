import { describe, it, expect } from "vitest";
import { parseDocPage, generateFrontmatter } from "../src/scraper/parser.js";

describe("parseDocPage", () => {
  it("extracts title from h1", () => {
    const html = `<html><body><h1>Sprite</h1><p>Some content</p></body></html>`;
    const result = parseDocPage(html, "sprite", "plugins");
    expect(result.title).toBe("Sprite");
  });

  it("converts paragraphs to markdown", () => {
    const html = `<html><body><h1>Test</h1><p>Hello world</p></body></html>`;
    const result = parseDocPage(html, "test", "plugins");
    expect(result.markdown).toContain("Hello world");
  });

  it("extracts code examples", () => {
    const html = `<html><body>
      <h1>Test</h1>
      <h3>Example</h3>
      <pre>const x = runtime.objects.Sprite;</pre>
    </body></html>`;
    const result = parseDocPage(html, "test", "scripting");
    expect(result.codeExamples.length).toBeGreaterThan(0);
    expect(result.codeExamples[0].code).toContain("runtime.objects.Sprite");
  });

  it("extracts ACE entries from tables", () => {
    const html = `<html><body><div class="manualContent">
      <h1>Sprite</h1>
      <h2>Actions</h2>
      <table>
        <tr><td>Set animation</td><td>Change the animation</td></tr>
        <tr><td>Set frame</td><td>Set the frame number</td></tr>
      </table>
      <h2>Conditions</h2>
      <table>
        <tr><td>Is playing</td><td>Check if animating</td></tr>
      </table>
      <h2>Expressions</h2>
      <table>
        <tr><td>AnimationName</td><td>Get animation name</td></tr>
      </table>
    </div></body></html>`;
    const result = parseDocPage(html, "sprite", "plugins");
    expect(result.aceEntries).toBeDefined();
    expect(result.aceEntries!.actions).toHaveLength(2);
    expect(result.aceEntries!.conditions).toHaveLength(1);
    expect(result.aceEntries!.expressions).toHaveLength(1);
    expect(result.aceEntries!.actions[0].name).toBe("Set animation");
  });

  it("handles minimal content gracefully", () => {
    const html = `<html><head><title>Empty</title></head><body></body></html>`;
    const result = parseDocPage(html, "empty", "plugins");
    expect(result.title).toBe("Empty");
    // Body exists so parser processes it, just produces minimal output
    expect(result.markdown).toContain("Empty");
  });

  it("converts tables to markdown format", () => {
    const html = `<html><body>
      <h1>Test</h1>
      <table>
        <tr><th>Name</th><th>Value</th></tr>
        <tr><td>Speed</td><td>100</td></tr>
      </table>
    </body></html>`;
    const result = parseDocPage(html, "test", "plugins");
    expect(result.markdown).toContain("| Name | Value |");
    expect(result.markdown).toContain("| Speed | 100 |");
  });
});

describe("generateFrontmatter", () => {
  it("generates valid YAML frontmatter", () => {
    const fm = generateFrontmatter("Sprite", "plugins", "https://example.com", "en");
    expect(fm).toContain("---");
    expect(fm).toContain('title: "Sprite"');
    expect(fm).toContain("category: plugins");
    expect(fm).toContain("lang: en");
    expect(fm).toContain('url: "https://example.com"');
  });

  it("escapes quotes in title", () => {
    const fm = generateFrontmatter('9-Patch "test"', "plugins", "url", "en");
    expect(fm).toContain('title: "9-Patch \\"test\\""');
  });
});
