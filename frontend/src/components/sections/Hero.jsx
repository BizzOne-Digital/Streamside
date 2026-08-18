import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background */}
      <div className={styles.bg}>
        <img
          src="/hero.png"
          alt="Vancouver Island stream and mountains"
          className={styles.bgImg}
        />
        <div className={styles.overlay} />
        {/* Gradient wave at bottom */}
        <div className={styles.waveBottom}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.textBlock}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Serving Vancouver Island & BC
          </div>
          <h1 className={styles.headline}>
            Focus on Your Business.
            <br />
            <span className={styles.green}>I'll Take Care of the Books.</span>
          </h1>
          <p className={styles.sub}>
            Reliable, practical bookkeeping for contractors, trades,
            and service-based businesses on Vancouver Island.
            <br />20+ years of experience. Clear, organized, dependable.
          </p>
          <div className={styles.actions}>
            <Link to="/contact" className={`btn btn-primary btn-lg ${styles.ctaBtn}`}>
              <FiCalendar size={18} />
              Book a Free Consultation
            </Link>
            <Link to="/services" className={`btn btn-outline btn-lg`}>
              Explore Services <FiArrowRight size={16} />
            </Link>
          </div>

          {/* Trust signals */}
          <div className={styles.trust}>
            {['20+ Years Experience', 'QuickBooks Certified', 'Vancouver Island Local', 'No Judgment — Ever'].map(t => (
              <div key={t} className={styles.trustItem}>
                <span className={styles.checkIcon}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Stats card */}
        <div className={styles.statsCard}>
          <div className={styles.statsHeader}>
            <span>Grow with the Flow</span>
          </div>
          {[
            { num: '20+', label: 'Years of Experience' },
            { num: '3', label: 'Service Plans' },
            { num: '100%', label: 'Remote Capable' },
            { num: '$0', label: 'Obligation on First Call' },
          ].map(({ num, label }) => (
            <div key={label} className={styles.stat}>
              <div className={styles.statNum}>{num}</div>
              <div className={styles.statLabel}>{label}</div>
            </div>
          ))}
          <Link to="/contact" className={`btn btn-primary ${styles.statCta}`}>
            Start with a Free Call →
          </Link>
        </div>
      </div>
    </section>
  );
}
