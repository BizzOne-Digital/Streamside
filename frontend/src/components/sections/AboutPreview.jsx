import { Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import styles from './AboutPreview.module.css';

const points = [
  'Experienced with owner-operated businesses',
  'Cloud-based systems for real-time clarity',
  'Personal service with practical advice',
  'No judgment — wherever your books are now',
];

export default function AboutPreview() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Image side */}
          <div className={styles.imgWrap}>
            <img
              src="./about.png"
              alt="Bookkeeping setup with laptop and coffee"
              className={styles.img}
            />
            <div className={styles.badge}>
              <div className={styles.badgeNum}>20+</div>
              <div className={styles.badgeText}>Years of Bookkeeping Experience</div>
            </div>
          </div>

          {/* Text side */}
          <div className={styles.text}>
            <span className="eyebrow">About Streamside Bookkeeping</span>
            <h2 className="section-title">Dependable. Practical. Local.</h2>
            <p style={{ color: 'var(--grey-text)', lineHeight: 1.8, marginBottom: 20 }}>
              We provide clear, organized bookkeeping so you can make confident decisions and keep more of what you earn.
            </p>
            <p style={{ color: 'var(--grey-text)', lineHeight: 1.8, marginBottom: 28 }}>
              With 20+ years of experience supporting contractors, trades, and service-based businesses on Vancouver Island, we bring the systems, insight, and support you need to grow.
            </p>
            <ul className={styles.points}>
              {points.map(p => (
                <li key={p} className={styles.point}>
                  <FiCheckCircle className={styles.check} size={18} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn btn-primary" style={{ marginTop: 32 }}>
              Our Story <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
