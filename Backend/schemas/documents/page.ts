import { defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Page Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description: 'For the main page use "/" or "home". The site will show it on the homepage.',
    },
    {
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'contentBlockHeading' },
        { type: 'contentBlockText' },
        { type: 'contentBlockButton' },
        { type: 'contentBlockCard' },
        { type: 'contentBlockCards' },
        { type: 'callToAction' },
      ],
    },
    {
      name: 'metadata',
      title: 'SEO & Metadata',
      type: 'object',
      fields: [
        { name: 'title', title: 'SEO Title', type: 'string' },
        { name: 'description', title: 'SEO Description', type: 'text', rows: 3 },
        {
          name: 'openGraph',
          title: 'Open Graph',
          type: 'object',
          fields: [
            { name: 'title', title: 'OG Title', type: 'string' },
            { name: 'description', title: 'OG Description', type: 'text', rows: 2 },
            { name: 'locale', title: 'Locale', type: 'string', initialValue: 'en_US' },
            { name: 'image', title: 'OG Image', type: 'seoImage' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: 'name', slug: 'slug.current' },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled Page',
        subtitle: slug ? `/${slug}` : '',
      }
    },
  },
})
