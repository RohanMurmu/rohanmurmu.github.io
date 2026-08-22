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
| Which panels exist         | the `tabs` array in [`src/app/page.tsx`](src/app/page.tsx) |
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

- **Panels, not one long scroll.** [`SectionDeck`](src/components/SectionDeck.tsx) lays the
  panels side by side on a flex track and slides it horizontally; the viewport animates to the
  active panel's height. Each panel has a URL hash (`#publications`), so deep links and the
  browser Back button work.
- **Before hydration** the deck renders `.is-static`, which stacks every panel in normal flow.
  With JS off the whole CV is still readable, and nothing is marked `inert`.
- **Theme toggle** writes `data-theme` on `<html>` and remembers the choice in `localStorage`.
  A tiny inline script in [`layout.tsx`](src/app/layout.tsx) applies it before first paint, so
  there is no flash of the wrong theme. With no stored choice the OS preference wins.
- **Reduced motion** collapses every transition and disables the hero spotlight; touch pointers
  skip the hover-only affordances.

Watch out for anything that bleeds outside the hero horizontally (the cursor spotlight used to):
it widens the document and narrow viewports gain a stray sideways scrollbar, even at `opacity: 0`.

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
