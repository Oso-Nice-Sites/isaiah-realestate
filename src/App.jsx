import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Listings from './components/Listings';
import ListingModal from './components/ListingModal';
import Engagement from './components/Engagement';
import Resources from './components/Resources';
import Contact from './components/Contact';
import Footer from './components/Footer';
import About from './components/About';
import MortgageCalc from './components/MortgageCalc';
import { useSite } from './context/SiteContext';

export default function App() {
  const { loading } = useSite();
  const [page, setPage] = useState('home');
  const [selectedListing, setSelectedListing] = useState(null);
  const [aboutSection, setAboutSection] = useState('bio');

  // Parse about sub-pages
  const navTo = (p) => {
    if (p === 'about-bio') { setPage('about'); setAboutSection('bio'); }
    else if (p === 'about-team') { setPage('about'); setAboutSection('team'); }
    else setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedListing) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedListing]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'var(--forest)',
        gap: 16,
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          fontWeight: 300,
          color: 'var(--white)',
          letterSpacing: '-0.01em',
        }}>
          Premier Properties
        </div>
        <div style={{ width: 48, height: 2, background: 'var(--gold)', opacity: 0.6 }} />
      </div>
    );
  }

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <>
            <Hero setPage={navTo} />
            <Listings onSelectListing={setSelectedListing} />
            <Engagement />
            <Resources />
            <Contact />
          </>
        );
      case 'about':
        return <About section={aboutSection} setSection={setAboutSection} />;
      case 'mortgage':
        return (
          <section className="section">
            <div className="container">
              <MortgageCalc standalone initialPrice={650000} initialDown={20} />
            </div>
          </section>
        );
      case 'contact':
        return <Contact standalone />;
      default:
        return null;
    }
  };

  return (
    <>
      <Nav page={page} setPage={navTo} />
      <main>{renderPage()}</main>
      <Footer setPage={navTo} />

      {selectedListing && (
        <ListingModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </>
  );
}
