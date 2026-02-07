# Template: Nuxt + Sanity

A client-agnostic project template.

- **Frontend** — Nuxt 3 + TypeScript, rendering content from Sanity (pages with page builder, blog, site settings).
- **Backend** — Sanity Studio for content management (pages, posts, settings).

## Structure

```
TemplateNuxt+Sanity/
├── Frontend/     # Nuxt 3 + TS
└── Backend/      # Sanity Studio
```

## Quick start

1. **Sanity**
   - Create a project at [sanity.io/manage](https://www.sanity.io/manage).
   - In the `Backend` folder: copy `.env.example` to `.env`, set `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`.
   - Run `npm install` and `npm run dev` in `Backend`.

2. **Frontend**
   - In the `Frontend` folder: copy `.env.example` to `.env`, set the same `NUXT_PUBLIC_SANITY_PROJECT_ID` and `NUXT_PUBLIC_SANITY_DATASET`.
   - Run `npm install` and `npm run dev` in `Frontend`.

3. In Studio, create:
   - **Site Settings** — site name, logo, menu, footer.
   - A page with slug **/** — homepage (add Page Builder blocks: Hero, text, buttons, etc.).
   - Optionally, pages with other slugs (e.g. `/about`) and posts under **Blog Posts**.

See `Frontend/README.md` and `Backend/README.md` for more details.
