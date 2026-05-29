import { createContext, useContext, useState, useEffect } from 'react';
import { client, urlFor } from '../sanity/client';
import { AGENT_QUERY, LISTINGS_QUERY, ARTICLES_QUERY, REVIEWS_QUERY } from '../sanity/queries';
import { agent as fallbackAgent, listings as fallbackListings, articles as fallbackArticles } from '../data';

const fallbackStats = [
  { value: '120+', label: 'Homes Sold' },
  { value: '$94M+', label: 'Volume Closed' },
  { value: '4.9★', label: 'Client Rating' },
  { value: '8 Yrs', label: 'in Market' },
];

const fallbackReviews = [
  {
    _id: 'r1',
    name: 'Sarah M.',
    rating: 5,
    text: "We were relocating from out of state and had about 10 days to find a home. I don't know how they pulled it off, but we closed on the perfect house within a month. Absolutely relentless work ethic and total transparency throughout.",
    location: 'Franklin, TN',
  },
  {
    _id: 'r2',
    name: 'James & Priya T.',
    rating: 5,
    text: "Listed our home on a Thursday. Had 14 showings and four offers by Sunday. We accepted above asking with favorable terms. The prep work and pricing strategy made all the difference — we listened and it paid off.",
    location: 'Brentwood, TN',
  },
  {
    _id: 'r3',
    name: 'Marcus L.',
    rating: 5,
    text: "As a first-time buyer, I had a thousand questions. Every single one got answered patiently and honestly — including the ones that weren't exactly in my favor. That kind of integrity is rare and it's why I'd refer anyone I know.",
    location: 'Nashville, TN',
  },
];

function normalizePhoto(photo, width = 900, height = 600) {
  if (!photo) return null;
  if (typeof photo === 'string') return photo;
  try {
    return urlFor(photo).width(width).height(height).url();
  } catch {
    return null;
  }
}

function normalizeListing(l) {
  return {
    ...l,
    id: l._id,
    photos: (l.photos || []).map((p) => normalizePhoto(p)).filter(Boolean),
  };
}

function normalizeAgent(a) {
  return {
    ...a,
    photoUrl: normalizePhoto(a.photo, 600, 800),
    stats: a.stats?.length ? a.stats : fallbackStats,
    team: (a.team || []).map((m) => ({
      ...m,
      photoUrl: normalizePhoto(m.photo, 400, 400),
    })),
  };
}

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const hasSanity = !!(import.meta.env.VITE_SANITY_PROJECT_ID?.trim());

  const [agent, setAgent] = useState({ ...fallbackAgent, stats: fallbackStats, photoUrl: null });
  const [listings, setListings] = useState(fallbackListings);
  const [articles, setArticles] = useState(fallbackArticles);
  const [reviews, setReviews] = useState(fallbackReviews);
  const [loading, setLoading] = useState(hasSanity);

  useEffect(() => {
    if (!hasSanity) return;

    Promise.all([
      client.fetch(AGENT_QUERY),
      client.fetch(LISTINGS_QUERY),
      client.fetch(ARTICLES_QUERY),
      client.fetch(REVIEWS_QUERY),
    ])
      .then(([agentData, listingsData, articlesData, reviewsData]) => {
        if (agentData) setAgent(normalizeAgent(agentData));
        if (listingsData?.length) setListings(listingsData.map(normalizeListing));
        if (articlesData?.length) setArticles(articlesData);
        if (reviewsData?.length) setReviews(reviewsData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <SiteContext.Provider value={{ agent, listings, articles, reviews, loading }}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSite = () => useContext(SiteContext);
