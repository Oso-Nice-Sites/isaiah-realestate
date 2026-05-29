import { useSite } from '../context/SiteContext';

export default function About({ section = 'bio', setSection }) {
  const { agent } = useSite();
  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh' }}>
      {/* Sub-nav */}
      <div style={{ background: 'var(--cream-dark)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', gap: 4, paddingTop: 0, paddingBottom: 0 }}>
          {[
            { key: 'bio', label: `About ${agent.name}` },
            { key: 'team', label: 'Meet the Team' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSection(tab.key)}
              style={{
                padding: '16px 24px',
                background: 'none',
                border: 'none',
                borderBottom: section === tab.key ? '3px solid var(--forest)' : '3px solid transparent',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: section === tab.key ? 600 : 400,
                color: section === tab.key ? 'var(--forest)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'color 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bio */}
      {section === 'bio' && (
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
              {/* Agent photo */}
              <div>
                {agent.photoUrl ? (
                  <img
                    src={agent.photoUrl}
                    alt={agent.name}
                    style={{
                      width: '100%',
                      aspectRatio: '3/4',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-lg)',
                      marginBottom: 20,
                      display: 'block',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '3/4',
                      background: 'var(--forest)',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: '4rem',
                      marginBottom: 20,
                    }}
                  >
                    👤
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ padding: '12px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 2 }}>Phone</span>
                    {agent.phone}
                  </div>
                  <div style={{ padding: '12px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 2 }}>Email</span>
                    {agent.email}
                  </div>
                  <div style={{ padding: '12px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 2 }}>REALTOR® #</span>
                    {agent.realtorNumber}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="section-subtitle">About</p>
                <h1 className="section-title">{agent.name}</h1>
                <p style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {agent.title}
                </p>
                <div className="gold-divider" />
                {agent.bio.split('\n\n').map((para, i) => (
                  <p key={i} style={{ fontSize: '15.5px', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 20 }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      {section === 'team' && (
        <section className="section">
          <div className="container">
            <p className="section-subtitle">The People Behind the Work</p>
            <h1 className="section-title">Meet the Team</h1>
            <div className="gold-divider" />
            <p style={{ color: 'var(--text-muted)', maxWidth: 560, marginBottom: 52, lineHeight: 1.8 }}>
              Every transaction is a team effort. Here's who's in your corner.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}>
              {/* Lead agent card */}
              <TeamCard
                name={agent.name}
                role={agent.title}
                bio={agent.bio?.split('\n\n')[0] || ''}
                photoUrl={agent.photoUrl}
                lead
              />
              {agent.team.map((member) => (
                <TeamCard key={member.name} name={member.name} role={member.role} bio={member.bio} photoUrl={member.photoUrl} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function TeamCard({ name, role, bio, photoUrl, lead = false }) {
  return (
    <div
      style={{
        background: 'var(--white)',
        border: lead ? '2px solid var(--gold)' : '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {lead && (
        <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--gold)', color: 'var(--forest)', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Lead Agent
        </div>
      )}

      {/* Photo */}
      <div
        style={{
          height: 200,
          background: lead ? 'var(--forest)' : 'var(--cream-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          color: lead ? 'rgba(255,255,255,0.3)' : 'var(--text-light)',
          overflow: 'hidden',
        }}
      >
        {photoUrl ? (
          <img src={photoUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span>👤</span>
        )}
      </div>

      <div style={{ padding: '20px 22px 24px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 500, color: 'var(--forest)', marginBottom: 2 }}>
          {name}
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          {role}
        </p>
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{bio}</p>
      </div>
    </div>
  );
}
