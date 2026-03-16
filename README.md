# construct3-docs-mcp

Unified MCP server for Construct 3 — offline documentation, project read/write, analysis, and scripting support. **44 tools** in a single server.

## Quick start

### With a Construct 3 project (all features)

```json
{
  "mcpServers": {
    "construct3": {
      "command": "node",
      "args": ["path/to/construct3-docs-mcp/dist/index.js", "path/to/your/c3-project"]
    }
  }
}
```

### Documentation only (no project)

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

## Tools (44 total)

### Documentation (6 tools — always available)

| Tool | Description |
|------|-------------|
| `search_docs` | Full-text search across all Construct 3 documentation |
| `get_doc` | Get full markdown content of a documentation topic |
| `list_topics` | List all available documentation topics |
| `list_categories` | List categories with topic counts |
| `get_ace_reference` | Get Actions/Conditions/Expressions for a plugin or behavior |
| `get_examples` | Search for code examples from the documentation |

### Project Query (9 tools)

| Tool | Description |
|------|-------------|
| `list_objects` | List all object types (with optional filter) |
| `list_eventsheets` | List all event sheets |
| `list_layouts` | List all layouts |
| `list_families` | List all families |
| `get_object_details` | Get full JSON of an object type |
| `get_eventsheet_details` | Get full JSON of an event sheet |
| `get_layout_details` | Get full JSON of a layout |
| `search_objects` | Search objects by name pattern |
| `get_project_summary` | Get project metadata and statistics |

### Project Mutation (14 tools)

| Tool | Description |
|------|-------------|
| `create_object` | Create a new object type (Sprite, Text, Audio, etc.) |
| `update_object_properties` | Add/remove variables, behaviors, change global status |
| `delete_object` | Delete an object (with reference checking) |
| `create_event_sheet` | Create a new event sheet |
| `add_event_to_sheet` | Add group/function/variable/include/comment events |
| `add_event_block` | Add block events with conditions + actions (recursive) |
| `update_event_block` | Modify existing block events |
| `delete_event_sheet` | Delete an event sheet (with reference checking) |
| `delete_event_from_sheet` | Delete individual events by SID |
| `create_layout` | Create a new layout |
| `add_instance_to_layout` | Place object instances on layout layers |
| `update_layout` | Update layout properties |
| `delete_layout` | Delete a layout (with reference checking) |
| `update_project_metadata` | Update project name, version, author, description |

### Animation (2 tools)

| Tool | Description |
|------|-------------|
| `add_animation_to_sprite` | Add animations with auto-generated placeholder PNGs |
| `update_animation_properties` | Update speed, looping, ping-pong settings |

### Analysis (8 tools)

| Tool | Description |
|------|-------------|
| `get_eventsheet_flow` | Event sheet include hierarchy (Mermaid/JSON) |
| `get_function_map` | Function definitions and call sites |
| `get_object_dependencies` | Object usage graph (events, layouts, families) |
| `find_orphaned_objects` | Find unused objects |
| `get_asset_usage` | Track asset usage (sound, image, font, video) |
| `analyze_performance` | Heuristic performance audit |
| `validate_project` | 13-check integrity validation |
| `get_group_settings` | Group active/disabled status across event sheets |

### Scripting & Files (5 tools)

| Tool | Description |
|------|-------------|
| `list_scripts` | List all JavaScript files in the project |
| `read_script` | Read a script file's contents |
| `write_script` | Create or modify a JavaScript file |
| `read_project_file` | Read any project file (JSON or text) |
| `write_project_file` | Write a JSON file to the project |

## Resources (6)

- `project-info` — Project metadata
- `project-structure` — Full project structure overview
- `project-addons` — Used plugins, behaviors, effects
- `object-details` — Object type details (template)
- `eventsheet-details` — Event sheet details (template)
- `layout-details` — Layout details (template)

## Prompts (6)

- `analyze_project` — Full project analysis
- `find_object_usage` — Find where an object is used
- `explain_eventsheet` — Explain an event sheet's logic
- `review_game_logic` — Review game architecture
- `document_object` — Generate object documentation
- `optimize_project` — Get optimization suggestions

## Multi-language Documentation

Supported: `en`, `es`, `pt-br`, `fr`, `de`, `it`, `ja`, `ko`, `zh`, `ru`, `tr`

All doc tools accept a `lang` parameter. Falls back to English if a topic isn't translated.

## Update Documentation

```bash
c3-docs-scrape --all --lang en
c3-docs-scrape --category plugins --lang en
c3-docs-scrape --topic sprite --lang es
```

## Development

```bash
git clone <repo>
cd construct3-docs-mcp
npm install
npm run build
npm test
```

## License

MIT

---

*Construct 3 is developed by Scirra Ltd. This project is not affiliated with Scirra.*
