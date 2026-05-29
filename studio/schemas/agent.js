import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'agent',
  title: 'Agent Profile',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string' }),
    defineField({ name: 'title', title: 'Professional Title', type: 'string', description: 'e.g. REALTOR® | Buyer & Seller Specialist' }),
    defineField({ name: 'realtorNumber', title: 'REALTOR® License Number', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'instagram', title: 'Instagram Handle', type: 'string', description: 'Include the @ symbol, e.g. @premierproperties' }),
    defineField({ name: 'facebook', title: 'Facebook Page Name', type: 'string' }),
    defineField({ name: 'linkedin', title: 'LinkedIn', type: 'string', description: 'Path only, e.g. in/yourname' }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Your headshot — used on the About page.',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 12,
      description: 'Separate paragraphs with a blank line.',
    }),
    defineField({
      name: 'stats',
      title: 'Homepage Stats',
      type: 'array',
      description: 'The four stats displayed on the homepage hero (e.g. "120+" / "Homes Sold").',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. 120+ or $94M+' }),
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. Homes Sold' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'team',
      title: 'Team Members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role', type: 'string', description: 'e.g. Buyer\'s Specialist' }),
            defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4 }),
            defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
});
