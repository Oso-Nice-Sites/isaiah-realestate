import { useState } from 'react';
import { useSite } from '../context/SiteContext';

const intentOptions = [
  {
    key: 'buy',
    label: 'Buy',
    icon: '🏡',
    desc: "Ready to find your next home or investment property. I'll help you navigate inventory, pricing, and the offer process.",
  },
  {
    key: 'sell',
    label: 'Sell',
    icon: '📋',
    desc: "Thinking about listing? I'll walk you through current market conditions, pricing strategy, and how to maximize your net.",
  },
  {
    key: 'move',
    label: 'Move',
    icon: '📦',
    desc: "Relocating to or within Middle Tennessee. Let's make sure your transition is smooth, informed, and well-timed.",
  },
];

export default function Engagement() {
  const { agent } = useSite();
  const [intent, setIntent] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    contactMethod: 'email',
    timeline: '', motivation: '',
    preApproval: '', priceMin: '', priceMax: '',
    preferences: '', nonNegotiables: '', niceToHaves: '',
    newsletter: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setFormData((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to backend / CRM
    setSubmitted(true);
  };

  return (
    <>
      {/* Intent section */}
      <section
        style={{
          background: 'var(--forest)',
          color: 'var(--white)',
          padding: '80px 0',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
            Where Are You Headed?
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              marginBottom: 48,
            }}
          >
            What are you interested in?
          </h2>

          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            {intentOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setIntent(intent === opt.key ? null : opt.key)}
                style={{
                  padding: '28px 40px',
                  background: intent === opt.key ? 'var(--gold)' : 'rgba(255,255,255,0.06)',
                  border: `1.5px solid ${intent === opt.key ? 'var(--gold)' : 'rgba(255,255,255,0.2)'}`,
                  borderRadius: 'var(--radius-lg)',
                  color: intent === opt.key ? 'var(--forest)' : 'var(--white)',
                  cursor: 'pointer',
                  minWidth: 160,
                  transition: 'all 0.25s ease',
                  transform: intent === opt.key ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>{opt.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.01em' }}>
                  {opt.label}
                </div>
              </button>
            ))}
          </div>

          {intent && (
            <p
              className="fade-in"
              style={{
                maxWidth: 520,
                margin: '0 auto',
                color: 'rgba(255,255,255,0.72)',
                fontSize: '15px',
                lineHeight: 1.7,
              }}
            >
              {intentOptions.find((o) => o.key === intent)?.desc}
            </p>
          )}
        </div>
      </section>

      {/* VSL Placeholder */}
      <section style={{ background: 'var(--cream-dark)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-subtitle">Coming Soon</p>
          <h2 className="section-title" style={{ marginBottom: 12 }}>A Message From {agent.name}</h2>
          <div className="gold-divider" style={{ margin: '20px auto 32px' }} />

          <div
            style={{
              maxWidth: 720,
              margin: '0 auto',
              background: 'var(--forest)',
              borderRadius: 'var(--radius-lg)',
              aspectRatio: '16/9',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--white)',
              gap: 16,
              border: '2px dashed rgba(201,165,80,0.4)',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'rgba(201,165,80,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                border: '1.5px solid var(--gold)',
              }}
            >
              ▶
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 300 }}>
              Video Introduction — Coming Soon
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', maxWidth: 360, lineHeight: 1.6 }}>
              This section is reserved for a personal video message. Swap in your VSL embed here when it's ready.
            </p>
          </div>
        </div>
      </section>

      {/* Homebuyer Profile Form */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            {/* Left */}
            <div>
              <p className="section-subtitle">Tell Me About You</p>
              <h2 className="section-title">Homebuyer Profile</h2>
              <div className="gold-divider" />
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>
                The more I understand about what you're looking for, the better I can serve you.
                This takes about 3 minutes and helps me hit the ground running on your behalf.
              </p>
              <div
                style={{
                  padding: '24px',
                  background: 'var(--cream)',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: '3px solid var(--gold)',
                }}
              >
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  "I review every profile personally. You won't be handed off to a junior agent or lost in a CRM.
                  This is how we start the conversation."
                </p>
                <p style={{ marginTop: 12, fontSize: '12px', color: 'var(--gold)', fontWeight: 600 }}>
                  — {agent.name}
                </p>
              </div>
            </div>

            {/* Right: Form */}
            {submitted ? (
              <div
                className="fade-in"
                style={{
                  textAlign: 'center',
                  padding: '60px 40px',
                  background: 'var(--cream)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--forest)', marginBottom: 12 }}>
                  Profile Received
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  Thank you — I'll be in touch within one business day to discuss your search.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input required type="text" placeholder="Jane Smith" value={formData.name} onChange={(e) => update('name', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input required type="email" placeholder="jane@example.com" value={formData.email} onChange={(e) => update('email', e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" placeholder="(615) 000-0000" value={formData.phone} onChange={(e) => update('phone', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Preferred Contact</label>
                    <select value={formData.contactMethod} onChange={(e) => update('contactMethod', e.target.value)}>
                      <option value="email">Email</option>
                      <option value="text">Text</option>
                      <option value="call">Phone Call</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label>Buying Timeline</label>
                    <select value={formData.timeline} onChange={(e) => update('timeline', e.target.value)}>
                      <option value="">Select...</option>
                      <option>ASAP — I'm ready now</option>
                      <option>1–3 months</option>
                      <option>3–6 months</option>
                      <option>6–12 months</option>
                      <option>Just exploring</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Pre-Approval Status</label>
                    <select value={formData.preApproval} onChange={(e) => update('preApproval', e.target.value)}>
                      <option value="">Select...</option>
                      <option>Fully pre-approved</option>
                      <option>Pre-qualified only</option>
                      <option>Not yet started</option>
                      <option>Cash buyer</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label>Min Budget ($)</label>
                    <input type="number" placeholder="300,000" step="10000" value={formData.priceMin} onChange={(e) => update('priceMin', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Max Budget ($)</label>
                    <input type="number" placeholder="600,000" step="10000" value={formData.priceMax} onChange={(e) => update('priceMax', e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label>What's Motivating Your Move?</label>
                  <textarea rows={2} placeholder="Growing family, job change, downsizing, investment..." value={formData.motivation} onChange={(e) => update('motivation', e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Property Preferences</label>
                  <textarea rows={2} placeholder="Location areas, home style, must-have features, school districts..." value={formData.preferences} onChange={(e) => update('preferences', e.target.value)} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label>Non-Negotiables</label>
                    <textarea rows={2} placeholder="Things you absolutely can't compromise on..." value={formData.nonNegotiables} onChange={(e) => update('nonNegotiables', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Nice-to-Haves</label>
                    <textarea rows={2} placeholder="Wishlist items — helpful but not dealbreakers..." value={formData.niceToHaves} onChange={(e) => update('niceToHaves', e.target.value)} />
                  </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '13px', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={(e) => update('newsletter', e.target.checked)}
                    style={{ accentColor: 'var(--forest)', width: 16, height: 16 }}
                  />
                  Subscribe to market updates &amp; listing alerts
                </label>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
                  Submit My Profile
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
