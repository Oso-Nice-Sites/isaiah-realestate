import { useSite } from '../context/SiteContext';

export default function Footer({ setPage }) {
  const { agent } = useSite();
  return (
    <footer
      style={{
        background: 'var(--forest)',
        color: 'var(--white)',
        padding: '60px 0 28px',
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 52 }}>
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                marginBottom: 4,
              }}
            >
              Premier Properties
            </div>
            <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
              Real Estate · Middle Tennessee
            </div>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 300 }}>
              Dedicated to helping families buy, sell, and move in the greater Nashville metro with honesty, hustle, and heart.
            </p>
            <p style={{ marginTop: 16, fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
              REALTOR® License: {agent.realtorNumber}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
              Navigate
            </div>
            {[
              ['Home', 'home'],
              ['Listings', 'home'],
              ['Mortgage Calc', 'mortgage'],
              ['Contact', 'contact'],
            ].map(([label, page]) => (
              <button
                key={label}
                onClick={() => setPage(page)}
                style={{ display: 'block', background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '14px', padding: '5px 0', cursor: 'pointer', textAlign: 'left', transition: 'color 0.15s' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--white)'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
              >
                {label}
              </button>
            ))}
          </div>

          {/* About links */}
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
              About
            </div>
            {[
              ['Personal Bio', 'about-bio'],
              ['Meet the Team', 'about-team'],
              ['Resources', 'home'],
            ].map(([label, page]) => (
              <button
                key={label}
                onClick={() => setPage(page)}
                style={{ display: 'block', background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '14px', padding: '5px 0', cursor: 'pointer', textAlign: 'left', transition: 'color 0.15s' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--white)'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Contact info */}
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
              Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: agent.phone, href: `tel:${agent.phone}` },
                { label: agent.email, href: `mailto:${agent.email}` },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13.5px', transition: 'color 0.15s' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--white)'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} Premier Properties. All rights reserved. Content for illustrative purposes only.
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
            Site prototype — replace placeholder text with real agent information before launch.
          </p>
        </div>
      </div>
    </footer>
  );
}
