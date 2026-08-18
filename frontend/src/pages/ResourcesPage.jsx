import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiDownload, FiBookOpen, FiTool, FiCalendar, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { resourceAPI } from '../utils/api';
import CTABanner from '../components/sections/CTABanner';
import styles from './ResourcesPage.module.css';

const categories = [
  { id: 'guides', label: 'Free Guides & Downloads', icon: <FiDownload size={20}/> },
  { id: 'bookkeeping-basics', label: 'Bookkeeping Basics for Business Owners', icon: <FiBookOpen size={20}/> },
  { id: 'contractor-trades', label: 'Contractor & Trades Resources', icon: <FiTool size={20}/> },
  { id: 'important-dates', label: 'Important Dates & Government Resources', icon: <FiCalendar size={20}/> },
];

const helpLinks = [
  { label: 'Canada Revenue Agency (CRA)', url: 'https://www.canada.ca/en/revenue-agency.html', desc: 'Tax forms, GST/HST, payroll deductions' },
  { label: 'BC Government Business Resources', url: 'https://www2.gov.bc.ca/gov/content/employment-business/business', desc: 'PST, WorkSafeBC, employer obligations' },
  { label: 'WorkSafeBC', url: 'https://www.worksafebc.com', desc: 'Employer registration and reporting' },
  { label: 'QuickBooks Online', url: 'https://quickbooks.intuit.com/ca/', desc: 'Cloud-based bookkeeping software' },
];

export default function ResourcesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    const params = activeCategory !== 'all' ? { category: activeCategory } : {};
    resourceAPI.getPublic(params)
      .then(r => setResources(r.data.resources || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleDownload = async (resource) => {
    try {
      const r = await resourceAPI.trackDownload(resource._id);
      window.open(r.data.fileUrl || resource.fileUrl || resource.externalLink, '_blank');
    } catch { window.open(resource.fileUrl || resource.externalLink, '_blank'); }
  };

  return (
    <>
      <div className={styles.pageHero}>
        <div className="container">
          <span className="eyebrow" style={{ color: '#9AE6B4' }}>Resources</span>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: 16 }}>Resources for Small Business Owners</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 600, fontSize: '1.05rem', lineHeight: 1.7 }}>
            Practical bookkeeping guides, checklists and tips to help you understand your numbers, stay organized and know when something needs your attention—without having to become your own bookkeeper.
          </p>
        </div>
        <div className={styles.wave}><svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white"/></svg></div>
      </div>

      <section className="section">
        <div className="container">
          {/* Category tabs */}
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${activeCategory === 'all' ? styles.activeTab : ''}`} onClick={() => setSearchParams({})}>All Resources</button>
            {categories.map(c => (
              <button key={c.id} className={`${styles.tab} ${activeCategory === c.id ? styles.activeTab : ''}`} onClick={() => setSearchParams({ category: c.id })}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>

          {/* Featured guide */}
          <div className={styles.featuredGuide}>
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" alt="Featured guide" className={styles.featuredImg} />
            <div className={styles.featuredContent}>
              <span className={styles.featuredBadge}>Featured Guide</span>
              <h2 className={styles.featuredTitle}>The Contractor's Guide to Stress-Free Bookkeeping</h2>
              <p className={styles.featuredDesc}>Practical steps to save time, reduce stress, and grow your business. Covers what records to keep, how to manage GST, and when to call in a bookkeeper.</p>
              <Link to="/contact" className="btn btn-primary btn-lg">
                <FiDownload size={18}/> Download Free Guide →
              </Link>
            </div>
          </div>

          {/* Resources grid */}
          {loading ? (
            <div className={styles.loading}>Loading resources...</div>
          ) : resources.length > 0 ? (
            <div className={styles.grid}>
              {resources.map(r => (
                <div key={r._id} className={styles.card}>
                  {r.thumbnailUrl && <img src={r.thumbnailUrl} alt={r.title} className={styles.cardImg} />}
                  <div className={styles.cardBody}>
                    <span className={styles.cardType}>{r.type}</span>
                    <h3 className={styles.cardTitle}>{r.title}</h3>
                    <p className={styles.cardDesc}>{r.description}</p>
                    <button onClick={() => handleDownload(r)} className="btn btn-primary btn-sm" style={{ marginTop: 'auto' }}>
                      {r.type === 'download' ? <><FiDownload size={14}/> Download</> : r.type === 'link' ? <><FiExternalLink size={14}/> Visit</> : <><FiArrowRight size={14}/> Read More</>}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>Resources are being added. Check back soon — or <Link to="/contact" style={{ color: 'var(--green)' }}>contact us</Link> with questions.</p>
            </div>
          )}

          {/* Category cards */}
          <div className={styles.catSection}>
            <h2 className={styles.catTitle}>Browse by Category</h2>
            <div className={styles.catGrid}>
              {categories.map(c => (
                <button key={c.id} onClick={() => setSearchParams({ category: c.id })} className={`${styles.catCard} ${activeCategory === c.id ? styles.catActive : ''}`}>
                  <div className={styles.catIcon}>{c.icon}</div>
                  <div className={styles.catLabel}>{c.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Helpful links */}
          <div className={styles.linksSection}>
            <h3 className={styles.linksTitle}>Helpful Links</h3>
            <div className={styles.linksGrid}>
              {helpLinks.map(l => (
                <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className={styles.linkCard}>
                  <FiExternalLink size={16} className={styles.linkIcon} />
                  <div>
                    <div className={styles.linkLabel}>{l.label}</div>
                    <div className={styles.linkDesc}>{l.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className={styles.bottomCta}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3>Your bookkeeping shouldn't be another job you have to manage.</h3>
          <p>Streamside Bookkeeping provides ongoing bookkeeping for contractors, trades and small businesses so your records stay organized and up to date while you concentrate on running your business.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">Book a Free Consultation</Link>
          </div>
        </div>
      </div>
    </>
  );
}
