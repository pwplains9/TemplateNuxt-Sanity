import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { CogIcon, DocumentsIcon, BookIcon } from '@sanity/icons'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || ''
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

const singletonTypes = new Set(['siteSettings'])

export default defineConfig({
  name: 'default',
  title: 'Content Studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Site Settings')
              ),
            S.divider(),
            S.listItem()
              .title('Pages')
              .icon(DocumentsIcon)
              .schemaType('page')
              .child(
                S.documentTypeList('page')
                  .title('Pages')
                  .defaultOrdering([{ field: 'name', direction: 'asc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Blog Posts')
              .icon(BookIcon)
              .schemaType('post')
              .child(
                S.documentTypeList('post')
                  .title('Blog Posts')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && !['unpublish', 'delete', 'duplicate'].includes(action))
        : input,
  },
})
