import { Link } from 'react-router-dom';
import { FiDownload, FiBookOpen, FiTool, FiCalendar, FiArrowRight } from 'react-icons/fi';
import styles from './ResourcesPreview.module.css';

const categories = [
  { icon: <FiDownload size={22}/>, title: 'Free Guides & Downloads', desc: 'Templates, checklists & quick guides.', slug: 'guides' },
  { icon: <FiBookOpen size={22}/>, title: 'Bookkeeping Basics for Business Owners', desc: 'Simple tips to understand your numbers.', slug: 'bookkeeping-basics' },
  { icon: <FiTool size={22}/>, title: 'Contractor & Trades Resources', desc: 'Industry-specific tools and insights.', slug: 'contractor-trades' },
  { icon: <FiCalendar size={22}/>, title: 'Important Dates & Government Resources', desc: 'Stay on top of deadlines and requirements.', slug: 'important-dates' },
];

export default function ResourcesPreview() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className="eyebrow">Resources & Guides</span>
            <h2 className="section-title">Practical Resources to Help You Succeed</h2>
          </div>
          {/* Featured guide */}
          <div className={styles.featured}>
            <div className={styles.featuredBadge}>FEATURED GUIDE</div>
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80" alt="Guide" className={styles.featuredImg} />
            <div className={styles.featuredText}>
              <h4>The Contractor's Guide to Stress-Free Bookkeeping</h4>
              <p>Practical steps to save time, reduce stress, and grow your business.</p>
              <Link to="/resources" className={`btn btn-primary btn-sm`} style={{ marginTop: 12 }}>Download the Guide</Link>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {categories.map(c => (
            <Link key={c.slug} to={`/resources?category=${c.slug}`} className={styles.card}>
              <div className={styles.cardIcon}>{c.icon}</div>
              <div>
                <h4 className={styles.cardTitle}>{c.title}</h4>
                <p className={styles.cardDesc}>{c.desc}</p>
                <span className={styles.cardLink}>View Resources <FiArrowRight size={12}/></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
