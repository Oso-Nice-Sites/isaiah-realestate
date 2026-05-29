import { useState, useRef, useEffect } from 'react';
import { useSite } from '../context/SiteContext';

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 500,
    background: 'var(--white)',
    borderBottom: '1px solid var(--border)',
    height: 72,
    display: 'flex',
    alignItems: 'center',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 32px',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    cursor: 'pointer',
  },
  logoMark: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.55rem',
    fontWeight: 500,
    letterSpacing: '-0.01em',
    color: 'var(--forest)',
    lineHeight: 1,
  },
  logoSub: {
    fontSize: '9px',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    fontWeight: 600,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  menuBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 18px',
    background: 'transparent',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--text)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  dropdown: {
    position: 'absolute',
    top: 72,
    right: 32,
    background: 'var(--white)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-lg)',
    minWidth: 260,
    overflow: 'hidden',
    animation: 'fadeUp 0.2s ease',
  },
  dropGroup: {
    padding: '8px 0',
    borderBottom: '1px solid var(--cream-dark)',
  },
  dropGroupLabel: {
    padding: '6px 20px 4px',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--text-light)',
  },
  dropItem: {
    display: 'block',
    width: '100%',
    padding: '10px 20px',
    background: 'transparent',
    border: 'none',
    textAlign: 'left',
    fontSize: '14px',
    color: 'var(--text)',
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
  dropSubItem: {
    display: 'block',
    width: '100%',
    padding: '8px 28px',
    background: 'transparent',
    border: 'none',
    textAlign: 'left',
    fontSize: '13px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
  connectBtn: {
    padding: '10px 20px',
    background: 'var(--forest)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.2s',
    marginLeft: 8,
  },
};

export default function Nav({ page, setPage }) {
  const { agent } = useSite();
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navTo = (p) => { setPage(p); setOpen(false); };

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <div style={styles.logo} onClick={() => navTo('home')}>
          <span style={styles.logoMark}>Premier Properties</span>
          <span style={styles.logoSub}>Real Estate · Middle Tennessee</span>
        </div>

        <div style={styles.right} ref={dropRef}>
          <button
            style={styles.menuBtn}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-haspopup="true"
          >
            <span>{open ? '✕' : '≡'}</span>
            Menu
          </button>

          <button style={styles.connectBtn} onClick={() => navTo('contact')}>
            Let's Connect
          </button>

          {open && (
            <div style={styles.dropdown}>
              <div style={styles.dropGroup}>
                <button
                  style={styles.dropItem}
                  onClick={() => navTo('home')}
                  onMouseEnter={e => e.target.style.background = 'var(--cream)'}
                  onMouseLeave={e => e.target.style.background = 'transparent'}
                >
                  Home
                </button>
              </div>

              <div style={styles.dropGroup}>
                <span style={styles.dropGroupLabel}>About</span>
                <button
                  style={styles.dropSubItem}
                  onClick={() => navTo('about-bio')}
                  onMouseEnter={e => e.target.style.background = 'var(--cream)'}
                  onMouseLeave={e => e.target.style.background = 'transparent'}
                >
                  {agent.name} — Personal Bio
                </button>
                <button
                  style={styles.dropSubItem}
                  onClick={() => navTo('about-team')}
                  onMouseEnter={e => e.target.style.background = 'var(--cream)'}
                  onMouseLeave={e => e.target.style.background = 'transparent'}
                >
                  Meet the Team
                </button>
              </div>

              <div style={styles.dropGroup}>
                <button
                  style={styles.dropItem}
                  onClick={() => navTo('mortgage')}
                  onMouseEnter={e => e.target.style.background = 'var(--cream)'}
                  onMouseLeave={e => e.target.style.background = 'transparent'}
                >
                  Mortgage Calculator
                </button>
              </div>

              <div style={{ ...styles.dropGroup, borderBottom: 'none' }}>
                <button
                  style={styles.dropItem}
                  onClick={() => navTo('contact')}
                  onMouseEnter={e => e.target.style.background = 'var(--cream)'}
                  onMouseLeave={e => e.target.style.background = 'transparent'}
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
