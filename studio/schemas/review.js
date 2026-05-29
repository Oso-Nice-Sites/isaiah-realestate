import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'review',
  title: 'Client Review',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Client Name', type: 'string', description: 'Can be first name + last initial, e.g. Sarah M.' }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      initialValue: 5,
      validation: (R) => R.required().min(1).max(5).integer(),
      description: '1–5 stars',
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 5,
      description: 'The client\'s quote, in their own words.',
    }),
    defineField({ name: 'location', title: 'Location', type: 'string', description: 'e.g. Franklin, TN' }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'location' },
  },
});
