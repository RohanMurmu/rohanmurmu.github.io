# ggred0123.github.io

Personal academic homepage — Next.js (App Router) exported to static HTML, served by GitHub Pages.

Live at <https://ggred0123.github.io>.

## Editing content

**Everything on the page comes from [`src/data/profile.ts`](src/data/profile.ts).**
Add a paper or a news item by editing that one file — no component changes needed.

| Want to change             | Edit                                                |
| -------------------------- | --------------------------------------------------- |
| Name, bio, links, photo    | `profile` object                                     |
| Lab website link           | `profile.labUrl`                                     |
| News feed                  | `news` array (newest first)                          |
| Publications               | `publications` array (newest first)                  |
| Experience / education     | `experience`, `education`                            |
| Which sections exist       | [`src/app/page.tsx`](src/app/page.tsx)               |
| Colours, spacing, fonts    | `src/app/globals.css` (CSS variables at the top)     |

Bolding of your own name in author lists is automatic — it matches the `ME` constant.
Equal-contribution asterisks come from each paper's `equalContribution` array.

Projects, Awards and Technical Skills were removed from the site; they are still in
`main.tex`, and the old data arrays are recoverable from git history if you want them back.

### Adding a Google Scholar / LinkedIn link

Set `scholar` or `linkedin` in `profile`. Empty string = link hidden.

### Updating the CV PDF

```sh
cp ../cv_YoungminKim.pdf public/cv_YoungminKim.pdf
```

## How the page behaves

- **One vertical page.** All five sections stack and scroll normally. The sticky nav holds
  anchor links whose underline tracks the section currently in view, plus a hairline that shows
  scroll progress. Sections fade in as they scroll past.
- **Reveal is fail-safe.** The observer marks the section that came into view *and every section
  above it*, so a deep link or a fast jump never strands a skipped section at `opacity: 0`. The
  `.js-reveal` class is added by JS, not the markup, so nothing is hidden with JS off.
- **Theme toggle** writes `data-theme` on `<html>` and remembers the choice in `localStorage`.
  A tiny inline script in [`layout.tsx`](src/app/layout.tsx) applies it before first paint, so
  there is no flash of the wrong theme. With no stored choice the OS preference wins.
- **Reduced motion** collapses every transition and disables the hero spotlight; touch pointers
  skip the hover-only affordances.

The name is set in `--font-display` (a tight grotesque) rather than the body face; both are
system stacks, so there are no webfonts to load.

Watch out for anything that bleeds outside the hero horizontally (the cursor spotlight used to):
it widens the document and narrow viewports gain a stray sideways scrollbar, even at `opacity: 0`.
`overflow-x: clip` on the root does **not** fix that — it propagates to the viewport and the page
still scrolls sideways. Keep the bleed vertical instead.

## Local development

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static export -> ./out
```

Node lives in `/opt/homebrew/bin` on this machine and is not on the default `PATH`; prefix with
`export PATH="/opt/homebrew/bin:$PATH"` if `npm` is not found.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `./out`.

Pages **Source must be set to "GitHub Actions"** (Settings → Pages). If it is set to
"Deploy from a branch" instead, GitHub's legacy Jekyll builder races this workflow and wins,
serving a rendered README instead of the site.

## Notes

- `output: "export"` in `next.config.mjs` produces plain static HTML — no Node server needed.
- `images.unoptimized` is required because `next/image` optimization needs a running server.
- `public/.nojekyll` stops GitHub Pages from stripping the `_next/` directory.
