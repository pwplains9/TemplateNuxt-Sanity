import { defineType } from 'sanity'

export const seoImage = defineType({
  name: 'seoImage',
  title: 'Image with Alt Text',
  type: 'image',
  options: { hotspot: true },
  fields: [
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and accessibility.',
    },
  ],
})
