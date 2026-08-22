# ggred0123.github.io

Personal academic homepage — Next.js (App Router) exported to static HTML, served by GitHub Pages.

## Editing content

**Everything on the page comes from [`src/data/profile.ts`](src/data/profile.ts).**
Add a paper, a news item, or a project by editing that one file — no component changes needed.

| Want to change            | Edit                                                    |
| ------------------------- | ------------------------------------------------------- |
| Name, bio, links, photo   | `profile` object                                        |
| News feed                 | `news` array (newest first)                             |
| Publications              | `publications` array (newest first)                     |
| Projects / experience     | `projects`, `experience`, `education`, `awards`, `skills` |
| Colors, spacing, fonts    | `src/app/globals.css` (CSS variables at the top)        |

Bolding of your own name in author lists is automatic — it matches the `ME` constant.
Equal-contribution asterisks come from each paper's `equalContribution` array.

### Adding a Google Scholar / LinkedIn link

Set `scholar` or `linkedin` in `profile`. Empty string = link hidden.

### Updating the CV PDF

```sh
cp ../cv_YoungminKim.pdf public/cv_YoungminKim.pdf
```

## Local development

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static export -> ./out
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `./out`.

One-time setup on GitHub: **Settings → Pages → Source: GitHub Actions**.

## Notes

- `output: "export"` in `next.config.mjs` produces plain static HTML — no Node server needed.
- `images.unoptimized` is required because `next/image` optimization needs a running server.
- `public/.nojekyll` stops GitHub Pages from stripping the `_next/` directory.
