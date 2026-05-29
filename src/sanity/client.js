import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim();

export const client = projectId
  ? createClient({
      projectId,
      dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

// Returns null safely when no client is configured
export const urlFor = (source) => (builder ? builder.image(source) : null);
