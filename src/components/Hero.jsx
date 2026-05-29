import { useSite } from '../context/SiteContext';

export default function Hero({ setPage, onSearch }) {
  const { agent } = useSite();
  return (
    <section
      style={{
        position: 'relative',
        background: 'var(--forest)',
        color: 'var(--white)',
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 70% 30%, rgba(201,165,80,0.12) 0%, transparent 60%),
            radial-gradient(circle at 20% 80%, rgba(44,74,49,0.4) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Background image hint */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '45%',
          background: `url(https://picsum.photos/seed/hero-house/1200/900) center/cover no-repeat`,
          opacity: 0.18,
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 40%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 40%, black 100%)',
        }}
      />

      {/* Decorative line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 4,
          height: 180,
          background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 680 }}>
          <p
            className="fade-up"
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 24,
            }}
          >
            Middle Tennessee's Trusted REALTOR®
          </p>

          <h1
            className="fade-up delay-1"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: 12,
            }}
          >
            Your Home.
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Your Story.</em>
            <br />
            Handled&nbsp;Right.
          </h1>

          <p
            className="fade-up delay-2"
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 480,
              marginTop: 24,
              marginBottom: 48,
              lineHeight: 1.7,
            }}
          >
            Serving Brentwood, Franklin, Nashville, and surrounding communities
            with candid guidance, genuine care, and results that speak for themselves.
          </p>

          <div
            className="fade-up delay-3"
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
          >
            <button
              className="btn btn-gold"
              onClick={() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Listings
            </button>
            <button
              className="btn btn-outline-white"
              onClick={() => setPage('contact')}
            >
              Start a Conversation
            </button>
          </div>

          {/* Stats strip */}
          <div
            className="fade-up delay-4"
            style={{
              display: 'flex',
              gap: 48,
              marginTop: 72,
              paddingTop: 32,
              borderTop: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {(agent.stats || []).map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 500,
                    color: 'var(--white)',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: 6,
                    textTransform: 'uppercase',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
