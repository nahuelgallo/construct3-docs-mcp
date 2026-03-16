# construct3-docs-mcp

MCP server for Construct 3 documentation — offline full-text search, ACE reference, multi-language support.

## What makes this different

| Feature | This MCP | [liauw-media/construct3-mcp](https://github.com/liauw-media/construct3-mcp) |
|---------|----------|-----|
| Offline docs | Real markdown content | Links to URLs only |
| Full-text search | Search inside doc content | No search |
| ACE reference | Actions/Conditions/Expressions per plugin | Not available |
| Code examples | Searchable code snippets | Not available |
| Multi-language | en, es, pt-br, fr, de + more | English only |
| Topic coverage | 96+ topics | ~38 URLs |

## Quick start

### Use with Claude Code / Claude Desktop

Add to your MCP config:

```json
{
  "mcpServers": {
    "construct3-docs": {
      "command": "npx",
      "args": ["-y", "construct3-docs-mcp"]
    }
  }
}
```

### Install locally

```bash
npm install -g construct3-docs-mcp
construct3-docs-mcp  # starts the MCP server
```

## Tools

### `search_docs`
Full-text search across all documentation.
```
query: "collision detection"
category?: "plugins" | "behaviors" | "project" | ...
lang?: "en" (default)
limit?: 10 (default)
```

### `get_doc`
Get full markdown content of a topic.
```
topic: "sprite" | "platform" | "layouts" | ...
category?: filter by category
lang?: "en" (default)
```

### `list_topics`
List all available topics.
```
category?: filter by category
lang?: "en" (default)
```

### `list_categories`
List categories with descriptions and topic counts.

### `get_ace_reference`
Get Actions, Conditions, and Expressions for a plugin/behavior.
```
plugin: "sprite" | "platform" | "tween" | ...
lang?: "en" (default)
```

### `get_examples`
Search for code examples from the documentation.
```
query: "tween" | "spawn" | "collision" | ...
lang?: "en" (default)
limit?: 10 (default)
```

## Update documentation

```bash
# Scrape all topics in English
c3-docs-scrape --all --lang en

# Scrape a specific category
c3-docs-scrape --category plugins --lang en

# Scrape a single topic
c3-docs-scrape --topic sprite --lang en

# Scrape in Spanish
c3-docs-scrape --all --lang es
```

## Multi-language

Supported languages: `en`, `es`, `pt-br`, `fr`, `de`, `it`, `ja`, `ko`, `zh`, `ru`, `tr`

All tools accept a `lang` parameter. Falls back to English if a topic isn't available in the requested language.

## Development

```bash
git clone <repo>
cd construct3-docs-mcp
npm install
npm run build
npm run scrape -- --all --lang en
npm test
```

## License

MIT

---

*Construct 3 is developed by Scirra Ltd. This project is not affiliated with Scirra.*
