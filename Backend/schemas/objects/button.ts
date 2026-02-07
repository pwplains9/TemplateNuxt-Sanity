import { defineType } from 'sanity'

export const button = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    { name: 'text', title: 'Button Text', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'link', title: 'Link', type: 'string', description: 'URL or path (e.g. /about, https://example.com)' },
    { name: 'openInNewTab', title: 'Open in New Tab', type: 'boolean', initialValue: false },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
          { title: 'Extra Large', value: 'xl' },
        ],
      },
      initialValue: 'md',
    },
    {
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Orange', value: 'orange' },
          { title: 'White', value: 'white' },
          { title: 'Ghost', value: 'ghost' },
          { title: 'Black', value: 'black' },
        ],
      },
      initialValue: 'primary',
    },
  ],
  preview: {
    select: { title: 'text' },
    prepare({ title }) {
      return { title: title || 'Button' }
    },
  },
})
