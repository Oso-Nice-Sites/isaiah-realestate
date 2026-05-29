import { useState } from 'react';
import MortgageCalc from './MortgageCalc';

const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function ListingModal({ listing, onClose }) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [tab, setTab] = useState('overview');
  const [showShareMsg, setShowShareMsg] = useState(false);

  if (!listing) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareMsg(true);
      setTimeout(() => setShowShareMsg(false), 2500);
    }
  };

  const downPayment = listing.price * (listing.downPaymentPct / 100);
  const annualTax = listing.price * (listing.propertyTaxPct / 100);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Hero Photo */}
        <div style={{ position: 'relative', height: 480, overflow: 'hidden', background: '#1a2e1e' }}>
          <img
            src={listing.photos[photoIdx]}
            alt={listing.address}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92 }}
          />
          {/* Photo nav */}
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 6,
              background: 'rgba(10,18,12,0.55)',
              padding: '8px 14px',
              borderRadius: 20,
            }}
          >
            <button
              onClick={() => setPhotoIdx(Math.max(0, photoIdx - 1))}
              style={{ background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer', lineHeight: 1 }}
            >
              ‹
            </button>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', alignSelf: 'center' }}>
              {photoIdx + 1} / {listing.photos.length}
            </span>
            <button
              onClick={() => setPhotoIdx(Math.min(listing.photos.length - 1, photoIdx + 1))}
              style={{ background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer', lineHeight: 1 }}
            >
              ›
            </button>
          </div>

          {/* Status badge */}
          <div style={{ position: 'absolute', top: 20, left: 20 }}>
            <span className={`badge badge-${listing.status.toLowerCase()}`}>{listing.status}</span>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            padding: '10px 20px',
            overflowX: 'auto',
            background: 'var(--cream)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {listing.photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              onClick={() => setPhotoIdx(i)}
              style={{
                width: 72,
                height: 52,
                objectFit: 'cover',
                borderRadius: 4,
                cursor: 'pointer',
                flexShrink: 0,
                opacity: i === photoIdx ? 1 : 0.55,
                border: i === photoIdx ? '2px solid var(--gold)' : '2px solid transparent',
                transition: 'opacity 0.15s, border 0.15s',
              }}
            />
          ))}
        </div>

        <div style={{ padding: '32px 40px 48px', maxWidth: '100%' }}>
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 28 }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 6 }}>
                {listing.architecturalStyle} · {listing.propertyType}
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, color: 'var(--forest)', lineHeight: 1.15, marginBottom: 4 }}>
                {listing.address}
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                {listing.city}, {listing.state} {listing.zip} · MLS# {listing.mlsId}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 500, color: 'var(--forest)', lineHeight: 1 }}>
                {fmt(listing.price)}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: 4 }}>
                Year Built: {listing.yearBuilt}
              </div>
            </div>
          </div>

          {/* Key stats row */}
          <div className="stat-row" style={{ marginBottom: 28 }}>
            {[
              { v: listing.beds, l: 'Bedrooms' },
              { v: listing.baths, l: 'Bathrooms' },
              { v: listing.sqft.toLocaleString(), l: 'Sq Ft' },
              { v: listing.lotSize, l: 'Lot Size' },
              { v: listing.garage, l: 'Garage' },
              { v: listing.stories, l: 'Stories' },
            ].map((s) => (
              <div key={s.l} className="stat-cell">
                <div className="value">{s.v}</div>
                <div className="label">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Financial estimates */}
          <div
            style={{
              background: 'var(--forest)',
              color: 'var(--white)',
              borderRadius: 'var(--radius-md)',
              padding: '20px 24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 16,
              marginBottom: 32,
            }}
          >
            <div>
              <div style={{ fontSize: '10px', color: 'var(--gold-light)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Sale Price</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>{fmt(listing.price)}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--gold-light)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Down Payment ({listing.downPaymentPct}%)</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>{fmt(downPayment)}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--gold-light)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Est. Annual Tax ({listing.propertyTaxPct}%)</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>{fmt(annualTax)}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--gold-light)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>HOA Dues / Mo</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>
                {listing.hoaDues > 0 ? `$${listing.hoaDues}` : 'None'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--gold-light)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Loan Term</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>{listing.loanTerm} Yr Fixed</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 14, marginBottom: 40, flexWrap: 'wrap' }}>
            <button className="btn btn-primary">
              📅 Schedule a Tour
            </button>
            <button className="btn btn-outline" onClick={handleShare}>
              {showShareMsg ? '✓ Link Copied!' : '↗ Share Listing'}
            </button>
          </div>

          {/* Tab navigation */}
          <div style={{ display: 'flex', gap: 4, borderBottom: '1.5px solid var(--border)', marginBottom: 32 }}>
            {['overview', 'exterior', 'interior', 'schools', 'mortgage'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: '10px 18px',
                  background: 'none',
                  border: 'none',
                  borderBottom: tab === t ? '2.5px solid var(--forest)' : '2.5px solid transparent',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: tab === t ? 600 : 400,
                  color: tab === t ? 'var(--forest)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  letterSpacing: '0.04em',
                  transition: 'color 0.15s',
                  marginBottom: -1.5,
                }}
              >
                {t === 'mortgage' ? 'Mortgage Calc' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab: Overview */}
          {tab === 'overview' && (
            <div className="fade-in">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--forest)', marginBottom: 16 }}>
                Property Description
              </h3>
              {listing.description.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--text)', marginBottom: 16 }}>
                  {para}
                </p>
              ))}

              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 500, color: 'var(--forest)', marginTop: 32, marginBottom: 12 }}>
                Notable Features
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {listing.features.map((f) => (
                  <span
                    key={f}
                    style={{
                      padding: '6px 14px',
                      background: 'var(--cream)',
                      border: '1px solid var(--border)',
                      borderRadius: 20,
                      fontSize: '13px',
                      color: 'var(--forest)',
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Exterior */}
          {tab === 'exterior' && (
            <div className="fade-in">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--forest)', marginBottom: 24 }}>
                Exterior Features
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                {[
                  ['Stories', listing.exterior.stories],
                  ['Garage Spaces', listing.exterior.garageSpaces],
                  ['Water Source', listing.exterior.waterSource],
                  ['Lot Features', listing.exterior.lotFeatures],
                  ['Parking', listing.exterior.parking],
                  ['Heat Type', listing.exterior.heatType],
                  ['Air Conditioning', listing.exterior.ac],
                  ['Sewer', listing.exterior.sewer],
                  ['Substructure', listing.exterior.substructure],
                ].map(([label, value]) => (
                  <div key={label} style={{ background: 'var(--white)', padding: '14px 18px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: '14px', color: 'var(--text)' }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Interior */}
          {tab === 'interior' && (
            <div className="fade-in">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--forest)', marginBottom: 24 }}>
                Interior Features
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 28 }}>
                {[
                  ['Total Rooms', listing.interior.totalRooms],
                  ['Bedrooms', listing.interior.bedrooms],
                  ['Full Bathrooms', listing.interior.fullBaths],
                  ['Half Bathrooms', listing.interior.halfBaths],
                  ['Laundry', listing.interior.laundry],
                  ['Flooring', listing.interior.flooring],
                  ['Fireplace', listing.interior.fireplace],
                  ['Appliances', listing.interior.appliances],
                ].map(([label, value]) => (
                  <div key={label} style={{ background: 'var(--white)', padding: '14px 18px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: '14px', color: 'var(--text)' }}>{value}</div>
                  </div>
                ))}
              </div>

              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 500, color: 'var(--forest)', marginBottom: 12 }}>
                Additional Features
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {listing.features.map((f) => (
                  <span key={f} style={{ padding: '6px 14px', background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 20, fontSize: '13px' }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Schools */}
          {tab === 'schools' && (
            <div className="fade-in">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--forest)', marginBottom: 24 }}>
                Nearby Schools
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { level: 'High School', icon: '🎓', name: listing.schools.high },
                  { level: 'Middle School', icon: '📚', name: listing.schools.middle },
                  { level: 'Elementary School', icon: '✏️', name: listing.schools.elementary },
                ].map((s) => (
                  <div
                    key={s.level}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 18,
                      padding: '16px 20px',
                      background: 'var(--white)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <span style={{ fontSize: '28px' }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{s.level}</div>
                      <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--forest)' }}>{s.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Mortgage */}
          {tab === 'mortgage' && (
            <div className="fade-in">
              <MortgageCalc initialPrice={listing.price} initialDown={listing.downPaymentPct} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
