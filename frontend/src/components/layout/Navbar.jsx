import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiPhone, FiMenu, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <svg className={styles.logoIcon} width="40" height="40" viewBox="0 0 44 44" fill="none">
            <rect x="2" y="26" width="7" height="16" rx="2" fill="#90CDF4"/>
            <rect x="11" y="18" width="7" height="24" rx="2" fill="#63B3ED"/>
            <rect x="20" y="22" width="7" height="20" rx="2" fill="#A0AEC0"/>
            <rect x="29" y="14" width="7" height="28" rx="2" fill="#68D391"/>
            <rect x="38" y="8" width="4" height="34" rx="2" fill="#48BB78"/>
          </svg>
          <div className={styles.logoText}>
            <span className={styles.logoName}><b>STREAM</b>SIDE</span>
            <span className={styles.logoSub}>BOOKKEEPING</span>
            <span className={styles.logoTag}>Grow with the Flow</span>
          </div>
        </Link>
        <nav className={styles.nav}>
          {navLinks.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.cta}>
          <a href="tel:2508896907" className={styles.phone}><FiPhone size={14}/> 250-889-6907</a>
          <Link to="/contact" className="btn btn-primary btn-sm">Book a Free Call</Link>
        </div>
        <button className={styles.toggle} onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          {open ? <FiX size={24}/> : <FiMenu size={24}/>}
        </button>
      </div>
      <div className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileInner}>
          {navLinks.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.active : ''}`} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <div className={styles.mobilePhone}><FiPhone size={14}/> 250-889-6907</div>
          <Link to="/contact" className="btn btn-primary" onClick={() => setOpen(false)} style={{ marginTop: 8 }}>Book a Free Consultation</Link>
        </div>
      </div>
    </header>
  );
}
