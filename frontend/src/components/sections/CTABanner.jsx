import { Link } from 'react-router-dom';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import styles from './CTABanner.module.css';

export default function CTABanner({ title, subtitle, cta1, cta2 }) {
  return (
    <section className={styles.section}>
      <div className={styles.bg} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.icon}><FiCalendar size={28} /></div>
        <div className={styles.text}>
          <h2 className={styles.title}>{title || 'Ready for Clearer Books and Better Decisions?'}</h2>
          <p className={styles.sub}>{subtitle || 'Book your free Bookkeeping Fit Call today. No obligation. Just a friendly chat.'}</p>
        </div>
        <div className={styles.actions}>
          <Link to="/contact" className={`btn btn-primary btn-lg ${styles.ctaBtn}`}>
            <FiCalendar size={18} /> {cta1 || 'Book Your Free Consultation'}
          </Link>
          {cta2 && (
            <Link to="/services" className={`btn btn-outline btn-lg`}>
              {cta2} <FiArrowRight size={16}/>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
