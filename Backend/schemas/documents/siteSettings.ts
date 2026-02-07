import { defineType } from 'sanity'

export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'url', title: 'URL', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'isExternal', title: 'Open in New Tab', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: { title: 'label', subtitle: 'url' },
  },
})

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Twitter/X', value: 'twitter' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'GitHub', value: 'github' },
          { title: 'Discord', value: 'discord' },
          { title: 'Telegram', value: 'telegram' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    { name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required() },
  ],
  preview: {
    select: { title: 'platform', subtitle: 'url' },
  },
})

export const footerColumn = defineType({
  name: 'footerColumn',
  title: 'Footer Column',
  type: 'object',
  fields: [
    { name: 'title', title: 'Column Title', type: 'string' },
    { name: 'links', title: 'Links', type: 'array', of: [{ type: 'navItem' }] },
  ],
  preview: {
    select: { title: 'title', linksCount: 'links' },
    prepare({ title, linksCount }) {
      const count = Array.isArray(linksCount) ? linksCount.length : 0
      return { title: title || 'Footer Column', subtitle: `${count} links` }
    },
  },
})

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      initialValue: 'My Site',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: false },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    },
    {
      name: 'mainNavigation',
      title: 'Main Navigation',
      type: 'array',
      group: 'navigation',
      of: [{ type: 'navItem' }],
    },
    {
      name: 'headerSocialLinks',
      title: 'Header Social Links',
      type: 'array',
      group: 'navigation',
      of: [{ type: 'socialLink' }],
    },
    {
      name: 'headerCtaText',
      title: 'Header CTA Text',
      type: 'string',
      group: 'navigation',
    },
    {
      name: 'headerCtaLink',
      title: 'Header CTA Link',
      type: 'string',
      group: 'navigation',
    },
    {
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      group: 'footer',
    },
    {
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      group: 'footer',
      of: [{ type: 'footerColumn' }],
    },
    {
      name: 'footerSocialLinks',
      title: 'Footer Social Links',
      type: 'array',
      group: 'footer',
      of: [{ type: 'socialLink' }],
    },
    {
      name: 'footerCopyright',
      title: 'Footer Copyright',
      type: 'string',
      group: 'footer',
    },
  ],
  preview: {
    select: { title: 'siteName' },
    prepare({ title }) {
      return { title: title || 'Site Settings', subtitle: 'Global configuration' }
    },
  },
})
