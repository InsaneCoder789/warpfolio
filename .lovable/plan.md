

# Fix Blank Page on GitHub Pages + Center Layout + Show Only Pinned Repos

## Problems Identified

1. **Blank page on GitHub Pages**: Two issues:
   - `BrowserRouter` in `App.tsx` has no `basename` prop, so routes don't match under `/warpfolio/` path
   - The `<script>` tag in `index.html` uses `src="/src/main.tsx"` — Vite handles this in dev, but for production the `base` config should handle it. The real fix is the basename.

2. **Page not centered**: The terminal content stretches full-width with no max-width wrapper to center it on the screen.

3. **Projects section shows all repos**: Currently fetches 12 most recent repos. Should only show the 4 pinned repos.

## Plan

### 1. Fix GitHub Pages routing
- Add `basename="/warpfolio/"` to `BrowserRouter` in `App.tsx` so routes resolve correctly under the subpath
- Add `resolve.dedupe: ["react", "react-dom"]` to `vite.config.ts` to prevent duplicate React issues

### 2. Center the page layout
- In `Index.tsx`, wrap the entire terminal window in a centered container with `max-w-5xl mx-auto` so the terminal feels like a floating window in the center of the screen, not edge-to-edge
- Keep the projects grid at `w-full` within that container so project cards still go edge-to-edge inside the terminal

### 3. Show only pinned repos
- Update `useGithubRepos.ts` to filter repos to only the 4 pinned ones: `k1000-Main`, `Trilingo`, `Lakshman-Rekha`, `Student-Database-Manager`
- Keep the fetch logic so descriptions/stars stay dynamic, but filter results to only these names
- Update grid to `grid-cols-1 sm:grid-cols-2` (4 cards in a 2x2 grid looks better than 3-col for exactly 4 items)

### Technical Details

**App.tsx** — add basename:
```tsx
<BrowserRouter basename="/warpfolio/">
```

**vite.config.ts** — add dedupe:
```ts
resolve: {
  alias: { "@": path.resolve(__dirname, "./src") },
  dedupe: ["react", "react-dom", "react/jsx-runtime"],
}
```

**useGithubRepos.ts** — filter to pinned repos:
```ts
const PINNED_REPOS = ["k1000-Main", "Trilingo", "Lakshman-Rekha", "Student-Database-Manager"];
// after fetch, filter: repos.filter(r => PINNED_REPOS.includes(r.name))
```

**Index.tsx** — center the terminal:
- Add `max-w-5xl mx-auto w-full` to the main terminal container
- Keep background `min-h-screen` full width for the dark bg
- Update projects grid to `sm:grid-cols-2` for a clean 2x2 layout

