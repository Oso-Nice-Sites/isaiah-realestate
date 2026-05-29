import { useSite } from '../context/SiteContext';

const categoryColors = {
  'Market Update': { bg: '#d4edda', text: '#1b5e2d' },
  "Buyer's Guide":  { bg: '#dbeafe', text: '#1e3a8a' },
  'Research':       { bg: '#ede9fe', text: '#4c1d95' },
  "Seller's Guide": { bg: '#fef3c7', text: '#78350f' },
};

export default function Resources() {
  const { articles } = useSite();
  return (
    <section className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <p className="section-subtitle">Knowledge Center</p>
        <h2 className="section-title">Resources &amp; Market Insights</h2>
        <div className="gold-divider" />
        <p style={{ maxWidth: 560, color: 'var(--text-muted)', marginBottom: 52, lineHeight: 1.8 }}>
          Timely perspectives on the Middle Tennessee market — written plainly, sourced transparently.
          These are summaries with links to the full sources; no regurgitation, just context that helps you make better decisions.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {articles.map((article) => {
            const cat = categoryColors[article.category] || { bg: '#f3f4f6', text: '#374151' };
            return (
              <div
                key={article.id}
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  padding: '28px 28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      background: cat.bg,
                      color: cat.text,
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      borderRadius: 4,
                    }}
                  >
                    {article.category}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>{article.readTime}</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 500,
                    color: 'var(--forest)',
                    lineHeight: 1.35,
                  }}
                >
                  {article.title}
                </h3>

                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.75, flexGrow: 1 }}>
                  {article.summary}
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 14,
                    borderTop: '1px solid var(--cream-dark)',
                    fontSize: '12px',
                    color: 'var(--text-light)',
                  }}
                >
                  <span>{article.date}</span>
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--forest)',
                      fontWeight: 500,
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    Source: {article.source.split(' ').slice(0, 3).join(' ')}… ↗
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
