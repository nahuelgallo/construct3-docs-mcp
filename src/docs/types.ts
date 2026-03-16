/** A single documentation topic */
export interface DocTopic {
  /** URL-friendly slug, e.g. "sprite", "platform" */
  slug: string;
  /** Human-readable title */
  title: string;
  /** Category: plugins, behaviors, project, scripting, interface, effects, publishing */
  category: DocCategory;
  /** Source URL on construct.net */
  sourceUrl: string;
  /** Brief description */
  description: string;
  /** Tags for improved search */
  tags: string[];
}

/** A scraped document stored as markdown */
export interface DocEntry {
  slug: string;
  title: string;
  category: DocCategory;
  lang: string;
  sourceUrl: string;
  lastScraped: string;
  /** Relative path to the .md file from the docs root */
  filePath: string;
}

/** The manifest for a language (index.json) */
export interface DocManifest {
  lang: string;
  lastUpdated: string;
  totalTopics: number;
  categories: Record<DocCategory, number>;
  entries: DocEntry[];
}

/** Search result */
export interface SearchResult {
  slug: string;
  title: string;
  category: DocCategory;
  lang: string;
  /** Matching text snippet */
  snippet: string;
  /** Relevance score (higher = better match) */
  score: number;
}

/** ACE entry (Action, Condition, or Expression) */
export interface AceEntry {
  name: string;
  description: string;
  params?: string[];
}

/** ACE reference for a plugin/behavior */
export interface AceReference {
  plugin: string;
  category: DocCategory;
  actions: AceEntry[];
  conditions: AceEntry[];
  expressions: AceEntry[];
}

/** Code example extracted from docs */
export interface CodeExample {
  title: string;
  code: string;
  language: string;
  sourceSlug: string;
  sourceCategory: DocCategory;
}

export type DocCategory =
  | "plugins"
  | "behaviors"
  | "project"
  | "scripting"
  | "interface"
  | "effects"
  | "publishing";

export const DOC_CATEGORIES: DocCategory[] = [
  "plugins",
  "behaviors",
  "project",
  "scripting",
  "interface",
  "effects",
  "publishing",
];

export const CATEGORY_DESCRIPTIONS: Record<DocCategory, string> = {
  plugins: "Built-in plugins: Sprite, Text, Audio, Tilemap, etc.",
  behaviors: "Behaviors: Platform, Bullet, Tween, Solid, etc.",
  project: "Project structure: Layouts, Layers, Objects, Families, Events",
  scripting: "JavaScript scripting API and runtime reference",
  interface: "Editor interface: Properties bar, Animations, Timeline, etc.",
  effects: "WebGL blend modes and effects",
  publishing: "Export and publishing options",
};
