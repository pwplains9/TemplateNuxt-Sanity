import { defineType } from 'sanity'

export const contentBlockHeading = defineType({
  name: 'contentBlockHeading',
  title: 'Heading',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    {
      name: 'tag',
      title: 'HTML Tag',
      type: 'string',
      options: {
        list: [
          { title: 'H1', value: 'h1' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'H4', value: 'h4' },
        ],
      },
      initialValue: 'h2',
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'XS', value: 'xs' },
          { title: 'SM', value: 'sm' },
          { title: 'MD', value: 'md' },
          { title: 'LG', value: 'lg' },
          { title: 'XL', value: 'xl' },
          { title: '2XL', value: 'xxl' },
        ],
      },
      initialValue: 'lg',
    },
    {
      name: 'align',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    },
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Heading', subtitle: 'Heading block' }
    },
  },
})

export const contentBlockText = defineType({
  name: 'contentBlockText',
  title: 'Text',
  type: 'object',
  fields: [
    { name: 'text', title: 'Text', type: 'text', rows: 4, validation: (Rule) => Rule.required() },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'XS', value: 'xs' },
          { title: 'SM', value: 'sm' },
          { title: 'MD', value: 'md' },
          { title: 'LG', value: 'lg' },
          { title: 'XL', value: 'xl' },
        ],
      },
      initialValue: 'md',
    },
    {
      name: 'align',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    },
  ],
  preview: {
    select: { text: 'text' },
    prepare({ text }) {
      return {
        title: text ? text.slice(0, 50) + (text.length > 50 ? '…' : '') : 'Text',
        subtitle: 'Text block',
      }
    },
  },
})

export const contentBlockButton = defineType({
  name: 'contentBlockButton',
  title: 'Button',
  type: 'object',
  fields: [
    { name: 'button', title: 'Button', type: 'button' },
    {
      name: 'align',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    },
  ],
  preview: {
    select: { text: 'button.text' },
    prepare({ text }) {
      return { title: text || 'Button', subtitle: 'Button block' }
    },
  },
})

export const contentBlockCard = defineType({
  name: 'contentBlockCard',
  title: 'Card',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'text', title: 'Text', type: 'text', rows: 3 },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'button', title: 'Button', type: 'button' },
  ],
  preview: {
    select: { title: 'title', text: 'text' },
    prepare({ title, text }) {
      return { title: title || text?.slice(0, 30) || 'Card', subtitle: 'Card block' }
    },
  },
})

export const contentBlockCards = defineType({
  name: 'contentBlockCards',
  title: 'Cards Grid',
  type: 'object',
  fields: [
    { name: 'sectionHeading', title: 'Section Heading', type: 'string' },
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{ type: 'contentBlockCard' }],
      validation: (Rule) => Rule.min(1),
    },
  ],
  preview: {
    select: { sectionHeading: 'sectionHeading', count: 'cards' },
    prepare({ sectionHeading, count }) {
      const len = Array.isArray(count) ? count.length : 0
      return { title: sectionHeading || 'Cards Grid', subtitle: `${len} card(s)` }
    },
  },
})
