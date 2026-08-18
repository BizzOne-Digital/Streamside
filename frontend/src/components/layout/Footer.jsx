import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiLinkedin, FiInstagram } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.wave}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#1F3A5F"/>
        </svg>
      </div>
      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand */}
            <div className={styles.brand}>
              <div className={styles.logo}>
                <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
                  <rect x="2" y="26" width="7" height="16" rx="2" fill="#90CDF4"/>
                  <rect x="11" y="18" width="7" height="24" rx="2" fill="#63B3ED"/>
                  <rect x="20" y="22" width="7" height="20" rx="2" fill="#A0AEC0"/>
                  <rect x="29" y="14" width="7" height="28" rx="2" fill="#68D391"/>
                  <rect x="38" y="8" width="4" height="34" rx="2" fill="#48BB78"/>
                </svg>
                <div>
                  <div className={styles.logoName}><b>STREAM</b>SIDE</div>
                  <div className={styles.logoSub}>BOOKKEEPING</div>
                </div>
              </div>
              <p className={styles.tagline}>Professional. Reliable. Organized.<br />Bookkeeping that keeps your business moving forward.</p>
              <div className={styles.social}>
                <a href="https://www.facebook.com/share/1BkAXlfr" target="_blank" rel="noreferrer" aria-label="Facebook"><FiFacebook /></a>
                <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
                <a href="#" aria-label="Instagram"><FiInstagram /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Quick Links</h4>
              <ul className={styles.links}>
                {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/resources', 'Resources'], ['/contact', 'Contact']].map(([to, label]) => (
                  <li key={to}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Services</h4>
              <ul className={styles.links}>
                {['Monthly Bookkeeping', 'Payroll Administration', 'GST/PST Filing', 'Accounts Payable & Receivable', 'Books Rescue & Rebuild', 'QuickBooks Online Setup'].map(s => (
                  <li key={s}><Link to="/services">{s}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Contact</h4>
              <ul className={styles.contact}>
                <li><FiPhone size={14} /><a href="tel:2508896907">250-889-6907</a></li>
                <li><FiMail size={14} /><a href="mailto:streamsidebookkeeping@gmail.com">streamsidebookkeeping@gmail.com</a></li>
                <li><FiMapPin size={14} /><span>Vancouver Island, BC</span></li>
              </ul>
              <Link to="/contact" className="btn btn-primary btn-sm" style={{ marginTop: 20 }}>
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container">
          <p>© {year} Streamside Bookkeeping. All rights reserved.</p>
          <p>Serving small businesses throughout Vancouver Island and British Columbia</p>
        </div>
      </div>
    </footer>
  );
}
