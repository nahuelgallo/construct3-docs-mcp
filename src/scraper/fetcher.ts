/** HTTP fetcher with rate limiting */

const RATE_LIMIT_MS = 1000; // 1 request per second
let lastFetchTime = 0;

async function waitForRateLimit(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastFetchTime;
  if (elapsed < RATE_LIMIT_MS) {
    await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_MS - elapsed));
  }
  lastFetchTime = Date.now();
}

export interface FetchResult {
  html: string;
  url: string;
  status: number;
}

/**
 * Fetch a URL with rate limiting and retries.
 * Uses native Node 18+ fetch.
 */
export async function fetchPage(
  url: string,
  retries = 2
): Promise<FetchResult> {
  await waitForRateLimit();

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "construct3-docs-mcp/1.0 (documentation scraper for MCP server)",
          Accept: "text/html",
        },
      });

      if (!response.ok) {
        if (attempt < retries && response.status >= 500) {
          await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
          continue;
        }
        throw new Error(`HTTP ${response.status} for ${url}`);
      }

      const html = await response.text();
      return { html, url, status: response.status };
    } catch (error) {
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
        continue;
      }
      throw error;
    }
  }

  throw new Error(`Failed to fetch ${url} after ${retries + 1} attempts`);
}
