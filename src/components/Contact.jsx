import { useState } from 'react';
import { useSite } from '../context/SiteContext';

export default function Contact({ standalone = false }) {
  const { agent, reviews } = useSite();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', newsletter: false });
  const [submitted, setSubmitted] = useState(false);
  const update = (k, v) => setFormData((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Let's Connect */}
      <section className="section" style={{ background: standalone ? 'var(--cream)' : 'var(--forest)', color: standalone ? 'inherit' : 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            {/* Left */}
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
                Get in Touch
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  color: standalone ? 'var(--forest)' : 'var(--white)',
                  marginBottom: 12,
                }}
              >
                Let's Connect
              </h2>
              <div style={{ width: 48, height: 2, background: 'var(--gold)', margin: '20px 0 32px' }} />

              <p style={{ color: standalone ? 'var(--text-muted)' : 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 40 }}>
                Whether you have a single question or you're ready to start the process, my door is open.
                No pressure, no scripts — just a direct conversation about what you're trying to accomplish.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: '📞', label: 'Phone', value: agent.phone, href: `tel:${agent.phone}` },
                  { icon: '✉️', label: 'Email', value: agent.email, href: `mailto:${agent.email}` },
                  { icon: '📸', label: 'Instagram', value: agent.instagram, href: '#' },
                  { icon: '💼', label: 'LinkedIn', value: `linkedin.com/${agent.linkedin}`, href: '#' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      color: standalone ? 'var(--text)' : 'var(--white)',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ fontSize: '1.3rem', width: 36 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: standalone ? 'var(--text-muted)' : 'rgba(255,255,255,0.5)', marginBottom: 2 }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 500 }}>{item.value}</div>
                    </div>
                  </a>
                ))}

                <div style={{ paddingTop: 8, borderTop: `1px solid ${standalone ? 'var(--border)' : 'rgba(255,255,255,0.12)'}` }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: standalone ? 'var(--text-muted)' : 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
                    REALTOR® License
                  </div>
                  <div style={{ fontSize: '14px', color: standalone ? 'var(--text)' : 'var(--white)' }}>{agent.realtorNumber}</div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div
              style={{
                background: standalone ? 'var(--white)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${standalone ? 'var(--border)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '36px',
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 16 }}>✉️</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: standalone ? 'var(--forest)' : 'var(--white)', marginBottom: 10 }}>
                    Message Sent
                  </h3>
                  <p style={{ color: standalone ? 'var(--text-muted)' : 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                    I'll follow up within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: standalone ? 'var(--forest)' : 'var(--white)', marginBottom: 4 }}>
                    Send a Message
                  </h3>

                  <div className="form-group" style={{ '--label-color': standalone ? 'var(--text-muted)' : 'rgba(255,255,255,0.6)' }}>
                    <label style={{ color: standalone ? 'var(--text-muted)' : 'rgba(255,255,255,0.6)' }}>Your Name *</label>
                    <input required type="text" placeholder="Jane Smith" value={formData.name} onChange={(e) => update('name', e.target.value)} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div className="form-group">
                      <label style={{ color: standalone ? 'var(--text-muted)' : 'rgba(255,255,255,0.6)' }}>Email *</label>
                      <input required type="email" placeholder="jane@example.com" value={formData.email} onChange={(e) => update('email', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label style={{ color: standalone ? 'var(--text-muted)' : 'rgba(255,255,255,0.6)' }}>Phone</label>
                      <input type="tel" placeholder="(615) 000-0000" value={formData.phone} onChange={(e) => update('phone', e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ color: standalone ? 'var(--text-muted)' : 'rgba(255,255,255,0.6)' }}>Message</label>
                    <textarea rows={4} placeholder="What's on your mind?" value={formData.message} onChange={(e) => update('message', e.target.value)} />
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '13px', color: standalone ? 'var(--text-muted)' : 'rgba(255,255,255,0.55)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.newsletter} onChange={(e) => update('newsletter', e.target.checked)} style={{ accentColor: 'var(--gold)', width: 16, height: 16 }} />
                    Keep me updated with market news &amp; new listings
                  </label>

                  <button type="submit" className="btn btn-gold" style={{ alignSelf: 'flex-start', marginTop: 4 }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-sm" style={{ background: 'var(--cream-dark)' }}>
        <div className="container">
          <p className="section-subtitle" style={{ textAlign: 'center' }}>What Clients Say</p>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 48 }}>Client Reviews</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {reviews.map((r) => (
              <div
                key={r._id}
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ color: 'var(--gold)', fontSize: '1rem', letterSpacing: 2, marginBottom: 14 }}>
                  {'★'.repeat(r.rating)}
                </div>
                <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: 'var(--text)', marginBottom: 18, fontStyle: 'italic' }}>
                  "{r.text}"
                </p>
                <div style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--forest)' }}>{r.name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>{r.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
