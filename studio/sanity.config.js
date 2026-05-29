import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemas } from './schemas';

const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  name: 'premier-properties',
  title: 'Premier Properties CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Agent Profile')
              .child(
                S.document()
                  .schemaType('agent')
                  .documentId('agent-profile')
                  .title('Agent Profile')
              ),
            S.divider(),
            S.documentTypeListItem('listing').title('Listings'),
            S.documentTypeListItem('article').title('Resources & Articles'),
            S.documentTypeListItem('review').title('Client Reviews'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemas,
    // Prevent creating new agent documents from the "New document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => schemaType !== 'agent'),
  },

  document: {
    // Lock down the agent singleton to publish/discard/restore only
    actions: (input, context) =>
      context.schemaType === 'agent'
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
