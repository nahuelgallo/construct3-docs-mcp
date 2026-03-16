# Contributing

## Adding translations

1. Add the language to `src/i18n/languages.ts` if not already listed
2. Run the scraper: `c3-docs-scrape --all --lang <code>`
3. Verify: check `docs/<lang>/index.json` was created
4. Submit a PR with the new `docs/<lang>/` directory

### Supported languages on construct.net

`en`, `es`, `pt-br`, `fr`, `de`, `it`, `ja`, `ko`, `zh`, `ru`, `tr`

## Adding topics

1. Add the topic to `src/scraper/url-map.ts`
2. Test the URL: `c3-docs-scrape --topic <slug> --lang en`
3. Verify the scraped markdown in `docs/en/<category>/<slug>.md`

## Fixing parser issues

The HTML parser targets construct.net's manual page structure. If the site changes:

1. Check `src/scraper/parser.ts` — `findMainContent()` for the content selector
2. Check `extractAceEntries()` for ACE table parsing
3. Run tests: `npm test`

## Running tests

```bash
npm test
npm run test:watch
```
