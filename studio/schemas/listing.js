import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'listing',
  title: 'Listing',
  type: 'document',
  fields: [
    // ─── Identity ───────────────────────────────────────────────────────────
    defineField({ name: 'address', title: 'Street Address', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'city', title: 'City', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'state', title: 'State', type: 'string', initialValue: 'TN' }),
    defineField({ name: 'zip', title: 'ZIP Code', type: 'string' }),
    defineField({ name: 'mlsId', title: 'MLS ID', type: 'string' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['Active', 'Pending', 'Sold'], layout: 'radio' },
      initialValue: 'Active',
      validation: (R) => R.required(),
    }),
    defineField({ name: 'propertyType', title: 'Property Type', type: 'string', options: { list: ['Single Family', 'Condo', 'Townhome', 'Land'] } }),
    defineField({ name: 'architecturalStyle', title: 'Architectural Style', type: 'string' }),

    // ─── Key Numbers ────────────────────────────────────────────────────────
    defineField({ name: 'price', title: 'List Price ($)', type: 'number', validation: (R) => R.required().positive() }),
    defineField({ name: 'beds', title: 'Bedrooms', type: 'number' }),
    defineField({ name: 'baths', title: 'Bathrooms (e.g. 3.5)', type: 'number' }),
    defineField({ name: 'sqft', title: 'Square Footage', type: 'number' }),
    defineField({ name: 'lotSize', title: 'Lot Size', type: 'string', description: 'e.g. 0.62 acres' }),
    defineField({ name: 'garage', title: 'Garage Spaces', type: 'number' }),
    defineField({ name: 'stories', title: 'Stories', type: 'number' }),
    defineField({ name: 'yearBuilt', title: 'Year Built', type: 'number' }),

    // ─── Financials ──────────────────────────────────────────────────────────
    defineField({ name: 'hoaDues', title: 'HOA Dues / Month ($, enter 0 if none)', type: 'number', initialValue: 0 }),
    defineField({ name: 'propertyTaxPct', title: 'Property Tax Rate (%)', type: 'number', description: 'e.g. 1.15' }),
    defineField({ name: 'loanTerm', title: 'Default Loan Term (years)', type: 'number', initialValue: 30 }),
    defineField({ name: 'downPaymentPct', title: 'Default Down Payment (%)', type: 'number', initialValue: 20 }),

    // ─── Schools ─────────────────────────────────────────────────────────────
    defineField({
      name: 'schools',
      title: 'Nearby Schools',
      type: 'object',
      fields: [
        defineField({ name: 'elementary', title: 'Elementary School', type: 'string' }),
        defineField({ name: 'middle', title: 'Middle School', type: 'string' }),
        defineField({ name: 'high', title: 'High School', type: 'string' }),
      ],
    }),

    // ─── Exterior ────────────────────────────────────────────────────────────
    defineField({
      name: 'exterior',
      title: 'Exterior Features',
      type: 'object',
      fields: [
        defineField({ name: 'stories', title: 'Stories', type: 'number' }),
        defineField({ name: 'garageSpaces', title: 'Garage Spaces', type: 'number' }),
        defineField({ name: 'waterSource', title: 'Water Source', type: 'string' }),
        defineField({ name: 'lotFeatures', title: 'Lot Features', type: 'string' }),
        defineField({ name: 'parking', title: 'Parking', type: 'string' }),
        defineField({ name: 'heatType', title: 'Heat Type', type: 'string' }),
        defineField({ name: 'ac', title: 'Air Conditioning', type: 'string' }),
        defineField({ name: 'sewer', title: 'Sewer', type: 'string' }),
        defineField({ name: 'substructure', title: 'Substructure / Foundation', type: 'string' }),
      ],
    }),

    // ─── Interior ────────────────────────────────────────────────────────────
    defineField({
      name: 'interior',
      title: 'Interior Features',
      type: 'object',
      fields: [
        defineField({ name: 'totalRooms', title: 'Total Rooms', type: 'number' }),
        defineField({ name: 'bedrooms', title: 'Bedrooms', type: 'number' }),
        defineField({ name: 'fullBaths', title: 'Full Bathrooms', type: 'number' }),
        defineField({ name: 'halfBaths', title: 'Half Bathrooms', type: 'number' }),
        defineField({ name: 'laundry', title: 'Laundry', type: 'string' }),
        defineField({ name: 'flooring', title: 'Flooring', type: 'string' }),
        defineField({ name: 'fireplace', title: 'Fireplace', type: 'string' }),
        defineField({ name: 'appliances', title: 'Appliances', type: 'string' }),
      ],
    }),

    // ─── Description & Features ───────────────────────────────────────────
    defineField({
      name: 'features',
      title: 'Notable Features',
      type: 'array',
      description: 'Displayed as pills on the listing — one feature per item.',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'description',
      title: 'Property Description',
      type: 'text',
      rows: 10,
      description: 'Separate paragraphs with a blank line.',
    }),

    // ─── Photos ───────────────────────────────────────────────────────────────
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      description: 'Drag to reorder. First photo is used as the cover image.',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      options: { layout: 'grid' },
    }),

    // ─── Display ─────────────────────────────────────────────────────────────
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Leave blank to sort by date added.',
    }),
  ],
  preview: {
    select: { title: 'address', subtitle: 'city', media: 'photos.0' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
  orderings: [
    { title: 'Display Order', name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] },
    { title: 'Price (High → Low)', name: 'priceDesc', by: [{ field: 'price', direction: 'desc' }] },
    { title: 'Newest First', name: 'createdDesc', by: [{ field: '_createdAt', direction: 'desc' }] },
  ],
});
