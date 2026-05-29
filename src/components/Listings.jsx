import { useState } from 'react';
import { useSite } from '../context/SiteContext';

const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const filterDefs = [
  {
    key: 'status',
    label: 'Status',
    options: ['All', 'Active', 'Pending', 'Sold'],
  },
  {
    key: 'propertyType',
    label: 'Property Type',
    options: ['All', 'Single Family', 'Condo', 'Townhome', 'Land'],
  },
  {
    key: 'architecturalStyle',
    label: 'Style',
    options: ['All', 'Modern Farmhouse', 'Traditional Craftsman', 'Contemporary', 'Colonial', 'Ranch'],
  },
  {
    key: 'priceRange',
    label: 'Price Range',
    options: ['All', 'Under $500K', '$500K–$750K', '$750K–$1M', '$1M+'],
  },
  {
    key: 'beds',
    label: 'Bedrooms',
    options: ['All', '2+', '3+', '4+', '5+'],
  },
  {
    key: 'sqft',
    label: 'Living Space',
    options: ['All', 'Under 2,000 sqft', '2,000–3,000 sqft', '3,000–4,000 sqft', '4,000+ sqft'],
  },
];

function matchFilter(listing, filters) {
  for (const [key, val] of Object.entries(filters)) {
    if (val === 'All' || val === '') continue;
    if (key === 'priceRange') {
      const p = listing.price;
      if (val === 'Under $500K' && p >= 500_000) return false;
      if (val === '$500K–$750K' && (p < 500_000 || p >= 750_000)) return false;
      if (val === '$750K–$1M' && (p < 750_000 || p >= 1_000_000)) return false;
      if (val === '$1M+' && p < 1_000_000) return false;
    } else if (key === 'beds') {
      const min = parseInt(val);
      if (listing.beds < min) return false;
    } else if (key === 'sqft') {
      const s = listing.sqft;
      if (val === 'Under 2,000 sqft' && s >= 2000) return false;
      if (val === '2,000–3,000 sqft' && (s < 2000 || s >= 3000)) return false;
      if (val === '3,000–4,000 sqft' && (s < 3000 || s >= 4000)) return false;
      if (val === '4,000+ sqft' && s < 4000) return false;
    } else {
      if (listing[key] !== val) return false;
    }
  }
  return true;
}

export default function Listings({ onSelectListing }) {
  const { listings } = useSite();
  const [filters, setFilters] = useState({
    status: 'All',
    propertyType: 'All',
    architecturalStyle: 'All',
    priceRange: 'All',
    beds: 'All',
    sqft: 'All',
  });

  const visible = listings.filter((l) => matchFilter(l, filters));

  return (
    <section id="listings" className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <p className="section-subtitle">Portfolio</p>
        <h2 className="section-title">Featured Listings</h2>
        <div className="gold-divider" />

        {/* Filter Bar */}
        <div className="filter-bar" style={{ marginBottom: 40 }}>
          {filterDefs.map((f) => (
            <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label
                htmlFor={`filter-${f.key}`}
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                {f.label}
              </label>
              <select
                id={`filter-${f.key}`}
                value={filters[f.key]}
                onChange={(e) => setFilters({ ...filters, [f.key]: e.target.value })}
              >
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          ))}
          <button
            className="btn btn-outline"
            style={{ alignSelf: 'flex-end', padding: '9px 18px' }}
            onClick={() =>
              setFilters({
                status: 'All',
                propertyType: 'All',
                architecturalStyle: 'All',
                priceRange: 'All',
                beds: 'All',
                sqft: 'All',
              })
            }
          >
            Clear
          </button>
        </div>

        {/* Count */}
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: 24 }}>
          {visible.length === 0
            ? 'No listings match the current filters.'
            : `Showing ${visible.length} ${visible.length === 1 ? 'listing' : 'listings'}`}
        </p>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 28,
          }}
        >
          {visible.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onClick={() => onSelectListing(listing)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ListingCard({ listing, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        cursor: 'pointer',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      }}
    >
      {/* Photo */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 240 }}>
        <img
          src={listing.photos[0]}
          alt={listing.address}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: hover ? 'scale(1.04)' : 'scale(1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            display: 'flex',
            gap: 8,
          }}
        >
          <span className={`badge badge-${listing.status.toLowerCase()}`}>
            {listing.status}
          </span>
          <span
            style={{
              background: 'rgba(27,46,30,0.85)',
              color: 'var(--white)',
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: 4,
              fontWeight: 500,
            }}
          >
            {listing.photos.length} Photos
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 14,
            right: 14,
            background: 'rgba(27,46,30,0.9)',
            color: 'var(--gold-light)',
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: 500,
            padding: '6px 14px',
            borderRadius: 6,
          }}
        >
          {fmt(listing.price)}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '20px 22px 22px' }}>
        <div
          style={{
            fontSize: '11px',
            color: 'var(--gold)',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          {listing.architecturalStyle}
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 500,
            color: 'var(--forest)',
            lineHeight: 1.2,
            marginBottom: 4,
          }}
        >
          {listing.address}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: 16 }}>
          {listing.city}, {listing.state} {listing.zip}
        </p>

        {/* Key stats */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            paddingTop: 14,
            borderTop: '1px solid var(--cream-dark)',
          }}
        >
          {[
            { v: listing.beds, l: 'Beds' },
            { v: listing.baths, l: 'Baths' },
            { v: listing.sqft.toLocaleString(), l: 'SqFt' },
            { v: listing.lotSize, l: 'Lot' },
          ].map((s) => (
            <div key={s.l} style={{ flex: 1, textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: 'var(--forest)',
                }}
              >
                {s.v}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-light)', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}
        >
          <span>MLS# {listing.mlsId}</span>
          <span
            style={{
              color: 'var(--forest)',
              fontWeight: 500,
              fontSize: '12px',
              letterSpacing: '0.04em',
            }}
          >
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}
