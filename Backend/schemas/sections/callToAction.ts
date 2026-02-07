import { defineType } from 'sanity'

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call To Action',
  type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'supportingText', title: 'Supporting Text', type: 'text', rows: 3 },
    {
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
        ],
      },
      initialValue: 'primary',
    },
    {
      name: 'actions',
      title: 'Action Buttons',
      type: 'array',
      of: [{ type: 'button' }],
      validation: (Rule) => Rule.max(2),
    },
  ],
  preview: {
    select: { title: 'heading', variant: 'variant' },
    prepare({ title, variant }) {
      return { title: title || 'Call To Action', subtitle: `Variant: ${variant || 'primary'}` }
    },
  },
})
