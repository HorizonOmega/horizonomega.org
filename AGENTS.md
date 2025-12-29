# Agent Notes

Context for AI coding agents working on this codebase.

## Stack

- Astro 5 with MDX
- Static site, deployed to Vercel
- i18n: English (default) + French (`/fr/`)

## Utilities

### `src/utils/rss.ts` — Substack RSS fetcher

Fetches blog posts from the Substack RSS feed at build time.

```ts
import { fetchSubstackPosts, formatDate } from '../utils/rss';

const posts = await fetchSubstackPosts(3); // limit to 3 posts
// returns: { title, url, date: Date, description }[]

formatDate(post.date, 'en'); // "Dec 2025"
formatDate(post.date, 'fr'); // "déc. 2025"
```

Used by `src/components/BlogPosts.astro` on the homepage (displays as a styled list).

The RSS feed URL is `https://horizonomega.substack.com/feed`.

## Components

- `BlogPosts.astro` — Displays latest 5 blog posts as a list (fetches 10 from RSS, filters out "Introducing Horizon Events")
- `LanguageSwitcher.astro` — EN/FR toggle
- `ThemeToggle.astro` — Light/dark mode

## Styles

All global styles are in `src/layouts/Layout.astro` under `<style is:global>`.

Card patterns: `.project-card` — similar structure with hover effects.
Blog list patterns: `.blog-list`, `.blog-item`, `.blog-more`.
