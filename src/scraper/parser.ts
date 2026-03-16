import { parse as parseHTML, type HTMLElement } from "node-html-parser";
import type { DocCategory, AceEntry } from "../docs/types.js";

export interface ParsedDoc {
  title: string;
  markdown: string;
  aceEntries?: {
    actions: AceEntry[];
    conditions: AceEntry[];
    expressions: AceEntry[];
  };
  codeExamples: Array<{ title: string; code: string; language: string }>;
}

/**
 * Parse Construct 3 documentation HTML into markdown.
 * Targets the main content area of construct.net manual pages.
 */
export function parseDocPage(html: string, slug: string, category: DocCategory): ParsedDoc {
  const root = parseHTML(html);

  // Extract the page title
  const title = extractTitle(root) || slug;

  // Find the main content container
  const content = findMainContent(root);
  if (!content) {
    return { title, markdown: `# ${title}\n\nNo content found.`, codeExamples: [] };
  }

  // Extract code examples before converting to markdown
  const codeExamples = extractCodeExamples(content);

  // Extract ACE tables for plugin/behavior pages
  let aceEntries: ParsedDoc["aceEntries"];
  if (category === "plugins" || category === "behaviors") {
    aceEntries = extractAceEntries(content);
  }

  // Convert to markdown
  const markdown = htmlToMarkdown(content, title);

  return { title, markdown, aceEntries, codeExamples };
}

function extractTitle(root: HTMLElement): string | null {
  // Try h1 first, then page title
  const h1 = root.querySelector("h1");
  if (h1) return h1.text.trim();

  const titleEl = root.querySelector("title");
  if (titleEl) {
    // Remove " - Construct 3 Manual" suffix
    return titleEl.text.replace(/\s*[-–—]\s*Construct\s*3.*$/i, "").trim();
  }
  return null;
}

function findMainContent(root: HTMLElement): HTMLElement | null {
  // construct.net uses various content containers
  const selectors = [
    ".manualContent",
    ".manual-content",
    "#manual-content",
    "article",
    ".content",
    "main",
  ];
  for (const sel of selectors) {
    const el = root.querySelector(sel);
    if (el) return el;
  }
  // Fallback: body
  return root.querySelector("body");
}

function extractCodeExamples(
  content: HTMLElement
): Array<{ title: string; code: string; language: string }> {
  const examples: Array<{ title: string; code: string; language: string }> = [];
  const codeBlocks = content.querySelectorAll("pre, code");

  for (const block of codeBlocks) {
    const code = block.text.trim();
    if (code.length < 10) continue; // Skip tiny fragments

    // Detect language from class or content
    const classList = block.getAttribute("class") || "";
    let language = "javascript";
    if (classList.includes("language-")) {
      language = classList.replace(/.*language-(\w+).*/, "$1");
    }

    // Try to find a preceding heading for context
    let title = "Code example";
    const prev = block.previousElementSibling;
    if (prev && /^h[1-6]$/i.test(prev.tagName)) {
      title = prev.text.trim();
    }

    examples.push({ title, code, language });
  }

  return examples;
}

function extractAceEntries(content: HTMLElement): {
  actions: AceEntry[];
  conditions: AceEntry[];
  expressions: AceEntry[];
} {
  const result = {
    actions: [] as AceEntry[],
    conditions: [] as AceEntry[],
    expressions: [] as AceEntry[],
  };

  // Walk all elements in document order to find ACE sections
  const allElements = content.querySelectorAll("*");
  let currentSection: "actions" | "conditions" | "expressions" | null = null;

  for (const el of allElements) {
    if (!el.tagName) continue;
    const tag = el.tagName.toLowerCase();

    // Detect section headings
    if (/^h[2-3]$/.test(tag)) {
      const text = el.text.toLowerCase().trim();
      if (text.includes("action")) currentSection = "actions";
      else if (text.includes("condition")) currentSection = "conditions";
      else if (text.includes("expression")) currentSection = "expressions";
      continue;
    }

    if (!currentSection) continue;

    // Extract from tables
    if (tag === "table") {
      const rows = el.querySelectorAll("tr");
      for (const row of rows) {
        const cells = row.querySelectorAll("td, th");
        if (cells.length >= 2) {
          const name = cells[0].text.trim();
          const desc = cells[1].text.trim();
          if (name && name.toLowerCase() !== "name") {
            result[currentSection].push({ name, description: desc });
          }
        }
      }
    }

    // Extract from definition lists
    if (tag === "dl") {
      const dts = el.querySelectorAll("dt");
      const dds = el.querySelectorAll("dd");
      for (let i = 0; i < dts.length; i++) {
        result[currentSection].push({
          name: dts[i].text.trim(),
          description: dds[i]?.text.trim() || "",
        });
      }
    }
  }

  return result;
}

