#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_TOPICS, getTopicsByCategory, findTopic, resolveUrl } from "./url-map.js";
import { fetchPage } from "./fetcher.js";
import { parseDocPage, generateFrontmatter } from "./parser.js";
import { rebuildManifest } from "./manifest.js";
import { getLangOrDefault } from "../i18n/languages.js";
import type { DocCategory } from "../docs/types.js";
import { DOC_CATEGORIES } from "../docs/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getDocsRoot(): string {
  // In dist: dist/scraper/cli.js → go up to project root → docs/
  return join(__dirname, "..", "..", "docs");
}

interface CliOptions {
  lang: string;
  all: boolean;
  category?: DocCategory;
  topic?: string;
  docsRoot: string;
}

function parseArgs(): CliOptions {
  const args = process.argv.slice(2);
  const opts: CliOptions = {
    lang: "en",
    all: false,
    docsRoot: getDocsRoot(),
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--lang":
        opts.lang = getLangOrDefault(args[++i]);
        break;
      case "--all":
        opts.all = true;
        break;
      case "--category":
        opts.category = args[++i] as DocCategory;
        if (!DOC_CATEGORIES.includes(opts.category)) {
          console.error(`Invalid category: ${opts.category}`);
          console.error(`Valid: ${DOC_CATEGORIES.join(", ")}`);
          process.exit(1);
        }
        break;
      case "--topic":
        opts.topic = args[++i];
        break;
      case "--docs-root":
        opts.docsRoot = args[++i];
        break;
      case "--help":
        printHelp();
        process.exit(0);
        break;
      default:
        console.error(`Unknown option: ${args[i]}`);
        printHelp();
        process.exit(1);
    }
  }

  if (!opts.all && !opts.category && !opts.topic) {
    console.error("Specify --all, --category, or --topic");
    printHelp();
    process.exit(1);
  }

  return opts;
}

function printHelp(): void {
  console.log(`
c3-docs-scrape — Scrape Construct 3 documentation

Usage:
  c3-docs-scrape --all [--lang en]
  c3-docs-scrape --category plugins [--lang en]
  c3-docs-scrape --topic sprite [--lang en]

Options:
  --lang <code>       Language code (default: en)
  --all               Scrape all topics
  --category <name>   Scrape a specific category
  --topic <slug>      Scrape a single topic
  --docs-root <path>  Custom docs output directory
  --help              Show this help
  `);
}

async function scrapeTopic(
  slug: string,
  category: DocCategory,
  url: string,
  lang: string,
  docsRoot: string
): Promise<boolean> {
  try {
    const result = await fetchPage(url);
    const parsed = parseDocPage(result.html, slug, category);

    const frontmatter = generateFrontmatter(parsed.title, category, url, lang);
    const fullContent = frontmatter + parsed.markdown;

    const outDir = join(docsRoot, lang, category);
    await mkdir(outDir, { recursive: true });

    const outFile = join(outDir, `${slug}.md`);
    await writeFile(outFile, fullContent, "utf-8");

    // Save ACE data if present
    if (parsed.aceEntries) {
      const aceFile = join(outDir, `${slug}.ace.json`);
      await writeFile(aceFile, JSON.stringify(parsed.aceEntries, null, 2), "utf-8");
    }

    // Save code examples if present
    if (parsed.codeExamples.length > 0) {
      const exFile = join(outDir, `${slug}.examples.json`);
      await writeFile(exFile, JSON.stringify(parsed.codeExamples, null, 2), "utf-8");
    }

    return true;
  } catch (error) {
    console.error(`  FAILED: ${error instanceof Error ? error.message : error}`);
    return false;
  }
}

async function main(): Promise<void> {
  const opts = parseArgs();
  console.log(`Scraping Construct 3 docs (lang: ${opts.lang})`);

  let topics = ALL_TOPICS;

  if (opts.topic) {
    const found = findTopic(opts.topic);
    if (!found) {
      console.error(`Topic not found: ${opts.topic}`);
      process.exit(1);
    }
    topics = [found];
  } else if (opts.category) {
    topics = getTopicsByCategory(opts.category);
  }

  console.log(`Topics to scrape: ${topics.length}`);

  let success = 0;
  let failed = 0;

  for (const topic of topics) {
    const url = resolveUrl(topic, opts.lang);
    process.stdout.write(`  ${topic.category}/${topic.slug}... `);

    const ok = await scrapeTopic(
      topic.slug,
      topic.category,
      url,
      opts.lang,
      opts.docsRoot
    );

    if (ok) {
      console.log("OK");
      success++;
    } else {
      failed++;
    }
  }

  console.log(`\nDone: ${success} scraped, ${failed} failed`);

  // Rebuild manifest
  console.log("Rebuilding manifest...");
  const manifest = await rebuildManifest(opts.docsRoot, opts.lang);
  console.log(`Manifest: ${manifest.totalTopics} topics indexed`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
