# Nuxt + Sanity Template (Frontend)

Frontend: **Nuxt 3** + **TypeScript** + **@nuxtjs/sanity**.

- Page builder: pages from Sanity with sections (Hero, Heading, Text, Button, Cards, CTA).
- Blog: list and single post from Sanity `post` documents.
- Site settings: navigation, footer, logo from Sanity `siteSettings`.

## Setup

1. Copy `.env.example` to `.env` and set your Sanity project ID and dataset (same as in the Sanity Studio project).
2. Install and run:

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
# or static
npm run generate
```

## Sanity

Content is managed in the **sanity-studio** folder (Backend). Create a project at [sanity.io](https://www.sanity.io), then in Studio create:

- **Site Settings** (singleton): site name, logo, nav, footer.
- **Pages**: add a page with slug `/` for the homepage, and others (e.g. `/about`, `/contact`) with page builder sections.
- **Blog posts**: create `post` documents with title, slug, body, etc.

Frontend and Studio must use the same `projectId` and `dataset` in `.env`.
