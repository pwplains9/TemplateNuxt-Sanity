import { defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    { name: 'accentText', title: 'Accent Text', type: 'string' },
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'subtext', title: 'Subtext', type: 'text', rows: 3 },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{ type: 'button' }],
      validation: (Rule) => Rule.max(3),
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtext' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Hero',
        subtitle: subtitle ? subtitle.slice(0, 50) + '...' : 'No subtext',
      }
    },
  },
})
