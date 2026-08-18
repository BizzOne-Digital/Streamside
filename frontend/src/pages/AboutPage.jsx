import { Link } from 'react-router-dom';
import { FiCheckCircle, FiTarget, FiTrendingUp, FiHeart } from 'react-icons/fi';
import CTABanner from '../components/sections/CTABanner';
import styles from './AboutPage.module.css';

const services = ['Monthly bookkeeping and reconciliations','Accounts payable and accounts receivable','Payroll administration','GST and PST tracking and filing','WorkSafeBC and Employer Health Tax reporting','T4 and T4A preparation','Monthly financial reports','QuickBooks Online setup and support','Catch-up and clean-up bookkeeping','Year-end preparation and accountant coordination'];

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <div className={styles.pageHero}>
        <div className="container">
          <span className="eyebrow" style={{ color: '#9AE6B4' }}>About Us</span>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: 16 }}>About Streamside Bookkeeping</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 580, fontSize: '1.1rem', lineHeight: 1.7 }}>
            Helping Small Business Owners Feel More in Control of Their Books
          </p>
        </div>
        <div className={styles.wave}><svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white"/></svg></div>
      </div>

      {/* Intro */}
      <section className="section">
        <div className="container">
          <div className={styles.intro}>
            <div>
              <h2 className="section-title">What We Do</h2>
              <p style={{ color: 'var(--grey-text)', lineHeight: 1.8, marginBottom: 20 }}>
                Running a small business means wearing a lot of hats. Between serving customers, managing employees, paying bills and keeping everything moving, bookkeeping can easily become one more thing competing for your time.
              </p>
              <p style={{ color: 'var(--grey-text)', lineHeight: 1.8, marginBottom: 28 }}>
                That's where Streamside Bookkeeping comes in. We provide dependable, practical bookkeeping support for small businesses that want their books organized, their financial information current and the confidence of knowing someone experienced is keeping an eye on the details.
              </p>
              <ul className={styles.servicesList}>
                {services.map(s => (
                  <li key={s}><FiCheckCircle size={16} style={{ color: 'var(--green)', flexShrink: 0 }} /> {s}</li>
                ))}
              </ul>
            </div>
            <div className={styles.imgCol}>
              <img src="/about.png" alt="Bookkeeping" className={styles.img} />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.missionSection}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={styles.missionCard}>
              <div className={styles.missionIcon}><FiTarget /></div>
              <h3>Our Mission</h3>
              <p>To give small business owners clarity, confidence and more time to focus on the work that matters most to them. Bookkeeping should make running your business easier—not create more stress.</p>
            </div>
            <div className={styles.missionCard}>
              <div className={styles.missionIcon}><FiTrendingUp /></div>
              <h3>Why "Streamside"?</h3>
              <p>A stream keeps moving forward. Sometimes calm. Sometimes rough. My job is to help keep the financial side of your business moving—organized, current and flowing in the right direction.</p>
            </div>
            <div className={styles.missionCard}>
              <div className={styles.missionIcon}><FiHeart /></div>
              <h3>Our Promise</h3>
              <p>Your books are being looked after. You know where your business stands. You don't have to figure everything out alone. No judgment — wherever your books are right now.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className={styles.story}>
            <div>
              <span className="eyebrow">Our Story</span>
              <h2 className="section-title">20+ Years in the Making</h2>
              <p style={{ color: 'var(--grey-text)', lineHeight: 1.85, marginBottom: 16 }}>
                Streamside Bookkeeping grew from more than 20 years of hands-on bookkeeping and small-business experience. For two decades, Wendy worked as an Office Manager and Bookkeeper for a busy Vancouver Island company.
              </p>
              <p style={{ color: 'var(--grey-text)', lineHeight: 1.85, marginBottom: 16 }}>
                Like many people working in small businesses, the job went far beyond one title — full-cycle bookkeeping, payroll, accounts payable and receivable, government remittances, financial reporting, year-end preparation, scheduling, and many of the unexpected problems that come with keeping a business running every day.
              </p>
              <p style={{ color: 'var(--grey-text)', lineHeight: 1.85, marginBottom: 28 }}>
                That experience taught something important: small business owners don't just need someone who knows how to enter transactions. They need someone who understands what it's like when there are customers waiting, employees asking questions, bills that need paying, paperwork piling up and never quite enough hours in the day.
              </p>
              <Link to="/contact" className="btn btn-primary">Book a Free Consultation</Link>
            </div>
            <div>
              <img src="/story.png" alt="Professional bookkeeper" className={styles.img} />
              <div className={styles.quoteBox}>
                <p className={styles.quoteText}>"I understand what it's like because I've lived it."</p>
                <p className={styles.quoteAuthor}>— Wendy Stevens, Streamside Bookkeeping</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner title="Ready to Hand Off Your Bookkeeping?" subtitle="Start with a free Bookkeeping Fit Call — no pressure, no obligation." cta1="Book Your Free Call" />
    </>
  );
}
