import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'article',
  title: 'Resource / Article',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ["Market Update", "Buyer's Guide", "Seller's Guide", "Research"],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 5, description: 'A few sentences explaining the key insight — shown on the card.' }),
    defineField({ name: 'date', title: 'Date', type: 'string', description: 'e.g. April 12, 2025' }),
    defineField({ name: 'readTime', title: 'Read Time', type: 'string', description: 'e.g. 4 min read' }),
    defineField({ name: 'source', title: 'Source Name', type: 'string', description: 'Organization name for the source citation.' }),
    defineField({ name: 'sourceUrl', title: 'Source URL', type: 'url' }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
  orderings: [
    { title: 'Display Order', name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] },
    { title: 'Newest First', name: 'createdDesc', by: [{ field: '_createdAt', direction: 'desc' }] },
  ],
});