function htmlToMarkdown(el: HTMLElement, title: string): string {
  const lines: string[] = [`# ${title}`, ""];

  // Process child nodes
  for (const child of el.childNodes) {
    processNode(child as HTMLElement, lines);
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function processNode(node: HTMLElement, lines: string[]): void {
  if (!node) return;

  // Text node
  if (node.nodeType === 3) {
    const text = node.text.trim();
    if (text) lines.push(text);
    return;
  }

  if (!node.tagName) return;
  const tag = node.tagName.toLowerCase();

  switch (tag) {
    case "h1":
      lines.push(`\n# ${node.text.trim()}\n`);
      break;
    case "h2":
      lines.push(`\n## ${node.text.trim()}\n`);
      break;
    case "h3":
      lines.push(`\n### ${node.text.trim()}\n`);
      break;
    case "h4":
      lines.push(`\n#### ${node.text.trim()}\n`);
      break;
    case "p":
      lines.push(`\n${inlineText(node)}\n`);
      break;
    case "pre":
      lines.push(`\n\`\`\`\n${node.text.trim()}\n\`\`\`\n`);
      break;
    case "code":
      if (node.parentNode && (node.parentNode as HTMLElement).tagName?.toLowerCase() !== "pre") {
        lines.push(`\`${node.text.trim()}\``);
      }
      break;
    case "ul":
    case "ol": {
      const items = node.querySelectorAll(":scope > li");
      items.forEach((li, i) => {
        const bullet = tag === "ol" ? `${i + 1}.` : "-";
        lines.push(`${bullet} ${inlineText(li)}`);
      });
      lines.push("");
      break;
    }
    case "table":
      lines.push(tableToMarkdown(node));
      break;
    case "a": {
      const href = node.getAttribute("href") || "";
      lines.push(`[${node.text.trim()}](${href})`);
      break;
    }
    case "strong":
    case "b":
      lines.push(`**${node.text.trim()}**`);
      break;
    case "em":
    case "i":
      lines.push(`*${node.text.trim()}*`);
      break;
    case "br":
      lines.push("");
      break;
    case "img": {
      const alt = node.getAttribute("alt") || "image";
      lines.push(`![${alt}]`);
      break;
    }
    case "blockquote":
      lines.push(`\n> ${node.text.trim()}\n`);
      break;
    case "hr":
      lines.push("\n---\n");
      break;
    default:
      // Recurse into container elements
      if (node.childNodes) {
        for (const child of node.childNodes) {
          processNode(child as HTMLElement, lines);
        }
      }
  }
}

function inlineText(el: HTMLElement): string {
  return el.text.trim().replace(/\s+/g, " ");
}

function tableToMarkdown(table: HTMLElement): string {
  const rows = table.querySelectorAll("tr");
  if (rows.length === 0) return "";

  const result: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll("td, th");
    const row = Array.from(cells).map((c) => c.text.trim().replace(/\|/g, "\\|"));
    result.push(`| ${row.join(" | ")} |`);

    // Add separator after header row
    if (i === 0) {
      result.push(`| ${row.map(() => "---").join(" | ")} |`);
    }
  }

  return "\n" + result.join("\n") + "\n";
}

/**
 * Generate YAML frontmatter for a scraped doc file.
 */
export function generateFrontmatter(
  title: string,
  category: DocCategory,
  sourceUrl: string,
  lang: string
): string {
  const now = new Date().toISOString();
  return [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `category: ${category}`,
    `url: "${sourceUrl}"`,
    `lang: ${lang}`,
    `lastScraped: "${now}"`,
    "---",
    "",
  ].join("\n");
}
