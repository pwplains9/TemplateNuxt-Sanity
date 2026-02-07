# Sanity Studio (Backend)

**Sanity Studio** for the Nuxt + Sanity template. Manage site settings, pages (with page builder), and blog posts.

## Setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Copy `.env.example` to `.env` and set:
   - `SANITY_STUDIO_PROJECT_ID` — your project ID
   - `SANITY_STUDIO_DATASET` — e.g. `production`
3. Use the **same** project ID and dataset in the Frontend `.env` (see Frontend README).

## Commands

```bash
npm install
npm run dev    # http://localhost:3333
npm run build
npm run deploy # deploy to sanity.studio
```

## Content

- **Site Settings** — one document: site name, logo, main navigation, header CTA, footer description, footer columns, copyright.
- **Pages** — any number of pages. Set slug to `/` for the homepage; use Page Builder sections: Hero, Heading, Text, Button, Card, Cards Grid, Call to Action.
- **Blog Posts** — title, slug, author, main image, excerpt, body (portable text).

After adding content, the Frontend will show it using the same project ID and dataset.
